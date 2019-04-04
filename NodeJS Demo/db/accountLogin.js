//Constants to represent the type of account
module.exports.TYPES = {GUEST: 0, SEASON_TICKET_HOLDER: 1, ADMIN: 2};

module.exports.AccountManager = function (database) {
    let db = database;

    this.getAccount = function (username, password, callback) {
        db.query_account_by_username_password(username, password, function (err, row) {
            if (!err) {
                let account = new Account(row.accountLoginID, row.username, row.userType);
                callback(account)
            } else {
                console.error(err);
                callback(null)
            }
        });
    }
};


let Account = function (accountID, username, userType) {
    this.accountID = accountID;
    this.username = username;
    this.userType = userType;
};

module.exports.Account = Account;
