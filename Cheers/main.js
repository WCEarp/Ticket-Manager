const PORT = 80;
const SECURE_PORT = 443;
let HOSTNAME = '127.0.0.1';
const PUBLIC_DIR_NAME = '/res';
let HTTP_ENABLED = true;

//Express dependencies
const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const logger = require('morgan');

//Start the database
const database_module = require('./db/database');
const database_instance = new database_module.Database();

//Create managers wrapping database
const user_module = require('./db/user');
const userManager = new user_module.UserManager(database_instance);

const ticket_module = require('./db/ticket');
const ticketManager = new ticket_module.TicketManager(database_instance);

const show_module = require('./db/show');
const showManager = new show_module.ShowManager(database_instance);

const account_module = require('./db/accountLogin');
const accountManager = new account_module.AccountManager(database_instance);

//Create the routes to handle different requests
const homeRoutes = require('./routes/home_route');
const loginRoutes = require('./routes/login_route');
loginRoutes.setAccountManager(accountManager);

const ticketRoutes = require('./routes/ticket_route');
const manage_route = require('./routes/management_route');
manage_route.setUserManager(userManager);
manage_route.setTicketManager(ticketManager);
manage_route.setShowManager(showManager);


ticketRoutes.setTicketManager(ticketManager);
ticketRoutes.setShowManager(showManager);

const app = express();

app.use(logger('dev'));

//Enable cookie sessions to keep track of who's logged in
app.use(cookieSession({
    name: 'cheers-session',
    secret: 'keyboard-cat'
}));

//Creates a url parser.
app.use(bodyParser.urlencoded({extended: true}));

//Makes the public directory visible to all
//So a link or ref in the html like 127.0.0.1/res/img/puppy.gif maps to ./public/img/puppy.gif on the server
app.use(PUBLIC_DIR_NAME, express.static(path.join(__dirname, 'public')));

//Client request -> server response

//GET http://127.0.0.1/ -> Send ./index.html
app.use('/', homeRoutes);
app.use('/login', loginRoutes);
app.use('/tickets', ticketRoutes);
app.use('/manage', manage_route);

// Handle 404
app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname, 'html', '404.html'));
});

// Handle 500
app.use(function (error, req, res, next) {
    console.log(error);
    res.status(500).send('500: Internal Server Error');
});

//Process program arguments
let args = process.argv.slice(2);
if (args.length >= 1)
{
    HOSTNAME = args[0];
    if(args.length === 2)
    {
        HTTP_ENABLED = (args[1] === 'ENABLED')
    }
}

//Start the https server
const httpsOptions = {host: HOSTNAME, port: SECURE_PORT};
createHttpsServer(httpsOptions);

//Start http if http is allowed
if(HTTP_ENABLED) {
    const httpOptions = {host: HOSTNAME, port: PORT};
    createHttpServer(httpOptions);
}

/**
 * Creates and starts an https server instance
 *
 * @param options Options specifying the ip and port
 * @returns {{httpsServer: Server, httpsOptions: {port: number, host: string}}}
 */
function createHttpsServer(options) {
    const credentials = {
        key: fs.readFileSync(path.join(__dirname, 'certs', 'mockserver.key')),
        cert: fs.readFileSync(path.join(__dirname, 'certs', 'mockserver.crt'))
    };

    let httpsServer = https.createServer(credentials, app);
    httpsServer.listen(options);
    //Create a listener to handle errors opening the server.
    httpsServer.on('error', (e) => {
        switch (e.code) {
            case 'EADDRINUSE' :
                console.error('Address is already in use. Retrying in ten seconds...');
                setTimeout(function () {
                    console.log('Reattempting connection...');
                    httpsServer.close();
                    httpsServer.listen(options);
                }, 10000);
                break;
            default:
                console.error('Unsupported error: ' + e.code);
                throw error;
        }
    });
    //Create a listener to run on the https server opening
    httpsServer.on("listening", () => {
        //Get the server address info
        let addr = httpsServer.address();
        //Log where the server is running
        console.log('Running https server at https://' + addr.address + ':' + SECURE_PORT + '/');
    });
    return {httpsOptions, httpsServer};
}

/**
 * Create and start an http server instance.
 *
 * @param options Options specifying ip and port
 * @returns {Server}
 */
function createHttpServer(options) {
    let httpServer = http.createServer(app);
    httpServer.listen(options);
    httpServer.on('error', (e) => {
        switch (e.code) {
            case 'EADDRINUSE':
                console.error('Address is already in use. Retrying in ten seconds...');
                setTimeout(function () {
                    console.log('Reattempting connection...');
                    httpServer.close();
                    httpServer.listen(httpOptions);
                }, 10000);
                break;
            default:
                console.error('Unsupported error: ' + e.code);
                throw error;

        }
    });
    httpServer.on("listening", () => {
        //Get the server address info
        let addr = httpServer.address();
        //Log where the server is running
        console.log('Running http server at http://' + addr.address + ':' + PORT + '/');
    });
    return httpServer;
}
