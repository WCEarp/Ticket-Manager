//Constants to represent the type of account
const TYPES = {ADMIN: 1, SEASON_TICKET_HOLDER: 2};
module.exports.TYPES = TYPES;

module.exports.AccountManager = function (database) {
    let db = database;

    /**
     * Get an account object if an account with these credentials exists.
     *
     * @param username The account's username
     * @param password The account's password
     * @param callback Function that account is passed into or null.
     */
    this.getAccount = function (username, password, callback) {
        db.query_account_by_username_password(username, password, function (err, row) {
            //If account was found, pass it to the callback function
            if (!err) {
                let account = new Account(row.accountLoginID, row.username, row.userType);
                callback(account);
            }
            //If the account was not found, pass null to the callback
            else {
                console.error(err);
                callback(null);
            }
        });
    }
};

//Creates an account object
let Account = function (accountID, username, userType) {
    this.accountID = accountID;
    this.username = username;
    this.userType = userType;
};

module.exports.Account = Account;

/**
 * Check if a request is being made by an admin.
 *
 * @param req The request object from an express route.
 * @returns {boolean}
 */
module.exports.isAdmin = function (req) {
    let acc = req.session.account;
    if (acc && acc.userType) {
        return acc.userType === TYPES.ADMIN;
    }
    return false;
};
