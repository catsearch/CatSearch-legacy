let headerMenu = document.getElementById("header-dropdown-content");
let searchBar = document.getElementById("search-bar");
let mouse = false;

// search: backend call, not implemented
function search() {
    console.log("wow, you searched");
}

function mouseStatus(n) {
     mouse = n;
}

// closeDropdown: closes dropdown if open and mouse is not over the dropdown
// Called when click off the dropdown
function closeDropdown() {
    if (!mouse){
        if (headerMenu.style.display === "block") {
            headerMenu.style.display = "none";
        }
    }
}

// toggleDropdown: open or close dropdown menu
// Called when clicking on actual text
function toggleDropdown() {
    if (headerMenu.style.display === "block"){
        headerMenu.style.display = "none";
    }
    else {
        headerMenu.style.display = "block"; 
    }
}

searchBar.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      search();
    }
});