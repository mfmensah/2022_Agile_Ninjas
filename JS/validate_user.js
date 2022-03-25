/*
-Login information-
Email: administrator
Password: CVTC2022Agile!-
 */

function validateUser() {
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var request_ = new XMLHttpRequest();
        request_.open("GET", "https://nitroco.us/cs/api/authenticate?username=" + userEmail + "&password=" + userPassword, true);
        request_.send();
        request_.onreadystatechange = function () {
            if (request_.readyState == 4 && request_.status == 200) {
                var response = request_.responseText;
                var obj = response;

                if (obj === "true") {
                    document.getElementById("roommatesControls").style.display = "inline";
                    document.getElementById("changeRule").style.visibility = 'visible';
                    document.getElementById('logout-button').style.display = 'inline';
                    document.getElementById("rules").disabled = false;
                    document.getElementById('login-button').style.display = 'none';
                    removeReadOnlyChores();
                    closeForm();


                } else {
                    alertDialogBox("The credentials entered are not an administrator.")
                    document.getElementById('login-button').style.display = 'none';
                    document.getElementById("rules").disabled = true;
                    document.getElementById('logout-button').style.display = 'inline';
                    setReadOnlyChores();
              }
            }
        }
}

// Get the input field
var passwordInput = document.getElementById("userPassword");

// Execute a function when the user releases a key on the keyboard
passwordInput.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {

        e.preventDefault();

        validateUser();
    }
});
