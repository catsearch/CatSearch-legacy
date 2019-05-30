let clickedUserId = localStorage.getItem("clickedUserId");
const userWrapper = document.getElementById("user-wrapper");
const userLeft = document.getElementById("user-profile-left");
const profPic = document.getElementById("user-profile-picture");
const buttonWrapper = document.getElementById("button-wrapper");
const saveButton = document.getElementById("save-profile-button");
const apiUrl = 'http://localhost:8080/user/';
const apiHeader = {"Content-Type": "application/json"};
let user = null;
const defaultIcon = "../resources/DefaultProfile.png";
let defaultUser = {
    name: "Michael Horn",
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
    wakeUpEnd: "10:00",   
    picUrl: "",
    email: "michael-horn@northwestern.edu",
    id: "235804958430"
};
const userNameField = document.getElementById("user-name-field");
const userDropdownFields = document.getElementById("user-dropdown-fields");
const dropdownFieldsList = ["gender", "school", "year", "area", "cleanliness", "smoking", "music"];
const dropdownDisplayNames = ["Gender: ", "School: ", "Year: ", "Area: ", "Cleanliness: ", "Smoker: ", "Playing Music: "];
const userTimeFields = document.getElementById("user-time-fields");
const userBlurbField = document.getElementById("user-blurb-field");

function getUser() {
    if (clickedUserId === null || clickedUserId === "null") {
        //window.location = "../mainPage/mainPage.html";
    }
    fetch(apiUrl + clickedUserId, {
        method: "GET",
        headers: apiHeader
    })
        .then(response => {
            return response.json();
        })
        .then(json => {
            user = json.success? json.user : defaultUser;
            profilePicture(user.picUrl);
            displayProfileRight();
            if(!userId) {
                buttonWrapper.innerHTML = "";
            }
            userLeft.appendChild(contactInfo(user));
        })
        .catch(err => {
            console.log(err);
            //THESE ARE JUST HERE FOR DEMO SO IT DOESN'T BREAK WHEN SERVER IS OFF
            //window.location = "../mainPage/mainPage.html"; //<--this should be here instead
            user = defaultUser;
            profilePicture(user.picUrl);
            displayProfileRight(); 
            userLeft.appendChild(contactInfo(user));
        })
}

function displayProfileRight() {
    buildUserName();
    buildDropDownFields();
    buildTimeFields();
    buildBlurb();
}

function buildUserName() {
    userNameField.innerHTML = (user == null) ? defaultUser.name : user.name;
}

function buildDropDownFields() {
    dropdownDisplayNames.forEach((fieldName, index) => {
        let tempField = document.createElement("span");
        tempField.setAttribute("class", "dropdown-fields");
        fieldValue = "N/A";
        if (fieldName === "Gender: ") {
            fieldValue = user.gender === ""? "N/A" : user.gender;
        } else if (fieldName === "School: ") {
            fieldValue = user.school === ""? "N/A" : user.school;
        } else if (fieldName === "Year: ") {
            fieldValue = user.year === ""? "N/A" : user.year;
        } else if (fieldName === "Area: ") {
            fieldValue = user.area === ""? "N/A" : user.area;
        } else if (fieldName === "Cleanliness: ") {
            fieldValue = user.cleanliness === ""? "N/A" : user.cleanliness;
        } else if (fieldName === "Smoking: ") {
            fieldValue = user.smoking === ""? "N/A" : user.smoking;
        } else if (fieldName === "Playing Music: ") {
            fieldValue = user.music === ""? "N/A" : user.music;
        }
        tempField.innerHTML = fieldName + fieldValue;
        userDropdownFields.appendChild(tempField);
    })
}

function buildTimeFields() {
    let bedtimeField = document.createElement("span");
    bedtimeField.setAttribute("class", "time-fields");
    bedtimeField.innerHTML = "Bedtime: ";
    bedtimeField.innerHTML += "From " + militaryToRegular(defaultUser.bedtimeStart);
    bedtimeField.innerHTML += " To " + militaryToRegular(defaultUser.bedtimeEnd);
    userTimeFields.appendChild(bedtimeField);

    
    let wakeUpField = document.createElement("span");
    wakeUpField.setAttribute("class", "time-fields");
    wakeUpField.innerHTML = "Wake-Up: ";
    wakeUpField.innerHTML += "From " + militaryToRegular(defaultUser.wakeUpStart);
    wakeUpField.innerHTML += " To " + militaryToRegular(defaultUser.wakeUpEnd);
    userTimeFields.appendChild(wakeUpField);
}

function buildBlurb() {
    let blurbField = document.createElement("p");
    blurbField.setAttribute("id", "blurb-field");
    blurbField.innerHTML = user.blurb ? user.blurb : "This user has not yet added a blurb.";
    userBlurbField.appendChild(blurbField);
}

function militaryToRegular(inputTime) {
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

function saveUser() {
    console.log(user, userId)
    const apiBody = JSON.stringify({
        id: user._id
    });
    fetch(apiUrl + userId + "/saveUser", {
        method: "PATCH",
        headers: apiHeader,
        body: apiBody
    })
}

function removeUser() {
    const apiBody = JSON.stringify({
        id: user._id
    });
    fetch(apiUrl + userId + "/removeSaved", {
        method: "PATCH",
        headers: apiHeader,
        body: apiBody
    })
}

const profilePicture = (picUrl) => {
    profPic.src = picUrl;
}

function setDefaultPic() {
    profPic.src = defaultIcon;
}

function save() {
    if(saveButton.innerHTML === "Save") {
        saveButton.innerHTML = "Saved <i class=\"material-icons\">check</i>";
        saveUser();
    }
    else {
        saveButton.innerHTML = "Save";
        removeUser();
    }
}

const contactInfo = (user) => {
    const container = document.createElement('div');
    container.id = 'user-contact-info';

    container.append("Email: ");
    container.append(user.email);

    return container;
}

getUser();