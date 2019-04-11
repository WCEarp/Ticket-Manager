window.onload = function(){
    openTool(event, 'SelectShow', 'pickTip');
    document.getElementById('SelectShowTab').className += ' active';

    document.getElementById('ccnLabel').style.display = 'none';
    document.getElementById('ccn').style.display = 'none';

    document.getElementById('cashLabel').style.display = 'none';

    document.getElementById('exchangeLabel').style.display = 'none';
    document.getElementById('exchange').style.display = 'none';
}

function openTool(evt, toolName, tipName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tipcontent = document.getElementsByClassName("tipcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    for (i = 0; i < tipcontent.length; i++) {
        tipcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(toolName).style.display = "block";
    document.getElementById(tipName).style.display = "block";
    evt.currentTarget.className += " active";
}

let showTickets;
function openSeat(evt, toolName, tipName, show) {

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tipcontent = document.getElementsByClassName("tipcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    for (i = 0; i < tipcontent.length; i++) {
        tipcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(toolName).style.display = "block";
    document.getElementById(tipName).style.display = "block";
    document.getElementById('SelectSeatsTab').className += " active";


    // Get the modal
    var modalConHall = document.getElementById('modalConHall');
    var modalPlayhouse = document.getElementById('modalPlayhouse');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // Hard code which seat map to open

    //DB INFO
    //PotO_1 = show 1
    //PotO_2 = show 2
    //HSO = show 3
    if(show.id === 'PotO_1' || show.id === 'PotO_2' || show.id === 'HSO') {
        modalConHall.style.display = "block";
    }

    //TKaM = show 4
    //Choir = show 5
    //GDCB = show 6
    if(show.id === 'TKaM' || show.id === "Choir" || show.id === 'GDCB') {
        modalPlayhouse.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modalConHall.style.display = "none";
        modalPlayhouse.style.display = "none";
        alert('If You Selected No Tickets, Go Back to Select Show and Try Again');
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modalConHall || event.target === modalPlayhouse) {
            modalConHall.style.display = "none";
            modalPlayhouse.style.display = "none";
            alert('If You Selected No Tickets, Go Back to Select Show and Try Again');
        }
    };

    txt = "Selected Seats: ";
    totalPrice = 0;
    totalPriceText = "Total Price: ";
    clickedSeats = [];


    let stProd1 = '';
    let stProd2 = '';
    //get sth reserved seats
    $.getJSON("/manage/users", function (result) {
        console.log(result);
        let users = result.users;
        $.each(users, function (index, value) {
            console.log(value);
            if(value.sthProductionID === 1) {
                stProd1 = stProd1 + value.seasonTicketSeat;
            }
            if(value.sthProductionID === 2) {
                stProd2 = stProd2 + value.seasonTicketSeat;
            }});
    });
    //get reserved seats from DB
    if(show.id === 'PotO_1'){
        $.getJSON("/tickets/ShowTickets?id=1", function (result) {
            showTickets = result.show;
            showTickets.showID = 1;
            let floorprice = showTickets.FloorPrice;
            let balconyprice = showTickets.BalconyPrice;
            let reservedSeats = showTickets.SeatsTaken + stProd1;
            let seatsArray = reservedSeats.match(/.{1,8}/g);
            console.log(seatsArray);
            //iterate through all elements on page
            document.querySelectorAll('*').forEach(function(node) {
                // Do whatever you want with the node object.
                for(var i=0; i < seatsArray.length; i++) {
                    if (node.id === seatsArray[i]){
                        node.className = "reserved";
                        node.title = "reserved";
                        node.onclick = "";
                    }
                }
            });
            //update ticket prices
            //get all floor seats
            document.querySelectorAll('[id^=F]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = floorprice;
            });
            //get all balcony
            document.querySelectorAll('[id^=B]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = balconyprice;
            });
            //get all loge
            document.querySelectorAll('[id^=L]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = balconyprice;
            });
            document.getElementById('seatPriceText').innerHTML = 'Floor Price: $' + floorprice + ' Balcony Price: $' + balconyprice;

            display_errors(result.errors);
        });
    }
    //get reserved seats from DB
    if(show.id === 'PotO_2'){
        $.getJSON("/tickets/ShowTickets?id=2", function (result) {
            showTickets = result.show;
            showTickets.showID = 2;
            let floorprice = showTickets.FloorPrice;
            let balconyprice = showTickets.BalconyPrice;
            let reservedSeats = showTickets.SeatsTaken + stProd1;
            let seatsArray = reservedSeats.match(/.{1,8}/g);
            console.log(seatsArray);
            //iterate through all elements on page
            document.querySelectorAll('*').forEach(function(node) {
                // Do whatever you want with the node object.
                for(var i=0; i < seatsArray.length; i++) {
                    if (node.id === seatsArray[i]){
                        node.className = "reserved";
                        node.title = "reserved";
                        node.onclick = "";
                    }
                }
            });
            //update ticket prices
            //get all floor seats
            document.querySelectorAll('[id^=F]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = floorprice;
            });
            //get all balcony
            document.querySelectorAll('[id^=B]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = balconyprice;
            });
            //get all loge
            document.querySelectorAll('[id^=L]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = balconyprice;
            });
            document.getElementById('seatPriceText').innerHTML = 'Floor Price: $' + floorprice + ' Balcony Price: $' + balconyprice;
            display_errors(result.errors);
        });
    }
    //get reserved seats from DB
    if(show.id === 'HSO'){
        $.getJSON("/tickets/ShowTickets?id=3", function (result) {
            showTickets = result.show;
            showTickets.showID = 3;
            let floorprice = showTickets.FloorPrice;
            let balconyprice = showTickets.BalconyPrice;
            let reservedSeats = showTickets.SeatsTaken + stProd1;
            let seatsArray = reservedSeats.match(/.{1,8}/g);
            console.log(seatsArray);
            //iterate through all elements on page
            document.querySelectorAll('*').forEach(function(node) {
                // Do whatever you want with the node object.
                for(var i=0; i < seatsArray.length; i++) {
                    if (node.id === seatsArray[i]){
                        node.className = "reserved";
                        node.title = "reserved";
                        node.onclick = "";
                    }
                }
            });
            //update ticket prices
            //get all floor seats
            document.querySelectorAll('[id^=F]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = floorprice;
            });
            //get all balcony
            document.querySelectorAll('[id^=B]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = balconyprice;
            });
            //get all loge
            document.querySelectorAll('[id^=L]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = balconyprice;
            });
            document.getElementById('seatPriceText').innerHTML = 'Floor Price: $' + floorprice + ' Balcony Price: $' + balconyprice;
            display_errors(result.errors);
        });
    }
    //get reserved seats from DB
    if(show.id === 'TKaM'){
        $.getJSON("/tickets/ShowTickets?id=4", function (result) {
            showTickets = result.show;
            showTickets.showID = 4;
            let floorprice = showTickets.FloorPrice;
            let balconyprice = showTickets.BalconyPrice;
            let reservedSeats = showTickets.SeatsTaken + stProd2;
            let seatsArray = reservedSeats.match(/.{1,8}/g);
            console.log(seatsArray);
            //iterate through all elements on page
            document.querySelectorAll('*').forEach(function(node) {
                // Do whatever you want with the node object.
                for(var i=0; i < seatsArray.length; i++) {
                    if (node.id === seatsArray[i]){
                        node.className = "reserved";
                        node.title = "reserved";
                        node.onclick = "";
                    }
                }
            });
            //update ticket prices
            //get all floor seats
            document.querySelectorAll('[id^=F]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = floorprice;
            });
            //get all balcony
            document.querySelectorAll('[id^=B]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = balconyprice;
            });
            //get all loge
            document.querySelectorAll('[id^=L]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = balconyprice;
            });
            document.getElementById('seatPriceText2').innerHTML = 'Floor Price: $' + floorprice + ' Balcony Price: $' + balconyprice;
            display_errors(result.errors);
        });
    }
    //get reserved seats from DB
    if(show.id === 'Choir'){
        $.getJSON("/tickets/ShowTickets?id=5", function (result) {
            showTickets = result.show;
            showTickets.showID = 5;
            let floorprice = showTickets.FloorPrice;
            let balconyprice = showTickets.BalconyPrice;
            let reservedSeats = showTickets.SeatsTaken + stProd2;
            let seatsArray = reservedSeats.match(/.{1,8}/g);
            console.log(seatsArray);
            //iterate through all elements on page
            document.querySelectorAll('*').forEach(function(node) {
                // Do whatever you want with the node object.
                for(var i=0; i < seatsArray.length; i++) {
                    if (node.id === seatsArray[i]){
                        node.className = "reserved";
                        node.title = "reserved";
                        node.onclick = "";
                    }
                }
            });
            //update ticket prices
            //get all floor seats
            document.querySelectorAll('[id^=F]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = floorprice;
            });
            //get all balcony
            document.querySelectorAll('[id^=B]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = balconyprice;
            });
            //get all loge
            document.querySelectorAll('[id^=L]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = balconyprice;
            });
            document.getElementById('seatPriceText2').innerHTML = 'Floor Price: $' + floorprice + ' Balcony Price: $' + balconyprice;
            display_errors(result.errors);
        });
    }
    //get reserved seats from DB
    if(show.id === 'GDCB'){
        $.getJSON("/tickets/ShowTickets?id=6", function (result) {
            showTickets = result.show;
            showTickets.showID = 6;
            let floorprice = showTickets.FloorPrice;
            let balconyprice = showTickets.BalconyPrice;
            let reservedSeats = showTickets.SeatsTaken + stProd2;
            let seatsArray = reservedSeats.match(/.{1,8}/g);
            console.log(seatsArray);
            //iterate through all elements on page
            document.querySelectorAll('*').forEach(function(node) {
                // Do whatever you want with the node object.
                for(var i=0; i < seatsArray.length; i++) {
                    if (node.id === seatsArray[i]){
                        node.className = "reserved";
                        node.title = "reserved";
                        node.onclick = "";
                    }
                }
            });
            //update ticket prices
            //get all floor seats
            console.log('**'+floorprice);
            document.querySelectorAll('[id^=F]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = floorprice;
            });
            //get all balcony
            document.querySelectorAll('[id^=B]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = balconyprice;
            });
            //get all loge
            document.querySelectorAll('[id^=L]').forEach(function(node) {
                // Do whatever you want with the node object.
                node.value = balconyprice;
            });
            document.getElementById('seatPriceText2').innerHTML = 'Floor Price: $' + floorprice + ' Balcony Price: $' + balconyprice;
            display_errors(result.errors);
        });
    }

}

