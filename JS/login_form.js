function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'inline';
    document.getElementById("rules").disabled = false;
    document.getElementById("changeRule").style.visibility = 'visible';
}


function logoutUser(){
    document.getElementById('loginButton').style.display = 'inline';
    document.getElementById('logoutButton').style.display = 'none';

    document.getElementById("rules").disabled = true;
    document.getElementById("changeRule").style.visibility = 'hidden';

    //to change access to roommate
    document.getElementById("roommatesControls").style.display = "none";

    //to remove ability to change chores
    setReadOnlyChores();

}

function setReadOnlyChores() {
    const collection = document.getElementsByClassName("chore-input");
    for (let i = 0; i < collection.length; i++) {
        collection[i].readOnly = true;
    }
    
    UpdateCheckBoxVisibilityState("none");

}

function removeReadOnlyChores() {
    const collection = document.getElementsByClassName("chore-input");
    for (let i = 0; i < collection.length; i++) {
        collection[i].readOnly = false;
    }

    UpdateCheckBoxVisibilityState("inline-block");
}

// Update the display style status of all the chore checkbox on the page based on the login status. It receives the parameter for the attribute display, setting it to none or inline-block.  
function UpdateCheckBoxVisibilityState(displayAttributeValue) {

    let allCompleteChoreCheckBox = document.querySelectorAll(".input-checkbox");
    if (allCompleteChoreCheckBox.length !== 0) {

        allCompleteChoreCheckBox.forEach(choreCheckbox => {
            
            choreCheckbox.style.display = displayAttributeValue;
        });
    }
}