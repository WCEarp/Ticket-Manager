const express = require('express');
const router = express.Router();
let accountManager;

router.setAccountManager = function (manager) {
    accountManager = manager
};

router.post('/', function (req, res) {
    let account = req.session.account;
    if (account && account.username) {
        console.log("User already logged in as " + account.username);
        res.send({success: true, username: account.username, userType: account.userType})
        return;
    }

    let username = req.body.u;
    let password = req.body.p;
    if (username === null || username === "") {
        console.log("Login attempt with no username");
        res.send({success: false, errors: ["Username is required"]});
        return;
    }
    if (password === null || password === "") {
        console.log("Login attempt with no password");
        res.send({success: false, errors: ["Password is required"]});
        return;
    }
    accountManager.getAccount(username, password, function (account) {
        if (account) {
            console.log("Logging in account " + account.accountLoginID);
            req.session.account = account;
            res.send({success: true, username: account.username, userType: account.userType})
        } else {
            console.log("Invalid login attempt");
            res.send({success: false, errors: ["Incorrect login"]});
        }
    })
});

router.post('/username', function (req, res) {
    var account = req.session.account;
    if (account && account.username) {
        console.log("User logged in as " + account.username);
        res.send({username: account.username, userType: account.userType});
    } else {
        console.log("User not logged in");
        res.send({});
    }
});

router.post('/logout', function (req, res) {
    console.log("Logging out user");
    req.session = null;
    res.send({});
});

module.exports = router;