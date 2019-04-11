module.exports.exportCSV = function (res, userManager, options,) {
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