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

// Gets the current selected roommate name and return either the name or the index in the select tag box
function getSelectedRoommateFromList(parameter) {

    switch (parameter) {
        case "name":
            return document.getElementById('roommatesList').options[getSelectedRoommateFromList()].value;

        default:
            return document.getElementById('roommatesList').selectedIndex;
    }
}

// Adds or delete new chore line when user add content or clean line
function addOrDeleteNewChoreLine(e) {
    let parentOfOTagChanged = e.target.parentElement;
    let nextSibling = parentOfOTagChanged.nextSibling;
    
    if (e.target.value !== "") {
        nextSibling.style.display = "block";
    } else {
        parentOfOTagChanged.style.display = "none";
    }

}

// Updates the table with number of roommates entered by the user.
function AddOrUpdateRoomateToRows() {
    let table = document.querySelector('.tableBody');
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

            for (let index = 0; index < 5; index++) {
                let innerTdEditableDiv = document.createElement('div');

                innerTdEditableDiv.onchange = addOrDeleteNewChoreLine;

                if (index === 0) {
                    innerTdEditableDiv.style.display = "block";
                } else {
                    innerTdEditableDiv.style.display = "none";
                }
                
                let innerTdEditableInput = document.createElement('input');
                innerTdEditableInput.className = "chore-input";
                innerTdEditableInput.setAttribute("contenteditable", "true");
                // innerTdEditableInput.setAttribute("id", dayOfWeek[indexTD] + "-input" + index);

                innerTdEditableDiv.append(innerTdEditableInput);

                let checkBox = document.createElement("INPUT");
                checkBox.onchange = handleCompleteCheck(indexTD, index);
                checkBox.type = "checkbox";
                checkBox.checked = false;
                checkBox.setAttribute("id", indexTD + index);
                checkBox.className = "input-checkbox"
                innerTdEditableDiv.append(checkBox);

                new_empty_td_tag.append(innerTdEditableDiv);

            }

            new_tr_tag.append(new_empty_td_tag);

        }

        // Updating the table
        table.appendChild(new_tr_tag);
    });
}

//handles checked events for complete checkbox
function handleCompleteCheck(day, chore) {
    var checkbox = document.getElementById(day + chore);
    console.log(day + "_" + chore);
    if (checkbox !== null && checkbox.checked) {
        alert(day + " " + chore + " complete");
    }
}

// Updates the roommate select list on the page based on the roommates array 
function UpdateRoommatesSelectList() {
    let selectListBox = document.querySelector("#roommatesList");

    selectListBox.innerHTML = "";

    roommates.forEach(roommate => {
        let addRoommateToOptionTag = new Option(roommate.name, roommate.name);

        selectListBox.add(addRoommateToOptionTag, undefined);
    });

    AddOrUpdateRoomateToRows();

}

// Adds new roommate info into a object and adds it to the global array containing the list of all current rommates
function AddOrEditRoommate(name, email, phone) {
    let newRoommateInfo = {
        name: name,
        email: email,
        phone: phone
    };
    sendInvitationEmail(email, name);
    roommates.push(newRoommateInfo);
}

// Closes the popup box/framte for adding, editing or deleting roommates 
function CloseCurrentModal(id) {
    document.querySelector("#" + id).style.display = "none";
}

function AddNewRoommate() {

    // Gets values from the form and stores in local variables
    let newRoomateName = document.querySelector("#addRoommate input[name='name']").value;
    let newRoomateEmail = document.querySelector("#addRoommate input[name='email']").value;
    let newRoomatePhone = document.querySelector("#addRoommate input[name='phone']").value;

    if (newRoomateName !== "" && newRoomateEmail !== "") {

        AddOrEditRoommate(newRoomateName, newRoomateEmail, newRoomatePhone);

        UpdateRoommatesSelectList();

        // Close the window add new roomate window
        CloseCurrentModal("addRoommate");
    } else {
        alert("Please, enter new roommate's name and valid email to add to the list.");
    }

}

function EditSelectedRoommate() {
    roommates.forEach(roommate => {
        if (roommate.name === getSelectedRoommateFromList("name")) {
            roommate.name = document.querySelector("#editRoommate input[name='name']").value;
            roommate.email = document.querySelector("#editRoommate input[name='email']").value;
            roommate.phone = document.querySelector("#editRoommate input[name='phone']").value;
            UpdateRoommatesSelectList();
        }
    });
    CloseCurrentModal("editRoommate");
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
        document.getElementById(roommate.name).style.backgroundColor = "#696969";
    })

    roommate = document.getElementById("roommatesList").value;
    document.getElementById(roommate).style.backgroundColor = "white";

}