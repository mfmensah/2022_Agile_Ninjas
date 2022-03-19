// Global array to be used among functions to store roommates. Later this array should be populated by the DB data or better implementation
let roommates = [];

// Closes modal when clicked outside the box
window.onclick = function (event) {
    if (event.target.className === "modal") {
        event.target.style.display = "none";
    }
};


function sendInvitationEmail(email, name) {
    Email.send({
        Host: "nitroco.us",
        Port: 25,
        Username: "chorescheduler",
        Password: "agileninjas",
        To: email,
        From: "chorescheduler@nitroco.us",
        Subject: "Invitation to use Chore Scheduler",
        Body: "<html><h4> Hello, <strong>" + name + "</strong ></h4 ><p>You were invited to join Chore Scheduler. Please click the link below to proceed.</p><a href=\"https://mfmensah.github.io/2022_Agile_Ninjas/index.html\">View your chores</a><br></br><em>The Agile Ninjas</em><br><br><p>Please ignore this email if you don't recognize it. Thank you.</p></html>"
    })
        .then(function (message) {
            if (message === 'OK') {
                alert("An email invitation has been sent to " + name);
            }
        });

}

// Gets the current selected roommate name or index value and return either the name or the index in the select tag box
function getSelectedRoommateFromList(parameter) {
    let selectedOptionBox = document.getElementById('roommatesList');

    switch (parameter) {
        case "name":
            return selectedOptionBox.options[selectedOptionBox.selectedIndex].value;

        default:
            return selectedOptionBox.selectedIndex;
    }
}

// Adds or delete new chore line when user add content or clean line but it's not the last one
function addOrDeleteNewChoreLine(e) {
    let parentOfInputChanged = e.target.parentElement;
    let getCellChanged = parentOfInputChanged.parentElement; 

    // Maybe reconsider this code in the future and allow white spaces but not empty chore just like asana.
    if (e.target.value.trim() !== "" && parentOfInputChanged.nextSibling === null) {

        let innerTdEditableDiv = document.createElement('div');

        let innerTdEditableInput = document.createElement('input');
        innerTdEditableInput.className = "chore-input";

        innerTdEditableInput.onchange = addOrDeleteNewChoreLine;

        innerTdEditableDiv.append(innerTdEditableInput);

        let checkBox = document.createElement("INPUT");
        checkBox.onchange = handleCompleteCheck;
        checkBox.type = "checkbox";
        checkBox.checked = false;
        checkBox.className = "input-checkbox"
        innerTdEditableDiv.append(checkBox);

        getCellChanged.append(innerTdEditableDiv);

    } else if (e.target.value.trim() === "" && parentOfInputChanged.nextSibling === null ) {
        alert("White spaces are not valid chore in this house!");
        e.target.value = "";
    } else if (e.target.value.trim() === "") {
        parentOfInputChanged.remove();
    }

}

