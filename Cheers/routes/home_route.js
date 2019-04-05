var express = require('express');
var path = require('path');

/**
 * This router handles homepage requests as well as
 * the about page since its tiny.
 *
 * @type {Router|router}
 */
var router = express.Router();

//GET http://127.0.0.1/ -> Send ../html/index.html
router.get('/', function (req, res) {
    console.log(path.join(__dirname, '..', 'html', 'index.html'));
    res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
});

//GET http://127.0.0.1/home -> Redirect to http://127.0.0.1/
router.get('/home', function (req, res) {
    res.redirect('/');
});

//GET http://127.0.0.1/about -> Send ../html/aboutUs.html
router.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'aboutUs.html'))
});

router.get('/nav', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'navbar.html'))
});

module.exports = router;