// Get the modal
var modalConHall = document.getElementById('modalConHall');
var modalPlayhouse = document.getElementById('modalPlayhouse');

// Get the button that opens the modal
var btnConHall = document.getElementById("btnConHall");
var btnPlayhouse = document.getElementById("btnPlayhouse");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btnConHall.onclick = function() {
    modalConHall.style.display = "block";
}

btnPlayhouse.onclick = function() {
    modalPlayhouse.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modalConHall.style.display = "none";
    modalPlayhouse.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalConHall || event.target == modalPlayhouse) {
        modalConHall.style.display = "none";
        modalPlayhouse.style.display = "none";
    }
}

//test array variable to mimic DB
var reservedSeats = ["F_S0_B02", "F_S0_B03", "F_S0_D02", "F_S0_D03", "F_S0_D04", "F_S0_D05", "B_S3_B02", "B_S3_B03", "F_S0_G23", "F_S0_G24", "F_S0_G25", "F_S0_Z03", "F_S0_Z04", "F_Z0_D05", "B_S3_K02", "B_S3_K03"];
//test function to check seats
function checkReserved()    {
    //iterate through all elements on page
    document.querySelectorAll('*').forEach(function(node) {
        // Do whatever you want with the node object.
        for(var i=0; i < reservedSeats.length; i++) {
            if (node.id == reservedSeats[i]){
                node.className = "reserved";
                node.title = "reserved";
                node.onclick = "";
            }
        }
    });
}

