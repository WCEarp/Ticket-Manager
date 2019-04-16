/**
 * This router handles login attempts and login validation
 */

const express = require('express');
const router = express.Router();
let accountManager;

router.setAccountManager = function (manager) {
    accountManager = manager
};

//This is called for a login attempt
router.post('/', function (req, res) {
    let account = req.session.account;
    //IF already logged in, send success.
    if (account && account.username) {
        console.log("User already logged in as " + account.username);
        res.send({success: true, username: account.username, userType: account.userType});
        return;
    }

    //Get username and password from body of message and send error if invalid
    let username = req.body.u;
    let password = req.body.p;
    if (username === null || username === "" || username.match(/[^A-z0-9]/gi) != null) {
        console.log("Login attempt with no username");
        res.send({success: false, errors: ["Username is invalid"]});
        return;
    }

    //An invalid password was given
    if (password === null || password === "" || password.match(/[^A-z0-9]/gi) != null) {
        console.log("Login attempt with no password");
        res.send({success: false, errors: ["Password is invalid"]});
        return;
    }

    //Get the account, if it exists then the user enter valid credentials
    accountManager.getAccount(username, password, function (account) {
        if (account) {
            console.log("Logging in account " + account.accountID);
            req.session.account = account;
            res.send({success: true, username: account.username, userType: account.userType})
        } else {
            console.log("Invalid login attempt");
            res.send({success: false, errors: ["Incorrect login"]});
        }
    })
});

//This is called when a website wants to know if it is logged in and needs a username to display
router.post('/username', function (req, res) {
    let account = req.session.account;
    if (account && account.username) {
        console.log("User logged in as " + account.username);
        res.send({username: account.username, userType: account.userType});
    } else {
        console.log("User not logged in");
        res.send({});
    }
});

//This is called on logout. Setting session to null resets the users session data.
router.post('/logout', function (req, res) {
    console.log("Logging out user");
    req.session = null;
    res.send({});
});

module.exports = router;