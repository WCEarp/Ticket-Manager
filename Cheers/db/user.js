module.exports.UserManager = function (database) {
    let db = database;

    this.getUser = function (userID, callback) {

        db.query_user_by_id(userID, function (err, userRow) {
            if (!err) {
                db.query_address_by_id(userRow.addressID, function (err, addressRow) {
                    let user;
                    if (!err && addressRow) {
                        user = new User(userRow.userID, userRow.firstName, userRow.lastName,
                            addressRow.street, addressRow.city, addressRow.state, addressRow.zipCode,
                            userRow.phoneNumber, userRow.email, userRow.creditCardNumber,
                            userRow.accountLoginID, userRow.seasonTicketSeat, userRow.sthProductionID);
                    } else {
                        user = new User(userRow.userID, userRow.firstName, userRow.lastName,
                            null, null, null, null,
                            userRow.phoneNumber, userRow.email, userRow.creditCardNumber,
                            userRow.accountLoginID, userRow.seasonTicketSeat, userRow.sthProductionID);
                    }
                    callback(user)
                });
            } else {
                console.error(err);
                callback(null);
            }
        });
    };

    this.getUsers = function (callback) {

        db.query_users(function (err, userRows) {
            if (!err) {
                db.query_addresses(function (err, addressRows) {
                    let addressDictionary = {};
                    console.log(addressRows);
                    for (let i = 0; i < addressRows.length; i++) {
                        let addressID = addressRows[i].addressID;
                        addressDictionary[addressID] = addressRows[i];
                    }
                    let userList = [];
                    for (let i = 0; i < userRows.length; i++) {
                        let userRow = userRows[i];
                        let addressID = userRow.addressID;
                        let user;
                        if (addressID && addressDictionary[addressID]) {
                            let address = addressDictionary[addressID];
                            user = new User(userRow.userID, userRow.firstName, userRow.lastName,
                                address.street, address.city, address.state, address.zipCode,
                                userRow.phoneNumber, userRow.email, userRow.creditCardNumber,
                                userRow.accountLoginID, userRow.seasonTicketSeat, userRow.sthProductionID);
                        } else {
                            user = new User(userRow.userID, userRow.firstName, userRow.lastName,
                                null, null, null, null,
                                userRow.phoneNumber, userRow.email, userRow.creditCardNumber,
                                userRow.accountLoginID, userRow.seasonTicketSeat, userRow.sthProductionID);
                        }
                        console.log(user);
                        userList.push(user);
                    }
                    console.log(userList);
                    callback(userList);
                });
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
                for (let i in rows) {
                    if (rows[i].email != null && rows[i].email !== '') {
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

    this.add_user = function (firstName, lastName, street, city, state, zipCode, phoneNumber, email, ccn, seasonTicketSeat, sthProductionID) {
        if (street && city && state && zipCode) {
            console.log("Adding address");
            db.add_address(street, city, state, zipCode, function (err, addressID) {
                if (!err && addressID) {
                    console.log("Adding user");
                    db.add_user(firstName, lastName, addressID, phoneNumber, email, ccn, null, seasonTicketSeat, sthProductionID);
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log("Adding user with no address");
            db.add_user(firstName, lastName, null, phoneNumber, email, ccn, null, seasonTicketSeat, sthProductionID);
        }
    };

    this.delete_user = function (userID) {
        db.query_user_by_id(userID, function (err, row) {
            if (row) {
                db.delete_user(userID);
                if (row.addressID && row.addressID !== "") {
                    db.delete_address(row.addressID);
                }
            }
        });
    };

    this.update_user = function (userID, firstName, lastName, street, city, state, zipCode, phoneNumber, email, ccn, accountLoginID, seasonTicketSeat, sthProductionID) {
        if (street && city && state && zipCode) {
            console.log("Updating user address");
            db.query_user_by_id(userID, function (err, row) {
                if (row) {
                    let addressID = row.addressID;
                    if (addressID && addressID !== "") {
                        db.update_address(addressID, street, city, state, zipCode);
                        db.update_user(userID, firstName, lastName, addressID, phoneNumber, email, ccn, accountLoginID, seasonTicketSeat, sthProductionID);
                    } else {
                        db.add_address(street, city, state, zipCode, function (err, newAddressID) {
                            if (!err && newAddressID) {
                                addressID = newAddressID;
                                db.update_user(userID, firstName, lastName, addressID, phoneNumber, email, ccn, accountLoginID, seasonTicketSeat, sthProductionID);
                            }
                        })
                    }
                }
            });
        } else {
            db.update_user(userID, firstName, lastName, null, phoneNumber, email, ccn, accountLoginID, seasonTicketSeat, sthProductionID);
        }
    };

    this.update_user_sth_seat = function (userID, seasonTicketSeat, sthProductionID) {
        db.update_user_sth_seat(userID, seasonTicketSeat, sthProductionID);
    };
};


let User = function (userID, firstName, lastName, street, city, state, zipCode, phoneNumber,
                     email, ccn, accountLoginID, seasonTicketSeat, sthProductionID) {
    this.userID = userID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.ccn = ccn;
    this.accountLoginID = accountLoginID;
    this.seasonTicketSeat = seasonTicketSeat;
    this.sthProductionID = sthProductionID;
};

module.exports.User = User;
