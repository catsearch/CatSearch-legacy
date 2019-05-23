const headerMenu = document.getElementById("header-dropdown");
let dropdownText = null;
let headerMenuContent = null;
const searchBar = document.getElementById("search-bar");
let mouse = false;

// search: backend call, not implemented
function search() {
    if (searchBar.value === "" && externalSearch === null) {
        users = null;
        getUsers();
    } else {
        let apiBody = {};
        apiBody.text = (externalSearch === null) ? searchBar.value : externalSearch; //externalSearch defined in userList.js
        console.log(apiBody.text);
        fetch(apiUrl + `${userId}/search`, {
            method: "POST",
            headers: apiHeader,
            body: JSON.stringify(apiBody)
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json.success) {
                    console.log(json.users);
                    users = json.users;
                    getUsers();
                } else {
                    //rip
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
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
            if (json.success && json.user != null) {
                const user = json.user;
                addDropdown(user.firstName);
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
        <span id="header-dropdown-text" onmouseover="mouseStatus(true);" onmouseout="mouseStatus(false);" onclick="toggleDropdown()"><u>${name? name : "User"}</u> &#x25BE</span>
        <div id="header-dropdown-content" onmouseover="mouseStatus(true);" onmouseout="mouseStatus(false);">
            <a href="../myProfile/myProfile.html">My Profile</a>
            <a href="../login/login.html" onclick="logout();">Log Out</a>
        </div>`
    dropdownText = document.getElementById("header-dropdown-text");
    headerMenuContent = document.getElementById("header-dropdown-content");
}

function addLoginButton() {
    headerMenu.innerHTML = `<div id="login-button"><span id="login-button-text" onclick="moveToLogin();">Login</span></div>`
}

function logout() {
    localStorage.removeItem("userId");
    moveToLogin();
}

function moveToLogin() {
    window.location = "../login/login.html";
}

if (userId !== "null" && userId !== null) {
    fetchUser();
} else {
    addLoginButton();
}
