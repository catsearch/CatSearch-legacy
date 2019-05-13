headerMenu = document.getElementById("header-dropdown-content")

function search() {
    console.log("wow, you searched");
}

function showDropdown() {
    if (headerMenu.style.display === "none"){
        headerMenu.style.display = "initial";
    }
    else {
        headerMenu.style.display = "none";        
    }
}