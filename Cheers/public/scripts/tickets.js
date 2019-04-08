window.onload = function(){
    openTool(event, 'SelectShow', 'pickTip');
    document.getElementById('SelectShowTab').className += ' active';
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
    if(show.id == 'PotO_1' || show.id == 'PotO_2' || show.id == 'HSO') {
        modalConHall.style.display = "block";
    }

    //TKaM = show 4
    //Choir = show 5
    //GDCB = show 6
    if(show.id == 'TKaM' || show.id == "Choir" || show.id == 'GDCB') {
        modalPlayhouse.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modalConHall.style.display = "none";
        modalPlayhouse.style.display = "none";
        alert('If You Selected No Tickets, Go Back to Select Show and Try Again');
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modalConHall || event.target == modalPlayhouse) {
            modalConHall.style.display = "none";
            modalPlayhouse.style.display = "none";
            alert('If You Selected No Tickets, Go Back to Select Show and Try Again');
        }
    }

    txt = "Selected Seats: ";
    totalPrice = 0;
    totalPriceText = "Total Price: ";
    clickedSeats = [];


    //get reserved seats from DB
    if(show.id == 'PotO_1'){
        console.log('reached');
        $.getJSON("/tickets/ShowTickets", 1, function (result) {
            console.log(result);
            let tickets = result.tickets;
            console.log(tickets);
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


//this function will somehow check the DB to figure out which seats are available and apply that to the map
function loadDB()   {
    //use something like document.getElementsByTagName("*"); to iterate
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
    ccn =     input.elements[5].value;

    document.getElementById('ticketsToBuy').innerHTML = 'Selected Tickets: ' + clickedSeats;
    document.getElementById('firstname').innerHTML = 'First Name: ' + fname;
    document.getElementById('lastname').innerHTML = 'Last Name: ' + lname;
    document.getElementById('confirmAddress').innerHTML = 'Address: ' + address;
    document.getElementById('confirmPhone').innerHTML = 'Phone: ' + phone;
    document.getElementById('confirmEmail').innerHTML = 'Email: ' + email;
    document.getElementById('confirmCCN').innerHTML = 'Credit Card: ' + ccn;

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

    alert('Congrats ' + fname + ', you bought ' + clickedSeats);
    window.location.replace('/home');

}

function printTXT(value, index, array) {
    txt = txt + value + ", ";
}