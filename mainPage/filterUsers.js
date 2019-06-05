const filterButton = document.getElementById('filter-button');

let users = sessionStorage.getItem("users");
let myUser = null;
const userId = localStorage.getItem("userId");
const apiUrl = 'http://localhost:8081/user/';
const apiHeader = {"Content-Type": "application/json"};

const yearElement = document.getElementById('filter-year');
const yearList = ["Select year:", "2021", "2022", "2023", "2024", "2025"]

const checkboxesElement = document.getElementById('filter-checkboxes')
const filterFields = {
    "Year" : ["2021", "2022", "2023", "2024", "2025"],
    "Gender" : ["Male", "Female", "Other"],
    "School" : ["Bienen", "McCormick", "Medill", "SESP", "SoC", "WCAS"],
    "Area" : ["North", "Mid", "South"],
    "Cleanliness" : ["High", "Medium", "Low"],
    "Smoking" : ["Yes", "No"],
    "Playing Music" : ["Often", "Sometimes", "Never"]
}

const timeElement = document.getElementById("filter-time");
const timeFields = ["Bedtime", "Wake-Up"];
let timeChecked = false;

function buildSavedCheckbox() {
    let fieldHTML = document.createElement("button");
    fieldHTML.setAttribute("class", "filter-collapsible");
    fieldHTML.innerHTML += "Saved Users";
    let fieldSection = document.createElement("div");
    fieldSection.setAttribute("class", "field-collapsible-content");
    
    let checkboxes = document.createElement("label");
    checkboxes.setAttribute("class", "filter-container");
    let checkboxesChild = document.createElement("input");
    checkboxesChild.setAttribute("type", "checkbox");
    checkboxesChild.setAttribute("id", "savedCheckbox");
    checkboxes.appendChild(checkboxesChild);
    checkboxes.innerHTML += "Saved";
    fieldSection.appendChild(checkboxes);

    checkboxesElement.appendChild(fieldHTML);
    checkboxesElement.appendChild(fieldSection);
}

function buildFilterCheckboxes() {
    for (let [fieldName, fieldValues] of Object.entries(filterFields)) {
        let fieldHTML = document.createElement("button");
        fieldHTML.setAttribute("class", "filter-collapsible");
        fieldHTML.innerHTML += fieldName;
        let fieldSection = document.createElement("div");
        fieldSection.setAttribute("class", "field-collapsible-content");
        for (let [num, valueName] of fieldValues.entries()) {
            let checkboxes = document.createElement("label");
            checkboxes.setAttribute("class", "filter-container");
            let checkboxesChild = document.createElement("input");
            checkboxesChild.setAttribute("type", "checkbox");
            checkboxesChild.setAttribute("id", valueName + "Checkbox");
            checkboxes.appendChild(checkboxesChild);
            checkboxes.innerHTML += valueName;
            fieldSection.appendChild(checkboxes);
        }
        checkboxesElement.appendChild(fieldHTML);
        checkboxesElement.appendChild(fieldSection);
    }
}

function gray(elem) {
    let changeElement = document.getElementById(elem.getAttribute("id") + "-right");
    changeElement.classList.toggle("time-label-right-not-gray");
}

