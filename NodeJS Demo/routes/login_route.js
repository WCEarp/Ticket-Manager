const express = require('express');
const path = require('path');
const router = express.Router();
let userManager;

router.setUserManager = function (manager) {
    userManager = manager
};

router.get('/', function (req, res) {
    console.log(" Name = " + user.firstName + " " + user.lastName);
    res.sendFile(path.join(__dirname, '..', 'html', 'login.html'));
});

router.post('/submitLogin', function (req, res) {
    console.log(req.body);
    res.status(200);
});

module.exports = router;