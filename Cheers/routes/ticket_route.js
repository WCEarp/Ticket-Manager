var express = require('express');
var path = require('path');
let showManager;

/**
 * This router handles any requests from the ticket pages
 *
 * @type {Router|router}
 */
let router = express.Router();

//GET http://127.0.0.1/tickets -> Send ../html/tickets.html
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'tickets.html'));
});

//Add show manager as a variable
router.setShowManager = function (manager) {
    showManager = manager;
};

router.get('/ShowTickets', function (req, res) {
    if (!req.query.id || req.query.id === "") {
        console.log("Id is required to get show");
        res.json({errors: ["Show ID is required to get show"]})
    } else {
        let showId = req.query.id;
        showManager.getReservedTickets(showId, function (show) {
            if (show) {
                console.log(show);
                console.log(`Sending show of id ${showId}`);
                res.json({show: show});
            } else {
                let err = `User with id ${showId} not found`;
                console.log(err);
                res.json({errors: [err]})
            }
        });
    }
});

router.post('/show_update', function (req, res) {
    console.log('**********');
    console.log(req.body.seatsTaken);
    showManager.updateReservedTickets(req.body.showID, req.body.seatsTaken);
    res.send({});
});

module.exports = router;