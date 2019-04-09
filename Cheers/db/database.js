const sqlite3 = require('sqlite3').verbose();
const ticket_module = require('./ticket');
const path = require('path');

/*
 * 'Object' for low level database access. Higher level operations should probably
 * go in a data access object
 */
module.exports.Database = function () {
    const THEATER_COLUMNS = "TheaterID theaterID, SeatsNum seatsNum, SeatsTotal seatsTotal";
    const SHOW_COLUMNS = `ShowID showID, StartDate startDate, EndDate endDate, Time time, 
        TheaterID theaterID, SeatsTaken seatsTaken, ProductionID productionID, FloorPrice floorPrice, 
        BalconyPrice balconyPrice`;

    console.log("Opening database at " + path.join(__dirname, 'database.db'));
    let db = new sqlite3.Database(path.join(__dirname, 'database.db'), sqlite3.OPEN_READWRITE,
        function (err) {
            if (err) {
                console.error(err);
            }
            else {
                console.log('Connected to the database.');
            }
        });

    //region User Database Functions
    /**
     * Get a row containing user data from the database.
     *
     * @param id The id of the user
     * @param callback A function that user is passed into to be executed.
     */
    this.query_user_by_id = function (id, callback) {
        let columns = "UserID userID, FirstName firstName, " +
            "LastName lastName, AddressID addressID," +
            "PhoneNumber phoneNumber, Email email," +
            "CreditCardNumber creditCardNumber, AccountLoginID accountLoginID," +
            "SeasonTicketSeat seasonTicketSeat";

        let sql_statement = `SELECT ` + columns +
            ` FROM User
        WHERE UserID = ?`;

        db.get(sql_statement, [id], function (err, row) {
            if (err || !row) {
                if (err) {
                    console.error(err.message);
                }
                callback("Unable to get user", null)
            } else {
                callback(null, row);
            }
        });
    };

    /**
     * Get all rows containing user data from the database.
     *
     * @param callback A function that user is passed into to be executed.
     */
    this.query_users = function (callback) {
        let columns = "UserID userID, FirstName firstName, " +
            "LastName lastName, AddressID addressID," +
            "PhoneNumber phoneNumber, Email email," +
            "CreditCardNumber creditCardNumber, " +
            "SeasonTicketSeat seasonTicketSeat";

        let sql_statement = `SELECT ` + columns +
            ` FROM User`;

        db.all(sql_statement, [], function (err, rows) {
            if (err || !rows) {
                if (err) {
                    console.error(err.message);
                }
                callback("Unable to get users", null)
            } else {
                callback(null, rows);
            }
        });
    };
	
	/**
     * Get all emails from user database.
     *
     * @param callback A function that user is passed into to be executed.
     */
    this.query_emails = function (callback) {
        let columns = "Email email";

        let sql_statement = `SELECT ` + columns +
            ` FROM User`;

        db.all(sql_statement, [], function (err, rows) {
            if (err || !rows) {
                if (err) {
                    console.error(err.message);
                }
                callback("Unable to get emails", null)
            } else {
                callback(null, rows);
            }
        });
    };
	
    /**
     * Add a new user to the database containing the following info.
     *
     * @param firstName
     * @param lastName
     * @param addressID
     * @param phoneNumber
     * @param email
     * @param ccn
     * @param accountLoginID
     * @param seasonTicketSeat
     */
    this.add_user = function (firstName, lastName, addressID, phoneNumber, email, ccn, accountLoginID, seasonTicketSeat) {
        let sql = `INSERT INTO User(FirstName, LastName, AddressID, PhoneNumber, 
        Email, CreditCardNumber, AccountLoginID, SeasonTicketSeat) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

        let values = [firstName, lastName, addressID, phoneNumber, email, ccn, accountLoginID, seasonTicketSeat];
        db.run(sql, values, function (err) {

            if (err) {
                console.log(err.message);
            } else {
                console.log(`A row has been inserted with rowid ${this.lastID}`);
            }
        })
    };

    /**
     * Updates an existing users info
     *
     * @param userID The id of the user.
     * @param firstName
     * @param lastName
     * @param addressID
     * @param phoneNumber
     * @param email
     * @param ccn
     * @param accountLoginID
     * @param seasonTicketSeat
     */
    this.update_user = function (userID, firstName, lastName, addressID, phoneNumber, email, ccn, accountLoginID, seasonTicketSeat) {
        let data = [firstName, lastName, addressID, phoneNumber, email, ccn, accountLoginID, seasonTicketSeat, userID];

        let sql = `UPDATE User SET FirstName = ?, LastName = ?, AddressID = ?, PhoneNumber = ?, 
                    Email = ?, CreditCardNumber = ?, AccountLoginID = ?, SeasonTicketSeat = ? 
                    WHERE UserID = ?`;

        db.run(sql, data, function (err) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`User row updated: ${this.changes}`);
            }
        });
    };

    /**
     * Update the season ticket holder seats of the user.
     *
     * @param userID The id of the user.
     * @param seasonTicketSeat The season ticket seats
     */
    this.update_user_sth_seat = function (userID, seasonTicketSeat) {
        let data = [seasonTicketSeat, userID];

        let sql = `UPDATE User SET SeasonTicketSeat = ? 
                    WHERE UserID = ?`;

        db.run(sql, data, function (err) {
            if (err) {
                console.error(err.message);
            } else {
                //Log how many rows were updated. Should be 0-1.
                console.log(`User row updated: ${this.changes}`);
            }
        });
    };

    /**
     * Remove a user from the database.
     *
     * @param userID The id of the user.
     */
    this.delete_user = function (userID) {
        // delete a user based on id
        let sql = `DELETE FROM User WHERE UserID = ?`;

        db.run(sql, userID, function (err) {
            if (err) {
                return console.error(err.message);
            } else {
                console.log(`Row(s) deleted ${this.changes}`);
            }
        });
    };
    //endregion

    /**
     * Get an account from the database with the specified username/password
     *
     * @param username The account username
     * @param password The account password
     * @param callback The function that any error and account is passed into.
     */
    this.query_account_by_username_password = function (username, password, callback) {
        let columns = "AccountLoginID accountLoginID, username username, UserType userType";

        let sql_statement = `SELECT ${columns} FROM AccountLogin WHERE username = ? AND password = ?`;

        db.get(sql_statement, [username, password], function (err, row) {
            if (err || !row) {
                if (err) {
                    console.error(err.message);
                }
                callback("Unable to get account", null)
            } else {
                callback(null, row);
            }
        });
    };

    //region Ticket Database Functions
    /**
     * Get a row containing ticket info from the database.
     *
     * @param id The id of the ticket.
     * @param callback A callback to run if the ticket is found.
     */
    this.query_ticket_by_id = function (id, callback) {
        const TICKET_COLUMNS = 'TicketID ticketID, ' +
            'ShowID showID, ' +
            'UserID userID, ' +
            'PaymentMethodID paymentMethodID, ' +
            'ReservedSeats reservedSeats, ' +
            'NumberOfSeats numberOfSeats, ' +
            'Paid paid, ' +
            'TotalPrice = totalPrice';

        let sql = `SELECT ${TICKET_COLUMNS} FROM Ticket
        WHERE TicketID = ?`;

        db.get(sql, [id], function (err, row) {
            if (err || !row) {
                if (err) {
                    console.error(err.message);
                }
                callback("Unable to get ticket", null)
            } else {
                console.log(`Ticket found with id ${id}`);
                callback(null, row)
            }
        })
    };

    /**
     * Get all rows containing ticket data from the database.
     *
     * @param callback A function that user is passed into to be executed.
     */
    this.query_tickets = function (callback) {
        const TICKET_COLUMNS = 'TicketID ticketID, ' +
            'ShowID showID, ' +
            'UserID userID, ' +
            'PaymentMethodID paymentMethodID, ' +
            'ReservedSeats reservedSeats, ' +
            'NumberOfSeats numberOfSeats, ' +
            'Paid paid, ' +
            'TotalPrice totalPrice';

        let sql_statement = `SELECT ` + TICKET_COLUMNS +
            ` FROM Ticket`;

        db.all(sql_statement, [], function (err, rows) {
            if (err || !rows) {
                if (err) {
                    console.error(err.message);
                }
                callback("Unable to get tickets", null)
            } else {
                callback(null, rows);
            }
        });
    };

    /**
     * Adds a ticket to the database
     * @param showID
     * @param userID
     * @param paymentMethodID
     * @param reservedSeats
     * @param numberOfSeats
     * @param paid
     * @param totalPrice
     */
    this.add_ticket = function (showID, userID, paymentMethodID, reservedSeats, numberOfSeats, paid, totalPrice) {
        let sql = `INSERT INTO Ticket(ShowID, UserID, PaymentMethodID, ReservedSeats, NumberOfSeats, Paid, TotalPrice) VALUES(?, ?, ?, ?, ?, ?, ?)`;

        let values = [showID, userID, paymentMethodID, reservedSeats, numberOfSeats, paid, totalPrice];
        db.run(sql, values, function (err) {

            if (err) {
                console.log(values);
                console.log(err.message);
            } else {
                // get the last insert id
                console.log(`A row has been inserted with rowid ${this.lastID}`);
            }
        });
    };

    /**
     * Sets the ticket as having been paid.
     *
     * @param ticketID The id of the ticket.
     */
    this.set_ticket_paid = function (ticketID) {
        let values = [ticket_module.PAID_STATE.PAID, ticketID];
        //UPDATE Ticket SET Paid = 1 WHERE TicketID = 1
        let sql = `UPDATE Ticket SET Paid = ? WHERE TicketID = ?`;

        db.run(sql, values, function (err) {
            if (err) {
                console.error(err.message);
            } else {
                //Log how many rows were updated. Should be 0-1.
                console.log(`Ticket rows updated: ${this.changes}`);
            }
        });
    };
    //endregion

    //region THEATER functions
    /**
     * Return the string variable for a theater's TOTAL seats.
     * Will be passed into parsing function to convert the string into array/list of seats for further use.
     *
     * @param id The id of the theater you want to get the total seats from.
     * @param callback A function that user is passed into to be executed.
     */
    this.query_totalseats_by_id = function (id, callback) {
        let columns = "SeatsTotal seatsTotal";

        let sql_statement = `SELECT ` + columns +
            ` FROM Theater
        WHERE TheaterID = ?`;

        db.get(sql_statement, [id], function (err, row) {
            if (err || !row) {
                if (err) {
                    console.error(err.message);
                }
                callback("Failed to get total seats", null)
            } else {
                callback(null, row);
            }
        });
    };

    /**
     * Get all rows containing theater ID's.
     *
     * @param callback A function that user is passed into to be executed.
     */
    this.query_all_theaters = function (callback) {
        //let columns = "TheaterID theaterID";

        let sql_statement = `SELECT ${THEATER_COLUMNS} FROM Theater`;

        db.all(sql_statement, [], function (err, rows) {
            if (err || !rows) {
                if (err) {
                    console.error(err.message);
                }
                callback("Failed to get theaters", null);
            } else {
                callback(null, rows);
            }
        });
    };

    /**
     * Get a row containing theater data from the database.
     *
     * @param id The id of the theater.
     * @param callback A function that user is passed into to be executed.
     */
    this.query_theater_by_id = function (id, callback) {

        let sql_statement = `SELECT ${THEATER_COLUMNS} FROM Theater WHERE TheaterID = ?`;

        db.get(sql_statement, [id], function (err, row) {
            if (err || !row) {
                if (err) {
                    console.error(err.message);
                }
                callback("Failed to get theater", null)
            } else {
                callback(null, row);
            }
        });
    };
    //endregion

    //region SHOW Functions
    this.query_all_shows = function (callback) {
        let sql_statement = `SELECT ${SHOW_COLUMNS} FROM Show`;

        db.all(sql_statement, [], function (err, rows) {
            if (err || !rows) {
                if (err) {
                    console.error(err.message);
                }
                callback("Failed to get shows", null);
            } else {
                callback(null, rows);
            }
        });
    };


    this.query_show_by_id = function (id, callback) {
        let sql_statement = `SELECT ${SHOW_COLUMNS} FROM Show WHERE ShowID = ?`;

        db.get(sql_statement, [id], function (err, row) {
            if (err || !row) {
                if (err) {
                    console.error(err.message);
                }
                callback("Failed to get show", null);
            } else {
                callback(null, row);
            }
        });
    };

    /**
     * Updates what seats are taken for a show
     * @param id
     * @param seatsTaken
     */
    this.update_show_seats_taken = function (id, seatsTaken) {
        let values = [seatsTaken, id];
        let sql_statement = `Update Show SET SeatsTaken = ? WHERE ShowID = ?`;

        db.run(sql_statement, values, function (err) {
            if (err) {
                console.error(err.message);
            } else {
                //Log how many rows were updated. Should be 0-1.
                console.log(`Show rows updated: ${this.changes}`);
            }
        });
    }
    //endregion
};