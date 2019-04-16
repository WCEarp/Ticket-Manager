var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'register.html'));
});

router.post('/submitLogin', function (req, res) {
    console.log(req.body);
    res.redirect('/')
});

/**
 * @deprecated This router is unused and replaced by login_route
 */
module.exports = router;