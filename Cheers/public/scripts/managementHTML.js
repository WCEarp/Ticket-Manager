let concertSectionRows = [document.getElementById('concertHallRow'),document.getElementById('balcony1Row'),document.getElementById('balcony2Row')
    ,document.getElementById('balcony3Row'), document.getElementById('balcony4Row'),document.getElementById('balcony5Row')];

let playhouseSectionRows = [document.getElementById('floor1Row'),document.getElementById('floor2Row'),document.getElementById('floor3Row'),document.getElementById('floor4Row'),
    document.getElementById('log1Row'),document.getElementById('log2Row'),document.getElementById('log3Row'),document.getElementById('log4Row')];

window.onload = function(){
    btnPlayhouse.style.display = "none";
    playhouseSectionRows.forEach(function (node) {
        node.style.display = 'none';
    })
};

function openTool(evt, toolName, tipName) {
    var i, tabcontent, tipcontent, tablinks;
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
};

btnPlayhouse.onclick = function() {
    modalPlayhouse.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modalConHall.style.display = "none";
    modalPlayhouse.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modalConHall || event.target === modalPlayhouse) {
        modalConHall.style.display = "none";
        modalPlayhouse.style.display = "none";
    }
};


//test array variable to mimic DB
var reservedSeats = ["F_S0_B02", "F_S0_B03", "F_S0_D02", "F_S0_D03", "F_S0_D04", "F_S0_D05", "B_S3_B02", "B_S3_B03", "F_S0_G23", "F_S0_G24", "F_S0_G25", "F_S0_Z03", "F_S0_Z04", "F_Z0_D05", "B_S3_K02", "B_S3_K03"];
//test function to check seats
function checkReserved()    {
    //iterate through all elements on page
    document.querySelectorAll('*').forEach(function(node) {
        // Do whatever you want with the node object.
        for(var i=0; i < reservedSeats.length; i++) {
            if (node.id === reservedSeats[i]) {
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
    // alert("You clicked " +element.id);
    if(clickedSeats.length===0 || clickedSeats[0] === element.id) {
        //if seat is available it can be clicked and turned yellow
        //this adds seat to the array
        if (element.title === "available") {
            element.title = "selected";
            document.getElementById(element.id).style.backgroundColor = "#232323";
            document.getElementById(element.id).style.color = "#ffffff";
            clickedSeats.push(element.id);
        }
        //if seat is selected it can be clicked again to unselect
        //removes seat from array
        else {
            //recolor seat to its unselected color
            if (element.className === "disabled")
                document.getElementById(element.id).style.backgroundColor = "#28607f";
            else if (element.className == "student")
                document.getElementById(element.id).style.backgroundColor = "#97950c";
            else if (element.className == "veteran")
                document.getElementById(element.id).style.backgroundColor = "#7f0c00";
            else
                document.getElementById(element.id).style.backgroundColor = "#539752";
            document.getElementById(element.id).style.color = "#fff";
            clickedSeats.splice(clickedSeats.indexOf(element.id), 1);
            element.title = "available";
            document.getElementById('seat').value = '';
        }
    }
    else
        alert('You may only select one seat at time');
    txt = "Selected Seat: " + clickedSeats[0];
    //clickedSeats.forEach(printTXT);
    document.getElementById('selected_concert').innerHTML = txt;
    document.getElementById('selected_play').innerHTML = txt;
}

//txt var will be string of seats
var txt = "Tickets Selected: ";

//function for buy button
//this button progresses to the next page
//needs to save tickets selected by user and update DB
function buyButton()    {
    modalConHall.style.display = "none";
    modalPlayhouse.style.display = "none";
    document.getElementById('seat').value = clickedSeats[0];
}

function sthSubmitBtn() {
    let sthProd = 1;
    let regex1 = /(F_S(?!0))/g;
    let regex2 = /(^L)/g;
    if(regex1.test(document.getElementById('seat').value) || regex2.test(document.getElementById('seat').value))
        sthProd = 2;
    let data = {
        userID: document.getElementById('sthid').value,
        seasonTicketSeat: document.getElementById('seat').value,
        sthProductionID: sthProd
    };
    $.post("/manage/user_update_sth_seat", data, function (result) {
    });

    alert('Season Ticket Updated to: ' + document.getElementById('mySelect').value);
}

function mySelectChange() {
    if(document.getElementById('mySelect').value === 'concert') {
        btnPlayhouse.style.display = "none";
        btnConHall.style.display = "inline";
    }

    else {
        btnConHall.style.display = "none";
        btnPlayhouse.style.display = "inline";
    }
}

function setPriceButton() {
    let showVal = document.getElementById('selectSet').value;
    let showID = 1;
    if(showVal === 'PotO_2')
        showID = 2;
    if(showVal === 'HSO')
        showID = 3;
    if(showVal === 'TKaM')
        showID = 4;
    if(showVal === 'Choir')
        showID = 5;
    if(showVal === 'GDCB')
        showID = 6;
    let data = {
        showID: showID,
        floorPrice: document.getElementById('floorPrice').value,
        balconyPrice: document.getElementById('balconyPrice').value
    };
    $.post("/manage/show_update_setPrice", data, function (result) {
    })
}

function setClass() {
    let formElements = document.getElementById('setClassesForm').elements;
    //buttonAndPrice format: chFloor.class,chFloor.price,bal1.class,bal1.price ....
    //example: 0,50,0,30,1,30,1,30,1,30
    let buttonAndPrice = [];
    for (var i=0; i<formElements.length; i++){
        if(formElements[i].checked){
            buttonAndPrice.push(formElements[i].value);
        }
        if(formElements[i].id.match(/Price/g)){
            buttonAndPrice.push(formElements[i].value);
        }
    }

    let concertHallSectionSettings = [];
    let playhouseSectionSettings = [];

    let showVal = document.getElementById('selectSet').value;
    if(showVal === 'PotO_1' || showVal === 'PotO_2' || showVal === 'HSO'){
        concertHallSectionSettings = buttonAndPrice.splice(0,12);
        console.log(concertHallSectionSettings);
    }
    else {
        playhouseSectionSettings = buttonAndPrice.splice(12,16);
        console.log(playhouseSectionSettings);
    }

    let concertSettingsString = concertHallSectionSettings.join(',');
    let playhouseSettingsString = playhouseSectionSettings.join(',');

    let dataString = concertSettingsString;

    let showID = 1;
    if(showVal === 'PotO_2')
        showID = 2;
    if(showVal === 'HSO')
        showID = 3;
    if(showVal === 'TKaM'){
        showID = 4;
        dataString = playhouseSettingsString;
    }
    if(showVal === 'Choir') {
        showID = 5;
        dataString = playhouseSettingsString;
    }
    if(showVal === 'GDCB') {
        showID = 6;
        dataString = playhouseSettingsString;
    }

    let data = {
        showID: showID,
        sectionInfo: dataString
    };
    $.post("/manage/show_update_setSectionInfo", data, function (result) {
    });

    alert('Your changes to ' + showID + ' have been saved');
}

function selectSetChange() {
    let showVal = document.getElementById('selectSet').value;
    if(showVal === 'PotO_1' || showVal === 'PotO_2' || showVal === 'HSO'){
        concertSectionRows.forEach(function (node) {
            node.style.display = 'table-row';
        });
        playhouseSectionRows.forEach(function (node) {
            node.style.display = 'none';
        });
    }
    else{
        concertSectionRows.forEach(function (node) {
            node.style.display = 'none';
        });
        playhouseSectionRows.forEach(function (node) {
            node.style.display = 'table-row';
        });
    }
}

function printTXT(value, index, array)    {
    txt = txt + value + ", ";
}