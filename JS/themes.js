// Controls theme changes for the application

// Set dark theme on page load
document.onload = darkTheme();


// A dark theme that is easy on the eyes
function darkTheme() {
  document.getElementById("html").style.backgroundColor = "#16171d";
  document.getElementById("loginBanner").style.backgroundColor = "dodgerblue";
  document.getElementById("arrow-right").style.borderLeft = "40px solid rgb(255, 255, 255)";
  document.getElementById("arrow-left").style.borderRight = "40px solid rgb(255, 255, 255)";
  document.getElementById("currentMonth").style.color = "white";
  document.getElementById("loginToModifyMessage").style.color = "white";
  document.getElementById("weekCalendar").style.backgroundColor = "dodgerblue";
  document.getElementById("houseRules").style.backgroundColor = "pink";
  document.getElementById("roommates").style.backgroundColor = "pink";
  // document.getElementById("tert").style.color = "white";

}

// A lighter theme for users
function lightTheme() {
  document.getElementById("html").style.backgroundColor = "white";
  document.getElementById("loginBanner").style.backgroundColor = "#1100a8";
  document.getElementById("arrow-right").style.borderLeft = "40px solid rgb(0, 0, 0)";
  document.getElementById("arrow-left").style.borderRight = "40px solid rgb(0, 0, 0)";
  document.getElementById("currentMonth").style.color = "black";
  document.getElementById("loginToModifyMessage").style.color = "black";
  document.getElementById("weekCalendar").style.backgroundColor = "blue";
  document.getElementById("houseRules").style.backgroundColor = "red";
  document.getElementById("roommates").style.backgroundColor = "red";
  // document.getElementById("tert").style.color = "black";
}