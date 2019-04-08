var express = require('express');
var path = require('path');
let ticketManager;

/**
 * This router handles any requests from the ticket pages
 *
 * @type {Router|router}
 */
var router = express.Router();

//GET http://127.0.0.1/tickets -> Send ../html/tickets.html
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'tickets.html'));
});


//Add ticket manager as a variable
router.setTicketManager = function (manager) {
    ticketManager = manager;
};

router.get('/ShowTickets', function (req, res) {
    ticketManager.getTickets(reg,function (tickets) {
        if (tickets) {
            res.json({SeatsTaken: tickets});
        } else {
            let err = `Tickets not found`;
            console.log(err);
            res.json({errors: [err]})
        }
    });
});

module.exports = router;