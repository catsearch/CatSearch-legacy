let userId = null;
const headerMenu = document.getElementById("header-dropdown");
let dropdownText = null;
let headerMenuContent = null;
const userWrapper = document.getElementById("user-wrapper");
const apiUrl = 'http://localhost:8080/user/';
const apiHeader = {"Content-Type": "application/json"};
let user = null;
let defaultUser = {
    firstName: "Michael",
    lastName: "Horn",
    blurb: "This is Michael's blurb! Isn't it nice?"
};

function getUser() {
    fetch(apiUrl + userId, {
        method: "GET",
        headers: apiHeader
    })
        .then(response => {
            return response.json();
        })
        .then(json => {
            if (json.success) {
                user = json.user;
            } else {
                user = defaultUser;
            }
            userWrapper.innerHTML = JSON.stringify(user);
        })
        .catch(err => {
            console.log(err);
            userWrapper.innerHTML = JSON.stringify(defaultUser);
        })
}

function addLoginButton() {
    headerMenu.innerHTML = `<div id="login-button"><span id="login-button-text" onclick="moveToLogin();">Login</span></div>`
}

function moveToLogin() {
    window.location = "../login/login.html";
}

function init() {
    // Strange bug here with localStorage, check later
    /*userId = localStorage.getItem("clickedUserId");
    if (!userId) {
        window.location = '../mainPage/mainPage.html';
    } else {
        getUser();
    }*/
    getUser();
}
init();

if (userId) {
    fetchUser();
} else {
    addLoginButton();
}