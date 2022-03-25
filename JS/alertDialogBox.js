function alertDialogBox(message) {

  let modalBox = document.getElementById("alertDialogBox");
  let pInModalBox = document.querySelector("#alertDialogBox h3");
  
  if (message !== undefined) {
    pInModalBox.innerHTML = message;
    modalBox.style.display = "block";
  } else {
    modalBox.style.display = "none";
  }
}