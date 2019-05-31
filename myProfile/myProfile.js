const userWrapper = document.getElementById("user-wrapper");
const userLeft = document.getElementById("user-profile-left");
const profPic = document.getElementById("user-profile-picture");
const editButton = document.getElementById("user-edit-button");
const profPicTitle = document.getElementById("prof-pic-header");
const profPicInput = document.getElementById("prof-pic-input");
const searchingButton = document.getElementById("searching");
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
    smoking: "No",
    music: "Sometimes",
    bedtimeStart: "21:00",
    bedtimeEnd: "00:00",
    wakeupStart: "08:00",
    wakeupEnd: "10:00",   
    picUrl: defaultIcon,
    email: "michael-horn@northwestern.edu",
    id: "235804958430"
};
const userNameField = document.getElementById("user-name-field");
const userDropdownFields = document.getElementById("user-dropdown-fields");
const dropdownFieldsList = ["gender", "school", "year", "area", "cleanliness", "smoking", "music"];
const dropdownDisplayNames = ["Gender: ", "School: ", "Year: ", "Area: ", "Cleanliness: ", "Smoking: ", "Playing Music: "];
const userTimeFields = document.getElementById("user-time-fields");
const userBlurbField = document.getElementById("user-blurb-field");
let blurbField = document.getElementById("blurb-field");

const filterFields = {
    "Gender" : ["Select:", "Male", "Female", "Other"],
    "School" : ["Select:", "Bienen", "McCormick", "Medill", "SESP", "SoC", "WCAS"],
    "Year" : ["Select:", "2021", "2022", "2023", "2024", "2025"],
    "Area" : ["Select:", "North", "Mid", "South"],
    "Cleanliness" : ["Select:", "High", "Medium", "Low"],
    "Smoking" : ["Select:", "Yes", "No"],
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
            profilePicture(user.picUrl);
            displayProfileRight();
            contactInfo(user);
            if (user.searching) {
                searchingButton.innerHTML = "Visible to Users";
            } else {
                searchingButton.style.backgroundColor = "#ffffff";
                searchingButton.style.color = "#4E2A84";
                searchingButton.innerHTML = "Invisible";
            }
        })
        .catch(err => {
            console.log(err);
            //THESE ARE JUST FOR OFF-SERVER STUFF
            user = defaultUser
            profilePicture(user.picUrl);
            displayProfileRight();
            contactInfo(user);
        })
}

function buildUserName() {
    userNameField.innerHTML = user.name;
}

function buildDropDownFields() {
    dropdownFieldsList.forEach(function (fieldName, index) {
        let tempField = document.createElement("span");
        tempField.setAttribute("class", "dropdown-fields");
        tempField.innerHTML = dropdownDisplayNames[index] + ((user[fieldName] === "")? "N/A" : user[fieldName]);
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
    wakeUpField.innerHTML += "From " + militaryToRegular(user.wakeupStart);
    wakeUpField.innerHTML += " To " + militaryToRegular(user.wakeupEnd);
    userTimeFields.appendChild(wakeUpField);
}

function buildBlurb() {
    blurbField = document.createElement("p");
    blurbField.setAttribute("id", "blurb-field");
    blurbField.innerHTML = user.blurb;
    userBlurbField.appendChild(blurbField);
    userBlurbField.style.border = "2px dotted black";
}

function militaryToRegular(inputTime) {
    if (inputTime === "") {return "N/A";}
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
    toggleProfPicLink();
    toggleSearchingButton();
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
        userBlurbField.style.border = "2px solid black";
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
        dropdownFieldsList.forEach((fieldName, index) => {
            const selected = document.getElementById(fieldName);
            const text = selected.options[selected.selectedIndex].text
            user[fieldName] = (text === "Select:")? "" : text;
        })
        userDropdownFields.innerHTML = "";
        buildDropDownFields();

        // Time
        user["bedtimeStart"] = document.getElementById("Bedtime-start").value;
        user["bedtimeEnd"] = document.getElementById("Bedtime-end").value;
        user["wakeupStart"] = document.getElementById("Wake-up-start").value;
        user["wakeupEnd"] = document.getElementById("Wake-up-end").value;
        userTimeFields.innerHTML = "";
        buildTimeFields();

        // Blurb
        user["blurb"] = blurbField.value;
        userBlurbField.innerHTML = "";
        buildBlurb();

        user["picUrl"] = profPicInput.value;
        profilePicture(profPicInput.value);

        saveUserInfo();
        fetchUser();
    }
}

function saveUserInfo() {
    const apiBody = JSON.stringify({
        user: user
    });
    fetch(apiUrl + userId, {
        method: "PUT",
        headers: apiHeader,
        body: apiBody
    })
}

function profilePicture(picUrl) {
    profPic.src = picUrl;
    profPicInput.value = picUrl;
}

function setDefaultPic() {
    profPic.src = defaultIcon;
    profPicInput.value = "";
}

const contactInfo = (user) => {
    const container = document.getElementById("user-contact-info");
    container.innerHTML = `Email: ${user.email}`
}

function toggleProfPicLink() {
    if (profPicTitle.style.display === "none" || profPicTitle.style.display === "") {
        profPicTitle.style.display = "block";
        profPicInput.style.display = "block";
    } else {
        profPicTitle.style.display = "none";
        profPicInput.style.display = "none";
    }
}

function toggleSearchingButton() {
    if (searchingButton.style.display === "none" || searchingButton.style.display === "") {
        searchingButton.style.display = "flex";
    } else {
        searchingButton.style.display = "none";
    }
}

function searchingPressed() {
    if (searchingButton.innerHTML === "Visible to Users") {
        searchingButton.innerHTML = "Invisible";
        searchingButton.style.backgroundColor = "#ffffff";
        searchingButton.style.color = "#4E2A84";
        user.searching = false;
    } else {
        searchingButton.innerHTML = "Visible to Users";
        searchingButton.style.backgroundColor = "#4E2A84";
        searchingButton.style.color = "#ffffff";
        user.searching = true;
    }
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