// Updates the table with number of roommates entered by the user.
function AddOrUpdateRoomateToRows(origin) {
    let table = document.querySelector('.tableBody');
    
    if (origin === "FromEditSelectedRoommate") {
        
        let roommatesNamesOnTable = document.querySelectorAll('.roommateName');

        roommates.forEach(roommate => {
            roommatesNamesOnTable[roommates.indexOf(roommate)].innerHTML = roommate.name;

            // Changing tr (table rows) id to new updated name and turning background color to unselected mode
            roommatesNamesOnTable[roommates.indexOf(roommate)].parentNode.id = roommate.name;
            document.getElementById(roommate.name).style.backgroundColor = "#696969";

        });
        
    } else {
        table.innerHTML = "";
        
        roommates.forEach(roommate => {
            let new_tr_tag = document.createElement('tr');
            let new_td_tag = document.createElement('td');
            new_td_tag.className = 'roommateName';
            new_tr_tag.id = roommate.name;

            new_td_tag.appendChild(document.createTextNode(roommate.name));
            new_tr_tag.appendChild(new_td_tag);

            // Adds the empty tds tags to the row
            for (let indexTD = 0; indexTD < 7; indexTD++) {
                let new_empty_td_tag = document.createElement('td');
                new_empty_td_tag.setAttribute("class", "addUpdateChore " + currentWeekOfTheMonth);
                new_empty_td_tag.setAttribute("id", dayOfWeek[indexTD]);

                // for (let index = 0; index < 5; index++) {
                    let innerTdEditableDiv = document.createElement('div');

                    // if (index === 0) {
                    //     innerTdEditableDiv.style.display = "block";
                    // } else {
                    //     innerTdEditableDiv.style.display = "none";
                    // }
                    
                    let innerTdEditableInput = document.createElement('input');
                    innerTdEditableInput.className = "chore-input";

                    innerTdEditableInput.onchange = addOrDeleteNewChoreLine;

                    innerTdEditableDiv.append(innerTdEditableInput);

                    let checkBox = document.createElement("INPUT");
                    // checkBox.onchange = handleCompleteCheck(indexTD, index);
                    checkBox.onchange = handleCompleteCheck;
                    checkBox.type = "checkbox";
                    checkBox.checked = false;
                    // checkBox.setAttribute("id", indexTD + index);
                    checkBox.className = "input-checkbox"
                    innerTdEditableDiv.append(checkBox);

                    new_empty_td_tag.append(innerTdEditableDiv);

                // }

                new_tr_tag.append(new_empty_td_tag);

            }

            // Updating the table
            table.appendChild(new_tr_tag);
        });

        // Display message to add new roommates if used deletes all roommates in array.
        if (table.innerHTML === "") {
            let tablebody_tag = document.querySelector(".tableBody");
            let new_Tr_Placeholder = document.createElement("tr");
            let new_Td_Placeholder = document.createElement("td");
            let new_H1_Placeholder = document.createElement("h1");
    
            new_Td_Placeholder.setAttribute("colspan", 8)
            new_Td_Placeholder.className = "roommateName";
            new_H1_Placeholder.innerHTML = "Add a new roommate to see the weekly chore schedule.";
    
            new_Td_Placeholder.appendChild(new_H1_Placeholder);
            new_Tr_Placeholder.appendChild(new_Td_Placeholder);
            tablebody_tag.appendChild(new_Tr_Placeholder);
        }
    }
}

// Handles checked events for complete checkbox
function handleCompleteCheck(e) {
    // var checkbox = document.getElementById(day + chore);
    // if (checkbox !== null && checkbox.checked) {
    //     alert(day + " " + chore + " complete");
    // }

    let getEventElementParent = e.target.parentNode;
    let getSiblingFromEventElement = getEventElementParent.firstChild;

    if (getSiblingFromEventElement.value.trim() === "") {
        alert("Please, insert a valid chore to mark it as completed.");
        e.target.checked = false;
    } else if (e.target.checked) {
        getEventElementParent.style.backgroundColor = "green";
        getSiblingFromEventElement.readOnly = true;
        getSiblingFromEventElement.style.backgroundColor = "transparent";
    } else {
        getEventElementParent.style.backgroundColor = "transparent";
        getSiblingFromEventElement.readOnly = false;
        getSiblingFromEventElement.style.backgroundColor = "white";
    }
}

// Updates the roommate select list on the page based on the roommates array 
function UpdateRoommatesSelectList(origin) {
    let selectListBox = document.querySelector("#roommatesList");
    
    selectListBox.innerHTML = "";
    
    roommates.forEach(roommate => {
        let addRoommateToOptionTag = new Option(roommate.name, roommate.name);
        addRoommateToOptionTag.onclick = highlightRoommate;
        selectListBox.add(addRoommateToOptionTag, undefined);
    });

    // Calls AddOrUpdateRoomateToRows seding a string with the origin of the call to track from which modal it was called.
    AddOrUpdateRoomateToRows(origin);

}

// Adds new roommate info into a object and adds it to the global array containing the list of all current rommates
function AddOrEditRoommate(name, email, phone) {
    let newRoommateInfo = {
        name: name,
        email: email,
        phone: phone
    };
    //Send roommate invitations
    sendInvitationEmail(email, name);
    roommates.push(newRoommateInfo);
    //Save roommate to database
    AddRoommateToDB(name, email, phone);
}

// Closes the popup box/frame for adding, editing or deleting roommates 
function CloseCurrentModal(id) {
    document.querySelector("#" + id).style.display = "none";
}

// Validate email through regular expression. Return true if it's valid and false if it's not.
// Code source: https://www.w3resource.com/javascript/form/email-validation.php
function ValidateEmail(mail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(mail.match(mailformat)) {
        return (true);
    } else {
        return (false);
    }
}

