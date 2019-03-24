const express = require('express');
const path = require('path');
const router = express.Router();

router.setDatabase = function (database) {
    this.db = database;
};

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'login.html'));
});

router.post('/submitLogin', function (req, res) {
    console.log(req.body);
    res.status(200);
});

module.exports = router;