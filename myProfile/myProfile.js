//let userId = null;
const userWrapper = document.getElementById("user-wrapper");
const userLeft = document.getElementById("user-profile-left");
const profPic = document.getElementById("user-profile-picture");
const editButton = document.getElementById("user-edit-button");
const apiUrl = 'http://localhost:8080/user/';
const apiHeader = {"Content-Type": "application/json"};
let user = null;
let editing = false;
const defaultIcon = "data:image/png;base64,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";
let defaultUser = {
    name: "Michael Horn",
    blurb: "This is Michael's blurb! Isn't it nice? And I have a lot to fucking say about things, so much so that I really want this to overflow so I can figure out my goddamn shit and make sure that this formats how I want it ya know. Somebody once told me the world is gonna roll me I ain't the sharpest tool in the shed She was looking kind of dumb with her finger and her thumb In the shape of an on her forehead Well the years start coming and they don't stop coming Fed to the rules and I hit the ground running Didn't make sense not to live for fun Your brain gets smart but your head gets dumb So much to do, so much to see So what's wrong with taking the back streets? You'll never know if you don't go You'll never shine if you don't glow Hey now, you're an all-star, get your game on, go play Hey now, you're a rock star, get the show on, get paid And all that glitters is gold Only shooting stars break the mold It's a cool place and they say it gets colder You're bundled up now, wait till you get older But the meteor men beg to differ Judging by the hole in the satellite picture The ice we skate is getting pretty thin The water's getting warm so you might as well swim My world's on fire, how about yours? That's the way I like it and I never get bored Hey now, you're an all-star, get your game on, go play Hey now, you're a rock star, get the show on, get paid All that glitters is gold Only shooting stars break the mold Hey now, you're an all-star, get your game on, go play Hey now, you're a rock star, get the show, on get paid And all that glitters is gold Only shooting stars Somebody once asked could I spare some change for gas? I need to get myself away from this place I said yep what a concept I could use a little fuel myself And we could all use a little change Well, the years start coming and they don't stop coming Fed to the rules and I hit the ground running Didn't make sense not to live for fun Your brain gets smart but your head gets dumb So much to do, so much to see So what's wrong with taking the back streets? You'll never know if you don't go (go!) You'll never shine if you don't glow Hey now, you're an all-star, get your game on, go play Hey now, you're a rock star, get the show on, get paid And all that glitters is gold Only shooting stars break the mold And all that glitters is gold Only shooting stars break the mold",
    gender: "Male",
    school: "McCormick",
    year: "2022",
    area: "North",
    cleanliness: "Medium",
    smoker: "No",
    music: "Sometimes",
    bedtimeStart: "21:00",
    bedtimeEnd: "00:00",
    wakeUpStart: "08:00",
    wakeUpEnd: "10:00",   
    profilePicture: defaultIcon,
    email: "michael-horn@northwestern.edu",
    id: "235804958430"
};
const userNameField = document.getElementById("user-name-field");
const userDropdownFields = document.getElementById("user-dropdown-fields");
const dropdownFieldsList = ["gender", "school", "year", "area", "cleanliness", "smoker", "music"];
const dropdownDisplayNames = ["Gender: ", "School: ", "Year: ", "Area: ", "Cleanliness: ", "Smoker: ", "Playing Music: "];
const userTimeFields = document.getElementById("user-time-fields");
const userBlurbField = document.getElementById("user-blurb-field");
let blurbField = document.getElementById("blurb-field");


const filterFields = {
    "Gender" : ["Select:", "Male", "Female", "Other"],
    "School" : ["Select:", "Bienen", "McCormick", "Medill", "SESP", "SoC", "WCAS"],
    "Year" : ["Select:", "2021", "2022", "2023", "2024", "2025"],
    "Area" : ["Select:", "North", "Mid", "South"],
    "Cleanliness" : ["Select:", "High", "Medium", "Low"],
    "Smoker" : ["Select:", "Yes", "No"],
    "Music" : ["Select:", "Often", "Sometimes", "Never"]
}

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
            //userWrapper.innerHTML = JSON.stringify(user);
            profilePicture(user.profilePicture);
        })
        .catch(err => {
            console.log(err);
            //userWrapper.innerHTML = JSON.stringify(defaultUser);
            profilePicture(defaultUser.profilePicture);
            userLeft.appendChild(contactInfo(defaultUser))
        })
}

function buildUserName() {
    userNameField.innerHTML = name;
}

