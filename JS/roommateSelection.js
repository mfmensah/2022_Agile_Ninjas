let roommates = []

// Modal enabler to show add, edit or delete modals roommates from select tag list
let modalBtns = [...document.querySelectorAll(".button")];

modalBtns.forEach(function (btn) {
  btn.onclick = function () {
    let roommateSelected = GetSelectedRoommateFromList();
    let modal = btn.getAttribute("data-modal");
    
    if ( (modal == "deleteRoommate" || modal == "editRoommate") && roommateSelected <= "-1") {
      alert("Please, select a roommate to be edited or deleted")
      // let value = select.options[select.selectedIndex].value;

    } else if(modal == "editRoommate") {
      DisplaySelectedRoommateInfo();
      document.getElementById(modal).style.display = "block";

    } else if(modal == "deleteRoommate") {
      let roommateToDelete = GetSelectedRoommateFromList("name");
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

// Closes modal when clicked outside the box
window.onclick = function (event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
};

// Gets the current selected roommate name and return either the name or the index in the select tag box
function GetSelectedRoommateFromList(parameter) {

  switch (parameter) {
    case "name":
      return document.getElementById('roommatesList').options[GetSelectedRoommateFromList()].value;
      break;
  
    default:
      return document.getElementById('roommatesList').selectedIndex;
      break;
  }
}


function CloseCurrentModal(id) {
  document.querySelector("#"+id).style.display = "none";
}

function AddNewRoommate() {

  // Gets values from the form and stores in local variables
  let newRoomateName = document.querySelector("#addRoommate input[name='name']").value;
  let newRoomateEmail = document.querySelector("#addRoommate input[name='email']").value;
  let newRoomatePhone = document.querySelector("#addRoommate input[name='phone']").value;

  if (newRoomateName != "" && newRoomateEmail != "") {

    AddOrEditRoommate(newRoomateName, newRoomateEmail, newRoomatePhone)

    UpdateRoommatesSelectList();

    // Close the window add new roomate window
    CloseCurrentModal("addRoommate");
  } else {
    alert("Please, enter new roommate's name and valid email to add to the list.")
  }
  
}

function EditSelectedRoommate() {
  roommates.forEach(roommate => {
    if (roommate.name == GetSelectedRoommateFromList("name")) {
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
    if (roommate.name == GetSelectedRoommateFromList("name")) {
      document.querySelector("#editRoommate input[name='name']").value = roommate.name;
      document.querySelector("#editRoommate input[name='email']").value = roommate.email;
      document.querySelector("#editRoommate input[name='phone']").value = roommate.phone;
    }
  });
}

function DeleteSelectedRoommate() {
  roommates.forEach((roommate, index) => {
    if (roommate.name == GetSelectedRoommateFromList("name")) {
      delete roommates[index];
    }
  });

  console.log(roommates);

  UpdateRoommatesSelectList();

  CloseCurrentModal("deleteRoommate");
}

// Adds new roommate info into a object and adds it to the global array containing the list of all current rommates
function AddOrEditRoommate(name, email, phone) {
  let newRoommateInfo = {
    name: name,
    email: email,
    phone: phone
  }
  roommates.push(newRoommateInfo);
  console.log(roommates);
}

function UpdateRoommatesSelectList() {
  let selectListBox = document.querySelector("#roommatesList");

  selectListBox.innerHTML = "";

  roommates.forEach(roommate => {
    let addRoommateToOptionTag = new Option(roommate.name, roommate.name);

    selectListBox.add(addRoommateToOptionTag, undefined);
  });
}