function AddNewRoommate() {

    // Gets values from the form and stores in local variables
    let newRoomateName = document.querySelector("#addRoommate input[name='name']").value;
    let newRoomateEmail = document.querySelector("#addRoommate input[name='email']").value;
    let newRoomatePhone = document.querySelector("#addRoommate input[name='phone']").value;

    if (newRoomateName.trim() !== "" && newRoomateEmail !== "" && ValidateEmail(newRoomateEmail)) {

        AddOrEditRoommate(newRoomateName, newRoomateEmail, newRoomatePhone);

        UpdateRoommatesSelectList();

        // Close the window add new roommate window
        CloseCurrentModal("addRoommate");
    } else {
        alert("Please, enter new roommate's with valid name and valid email to add to the list.");
    }

}

function EditSelectedRoommate() {
    let roommateToUpdateInfo = getSelectedRoommateFromList("name");
    let roommateName = document.querySelector("#editRoommate input[name='name']").value;
    let roommateEmail = document.querySelector("#editRoommate input[name='email']").value;
    let origin = "FromEditSelectedRoommate";

    if (!ValidateEmail(roommateEmail) ) {
        alert("Please, enter valid email address dd to update roommate's info.");
    } else if (roommateName.trim() === ""){
        alert("Please, enter valid roommate name to update roommate's info.");
    } else {
        roommates.forEach(roommate => {
            if (roommate.name === roommateToUpdateInfo) {
                roommate.name = roommateName;
                roommate.email = roommateEmail;
                roommate.phone = document.querySelector("#editRoommate input[name='phone']").value;
                UpdateRoommatesSelectList(origin);
            }
        });
        CloseCurrentModal("editRoommate");

    }
}

function DisplaySelectedRoommateInfo() {

    roommates.forEach(roommate => {
        if (roommate.name === getSelectedRoommateFromList("name")) {
            document.querySelector("#editRoommate input[name='name']").value = roommate.name;
            document.querySelector("#editRoommate input[name='email']").value = roommate.email;
            document.querySelector("#editRoommate input[name='phone']").value = roommate.phone;
        }
    });
}

function DeleteSelectedRoommate() {
    roommates.forEach((roommate, index) => {
        if (roommate.name === getSelectedRoommateFromList("name")) {
            delete roommates[index];
        }
    });

    UpdateRoommatesSelectList();

    CloseCurrentModal("deleteRoommate");
}

// Modal enabler to show add, edit or delete modals roommates from select tag list
let modalBtns = [...document.querySelectorAll(".button")];

modalBtns.forEach(function (btn) {
    btn.onclick = function () {
        let roommateSelected = getSelectedRoommateFromList();
        let modal = btn.getAttribute("data-modal");

        if ((modal === "deleteRoommate" || modal === "editRoommate") && roommateSelected <= "-1") {
            alert("Please, select a roommate to be edited or deleted");

        } else if (modal === "editRoommate") {
            DisplaySelectedRoommateInfo();
            document.getElementById(modal).style.display = "block";

        } else if (modal === "deleteRoommate") {
            let roommateToDelete = getSelectedRoommateFromList("name");
            document.querySelector("span#roommateMarketForDelete").innerText = roommateToDelete;

            document.getElementById(modal).style.display = "block";
        } else {
            document.getElementById(modal).style.display = "block";
        }
    };
});

let closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function (btn) {
    btn.onclick = function () {
        let modal = btn.closest(".modal");
        modal.style.display = "none";
    };
});

// Highlight roommate when the name is clicked on from the roommates list
function highlightRoommate() {

    roommates.forEach(roommate => {
        if (roommate.name === getSelectedRoommateFromList("name")) {
            document.getElementById(roommate.name).style.backgroundColor = "silver";
        } else {
            document.getElementById(roommate.name).style.backgroundColor = "#696969";
        }
    });
}

function AddRoommateToDB(name, email, phone) {
    postUserData("https://nitroco.us/cs/api/users?name=" + name + "&email=" + email + "&phone=" + phone, { answer: 200 })
        .then(data => {
            console.log(data);
        });
}

function LoadUserDate() {
    fetch('https://nitroco.us/cs/api/users')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            //Get Users
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];

                let newRoommateInfo = {
                    name: obj.Name,
                    email: obj.Email,
                    phone: obj.Phone
                };

                roommates.push(newRoommateInfo);
            }

            UpdateRoommatesSelectList();
            setReadOnlyChores();
        });
}

async function postUserData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.text;
}

//Loads user data into table
LoadUserDate();