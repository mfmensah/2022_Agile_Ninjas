/*
-Login information--
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
                    removeReadOnlyChores();
                    closeForm();

                } else {
                    alert("The credentials entered are not an administrator.")
                    setReadOnlyChores();

              }
            }
        }
}