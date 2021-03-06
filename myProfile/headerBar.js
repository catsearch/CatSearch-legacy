const headerMenu = document.getElementById("header-dropdown");
let dropdownText = null;
let headerMenuContent = null;
const searchBar = document.getElementById("search-bar");
const userId = localStorage.getItem("userId");

let mouse = false;

// search: backend call, not implemented
function search() {
    if (searchBar.value !== "") {
        localStorage.setItem("externalSearch", searchBar.value);
    }
    window.location = "../mainPage/mainPage.html";
}

function mouseStatus(n) {
    mouse = n;
}

// closeDropdown: closes dropdown if open and mouse is not over the dropdown
// Called when click off the dropdown
function closeDropdown() {
    if (!mouse && headerMenuContent){
        if (headerMenuContent.style.display === "block") {
            headerMenuContent.style.display = "none";
        }
    }
}

// toggleDropdown: open or close dropdown menu
// Called when clicking on actual text
function toggleDropdown() {
    if (headerMenuContent) {
        if (headerMenuContent.style.display === "block"){
            headerMenuContent.style.display = "none";
        }
        else {
            headerMenuContent.style.display = "block"; 
        }
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

function fetchUser() {
    fetch(apiUrl + userId, {
        method: "GET",
        headers: apiHeader
    })
        .then(response => {
            return response.json() 
        })
        .then(json => {
            if (json.success) {
                const user = json.user;
                addDropdown(user.name.split(" ")[0]);
            } else {
                addLoginButton();
            }
        })
        .catch(err => {
            console.log(err);
            addLoginButton();
        })
}

function addDropdown(name) {
    headerMenu.innerHTML = `
        <div id="header-button" onmouseover="mouseStatus(true);" onmouseout="mouseStatus(false);" onclick="toggleDropdown()"><span id="header-dropdown-text">${name? name : "User"} &#x25BE</span></div>
        <div id="header-dropdown-content" onmouseover="mouseStatus(true);" onmouseout="mouseStatus(false);">
            <a href="../myProfile/myProfile.html">My Profile</a>
            <a href="../mainPage/mainPage.html">Find Users</a>
            <a onclick="logout();">Log Out</a>
        </div>`
    dropdownText = document.getElementById("header-dropdown-text");
    headerMenuContent = document.getElementById("header-dropdown-content");
}

function addLoginButton() {
    headerMenu.innerHTML = `<div id="header-button" onclick="moveToLogin();">
                                <span id="login-button-text">Sign In</span>
                            </div>`
}

function logout() { 
    if (window.confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("userId");
        moveToLogin();
    }
}

function moveToLogin() {
    window.location = "../login/login.html";
}

if (userId) {
    fetchUser();
} else {
    addLoginButton();
}
