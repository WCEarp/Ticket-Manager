const express = require('express');
const path = require('path');
const emailer = require('../db/emailer.js');
const csvHandler = require('../db/exporter');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});
let userManager;
let ticketManager;
let showManager;

/**
 * This router handles any requests from the management page. Requests here
 * should be validated that they are coming from an admin account.
 *
 * @type {Router|router}
 */
let router = express.Router();

//GET http://127.0.0.1/manage -> Send ../html/management.html
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'managementTools.html'));
});

//Add user manager as a variable
router.setUserManager = function (manager) {
    userManager = manager;
};

//Add ticket manager as a variable
router.setTicketManager = function (manager) {
    ticketManager = manager;
};
//Add show manager as a variable
router.setShowManager = function (manager) {
    showManager = manager;
};

//GET http://127.0.0.1/manage/user?id=<id value>  ->  A json object containing either user or errors (a list of errors)
router.get('/user', function (req, res) {
    if (!req.query.id || req.query.id === "") {
        console.log("Id is required to get user");
        res.json({errors: ["User ID is required to get user"]})
    } else {
        let userId = req.query.id;
        userManager.getUser(userId, function (user) {
            if (user) {
                console.log(`Sending user of id ${userId}`);
                res.json({user: user});
            } else {
                let err = `User with id ${userId} not found`;
                console.log(err);
                res.json({errors: [err]})
            }
        });
    }
});

//get all users
router.get('/users', function (req, res) {
    userManager.getUsers(function (users) {
        if (users) {
            res.json({users: users});
        } else {
            let err = `Users not found`;
            console.log(err);
            res.json({errors: [err]})
        }
    });
});

//get ticket by id
router.get('/ticket', function (req, res) {
    if (!req.query.id || req.query.id === "") {
        console.log("Id is required to get ticket");
        res.json({errors: ["Ticket ID is required to get ticket"]})
    } else {
        let ticketID = req.query.id;
        ticketManager.getTicket(ticketID, function (ticket) {
            if (ticket) {
                console.log(`Sending ticket of id ${ticketID}`);
                res.json({ticket: ticket});
            } else {
                let err = `ticket with id ${ticketID} not found`;
                console.log(err);
                res.json({errors: [err]})
            }
        });
    }
});

//get all tickets
router.get('/tickets', function (req, res) {
    ticketManager.getTickets(function (tickets) {
        if (tickets) {
            res.json({tickets: tickets});
        } else {
            let err = `Tickets not found`;
            console.log(err);
            res.json({errors: [err]})
        }
    });
});

//add a user
router.post('/user_add', function (req, res) {
    let body = req.body;
    userManager.add_user(body.firstName, body.lastName, body.street, body.city, body.state, body.zipCode,
        body.phoneNumber, body.email, body.ccn, body.seasonTicketSeat, body.sthProductionID);
    res.send({});
});

//delete a user
router.post('/user_delete', function (req, res) {
    console.log('deleting user');
    userManager.delete_user(req.body.userID, function (rowschanged) {
        console.log('rows-changed' + rowschanged);
        if (rowschanged === 0) {
            res.json({errors: ["User ID does not exist."]})
        } else {
            res.json({});
        }
    });
});

//update a user
router.post('/user_update', function (req, res) {
    let body = req.body;
    userManager.update_user(body.userID, body.firstName, body.lastName, body.street, body.city, body.state, body.zipCode, body.phoneNumber, body.email, body.ccn, body.accountLoginID, body.seasonTicketSeat, body.sthProductionID);
    res.send({});
});

//update a season ticket seat for a user
router.post('/user_update_sth_seat', function (req, res) {
    userManager.update_user_sth_seat(req.body.userID, req.body.seasonTicketSeat, req.body.sthProductionID, function (rowschanged) {
        console.log('rows-changed' + rowschanged);
        if (rowschanged === 0) {
            res.json({errors: ["User ID does not exist."]})
        } else {
            res.json({});
        }
    });
});

