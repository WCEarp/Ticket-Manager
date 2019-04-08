var express = require('express');
var path = require('path');
let showManager;

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
router.setShowManager = function (manager) {
    showManager = manager;
};

router.get('/ShowTickets', function (req, res) {
    if (!req.query.id || req.query.id === "") {
        console.log("Id is required to get user");
        res.json({errors: ["User ID is required to get user"]})
    } else {
        let showId = req.query.id;
        showManager.getReservedTickets(showId, function (tickets) {
            if (tickets) {
                console.log(`Sending user of id ${showId}`);
                res.json({tickets: tickets});
            } else {
                let err = `User with id ${showId} not found`;
                console.log(err);
                res.json({errors: [err]})
            }
        });
    }
});

module.exports = router;