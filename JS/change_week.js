let today = new Date();
var yyyy = today.getFullYear();
let dateNumber = [];
let dd = 0;
let activeMonth = 0;
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

// get current month
function getActiveMonth(mm) {
  document.getElementById("currentMonth").innerHTML = month[activeMonth] + " " + yyyy;
  activeMonth = month[today.getMonth() + mm]
}

function getCurrentWeek() {

  dayOfWeek.forEach(day => {
    // month is February
    if (month[today.getMonth()] == "February" && today.getDate() - today.getDay() + dayOfWeek.indexOf(day) - today.getDay() >= 28) {

      document.getElementById(day).innerHTML = today.getDate() - today.getDay() + dayOfWeek.indexOf(day) - 28;
      document.getElementById("currentMonth").innerHTML = month[today.getMonth()] + " " + yyyy + " / " + month[today.getMonth() + 1] + " " + yyyy;
      activeMonth = month[1];

    // months with 31 days
    } else if ((month[today.getMonth()] == month[0] || month[today.getMonth()] == month[2] || month[today.getMonth()] == month[4] ||
                month[today.getMonth()] == month[6] || month[today.getMonth()] == month[7] || month[today.getMonth()] == month[9] ||
                month[today.getMonth()] == month[11]) && (today.getDate() - today.getDay() + dayOfWeek.indexOf(day) - today.getDay() == 31)) {

      document.getElementById(day).innerHTML = today.getDate() - today.getDay() + dayOfWeek.indexOf(day);
      document.getElementById("currentMonth").innerHTML = month[today.getMonth()] + " " + yyyy + " / " + month[today.getMonth() + 1] + " " + yyyy;

    // months with 30 days
    } else if ((month[today.getMonth()] == month[3] || month[today.getMonth()] == month[5] || month[today.getMonth()] == month[8] ||
    month[today.getMonth()]) == month[10] && (today.getDate() - today.getDay() + dayOfWeek.indexOf(day) - today.getDay() == 30)) {

      document.getElementById(day).innerHTML = today.getDate() - today.getDay() + dayOfWeek.indexOf(day);
      document.getElementById("currentMonth").innerHTML = month[today.getMonth()] + " " + yyyy + " / " + month[today.getMonth() + 1] + " " + yyyy;

    } else { // week is not at the beginning or end of the month
      document.getElementById(day).innerHTML = today.getDate() - today.getDay() + dayOfWeek.indexOf(day);


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

function changeWeek(dd) {

  dayOfWeek.forEach(day => {

      var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dd + dayOfWeek.indexOf(day) - 1);
      document.getElementById(day).innerHTML = nextWeek.getDate();


  });
  


}