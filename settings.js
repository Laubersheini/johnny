// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal // When the user clicks on the button, open the modal
document.getElementById("settings_button").onclick = function() {
  modal.style.display = "block";
};

// Get the <span> element that closes the modal
document.getElementsByClassName("close")[0].onclick = function() {
  modal.style.display = "none";
};



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
