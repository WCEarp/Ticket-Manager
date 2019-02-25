var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'login.html'));
});

router.post('/submitLogin', function (req, res) {
    console.log(req.body);
    res.status(200);
});

module.exports = router;