const userWrapper = document.getElementById("user-wrapper");
const userLeft = document.getElementById("user-profile-left");
const profPic = document.getElementById("user-profile-picture");
const editButton = document.getElementById("user-edit-button");
const apiUrl = 'http://localhost:8080/user/';
const apiHeader = {"Content-Type": "application/json"};
let user = null;
let editing = false;
const defaultIcon = "../resources/DefaultProfile.png";
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
    console.log(userId)
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
            profilePicture(user.profilePicture);
            displayProfileRight();
            userLeft.appendChild(contactInfo(user));
        })
        .catch(err => {
            console.log(err);
            user = defaultUser
            profilePicture(user.profilePicture);
            displayProfileRight();
            userLeft.appendChild(contactInfo(user))
        })
}

function buildUserName() {
    userNameField.innerHTML = user.name;
}

function buildDropDownFields() {
    dropdownFieldsList.forEach(function (fieldName, index) {
        let tempField = document.createElement("span");
        tempField.setAttribute("class", "dropdown-fields");
        tempField.innerHTML = dropdownDisplayNames[index] + user[fieldName];
        userDropdownFields.appendChild(tempField);
    })   
}

function buildTimeFields() {
    let bedtimeField = document.createElement("span");
    bedtimeField.setAttribute("class", "time-fields");
    bedtimeField.innerHTML = "Bedtime: ";
    bedtimeField.innerHTML += "From " + militaryToRegular(user.bedtimeStart);
    bedtimeField.innerHTML += " To " + militaryToRegular(user.bedtimeEnd);
    userTimeFields.appendChild(bedtimeField);

    
    let wakeUpField = document.createElement("span");
    wakeUpField.setAttribute("class", "time-fields");
    wakeUpField.innerHTML = "Wake-Up: ";
    wakeUpField.innerHTML += "From " + militaryToRegular(user.wakeUpStart);
    wakeUpField.innerHTML += " To " + militaryToRegular(user.wakeUpEnd);
    userTimeFields.appendChild(wakeUpField);
}

function buildBlurb() {
    blurbField = document.createElement("p");
    blurbField.setAttribute("id", "blurb-field");
    blurbField.innerHTML = user.blurb;
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
        userNameField.innerHTML = "<input id=\"name-input\" type=\"text\" value=\"" + user.name + "\">";

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
                if(val === user[fieldName.toLowerCase()]){
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
        blurbField.innerHTML = user.blurb
    }
    // saving
    else {
        editButton.innerHTML = "Edit<i id=\"edit-icon\" class=\"material-icons\">edit</i>";
        editing = false;
        // Name
        user["name"] = document.getElementById("name-input").value;
        
        buildUserName();

        // Dropdown fields
        dropdownFieldsList.forEach(function (fieldName, index) {
            const selected = document.getElementById(fieldName);
            user[fieldName] = selected.options[selected.selectedIndex].text;
        }) 
        userDropdownFields.innerHTML = ""; 
        buildDropDownFields();

        // Time
        user["bedtimeStart"] = document.getElementById("Bedtime-start").value;
        user["bedtimeEnd"] = document.getElementById("Bedtime-end").value;
        user["wakeUpStart"] = document.getElementById("Wake-up-start").value;
        user["wakeUpEnd"] = document.getElementById("Wake-up-end").value;
        userTimeFields.innerHTML = "";
        buildTimeFields();

        // Blurb
        user["blurb"] = blurbField.value;
        userBlurbField.innerHTML = "";
        buildBlurb();
    }
}

function saveUser() {
    const apiBody = JSON.stringify({
        id: user.id
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
        id: user.id
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
    profPic.src = (picUrl === "")? picUrl : defaultIcon;
    return profPic;
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
        getUser();
    }
}
init();