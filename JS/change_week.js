let today = new Date();
var yyyy = today.getFullYear();
let dateNumber = [];
let dd = 0;
let activeMonth = 0;
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// get current month
function getActiveMonth(mm) {
  document.getElementById("currentMonth").innerHTML = month[activeMonth] + " " + yyyy;
  activeMonth = month[today.getMonth() + mm];
}

function getCurrentWeek() {

  dayOfWeek.forEach(day => {

    var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayOfWeek.indexOf(day) - 1);
    document.getElementById(day).innerHTML = nextWeek.getDate();
    
  });
}

function changeWeek(dd) {

  dayOfWeek.forEach(day => {

      var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dd + dayOfWeek.indexOf(day) - 1);
      document.getElementById(day).innerHTML = nextWeek.getDate();


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