function buildDropDownFields() {
    dropdownFieldsList.forEach(function (fieldName, index) {
        let tempField = document.createElement("span");
        tempField.setAttribute("class", "dropdown-fields");
        tempField.innerHTML = dropdownDisplayNames[index] + defaultUser[fieldName];
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
    blurbField = document.createElement("p");
    blurbField.setAttribute("id", "blurb-field");
    blurbField.innerHTML = defaultUser.blurb;
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

function displayProfileRight() {
    buildUserName();
    buildDropDownFields();
    buildTimeFields();
    buildBlurb();
}

function edit() {
    // editing
    if(!editing) {
        editButton.innerHTML = "Save";
        editing = true;

        // Name
        userNameField.innerHTML = "<input id=\"name-input\" type=\"text\" value=\"" + defaultUser.name + "\">";

        // Dropdown fields
        userDropdownFields.innerHTML = "";
        for (let [fieldName, fieldValues] of Object.entries(filterFields)) {
            const tempHTML = document.createElement("div");
            tempHTML.setAttribute("class", "edit-field-wrapper");
            const label = document.createElement("label");
            label.innerHTML = fieldName;
            label.setAttribute("class", "edit-field-label");
            const select = document.createElement("select");
            select.setAttribute("class", "edit-field-select");
            select.setAttribute("id", fieldName.toLowerCase());
            for (let [i, val] of fieldValues.entries()) {
                let option = document.createElement("option");
                option.setAttribute("value", i);
                option.innerHTML += val;
                if(val === defaultUser[fieldName.toLowerCase()]){
                    option.selected = true;
                }
                select.appendChild(option);
            }

            tempHTML.appendChild(label);
            tempHTML.appendChild(select);
            tempHTML.classList.toggle("edit-field-active");
            userDropdownFields.appendChild(tempHTML);
        }

        // Time
        userTimeFields.innerHTML = ""
        for (let name of ["Bedtime", "Wake-up"]){
            // Big container
            let timeSection = document.createElement("div");
            timeSection.setAttribute("class", "time-sections-wrapper");
            // Label
            let timeLabel = document.createElement("label");
            timeLabel.setAttribute("class", "time-label");
            timeLabel.innerHTML += name;
            // input container
            let timeInputs = document.createElement("div");
            timeInputs.setAttribute("class","time-sections")
            // Start stuff
            let timeStart = document.createElement("div");
            timeStart.setAttribute("class", "time-input-wrapper");
            let timeInputStart = document.createElement("input");
            let timeLabelFrom = document.createElement("label");
            
            // End stuff
            let timeEnd = document.createElement("div");
            timeEnd.setAttribute("class", "time-input-wrapper");
            let timeLabelTo = document.createElement("label");
            let timeInputEnd = document.createElement("input");

            timeInputStart.setAttribute("type", "time");
            timeInputStart.setAttribute("id", name+"-start");
            timeLabelFrom.innerHTML = "From:";

            timeInputEnd.setAttribute("type", "time");
            timeInputEnd.setAttribute("id", name+"-end");
            timeLabelTo.innerHTML = "To:";
            if (name === "Bedtime") {
                timeInputStart.defaultValue = "21:00";
                timeInputEnd.defaultValue = "00:00";
            } else {
                timeInputStart.defaultValue = "08:00";
                timeInputEnd.defaultValue = "10:00";
            }
            timeStart.appendChild(timeLabelFrom);
            timeStart.appendChild(timeInputStart);

            timeEnd.appendChild(timeLabelTo);
            timeEnd.appendChild(timeInputEnd);

            timeInputs.appendChild(timeStart);
            timeInputs.appendChild(timeEnd);

            timeSection.appendChild(timeLabel);
            timeSection.appendChild(timeInputs);
            userTimeFields.append(timeSection)
        }

        // Blurb
        userBlurbField.innerHTML = "<textarea id=\"blurb-field\"></textarea>";
        blurbField = document.getElementById("blurb-field");
        blurbField.innerHTML = defaultUser.blurb
    }
    // saving
    else {
        editButton.innerHTML = "Edit<i id=\"edit-icon\" class=\"material-icons\">edit</i>";
        editing = false;
        // Name
        defaultUser["name"] = document.getElementById("name-input").value;
        
        buildUserName();

        // Dropdown fields
        dropdownFieldsList.forEach(function (fieldName, index) {
            const selected = document.getElementById(fieldName);
            defaultUser[fieldName] = selected.options[selected.selectedIndex].text;
        }) 
        userDropdownFields.innerHTML = ""; 
        buildDropDownFields();

        // Time
        defaultUser["bedtimeStart"] = document.getElementById("Bedtime-start").value;
        defaultUser["bedtimeEnd"] = document.getElementById("Bedtime-end").value;
        defaultUser["wakeUpStart"] = document.getElementById("Wake-up-start").value;
        defaultUser["wakeUpEnd"] = document.getElementById("Wake-up-end").value;
        userTimeFields.innerHTML = "";
        buildTimeFields();

        // Blurb
        defaultUser["blurb"] = blurbField.value;
        userBlurbField.innerHTML = "";
        buildBlurb();
    }
}

function saveUser() {
    const apiBody = JSON.stringify({
        id: defaultUser.id
    });
    fetch(apiUrl + userId + "/saveUser", {
        method: "PATCH",
        headers: apiHeader,
        body: apiBody
    })
        .then(response => {
            return response.json();
        })
}

function removeUser() {
    const apiBody = JSON.stringify({
        id: defaultUser.id
    });
    fetch(apiUrl + userId + "/removeUser", {
        method: "PATCH",
        headers: apiHeader,
        body: apiBody
    })
        .then(response => {
            return response.json();
        })
}

const profilePicture = (picUrl) => {
    profPic.src = picUrl;
    return profPic;
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

    container.append("Email: ")
    container.append(user.email)

    return container;
}

function init() {
    // Strange bug here with localStorage, check later
    userId = localStorage.getItem("userId");
    if (!userId) {
        window.location = '../mainPage/mainPage.html';
    } else {
        displayProfileRight();
        getUser();
    }
}
init();