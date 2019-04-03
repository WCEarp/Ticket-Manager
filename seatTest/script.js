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

function testButton()   {
    checkReserved();
}


//this function will somehow check the DB to figure out which seats are available and apply that to the map
function loadDB()   {
    //use something like document.getElementsByTagName("*"); to iterate
}

//global array of clicked seats
var clickedSeats = [];


function onClick(element)  {
   // alert("You clicked " +element.title);

    //if seat is available it can be clicked and turned black
    //this adds seat to the array
    if(element.title == "available") {
        element.title = "selected";
        document.getElementById(element.id).style.backgroundColor = "#232323";
        document.getElementById(element.id).style.color = "#ffffff";
        clickedSeats.push(element.id);
        var currentPrice = parseFloat(element.value);
        totalPrice = totalPrice + currentPrice;
    }
    //if seat is selected it can be clicked again to unselect
    //removes seat from array
    else{
        //recolor seat to its unselected color
        if(element.className == "disabled")
            document.getElementById(element.id).style.backgroundColor = "#28607f";
        else
            document.getElementById(element.id).style.backgroundColor = "#539752";
        document.getElementById(element.id).style.color = "#fff";
        clickedSeats.splice( clickedSeats.indexOf(element.id), 1 );
        element.title = "available";
        var currentPrice = parseFloat(element.value);
        totalPrice = totalPrice - currentPrice;
    }
    txt = "Tickets Selected: ";
    totalPriceText = "Total Price: $";
    totalPriceText = totalPriceText + totalPrice;
    clickedSeats.forEach(printTXT)
    document.getElementById('selected').innerHTML = txt;
    document.getElementById('price').innerHTML = totalPriceText;
}

//txt var will be string of seats
var txt = "Tickets Selected: ";
var totalPrice = 0;
var totalPriceText = "Total Price: ";

//function for buy button
//this button progresses to the next page
//needs to save tickets selected by user and update DB
function buyButton()    {
    alert("You want to buy these tickets: " +clickedSeats)
}

function setTicketPrice() {
    var input = document.getElementById("setTicketPrice");
//get all floor seats
    document.querySelectorAll('[id^=F]').forEach(function(node) {
        // Do whatever you want with the node object.
        node.value = input.elements[0].value;
    });
//get all balcony
    document.querySelectorAll('[id^=B]').forEach(function(node) {
        // Do whatever you want with the node object.
        node.value = input.elements[1].value;
    });
//get all loge
    document.querySelectorAll('[id^=L]').forEach(function(node) {
        // Do whatever you want with the node object.
        node.value = input.elements[1].value;
    });

}

function printTXT(value, index, array)    {
    txt = txt + value + ", ";
}