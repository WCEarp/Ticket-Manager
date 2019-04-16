const nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'cheers.tickets@gmail.com',
        pass: 'BIGpassword~'
    }
});

/*var mailOptions = {
    from: '"Cheers Squad" <cheers.tickets@gmail.com>', // sender address
    to: 'cheers.tickets@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};*/

function notify(emails) {
    //console.log(emails);
    var mailOptions = {
        from: '"Cheers Squad" <cheers.tickets@gmail.com>', // sender address
        to: emails,
        subject: 'YOUR SEASON TICKET RENEWAL REMINDER',
        text: 'Buy it now! Please contact us at cheers.tickets@gmail.com. \n\nCheers, Cheers Squad'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }

    });
}

module.exports.notify = notify;










