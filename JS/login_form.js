function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'inline';



}


function logoutUser(){
    document.getElementById('loginButton').style.display = 'inline';
    document.getElementById('logoutButton').style.display = 'none';

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
}

function removeReadOnlyChores() {
    const collection = document.getElementsByClassName("chore-input");
    for (let i = 0; i < collection.length; i++) {
        collection[i].readOnly = false;
    }
}
