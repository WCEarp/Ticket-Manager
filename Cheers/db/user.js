module.exports.UserManager = function (database) {
    let db = database;

    this.getUser = function (userID, callback) {

        db.query_user_by_id(userID, function (err, row) {
            if (!err) {
                let user = new User(row.userID, row.firstName, row.lastName,
                    row.addressID, row.phoneNumber, row.email, row.creditCardNumber,
                    row.accountLoginID, row.seasonTicketSeat, row.sthProductionID);
                callback(user)
            } else {
                console.error(err);
                callback(null);
            }
        });
    };

    this.getUsers = function (callback) {

        db.query_users(function (err, rows) {
            if (!err) {
                callback(rows);
            } else {
                console.error(err);
                callback(null);
            }
        });
    };
	
	this.getEmails = function (callback) {
        db.query_emails(function (err, rows) {
            if (!err) {
                let emails = [];
                for (let i in rows)
                {
                    if (rows[i].email != null && rows[i].email !== '')
                    {
                        emails.push(rows[i].email);
                    }
                }
                callback(emails);
            } else {
                console.error(err);
                callback(null);
            }
        });
    };

    this.add_user = function (firstName, lastName, addressID, phoneNumber, email, ccn, seasonTicketSeat, sthProductionID) {
		db.add_user(firstName, lastName, addressID, phoneNumber, email, ccn, seasonTicketSeat, sthProductionID);
	};

    this.delete_user = function (userID, callback) {
        db.delete_user(userID, callback);
    };
	
	this.update_user = function (userID, firstName, lastName, addressID, phoneNumber, email, ccn, accountLoginID, seasonTicketSeat, sthProductionID) {
        db.update_user(userID, firstName, lastName, addressID, phoneNumber, email, ccn, accountLoginID, seasonTicketSeat, sthProductionID) ;
    };

    this.update_user_sth_seat = function (userID, seasonTicketSeat, sthProductionID) {
        db.update_user_sth_seat(userID, seasonTicketSeat, sthProductionID) ;
    };
};



let User = function (userID, firstName, lastName, addressID, phoneNumber,
                                email, ccn, accountLoginID, seasonTicketSeat, sthProductionID) {
    this.userID = userID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.addressID = addressID;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.ccn = ccn;
    this.accountLoginID = accountLoginID;
    this.seasonTicketSeat = seasonTicketSeat;
    this.sthProductionID = sthProductionID;
};

module.exports.User = User;
