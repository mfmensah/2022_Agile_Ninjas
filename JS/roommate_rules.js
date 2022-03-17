function getRules() {
    var request_ = new XMLHttpRequest();
    request_.open("GET", "https://nitroco.us/cs/api/Rules", true);
    request_.send();
    request_.onreadystatechange = function () {
        if (request_.readyState == 4 && request_.status == 200) {
            var response = request_.responseText;
            var obj = JSON.parse(response);

            console.log(obj);
            document.getElementById("rules").value = obj;
        }
    }
}

function SetRules() {
    var rule = document.getElementById("rules").value;
    var request_ = new XMLHttpRequest();
    request_.open("Post", "https://nitroco.us/cs/api/Rules?value=" + rule, true);
    request_.send();
    request_.onreadystatechange = function () {
        if (request_.readyState == 4 && request_.status == 200) {
            var response = request_.responseText;
            var obj = JSON.parse(response);

            console.log(obj);
            alert("House Rules have been updated successfully.");
        }
    }
}

//function AuthenticateTest() {
//    var rule = document.getElementById("rules").value;
//    var request_ = new XMLHttpRequest();
//    request_.open("GET", "https://nitroco.us/cs/api/Authenticate?username=" + uname + "&password=" + password, true);
//    request_.send();
//    request_.onreadystatechange = function () {
//        if (request_.readyState == 4 && request_.status == 200) {
//            var response = request_.responseText;
//            var obj = JSON.parse(response);

//            if (obj === "true") {
                
//            } else {

//            }
//        }
//    }
//}

getRules();