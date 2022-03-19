let today = new Date();
let weekOffset = 0;
let currentWeekOfTheMonth;
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// get current month
function getActiveMonth() {

  document.getElementById("currentMonth").innerHTML = month[today.getMonth()] + " " + today.getFullYear();
  
}

function getCurrentWeek() {

  dayOfWeek.forEach(day => {

    let nextWeek = new Date(today.getFullYear(), today.getMonth(), dayOfWeek.indexOf(day) + today.getDate() - today.getDay());
    document.getElementById(day).innerHTML = nextWeek.getDate().toLocaleString();
    
  });

  // Gets the current week of the month starting the week from sunday. i.e.: March 13 
  currentWeekOfTheMonth = month[today.getMonth()] + " " + today.getDate();

  // Highlight today on calendar
  document.getElementById(dayOfWeek[today.getDay()]).style.backgroundColor = "white";

  // Display current month on page load
  getActiveMonth();
   
}

function changeWeek(weekOffset) {
  
  dayOfWeek.forEach(day => {
    
    // Change the weekly calendar
    let nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + weekOffset + dayOfWeek.indexOf(day) - today.getDay());
    document.getElementById(day).innerHTML = nextWeek.getDate().toLocaleString();

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

function jumpToToday() {
  weekOffset = 0; // reset the weekOffset to 0
  getCurrentWeek();
}


// previous week
function lastWeek() {
  weekOffset -= 7;
  changeWeek(weekOffset);
}

// next week
function nextWeek() {
  weekOffset += 7;
  changeWeek(weekOffset);

}