//txt var will be string of seats
var txt;
var totalPrice;
var totalPriceText;

//global array of clicked seats
var clickedSeats;

//on seat click
function onClick(element) {
    // alert("You clicked " +element.title);

    var currentPrice;

    //if seat is available it can be clicked and turned black
    //this adds seat to the array
    if (element.title == "available") {
        element.title = "selected";
        document.getElementById(element.id).style.backgroundColor = "#232323";
        document.getElementById(element.id).style.color = "#ffffff";
        clickedSeats.push(element.id);
        currentPrice = parseFloat(element.value);
        totalPrice = totalPrice + currentPrice;
    }
    //if seat is selected it can be clicked again to unselect
    //removes seat from array
    else {
        element.title = "available";
        //recolor seat to its unselected color
        if (element.className == "disabled")
            document.getElementById(element.id).style.backgroundColor = "#28607f";
        else
            document.getElementById(element.id).style.backgroundColor = "#539752";
        document.getElementById(element.id).style.color = "#fff";
        clickedSeats.splice(clickedSeats.indexOf(element.id), 1);
        currentPrice = parseFloat(element.value);
        totalPrice = totalPrice - currentPrice;
    }
    txt = "Selected Seats: ";
    totalPriceText = "Total Price: $";
    totalPriceText = totalPriceText + totalPrice;
    clickedSeats.forEach(printTXT);
    document.getElementById('selectedSeats').innerHTML = txt;
    document.getElementById('EnterInfo_seats').innerHTML = txt;
    document.getElementById('selected_concert').innerHTML = txt;
    document.getElementById('price_concert').innerHTML = totalPriceText;
    document.getElementById('EnterInfo_price').innerHTML = totalPriceText;
    document.getElementById('selected_play').innerHTML = txt;
    document.getElementById('price_play').innerHTML = totalPriceText;

}

