function validateUser() {
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var adminEmail = "Admin";
    var adminPassword = "Admin";

    userEmail = userEmail.toString();
    userPassword = userPassword.toString();

    if (userEmail === adminEmail && userPassword === adminPassword){
        document.getElementById("roommatesControls").style.display = "inline";
        closeForm();
    } else {
        alert("The credentials entered are not an administrator.")
        document.getElementsByClassName('chore-input')[0].setAttribute("contenteditable", "false");

    }


}