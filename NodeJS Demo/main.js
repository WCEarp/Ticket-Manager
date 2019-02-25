const PORT = 80;
const SECURE_PORT = 443;
const HOSTNAME = '127.0.0.1';
const PUBLIC_DIR_NAME = '/res';

const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var homeRoutes = require('./routes/home_route');
var loginRoutes = require('./routes/login_route');

const app = express();

//Creates a url parser.
app.use(bodyParser.urlencoded({extended: true}));

//Makes the public directory visible to all
//So a link or ref in the html like 127.0.0.1/res/img/puppy.gif maps to ./public/img/puppy.gif on the server
app.use(PUBLIC_DIR_NAME, express.static(path.join(__dirname, 'public')));

//Client request -> server response

//GET http://127.0.0.1/ -> Send ./index.html
app.use('/', homeRoutes);
app.use('/login', loginRoutes);

// Handle 404
app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname, 'html', '404.html'));
});

// Handle 500
app.use(function (error, req, res, next) {
    res.status(500).send('500: Internal Server Error');
});


var httpsOptions = {host: HOSTNAME, port: SECURE_PORT};
createHttpsServer(httpsOptions);

var httpOptions = {host: HOSTNAME, port: PORT};
createHttpServer(httpOptions);


function createHttpsServer(options) {
    var credentials = {
        key: fs.readFileSync(path.join(__dirname, 'certs', 'mockserver.key')),
        cert: fs.readFileSync(path.join(__dirname, 'certs', 'mockserver.crt'))
    };

    var httpsServer = https.createServer(credentials, app);
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
        var addr = httpsServer.address();
        //Log where the server is running
        console.log('Running https server at https://' + addr.address + ':' + SECURE_PORT + '/');
    });
    return {httpsOptions, httpsServer};
}

function createHttpServer(options) {
    var httpServer = http.createServer(app);
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
        var addr = httpServer.address();
        //Log where the server is running
        console.log('Running http server at http://' + addr.address + ':' + PORT + '/');
    });
    return httpServer;
}
