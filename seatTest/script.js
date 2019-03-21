function myFunction() {
    document.getElementById('demo').innerHTML = Date()
}
function myFunction2() {
    document.getElementById("box2").style.backgroundColor = "#0061ff";
    //document.getElementsByClassName("box").toString();
}

//this function will somehow check the DB to figure out which seats are available and apply that to the map
function loadDB()   {

}

//global area of clicked seats
var clickedSeats = [];

function onClick(element)  {
   // alert("You clicked " +element.title);

    //if seat is available it can be clicked and turned yellow
    //this adds seat to the array
    if(element.title == "available") {
        element.title = "selected";
        document.getElementById(element.id).style.backgroundColor = "#fff334";
        document.getElementById(element.id).style.color = "#000000";
        clickedSeats.push(element.id);
    }
    //if seat is selected it can be clicked again to unselect
    //removes seat from array
    else{
        document.getElementById(element.id).style.backgroundColor = "#444";
        document.getElementById(element.id).style.color = "#fff";
        clickedSeats.splice( clickedSeats.indexOf(element.id), 1 );
        element.title = "available";
    }
    txt = "Tickets Selected: ";
    clickedSeats.forEach(printClickedSeats)
    document.getElementById('demo').innerHTML = txt;
}

//txt var will be string of seats
var txt = "Tickets Selected: ";

function buttonClickedSeats()    {
    txt = "Tickets Selected: ";
    clickedSeats.forEach(printClickedSeats)
    document.getElementById('demo').innerHTML = txt;
}

function printClickedSeats(value, index, array)    {
    txt = txt + value + ", ";
}