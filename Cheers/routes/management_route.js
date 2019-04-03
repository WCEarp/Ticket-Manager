var express = require('express');
var path = require('path');

/**
 * This router handles any requests from the management page. Requests here
 * should be validated that they are coming from an admin account.
 *
 * @type {Router|router}
 */
var router = express.Router();

//GET http://127.0.0.1/manage -> Send ../html/management.html
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'html', 'managementTools.html'));
});

router.setUserManager = function (manager) {
    userManager = manager
};

router.get('/user', function (req, res) {
	userId = req.query.id;
	userManager.getUser(userId, function(user){
		res.json(user);
	})})
	
module.exports = router;
