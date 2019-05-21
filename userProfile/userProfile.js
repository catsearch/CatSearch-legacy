let userId = null;
const userWrapper = document.getElementById("user-wrapper");
const apiUrl = 'http://localhost:8080/user/';
const apiHeader = {"Content-Type": "application/json"};
let user = null;
let defaultUser = {
    firstName: "Michael",
    lastName: "Horn",
    blurb: "This is Michael's blurb! Isn't it nice?",
    gender: "Male",
    school: "McCormick",
    year: "2022",
    bedtimeStart: "21:00",
    bedtimeEnd: "00:00",
    wakeUpStart: "08:00",
    wakeUpEnd: "10:00"   
};
const userNameField = document.getElementById("user-name");
const userDropDownFields = document.getElementById("user-dropdown-fields");
const userTimeFields = document.getElementById("user-time-fields");

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

function buildUserName() {
    userNameField.innerHTML = defaultUser.firstName + " " + defaultUser.lastName;
}

function buildDropDownFields() {
    let genderField = document.createElement("span");
    genderField.setAttribute("id", "gender-field");
    genderField.innerHTML = "Gender: " + defaultUser.gender;
    userDropDownFields.appendChild(genderField);

    let schoolField = document.createElement("span");
    schoolField.setAttribute("id", "school-field");
    schoolField.innerHTML = "School: " + defaultUser.school;
    userDropDownFields.appendChild(schoolField);

    let yearField = document.createElement("span");
    yearField.setAttribute("id", "year-field");
    yearField.innerHTML = "Year: " + defaultUser.year;
    userDropDownFields.appendChild(yearField);
}

function buildTimeFields() {
    let bedtimeField = document.createElement("span");
}

function displayProfileRight() {
    buildUserName();
    buildDropDownFields();
}

function init() {
    // Strange bug here with localStorage, check later
    /*userId = localStorage.getItem("clickedUserId");
    if (!userId) {
        window.location = '../mainPage/mainPage.html';
    } else {
        getUser();
    }*/
    //getUser();
    displayProfileRight();
}
init();