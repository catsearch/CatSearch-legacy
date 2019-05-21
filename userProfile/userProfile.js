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
    area: "North",
    cleanliness: "Medium",
    smoking: "No",
    music: "Sometimes",
    bedtimeStart: "21:00",
    bedtimeEnd: "00:00",
    wakeUpStart: "08:00",
    wakeUpEnd: "10:00"   
};
const userNameField = document.getElementById("user-name-field");
const userDropdownFields = document.getElementById("user-dropdown-fields");
const dropdownFieldsList = ["gender", "school", "year", "area", "cleanliness", "smoking", "music"];
const dropdownDisplayNames = ["Gender: ", "School: ", "Year: ", "Area: ", "Cleanliness: ", "Smoking: ", "Playing Music: "];
const userTimeFields = document.getElementById("user-time-fields");
const userBlurbField = document.getElementById("user-blurb-field");

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
    dropdownFieldsList.forEach(function (fieldName, index) {
        let tempField = document.createElement("span");
        tempField.setAttribute("class", "dropdown-fields");
        tempField.innerHTML = dropdownDisplayNames[index] + defaultUser[fieldName];
        if (fieldName === "smoking" && defaultUser[fieldName] === "No") {
            tempField.innerHTML = dropdownDisplayNames[index] + "Non-Smoking"; 
        }
        userDropdownFields.appendChild(tempField);
    })
        
}

function buildTimeFields() {
    let bedtimeField = document.createElement("span");
    bedtimeField.setAttribute("id", "bedtime-field");;
    bedtimeField.setAttribute("class", "time-fields");
    bedtimeField.innerHTML = "Bedtime: ";
    bedtimeField.innerHTML += "From " + millitaryToRegular(defaultUser.bedtimeStart);
    bedtimeField.innerHTML += " To " + millitaryToRegular(defaultUser.bedtimeEnd);
    userTimeFields.appendChild(bedtimeField);

    
    let wakeUpField = document.createElement("span");
    wakeUpField.setAttribute("id", "wake-up-field");
    wakeUpField.setAttribute("class", "time-fields");
    wakeUpField.innerHTML = "Wake-Up: ";
    wakeUpField.innerHTML += "From " + millitaryToRegular(defaultUser.wakeUpStart);
    wakeUpField.innerHTML += " To " + millitaryToRegular(defaultUser.wakeUpEnd);
    userTimeFields.appendChild(wakeUpField);
}

function buildBlurb() {
    let aboutMe = document.createElement("span");
    aboutMe.setAttribute("id", "blurb-about-me");
    aboutMe.innerHTML = "About Me:";
    userBlurbField.appendChild(aboutMe);

    let blurbField = document.createElement("p");
    blurbField.setAttribute("id", "blurb-field");
    blurbField.innerHTML += defaultUser.blurb;
    userBlurbField.appendChild(blurbField);
}

function millitaryToRegular(inputTime) {
    let timeComponents = inputTime.split(":");
    let hh = parseInt(timeComponents[0]);
    let mins = timeComponents[1];
    let dd = "AM";
    if (hh === 12) {
        dd = "PM";
    } else if (hh > 12) {
        dd = "PM";
        hh = hh - 12;
    } else if (hh === 0) {
        hh = 12;
    }
    return hh.toString() + ":" + mins + " " + dd;
}

function displayProfileRight() {
    buildUserName();
    buildDropDownFields();
    buildTimeFields();
    buildBlurb();
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