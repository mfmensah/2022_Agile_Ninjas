function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";

}

function logoutUser(){
    document.getElementById("roommatesControls").style.display = "none";
    document.getElementsByClassName("addUpdateChore").disabled = true;
}


