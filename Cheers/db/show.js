/**
 * Creates a new ticket manager. This interfaces with the database to manage tickets.
 *
 * @param database An instance of the database.
 * @constructor
 */
module.exports.ShowManager = function (database) {
    let db = database;

    /**
     * Gets a user object from the database and performs an action on it or logs ar error.
     *
     * @param ticketID The id of the ticket to get.
     * @param callback A callback that the user is passed into.
     * If no user was found, undefined will be passed instead.
     */
    this.getTicket = function (ticketID, callback) {

        db.query_ticket_by_id(ticketID, function (err, row) {

            if (!err) {
                let ticket = new Ticket(row.ticketID, row.showID, row.userID,
                    row.paymentMethodID, row.reservedSeats, row.numberOfSeats, row.paid);
                callback(ticket)
            } else {
                console.error(err);
                callback(null);
            }
        });
    };

    this.getReservedTickets = function (showID,callback) {

        db.query_show_by_id(showID,function (err, rows) {
            if (!err) {
                let tickets = new Show(rows.ShowID, rows.StartDate, rows.EndDate,
                    rows.Time, rows.TheaterID, rows.SeatsTaken, rows.ProductionID);
                callback(tickets)
            } else {
                console.error(err);
                callback(null);
            }
        });
    }

};

/**
 * Creates a new ticket object.
 *
 * @param ShowID
 * @param StartDate
 * @param EndDate
 * @param Time
 * @param TheaterID
 * @param SeatsTaken
 * @param ProductionID
 * @constructor
 */
let Show = function (ShowID, StartDate, EndDate, Time, TheaterID, SeatsTaken, ProductionID) {
    this.ShowID = ShowID;
    this.StartDate = StartDate;
    this.EndDate = EndDate;
    this.Time = Time;
    this.TheaterID = TheaterID;
    this.SeatsTaken = SeatsTaken;
    this.ProductionID = ProductionID;
};

module.exports.Show = Show;