module.exports.PAID_STATE = {UNPAID: 0, PAID: 1};

/**
 * Creates a new ticket manager. This interfaces with the database to manage tickets.
 *
 * @param database An instance of the database.
 * @constructor
 */
module.exports.TicketManager = function (database) {
    let db = database;

    /**
     * Gets a user object from the database and performs an action on it or logs ar error.
     *
     * @param ticketID The id of the ticket to get.
     * @param callback A callback that the user is passed into.
     * If no user was found, undefined will be passed instead.
     */
    this.getTicket = function (ticketID, callback) {

        db.query_ticket_by_id(ticketID, function (row) {
            if (row) {
                let ticket = new Ticket(row.ticketID, row.showID, row.userID,
                    row.paymentMethodID, row.reservedSeats, row.numberOfSeats, row.paid);
                callback(ticket)
            } else {
                console.info(`No ticket found with id ${ticketID}`);
            }
        });
    }
};

/**
 * Creates a new ticket object.
 *
 * @param ticketID
 * @param showID
 * @param userID
 * @param paymentMethodID
 * @param reservedSeats
 * @param numberOfSeats
 * @param paid
 * @constructor
 */
module.exports.Ticket = function (ticketID, showID, userID, paymentMethodID, reservedSeats, numberOfSeats, paid) {
    this.ticketID = ticketID;
    this.showID = showID;
    this.userID = userID;
    this.paymentMethodID = paymentMethodID;
    this.reservedSeats = reservedSeats;
    this.numberOfSeats = numberOfSeats;
    this.paid = paid;
};