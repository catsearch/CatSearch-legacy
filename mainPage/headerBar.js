let headerMenu = document.getElementById("header-dropdown-content")
let mouse = false;

function search() {
    console.log("wow, you searched");
}

function mouseStatus(n) {
     mouse = n;
}

function closeDropdown() {
    if (!mouse){
        if (headerMenu.style.display === "block") {
            headerMenu.style.display = "none";
        }
    }
}

function toggleDropdown() {
    if (headerMenu.style.display === "none"){
        headerMenu.style.display = "block";
    }
    else {
        headerMenu.style.display = "none"; 
    }
}