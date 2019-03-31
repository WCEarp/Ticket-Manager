var express = require('express');
var path = require('path');

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

module.exports = router;