function buildTimeFields(){
    /* creating the drop down part of the section*/
    let fieldHTML = document.createElement("button");
    fieldHTML.setAttribute("class", "filter-collapsible");
    fieldHTML.innerHTML = "Sleep Schedule";
    let fieldSection = document.createElement("div");
    fieldSection.setAttribute("class", "field-collapsible-content");
    for (let name of timeFields){
        let timeLabel = document.createElement("label");
        timeLabel.setAttribute("class", "filter-container");
        let timeLabelSelect = document.createElement("input");
        timeLabelSelect.setAttribute("type", "checkbox");
        /* id to see if a checkbox is clicked */
        timeLabelSelect.setAttribute("id", name + "-time-checked");
        timeLabelSelect.setAttribute("onclick", "gray(this)");
        timeLabel.appendChild(timeLabelSelect);
        timeLabel.innerHTML += name;
        let timeInputFromLabel = document.createElement("label");
        timeInputFromLabel.setAttribute("class", "from-time-label");
        timeInputFromLabel.innerHTML = "From: ";
        let timeInputFrom = document.createElement("input");
        timeInputFrom.setAttribute("type", "time");
        /* id to get the value from specific input element */
        timeInputFrom.setAttribute("id", name + "-time-input-from");
        let timeInputToLabel = document.createElement("label");
        timeInputToLabel.setAttribute("class", "to-time-label");
        timeInputToLabel.innerHTML = "To: ";
        let timeInputTo = document.createElement("input");
        timeInputTo.setAttribute("type", "time");
        /* id to get the value from specific input element */
        timeInputTo.setAttribute("id", name + "-time-input-to");
        if (name === "Bedtime") {
            timeInputFrom.defaultValue = "23:00";
            timeInputTo.defaultValue = "00:00"
        } else {
            timeInputFrom.defaultValue = "09:00";
            timeInputTo.defaultValue = "10:00"
        }
        let timeLabelRightSection = document.createElement("div");
        timeLabelRightSection.setAttribute("class", "time-label-right");
        /* id is to find the correct section to gray things out */
        timeLabelRightSection.setAttribute("id", name + "-time-checked-right");
        timeLabelRightSection.appendChild(timeInputFromLabel);
        timeLabelRightSection.appendChild(timeInputFrom);
        timeLabelRightSection.appendChild(timeInputToLabel);
        timeLabelRightSection.appendChild(timeInputTo);
        fieldSection.appendChild(timeLabel);
        fieldSection.append(timeLabelRightSection);   
    }
    timeElement.appendChild(fieldHTML);
    timeElement.appendChild(fieldSection);
}

function init() {
    /*buildYearList();*/
    buildFilterCheckboxes();
    buildTimeFields();

    let coll = document.getElementsByClassName("filter-collapsible");
    let i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            let content = this.nextElementSibling;
            this.classList.toggle("filter-collapsed-label");
            content.classList.toggle("filter-collapsed");
        });
    }
}

init();

const validInputs = () => {
    return true;
}

function filter(getSaved) {
    hideEmptyText();
    let apiFields = {};

    /*
    const yearSelect = document.getElementById("filter-year-select");
    const selectedField = yearSelect.options[yearSelect.selectedIndex].text;
    if (selectedField !== "Select year:") {
        apiFields["year"] = selectedField;
    }
    */

    for (let [fieldName, fieldValues] of Object.entries(filterFields)) {
        let currentArray = [];
        if(!getSaved) {
            for (let [num, valueName] of fieldValues.entries()) {
                const currentCheckbox = document.getElementById(valueName + "Checkbox");
                if (currentCheckbox && currentCheckbox.checked) {
                    currentArray.push(valueName);
                }
            }
        }
        else{
            for (let [num, valueName] of fieldValues.entries()) {
                const currentCheckbox = document.getElementById(valueName + "Checkbox");
                if (currentCheckbox && currentCheckbox.checked) {
                    currentCheckbox.checked = false;
                }
            }  
        }
        apiFields[fieldName === "Playing Music"? "music" : fieldName.toLowerCase()] = currentArray;
    }

    if(getSaved) {
        getUser();
    }

    let checkTimeArray = [];
    for (let name of timeFields) {
        const currentCheckbox = document.getElementById(name + "-time-checked");
        if (currentCheckbox && currentCheckbox.checked) {
            checkTimeArray.push(name);
            timeChecked = true;
        }
    }

    if (!validInputs()) {
        return;
    } else {
        const apiBody = JSON.stringify(apiFields);
        fetch(apiUrl + `${userId}/filter`, {
            method: "POST",
            headers: apiHeader,
            body: apiBody
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                removeChildren();
                let newUsers = json.users;
                if(getSaved) {
                    users = [];
                }
                else {
                    newUsers = filterTime(checkTimeArray, newUsers);
                }
                for (filteredUser of newUsers) {
                    if(getSaved){
                        if(myUser.savedUsers.includes(filteredUser._id)) {
                            users.push(filteredUser);
                        }
                    }
                    else {
                        users = newUsers;
                    }
                }
                maxPage = findMaxPage(users.length);
                setPage();
                setPageButtonColors();
                setTotalPageNumber();
                if (newUsers.length === 0) {
                    showEmptyText();
                }
                constructList();
            })
    }

};

