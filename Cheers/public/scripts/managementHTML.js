let concertSectionRows = [document.getElementById('concertHallRow'),document.getElementById('balcony1Row'),document.getElementById('balcony2Row')
    ,document.getElementById('balcony3Row'), document.getElementById('balcony4Row'),document.getElementById('balcony5Row')];

let playhouseSectionRows = [document.getElementById('floor1Row'),document.getElementById('floor2Row'),document.getElementById('floor3Row'),document.getElementById('floor4Row'),
    document.getElementById('log1Row'),document.getElementById('log2Row'),document.getElementById('log3Row'),document.getElementById('log4Row')];

window.onload = function(){
    btnPlayhouse.style.display = "none";
    document.getElementById('showSectionPlayhouse').style.display = 'none';
    playhouseSectionRows.forEach(function (node) {
        node.style.display = 'none';
    });
    //open create/edit as default page
    document.getElementById('CreateTab').click();
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

function check_ID2(uID) {
	if (uID.match(/[^0-9]/gi) || uID.trim().length > 5 || uID.trim().length === 0) {
		return false;
	} else {
		return true;
	}
}

function sthSubmitBtn() {
	
	let uID = document.getElementById('sthid').value;
	if (check_ID2(uID) == false){
		alert('Invalid User ID: ' + document.getElementById('sthid').value);
	}
	else {
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
			if (result.errors) {
				alert(result.errors[0]);
			} else {
				alert('Season Ticket Updated to: ' + document.getElementById('mySelect').value);
			}
		});

	}
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

    alert('Your changes to ' + showVal + ' have been saved');
}

function selectSetChange() {
    let showVal = document.getElementById('selectSet').value;
    if(showVal === 'PotO_1' || showVal === 'PotO_2' || showVal === 'HSO'){
        document.getElementById('showSectionPlayhouse').style.display = 'none';
        document.getElementById('showSectionConcert').style.display = 'block';
        concertSectionRows.forEach(function (node) {
            node.style.display = 'table-row';
        });
        playhouseSectionRows.forEach(function (node) {
            node.style.display = 'none';
        });
    }
    else{
        document.getElementById('showSectionPlayhouse').style.display = 'block';
        document.getElementById('showSectionConcert').style.display = 'none';
        concertSectionRows.forEach(function (node) {
            node.style.display = 'none';
        });
        playhouseSectionRows.forEach(function (node) {
            node.style.display = 'table-row';
        });
    }
}