//function for buy button
//this button progresses to the next page
//needs to save tickets selected by user and update DB
function buyButton(event, toolName, tipName) {

    modalConHall.style.display = "none";
    modalPlayhouse.style.display = "none";

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tipcontent = document.getElementsByClassName("tipcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    for (i = 0; i < tipcontent.length; i++) {
        tipcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(toolName).style.display = "block";
    document.getElementById(tipName).style.display = "block";
    document.getElementById('EnterInfoTab').className += " active";

}

function EnterInfoButton(event, toolName, tipName) {
    var input = document.getElementById("EnterInfo_form");

    fname =   input.elements[0].value;
    lname =   input.elements[1].value;
    address = input.elements[2].value;
    phone =   input.elements[3].value;
    email =   input.elements[4].value;
    paymentMethod =     input.elements[5].value;
    exchanged = input.elements[6].value;
    if (paymentMethod === 'creditCard'){
        ccn =     input.elements[6].value;
        document.getElementById('confirmCCN').innerHTML = 'Credit Card: ' + ccn;
    }
    else if (paymentMethod === 'door'){
        ccn = 0;
        document.getElementById('confirmCCN').innerHTML = 'Pay at Door: Not Paid Yet';
    }
    else{
        ccn = 1;
        let originalPrice;
        let originalSeats;
        let stringClickedSeats = clickedSeats.join('');
        let owedPrice;
        document.getElementById('confirmCCN').innerHTML = 'Exchanged Tickets, New Seats: ' + clickedSeats;
        $.getJSON("/manage/ticket?id=" + exchanged, function (result) {
            let ticket = result.ticket;
            originalPrice = ticket.totalPrice;
            originalSeats = ticket.reservedSeats;

            owedPrice = totalPrice - originalPrice;
            alert('Your new owed total is: ' + owedPrice + ' ' +
                'Please pay at the door');

            let data = {ticketID: exchanged, showID: showTickets.showID, seats: stringClickedSeats, numSeats: clickedSeats.length};
            console.log('data', data);
            $.post("/manage/ticketseat_update", data, function (result) {
            });

            let data2 = {showID: showTickets.showID, seatsTaken:  showTickets.SeatsTaken + stringClickedSeats};
            $.post("/tickets/show_update", data2, function (result) {
            });
            //update show reserved seats
            //make old tickets re-available
            //get reserved seats from DB
            let currentTickets;
            if(ticket.showID === 1){
                $.getJSON("/tickets/ShowTickets?id=1", function (result) {
                    currentTickets = result.show;
                    let reservedSeats = currentTickets.SeatsTaken;
                    let seatsArray = reservedSeats.match(/.{1,8}/g);
                    let originalSeatsArray = originalSeats.match(/.{1,8}/g);
                    for(var j=0; j<seatsArray.length; j++) {
                        for (var i = 0; i < originalSeatsArray.length; i++) {
                            //alert('seat: '+seat);
                            //alert('seatsArray: ' + seatsArray[j] + ' originalSeat: ' + originalSeatsArray[i]);
                            if (seatsArray[j] === originalSeatsArray[i]) {
                                let selectSeat = document.getElementById(seatsArray[j]);
                                selectSeat.className = "available";
                                selectSeat.title = "available";
                                selectSeat.onclick = "onClick(this)";
                                seatsArray.splice(seatsArray.indexOf(seatsArray[j]), 1);
                                j--;
                            }
                        }
                    }


                    let stringSeatsArray = seatsArray.join('');
                    let data = {showID: 1, seatsTaken: stringSeatsArray};
                    $.post("/tickets/show_update", data, function(result){
                    });


                    display_errors(result.errors);
                });
            }
            if(ticket.showID === 2){
                $.getJSON("/tickets/ShowTickets?id=3", function (result) {
                    currentTickets = result.show;
                    let reservedSeats = currentTickets.SeatsTaken;
                    let seatsArray = reservedSeats.match(/.{1,8}/g);
                    let originalSeatsArray = originalSeats.match(/.{1,8}/g);
                    for(var j=0; j<seatsArray.length; j++) {
                        for (var i = 0; i < originalSeatsArray.length; i++) {
                            //alert('seat: '+seat);
                            //alert('seatsArray: ' + seatsArray[j] + ' originalSeat: ' + originalSeatsArray[i]);
                            if (seatsArray[j] === originalSeatsArray[i]) {
                                let selectSeat = document.getElementById(seatsArray[j]);
                                selectSeat.className = "available";
                                selectSeat.title = "available";
                                selectSeat.onclick = "onClick(this)";
                                seatsArray.splice(seatsArray.indexOf(seatsArray[j]), 1);
                                j--;
                            }
                        }
                    }


                    let stringSeatsArray = seatsArray.join('');
                    let data = {showID: 2, seatsTaken: stringSeatsArray};
                    $.post("/tickets/show_update", data, function(result){
                    });


                    display_errors(result.errors);
                });
            }
            if(ticket.showID === 3){
                $.getJSON("/tickets/ShowTickets?id=3", function (result) {
                    currentTickets = result.show;
                    let reservedSeats = currentTickets.SeatsTaken;
                    let seatsArray = reservedSeats.match(/.{1,8}/g);
                    let originalSeatsArray = originalSeats.match(/.{1,8}/g);
                    for(var j=0; j<seatsArray.length; j++) {
                        for (var i = 0; i < originalSeatsArray.length; i++) {
                            //alert('seat: '+seat);
                            //alert('seatsArray: ' + seatsArray[j] + ' originalSeat: ' + originalSeatsArray[i]);
                            if (seatsArray[j] === originalSeatsArray[i]) {
                                let selectSeat = document.getElementById(seatsArray[j]);
                                selectSeat.className = "available";
                                selectSeat.title = "available";
                                selectSeat.onclick = "onClick(this)";
                                seatsArray.splice(seatsArray.indexOf(seatsArray[j]), 1);
                                j--;
                            }
                        }
                    }


                    let stringSeatsArray = seatsArray.join('');
                    let data = {showID: 3, seatsTaken: stringSeatsArray};
                    $.post("/tickets/show_update", data, function(result){
                    });


                    display_errors(result.errors);
                });
            }
            if(ticket.showID === 4){
                $.getJSON("/tickets/ShowTickets?id=4", function (result) {
                    currentTickets = result.show;
                    let reservedSeats = currentTickets.SeatsTaken;
                    let seatsArray = reservedSeats.match(/.{1,8}/g);
                    let originalSeatsArray = originalSeats.match(/.{1,8}/g);
                    for(var j=0; j<seatsArray.length; j++) {
                        for (var i = 0; i < originalSeatsArray.length; i++) {
                            //alert('seat: '+seat);
                            //alert('seatsArray: ' + seatsArray[j] + ' originalSeat: ' + originalSeatsArray[i]);
                            if (seatsArray[j] === originalSeatsArray[i]) {
                                let selectSeat = document.getElementById(seatsArray[j]);
                                selectSeat.className = "available";
                                selectSeat.title = "available";
                                selectSeat.onclick = "onClick(this)";
                                seatsArray.splice(seatsArray.indexOf(seatsArray[j]), 1);
                                j--;
                            }
                        }
                    }


                    let stringSeatsArray = seatsArray.join('');
                    let data = {showID: 4, seatsTaken: stringSeatsArray};
                    $.post("/tickets/show_update", data, function(result){
                    });


                    display_errors(result.errors);
                });
            }
            if(ticket.showID === 5){
                $.getJSON("/tickets/ShowTickets?id=5", function (result) {
                    currentTickets = result.show;
                    let reservedSeats = currentTickets.SeatsTaken;
                    let seatsArray = reservedSeats.match(/.{1,8}/g);
                    let originalSeatsArray = originalSeats.match(/.{1,8}/g);
                    for(var j=0; j<seatsArray.length; j++) {
                        for (var i = 0; i < originalSeatsArray.length; i++) {
                            //alert('seat: '+seat);
                            //alert('seatsArray: ' + seatsArray[j] + ' originalSeat: ' + originalSeatsArray[i]);
                            if (seatsArray[j] === originalSeatsArray[i]) {
                                let selectSeat = document.getElementById(seatsArray[j]);
                                selectSeat.className = "available";
                                selectSeat.title = "available";
                                selectSeat.onclick = "onClick(this)";
                                seatsArray.splice(seatsArray.indexOf(seatsArray[j]), 1);
                                j--;
                            }
                        }
                    }


                    let stringSeatsArray = seatsArray.join('');
                    let data = {showID: 5, seatsTaken: stringSeatsArray};
                    $.post("/tickets/show_update", data, function(result){
                    });


                    display_errors(result.errors);
                });
            }
            if(ticket.showID === 6) {
                $.getJSON("/tickets/ShowTickets?id=6", function (result) {
                    currentTickets = result.show;
                    let reservedSeats = currentTickets.SeatsTaken;
                    let seatsArray = reservedSeats.match(/.{1,8}/g);
                    let originalSeatsArray = originalSeats.match(/.{1,8}/g);
                    for (var j = 0; j < seatsArray.length; j++) {
                        for (var i = 0; i < originalSeatsArray.length; i++) {
                            //alert('seat: '+seat);
                            //alert('seatsArray: ' + seatsArray[j] + ' originalSeat: ' + originalSeatsArray[i]);
                            if (seatsArray[j] === originalSeatsArray[i]) {
                                let selectSeat = document.getElementById(seatsArray[j]);
                                selectSeat.className = "available";
                                selectSeat.title = "available";
                                selectSeat.onclick = "onClick(this)";
                                seatsArray.splice(seatsArray.indexOf(seatsArray[j]), 1);
                                j--;
                            }
                        }
                    }


                    let stringSeatsArray = seatsArray.join('');
                    let data = {showID: 6, seatsTaken: stringSeatsArray};
                    $.post("/tickets/show_update", data, function (result) {
                    });


                    display_errors(result.errors);
                });
            }
        });



        alert('Congrats '+fname+', You Exchanged Tickets, New Seats: ' + clickedSeats);
        window.location.replace('/home');
    }
    document.getElementById('ticketsToBuy').innerHTML = 'Selected Tickets: ' + clickedSeats;
    document.getElementById('firstname').innerHTML = 'First Name: ' + fname;
    document.getElementById('lastname').innerHTML = 'Last Name: ' + lname;
    document.getElementById('confirmAddress').innerHTML = 'Address: ' + address;
    document.getElementById('confirmPhone').innerHTML = 'Phone: ' + phone;
    document.getElementById('confirmEmail').innerHTML = 'Email: ' + email;

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tipcontent = document.getElementsByClassName("tipcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    for (i = 0; i < tipcontent.length; i++) {
        tipcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(toolName).style.display = "block";
    document.getElementById(tipName).style.display = "block";
    document.getElementById('ConfirmTab').className += " active";
}

function confirmBtn() {
    //PUT TICKET INFO IN DB
    let stringClickedSeats = clickedSeats.join('');
    let updatedSeatsTaken = showTickets.SeatsTaken + stringClickedSeats;
    let data = {showID: showTickets.showID, seatsTaken: updatedSeatsTaken};
    $.post("/tickets/show_update", data, function(result){
    });
    //add individual ticket to DB
    let paidTicket = 0;
    let paymentMethodIDval = 2;
    if(paymentMethod === 'creditCard') {
        paidTicket = 1;
        paymentMethodIDval = 1;
    }
    else if(paymentMethod === 'exchangeTickets') {
        paidTicket = 1;
        paymentMethodIDval = 3;
    }
    let ticketData = {showID: showTickets.showID, userID: 0, paymentMethodID: paymentMethodIDval, reservedSeats: stringClickedSeats, numberOfSeats: clickedSeats.length, paid: paidTicket, totalPrice: totalPrice};
    $.post("/tickets/add_ticket", ticketData, function(result){
    });


    alert('Congrats ' + fname + ', you bought: ' + clickedSeats);
    window.location.replace('/home');

}

function mySelectChange(){
    if(document.getElementById('mySelect').value === 'creditCard') {

        document.getElementById('paymentLabel').innerText = 'Credit Card Number: ';
        document.getElementById('payment').style.display = 'block';
        document.getElementById('payment').placeholder = '111222333444';
    }

    else if(document.getElementById('mySelect').value === 'door'){

        document.getElementById('paymentLabel').innerText = 'Pay At The Door';
        document.getElementById('payment').style.display = 'none';
    }
    else{

        document.getElementById('paymentLabel').innerText = 'Exchange Tickets';
        document.getElementById('payment').style.display = 'block';
        document.getElementById('payment').placeholder = 'Enter your original Ticket ID';
    }
}

function printTXT(value, index, array) {
    txt = txt + value + ", ";
}