function filterTime(checkTimeArray, jsonUsers) {
    let newUsers = [];
    let keepUserIndex = {};
    if (checkTimeArray.length === 0) {
        return jsonUsers;
    }

    for (let name of checkTimeArray) {
        let jsonFieldName = "bedtime";
        if (name === "Wake-up") {
            const jsonFieldName = "wakeup";
        }
        keepUserIndex[jsonFieldName] = [];
        let fromInput = document.getElementById(name + "-time-input-from");
        let toInput = document.getElementById(name + "-time-input-to");
        let fromInputArray = parseTime(fromInput.value);
        let toInputArray = parseTime(toInput.value);
        const validHours = buildHourArray(fromInputArray[0], toInputArray[0]);
        // splice removes an item at an index
        for(let i = 0; i < jsonUsers.length; i++) {
            currUser = jsonUsers[i];
            startJsonField = currUser[jsonFieldName + "Start"];
            endJsonField = currUser[jsonFieldName + "End"];
            if (startJsonField === "" || endJsonField === "") {
                continue;
            }
            const currStart = parseTime(startJsonField);
            const currEnd = parseTime(endJsonField);
            const currUserHours = buildHourArray(currStart[0], currEnd[0]);
            for(let j = 0; j < 24; j++) {
                if (validHours[j] === true && currUserHours[j] === true) {
                    if (fromInput[0] === toInput[0]) {
                        if (fromInput[1] > currStart[1] || toInput[1] < currEnd[1]) {
                            continue; // this doens't count keep looking
                        }
                    } else if (j === fromInputArray[0] && fromInput[1] > currStart[1]) {
                        continue;
                    } else if (j === toInputArray[0] && toInput[1] < currEnd[1]) {
                        continue;
                    }
                    keepUserIndex[jsonFieldName].push(i);
                    break;
                }
            }
        }
    }

    if (checkTimeArray.length === 2) {
        for (index1 of keepUserIndex["bedtime"]) {
            for (index2 of keepUserIndex["wakeup"])
            if (index1 === index2){
                newUsers.push(jsonUsers[index1]);
            }
        }
    } else {
        for (let key in keepUserIndex) {
            for (index of keepUserIndex[key]) {
                newUsers.push(jsonUsers[index]);
            }
        }
    }
    
    return newUsers;
}

function parseTime(timeField) {
    let timeArray = timeField.split(":");
    timeArray[0] = parseInt(timeArray[0]);
    timeArray[1] = parseInt(timeArray[1]);
    return timeArray;
}

function buildHourArray(start, end) {
    let validHours = [];
    for(let i = 0; i < 24; i++) {
        validHours.push(false);
    }
    if (isNaN(start) || isNaN(end)) {
        return validHours;
    }
    let current = start;
    while(current != end) {
        validHours[current] = true;
        current = (current + 1) % 24;
    }
    validHours[end] = true;
    return validHours;
}

function getUser() {
    const fetchUrl = (userId !== null && userId !== "null")? apiUrl + userId : apiUrl;
    fetch(fetchUrl, {
        method: "GET",
        headers: apiHeader
    })
        .then(response => {
            return response.json();
        })
        .then(json => {
            if (json.success) {
                myUser = json.user;
            } else {
                myUser = null;
            }
            constructList();
        })
        .catch(err => {
            console.log(err);
            myUser = null;
        })
}