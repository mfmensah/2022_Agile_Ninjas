let today = new Date();
let dd = 0;
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// get current month
function getActiveMonth() {

  document.getElementById("currentMonth").innerHTML = month[today.getMonth()] + " " + today.getFullYear();
  
}

function getCurrentWeek() {

  dayOfWeek.forEach(day => {

    var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayOfWeek.indexOf(day) - 1);
    document.getElementById(day).innerHTML = nextWeek.getDate();
    
  });

  // Highlight today on calendar
  document.getElementById(dayOfWeek[today.getDay()]).style.backgroundColor = "white";

  // Display current month on page load
  getActiveMonth();
   
}

function changeWeek(dd) {
  
  dayOfWeek.forEach(day => {
    
    // Change the weekly calendar
    var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dd + dayOfWeek.indexOf(day) - 1);
    document.getElementById(day).innerHTML = nextWeek.getDate();

    // Update the Month displayed
    document.getElementById("currentMonth").innerHTML = month[nextWeek.getMonth()] + " " + nextWeek.getFullYear();

    // Update highlighting on today's date
    if (today.toISOString().split('T')[0] == nextWeek.toISOString().split('T')[0]) {
      document.getElementById(dayOfWeek[today.getDay()]).style.backgroundColor = "white";
    } else {
      document.getElementById(day).style.backgroundColor = "transparent";
    } 
  });
}


// previous week
function lastWeek() {
  dd -= 7;
  changeWeek(dd);
}

// next week
function nextWeek() {
  dd += 7;
  changeWeek(dd);

}
