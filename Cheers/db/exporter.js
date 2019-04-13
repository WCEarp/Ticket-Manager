module.exports.exportUserCSV = function (res, userManager, options,) {
    userManager.getUsers(function (users) {
        let csv = "";
        let exportFirstName = options.fname;
        let exportLastName = options.lname;
        let exportAddress = options.address;
        let exportPhoneNumber = options.pnum;
        let exportEmail = options.email;
        let exportCCN = options.ccn;
        let exportSeasonTicketSeat = options.sthSeat;
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            let firstName = user.firstName;
            if (exportFirstName && firstName && firstName !== "") {
                csv += firstName
            }
            csv += ", ";

            let lastName = user.lastName;
            if (exportLastName && lastName && lastName !== "") {
                csv += lastName
            }
            csv += ", ";

            let street = user.street;
            if (exportAddress && street && street !== "") {
                csv += street
            }
            csv += ", ";

            let city = user.city;
            if (exportAddress && city && city !== "") {
                csv += city
            }
            csv += ", ";

            let state = user.state;
            if (exportAddress && state && state !== "") {
                csv += state
            }
            csv += ", ";

            let zipCode = user.zipCode;
            if (exportAddress && zipCode && zipCode !== "") {
                csv += zipCode
            }
            csv += ", ";

            let phoneNumber = user.phoneNumber;
            if (exportPhoneNumber && phoneNumber && phoneNumber !== "") {
                csv += phoneNumber
            }
            csv += ", ";

            let email = user.email;
            if (exportEmail && email && email !== "") {
                csv += email
            }
            csv += ", ";

            let ccn = user.ccn;
            if (exportCCN && ccn && ccn !== "") {
                csv += ccn
            }
            csv += ", ";

            let seasonTicketSeat = user.seasonTicketSeat;
            if (exportSeasonTicketSeat && seasonTicketSeat && seasonTicketSeat !== "") {
                csv += seasonTicketSeat
            }
            csv += ", ";

            let sthProductionID = user.sthProductionID;
            if (exportSeasonTicketSeat && sthProductionID && sthProductionID !== "") {
                csv += sthProductionID
            }
            csv += "\n";
        }

        res.attachment('users.csv');
        res.send(csv);
    });
};

module.exports.exportTicketCSV = function (res, ticketManager, options,) {
    ticketManager.getTickets(function (tickets) {
        let csv = "";
        let exportID = options.id;
        let exportShowID = options.showID;
        let exportUserID = options.userID;
        let exportPaymentMethod = options.paymentMethod;
        let exportSeats = options.seats;
        let exportNumSeats = options.numSeats;
        let exportPaid = options.paid;
        let exportPrice = options.price;
        for (let i = 0; i < tickets.length; i++) {
            let ticket = tickets[i];
            let ticketID = ticket.ticketID;
            if (exportID && ticketID && ticketID !== "") {
                csv += ticketID
            }
            csv += ", ";

            let showID = ticket.showID;
            if (exportShowID && showID && showID !== "") {
                csv += showID
            }
            csv += ", ";

            let userID = ticket.userID;
            if (exportUserID && userID && userID !== "") {
                csv += userID
            }
            csv += ", ";

            let paymentMethodID = ticket.paymentMethodID;
            if (exportPaymentMethod && paymentMethodID && paymentMethodID !== "") {
                csv += paymentMethodID
            }
            csv += ", ";

            let reservedSeats = ticket.reservedSeats;
            if (exportSeats && reservedSeats && reservedSeats !== "") {
                csv += reservedSeats
            }
            csv += ", ";

            let numberOfSeats = ticket.numberOfSeats;
            if (exportNumSeats && numberOfSeats && numberOfSeats !== "") {
                csv += numberOfSeats
            }
            csv += ", ";

            let paid = ticket.paid;
            if (exportPaid && paid && paid !== "") {
                csv += paid
            }
            csv += ", ";

            let totalPrice = ticket.totalPrice;
            if (exportPrice && totalPrice && totalPrice !== "") {
                csv += totalPrice
            }
            csv += "\n";
        }

        res.attachment('tickets.csv');
        res.send(csv);
    });
};