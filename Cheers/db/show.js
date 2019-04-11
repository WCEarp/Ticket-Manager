/**
 * Creates a new ticket manager. This interfaces with the database to manage tickets.
 *
 * @param database An instance of the database.
 * @constructor
 */
module.exports.ShowManager = function (database) {
    let db = database;

    this.getReservedTickets = function (showID,callback) {

        db.query_show_by_id(showID,function (err, rows) {
            if (!err) {
                let show = new Show(rows.showID, rows.startDate, rows.endDate,
                    rows.time, rows.theaterID, rows.seatsTaken, rows.productionID, rows.sectionInfo);
                callback(show)
            } else {
                console.error(err);
                callback(null);
            }
        });
    };

    this.updateReservedTickets = function (showID,seatsTaken) {
        db.update_show_seats_taken(showID,seatsTaken);
    };

    this.updateSectionInfo = function (showID,sectionInfo) {
        db.update_show_setSectionInfo(showID,sectionInfo);
    };

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
 * @param SectionInfo
 * @constructor
 */
let Show = function (ShowID, StartDate, EndDate, Time, TheaterID, SeatsTaken, ProductionID, SectionInfo) {
    this.ShowID = ShowID;
    this.StartDate = StartDate;
    this.EndDate = EndDate;
    this.Time = Time;
    this.TheaterID = TheaterID;
    this.SeatsTaken = SeatsTaken;
    this.ProductionID = ProductionID;
    this.SectionInfo = SectionInfo;
};

module.exports.Show = Show;