//update paid status on a ticket
router.post('/update_paid', function (req, res) {
    ticketManager.paid_update(req.body.ticketID);
    res.send({});
});

//email season ticket holders
router.post('/notifyRenew', function (req, res) {
    userManager.getEmails(function (emails) {
        if (emails) {
            emailer.notify(emails);
        }
    });
    res.send({});
});

//update section info and price
router.post('/show_update_setSectionInfo', function (req, res) {
    showManager.updateSectionInfo(req.body.showID,  req.body.sectionInfo);
    res.send({});
});

//update reserved seats on a ticket
router.post('/ticketseat_update', function (req, res) {
    ticketManager.update_ticket_seat(req.body.ticketID, req.body.showID, req.body.seats, req.body.numSeats);
    res.send({});
});

//export users to file
router.get('/exportUsers', function (req, res) {
    let options = {};
    options.fname = req.query.fname === '1';
    options.lname = req.query.lname === '1';
    options.address = req.query.address === '1';
    options.pnum = req.query.pnum === '1';
    options.email = req.query.email === '1';
    options.ccn = req.query.ccn === '1';
    options.sthSeat = req.query.sthSeat === '1';
    csvHandler.exportUserCSV(res, userManager, options);
});

//import users from file
router.post('/importUsers', upload.single('importUserFile'), function (req, res) {
    let csvLines = req.file.buffer.toString().trim().split('\n');
    let errors = [];
    let linesAdded = 0;
    for (let i = 0; i < csvLines.length; i++) {
        if (!(csvLines[i].trim().length > 0 && csvLines[i].trim()[0] === '#')) {
            console.log("Parsing csv line containing: " + csvLines[i]);
            let fields = csvLines[i].split(",");
            if (fields.length === 11) {
                userManager.add_user(fields[0].trim(), fields[1].trim(), fields[2].trim(),
                    fields[3].trim(), fields[4].trim(), fields[5].trim(), fields[6].trim(),
                    fields[7].trim(), fields[8].trim(), fields[9].trim(), fields[10].trim());
                linesAdded++;
            } else {
                let error = "Line " + (i + 1) + " has an incorrect number of fields. Expected 11.";
                console.log(error);
                errors.push(error);
            }
        } else {
            console.log('Line ' + i + ' was commented out');
        }
    }
    res.json({linesAdded: linesAdded, errors: errors})
});

router.get('/exportTickets', function (req, res) {
    let options = {};
    let query = req.query;
    options.id = query.id === '1';
    options.showID = query.showID === '1';
    options.userID = query.userID === '1';
    options.paymentMethod = query.paymentMethod === '1';
    options.seats = query.seats === '1';
    options.numSeats = query.numSeats === '1';
    options.paid = query.paid === '1';
    options.price = query.price === '1';
    csvHandler.exportTicketCSV(res, ticketManager, options);
});

router.post('/importTickets', upload.single('importTicketFile'), function (req, res) {
    let csvLines = req.file.buffer.toString().trim().split('\n');
    let errors = [];
    let linesAdded = 0;
    for (let i = 0; i < csvLines.length; i++) {
        if (!(csvLines[i].trim().length > 0 && csvLines[i].trim()[0] === '#')) {
            console.log("Parsing csv line containing: " + csvLines[i]);
            let fields = csvLines[i].split(",");
            if (fields.length === 7) {
                ticketManager.add_ticket(fields[0].trim(), fields[1].trim(), fields[2].trim(),
                    fields[3].trim(), fields[4].trim(), fields[5].trim(), fields[6].trim());
                linesAdded++;
            } else {
                let error = "Line " + (i + 1) + " has an incorrect number of fields. Expected 11.";
                console.log(error);
                errors.push(error);
            }
        } else {
            console.log('Line ' + i + ' was commented out');
        }
    }
    res.json({linesAdded: linesAdded, errors: errors})
});

module.exports = router;
