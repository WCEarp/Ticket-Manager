var express = require('express');
var path = require('path');
var router = express.Router();

//GET http://127.0.0.1/ -> Send ./index.html
router.get('/', function (req, res) {
    console.log(path.join(__dirname, '..', 'html', 'index.html'));
    res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
});

//GET http://127.0.0.1/home -> Redirect to http://127.0.0.1/
router.get('/home', function (req, res) {
    res.redirect('/');
});

module.exports = router;