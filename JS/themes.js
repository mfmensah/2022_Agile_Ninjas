// Controls theme changes for the application

// Set dark theme on page load
document.onload = darkTheme();


// A dark theme that is easy on the eyes
function darkTheme() {
  document.getElementById("html").style.backgroundColor = "#16171d";
  document.getElementById("login-banner").style.backgroundColor = "dodgerblue";
  document.getElementById("arrow-right").style.borderLeft = "40px solid rgb(255, 255, 255)";
  document.getElementById("arrow-left").style.borderRight = "40px solid rgb(255, 255, 255)";
  document.getElementById("current-month").style.color = "white";
  document.getElementById("current-month").style.fontWeight = "bold";
  document.getElementById("current-month").style.fontSize = "3rem";
  document.getElementById("loginToModifyMessage").style.color = "black";

}

// A lighter theme for users
function lightTheme() {
  document.getElementById("html").style.backgroundColor = "white";
  document.getElementById("login-banner").style.backgroundColor = "darkgreen";
  document.getElementById("arrow-right").style.borderLeft = "40px solid rgb(0, 0, 0)";
  document.getElementById("arrow-left").style.borderRight = "40px solid rgb(0, 0, 0)";
  document.getElementById("current-month").style.color = "black";
  document.getElementById("current-month").style.fontWeight = "bold";
  document.getElementById("current-month").style.fontSize = "3rem";
  document.getElementById("loginToModifyMessage").style.color = "white";
}