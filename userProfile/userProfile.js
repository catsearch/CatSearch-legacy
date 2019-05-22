let userId = null;
const userWrapper = document.getElementById("user-wrapper");
const apiUrl = 'http://localhost:8080/user/';
const apiHeader = {"Content-Type": "application/json"};
let user = null;
let defaultUser = {
    firstName: "Michael",
    lastName: "Horn",
    blurb: "This is Michael's blurb! Isn't it nice? And I have a lot to fucking say about things, so much so that I really want this to overflow so I can figure out my goddamn shit and make sure that this formats how I want it ya know. Somebody once told me the world is gonna roll me I ain't the sharpest tool in the shed She was looking kind of dumb with her finger and her thumb In the shape of an on her forehead Well the years start coming and they don't stop coming Fed to the rules and I hit the ground running Didn't make sense not to live for fun Your brain gets smart but your head gets dumb So much to do, so much to see So what's wrong with taking the back streets? You'll never know if you don't go You'll never shine if you don't glow Hey now, you're an all-star, get your game on, go play Hey now, you're a rock star, get the show on, get paid And all that glitters is gold Only shooting stars break the mold It's a cool place and they say it gets colder You're bundled up now, wait till you get older But the meteor men beg to differ Judging by the hole in the satellite picture The ice we skate is getting pretty thin The water's getting warm so you might as well swim My world's on fire, how about yours? That's the way I like it and I never get bored Hey now, you're an all-star, get your game on, go play Hey now, you're a rock star, get the show on, get paid All that glitters is gold Only shooting stars break the mold Hey now, you're an all-star, get your game on, go play Hey now, you're a rock star, get the show, on get paid And all that glitters is gold Only shooting stars Somebody once asked could I spare some change for gas? I need to get myself away from this place I said yep what a concept I could use a little fuel myself And we could all use a little change Well, the years start coming and they don't stop coming Fed to the rules and I hit the ground running Didn't make sense not to live for fun Your brain gets smart but your head gets dumb So much to do, so much to see So what's wrong with taking the back streets? You'll never know if you don't go (go!) You'll never shine if you don't glow Hey now, you're an all-star, get your game on, go play Hey now, you're a rock star, get the show on, get paid And all that glitters is gold Only shooting stars break the mold And all that glitters is gold Only shooting stars break the mold",
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
    bedtimeField.setAttribute("class", "time-fields");
    bedtimeField.innerHTML = "Bedtime: ";
    bedtimeField.innerHTML += "From " + millitaryToRegular(defaultUser.bedtimeStart);
    bedtimeField.innerHTML += " To " + millitaryToRegular(defaultUser.bedtimeEnd);
    userTimeFields.appendChild(bedtimeField);

    
    let wakeUpField = document.createElement("span");
    wakeUpField.setAttribute("class", "time-fields");
    wakeUpField.innerHTML = "Wake-Up: ";
    wakeUpField.innerHTML += "From " + millitaryToRegular(defaultUser.wakeUpStart);
    wakeUpField.innerHTML += " To " + millitaryToRegular(defaultUser.wakeUpEnd);
    userTimeFields.appendChild(wakeUpField);
}

function buildBlurb() {
    let blurbField = document.createElement("p");
    blurbField.setAttribute("id", "blurb-field");
    blurbField.innerHTML = defaultUser.blurb;
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