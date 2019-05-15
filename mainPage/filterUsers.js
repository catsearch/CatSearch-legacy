const filterButton = document.getElementById('filterButton');

let users = sessionStorage.getItem("users");
const userId = localStorage.getItem("userId");
const apiUrl = 'http://localhost:8080/user/';
const apiHeader = {"Content-Type": "application/json"};

const yearElement = document.getElementById('filter-year');
const yearList = ["Select year:", "2021", "2022", "2023", "2024", "2025"]

const checkboxesElement = document.getElementById('filter-checkboxes')
const filterFields = {
    "Gender" : ["Male", "Female", "Other"],
    "School" : ["Bienen", "McCormick", "Medill", "SESP", "SoC", "WCAS"],
    "Area" : ["North", "Mid", "South"],
    "Cleanliness" : ["High", "Medium", "Low"],
    "Smoking" : ["Smoking", "Non-Smoking"],
    "Playing Music" : ["Often", "Sometimes", "Never"]
}

const timeElement = document.getElementById("filter-time");
const timeFields = ["Bedtime", "Wake-Up"];

function buildYearList() {
    yearHTML = document.createElement("select");
    yearHTML.setAttribute("class","filter-year-select");
    for (let [i, yr] of yearList.entries()) {
        let yearOption = document.createElement("option");
        yearOption.setAttribute("value", i);
        yearOption.innerHTML += yr;
        yearHTML.appendChild(yearOption);
    }
    yearElement.appendChild(yearHTML);
}

function buildFilterCheckboxes() {
    for (let [fieldName, fieldValues] of Object.entries(filterFields)) {
        let fieldHTML = document.createElement("button");
        fieldHTML.setAttribute("class", "filter-collapsible");
        fieldHTML.innerHTML += fieldName;
        let fieldSection = document.createElement("div");
        fieldSection.setAttribute("class", "field-collapsible-content");
        for (let [num, valueName] of fieldValues.entries()) {
            checkboxes = document.createElement("label");
            checkboxes.setAttribute("class", "filter-container");
            let checkboxesChild = document.createElement("input");
            checkboxesChild.setAttribute("type", "checkbox");
            checkboxes.appendChild(checkboxesChild);
            checkboxes.innerHTML += valueName;
            fieldSection.appendChild(checkboxes);
        }
        checkboxesElement.appendChild(fieldHTML);
        checkboxesElement.appendChild(fieldSection);
    }
}

function buildTimeFields(){
    for (let name of timeFields){
        let timeSection = document.createElement("div");
        timeSection.setAttribute("class", "filter-time-sections");
        let timeLabel = document.createElement("label");
        timeLabel.setAttribute("class", "time-label");
        timeLabel.innerHTML += name;
        let timeInput = document.createElement("input");
        timeInput.setAttribute("type", "time");
        if (name === "Bedtime") {
            timeInput.defaultValue = "00:00";
        } else {
            timeInput.defaultValue = "10:00";
        }
        timeSection.append(timeLabel);
        timeSection.append(timeInput);
        timeElement.appendChild(timeSection);
    }
}

const validInputs = () => {

}

/*filterButton.addEventListener("click", () => {
    if (!validInputs()) {
        return;
    } else {
        const apiBody = JSON.stringify({
            fieldName: yearElement.value
        });
        fetch(apiUrl + "filter", {
            method: "POST", 
            headers: apiHeader,
            body: apiBody
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                
            })
    }
});*/


function init() {
    buildYearList();
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