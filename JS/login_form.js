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
    document.getElementsByClassName("addUpdateChore").disabled = true;


}


