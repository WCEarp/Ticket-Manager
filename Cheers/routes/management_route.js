const express = require('express');
const path = require('path');
let userManager;
let ticketManager;

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

router.post('/user_add', function (req, res) {
	userManager.add_user(req.body.firstName, req.body.lastName, req.body.addressID, req.body.phoneNumber, req.body.email, req.body.ccn, req.body.accountLoginID, req.body.seasonTicketSeat);
	res.send({});
});


router.post('/user_delete', function (req, res) {
	userManager.delete_user(req.body.userID);
	res.send({});
});

router.post('/user_update', function (req, res) {
	userManager.update_user(req.body.userID, req.body.firstName, req.body.lastName, req.body.addressID, req.body.phoneNumber, req.body.email, req.body.ccn, req.body.accountLoginID, req.body.seasonTicketSeat);
	res.send({});
});

module.exports = router;