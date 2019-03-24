const sqlite3 = require('sqlite3').verbose();

module.exports = function () {

    let db = new sqlite3.Database('./db/database.db', sqlite3.OPEN_READWRITE,
        function (err) {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the database.');
        });

    const USER_COLUMNS = "UserID userId, " +
        "FirstName firstName, " +
        "LastName lastName, " +
        "AddressID addressID," +
        "PhoneNumber phoneNumber," +
        "Email email," +
        "CreditCardNumber creditCardNumber," +
        "AccountLoginID accountLoginID," +
        "SeasonTicketSeat seasonTicketSeat";

    const TICKET_COLUMNS = 'TicketID ticketID, ' +
        'ShowID showID, ' +
        'UserID userID, ' +
        'PaymentMethodID paymentMethodID, ' +
        'ReservedSeats reservedSeats, ' +
        'NumberOfSeats numberOfSeats, ' +
        'Paid paid';

    this.query_user_by_id = function (id) {
        let sql_statement = `SELECT ` + USER_COLUMNS +
            ` FROM User
        WHERE UserID = ?`;

        db.get(sql_statement, [id], function (err, row) {
            if (err) {
                return console.error(err.message);
            }
            return row
                ? console.log(row.firstName, row.lastName)
                : console.log(`No user found with the id ${id}`);
        })
    };

    this.query_ticket_by_id = function (id) {
        let sql_statement = `SELECT ` + TICKET_COLUMNS +
            ` FROM Ticket
        WHERE TicketID = ?`;

        db.get(sql_statement, [id], function (err, row) {
            if (err) {
                return console.error(err.message);
            }
            return row
                ? console.log(row.showID, row.userID)
                : console.log(`No user found with the id ${id}`);
        })
    }
};