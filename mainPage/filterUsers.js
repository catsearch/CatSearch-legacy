const filterButton = document.getElementById('filter-button');

let users = sessionStorage.getItem("users");
const userId = localStorage.getItem("userId");
const apiUrl = 'http://localhost:8080/user/';
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
    "Smoking" : ["Smoking", "No"],
    "Playing Music" : ["Often", "Sometimes", "Never"]
}

const timeElement = document.getElementById("filter-time");
const timeFields = ["Bedtime", "Wake-Up"];
/*
function buildYearList() {
    const yearLabel = document.getElementById("filter-year-label");
    yearLabel.innerHTML = "Year";
    const yearHTML = document.getElementById("filter-year-select");
    for (let [i, yr] of yearList.entries()) {
        let yearOption = document.createElement("option");
        yearOption.setAttribute("value", i);
        yearOption.innerHTML += yr;
        yearHTML.appendChild(yearOption);
    }
    yearElement.appendChild(yearHTML);
}
*/

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
    console.log(elem.getAttribute("id") + "-right");
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

function filter() {
    let apiFields = {};
    /*
    const yearSelect = document.getElementById("filter-year-select");
    const selectedField = yearSelect.options[yearSelect.selectedIndex].text;
    if (selectedField !== "Select year:") {
        apiFields["year"] = selectedField;
    }
    */

    for (let [fieldName, fieldValues] of Object.entries(filterFields)) {
        for (let [num, valueName] of fieldValues.entries()) {
            const currentCheckbox = document.getElementById(valueName + "Checkbox");
            if (currentCheckbox && currentCheckbox.checked) {
                apiFields[valueName.toLowerCase()] = true;
            }
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
                for (user of json.users) {
                    const newTile = userTile(user);
                    userTiles.appendChild(newTile);
                }
            })
    }
};