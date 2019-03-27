module.exports.UserManager = function (database) {
    let db = database;

    this.getUser = function (userID, callback) {

        db.query_user_by_id(userID, function (row) {
            if (row) {
                let user = new User(row.userID, row.firstName, row.lastName,
                    row.addressID, row.phoneNumber, row.email, row.creditCardNumber,
                    row.accountLoginID, row.seasonTicketSeat);
                callback(user)
            } else {
                console.info(`No user found with id ${userID}`);
            }
        });
    }
};

module.exports.User = function (userID, firstName, lastName, addressID, phoneNumber,
                                email, ccn, accountLoginID, seasonTicketSeat) {
    this.userID = userID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.addressID = addressID;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.ccn = ccn;
    this.accountLoginID = accountLoginID;
    this.seasonTicketSeat = seasonTicketSeat;

    //TODO implement function for serializing user and getting account

    this.getAccount = function () {

    };

    this.serialize = function () {

    }
};