function showSectionBtn() {
    let showVal = document.getElementById('selectSet').value;
    if(showVal === 'PotO_1' || showVal === 'PotO_2' || showVal === 'HSO'){
        modalConHall.style.display = "block";

        let checkedButtons = [];
        //iterate through all elements on page
        document.querySelectorAll('*').forEach(function(node) {
            // Do whatever you want with the node object.
            if(node.checked){
                checkedButtons.push(node.value);
            }
        });

        let checkedConcertHallButtons = checkedButtons.slice(0,6);

        let classes= [];

        classes[0] = checkedConcertHallButtons[0];
        classes[1] = checkedConcertHallButtons[1];
        classes[2] = checkedConcertHallButtons[2];
        classes[3] = checkedConcertHallButtons[3];
        classes[4] = checkedConcertHallButtons[4];
        classes[5] = checkedConcertHallButtons[5];

        for(var i=0;i<classes.length;i++){
            if(classes[i] === '0')
                classes[i] = 'reserved';
            else if(classes[i] === '1')
                classes[i] = 'box';
            else if(classes[i] === '2')
                classes[i] = 'disabled';
            else if(classes[i] === '3')
                classes[i] = 'student';
            else if(classes[i] === '4')
                classes[i] = 'veteran';
        }

        let concertFloorClass = classes[0];
        let balcony1Class = classes[1];
        let balcony2Class = classes[2];
        let balcony3Class = classes[3];
        let balcony4Class = classes[4];
        let balcony5Class = classes[5];
        //update ticket prices
        //get all floor seats
        document.querySelectorAll('[id^=F]').forEach(function(node) {
            // Do whatever you want with the node object.
            node.className = concertFloorClass;
        });
        //get all balcony
        document.querySelectorAll('[id^=B_S1]').forEach(function(node) {
            // Do whatever you want with the node object.
            node.className = balcony1Class;
        });
        //get all balcony
        document.querySelectorAll('[id^=B_S2]').forEach(function(node) {
            // Do whatever you want with the node object.
            node.className = balcony2Class;
        });
        //get all balcony
        document.querySelectorAll('[id^=B_S3]').forEach(function(node) {
            // Do whatever you want with the node object.
            node.className = balcony3Class;
        });
        //get all balcony
        document.querySelectorAll('[id^=B_S4]').forEach(function(node) {
            // Do whatever you want with the node object.
            node.className = balcony4Class;
        });
        //get all balcony
        document.querySelectorAll('[id^=B_S5]').forEach(function(node) {
            // Do whatever you want with the node object.
            node.className = balcony5Class;
        });
    }
    else {
        modalPlayhouse.style.display = "block";

        let checkedButtons = [];
        //iterate through all elements on page
        document.querySelectorAll('*').forEach(function(node) {
            // Do whatever you want with the node object.
            if(node.checked){
                checkedButtons.push(node.value);
            }
        });

        let checkedPlayhouseButtons = checkedButtons.slice(6,14);

        let classes= [];

        classes[0] = checkedPlayhouseButtons[0];
        classes[1] = checkedPlayhouseButtons[1];
        classes[2] = checkedPlayhouseButtons[2];
        classes[3] = checkedPlayhouseButtons[3];
        classes[4] = checkedPlayhouseButtons[4];
        classes[5] = checkedPlayhouseButtons[5];
        classes[6] = checkedPlayhouseButtons[6];
        classes[7] = checkedPlayhouseButtons[7];

        for(var j=0;j<classes.length;j++){
            if(classes[j] === '0')
                classes[j] = 'reserved';
            else if(classes[j] === '1')
                classes[j] = 'box';
            else if(classes[j] === '2')
                classes[j] = 'disabled';
            else if(classes[j] === '3')
                classes[j] = 'student';
            else if(classes[j] === '4')
                classes[j] = 'veteran';
        }

        let floor1Class = classes[0];
        let floor2Class = classes[1];
        let floor3Class = classes[2];
        let floor4Class = classes[3];
        let loge1Class = classes[4];
        let loge2Class = classes[5];
        let loge3Class = classes[6];
        let loge4Class = classes[7];
        //update ticket prices
        //get all floor seats
        document.querySelectorAll('[id^=F_S1]').forEach(function(node) {
            // Do whatever you want with the node object.
            node.className = floor1Class;
        });
        //get all balcony
        document.querySelectorAll('[id^=F_S2]').forEach(function(node) {
            // Do whatever you want with the node object.
            node.className = floor2Class;
        });
        //get all balcony
        document.querySelectorAll('[id^=F_S3]').forEach(function(node) {
            // Do whatever you want with the node object.
            node.className = floor3Class;
        });
        //get all balcony
        document.querySelectorAll('[id^=F_S4]').forEach(function(node) {
            // Do whatever you want with the node object.
            node.className = floor4Class;
        });
        //get all balcony
        document.querySelectorAll('[id^=L_S1]').forEach(function(node) {
            // Do whatever you want with the node object.
            node.className = loge1Class;
        });
        //get all balcony
        document.querySelectorAll('[id^=L_S2]').forEach(function(node) {
            // Do whatever you want with the node object.
            node.className = loge2Class;
        });
        document.querySelectorAll('[id^=L_S3]').forEach(function(node) {
            // Do whatever you want with the node object.
            node.className = loge3Class;
        });
        //get all balcony
        document.querySelectorAll('[id^=L_S4]').forEach(function(node) {
            // Do whatever you want with the node object.
            node.className = loge4Class;
        });
    }
}