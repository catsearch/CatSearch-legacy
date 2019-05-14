const email = document.getElementById("email");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const errorText = document.getElementById("error-text");
const submit = document.getElementById("submit");
const login = document.getElementById("login");

const apiUrl = 'http://localhost:8080/auth/createAccount/'
const apiHeader = {"Content-Type": "application/json"}

submit.addEventListener("click", () => {
    if (invalidInputs()) {return;}
    const apiBody = JSON.stringify({
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value
    });
    fetch(apiUrl, {
        method: "POST", 
        headers: apiHeader,
        body: apiBody
    })
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json.message);
            if (json.success) {
                window.location.href = '../login/login.html';
            } else {
                showErrorText("Account creation was unsuccessful.");
            }
        })
        .catch(err => {
            console.log(err);
        })
});

const hideErrorText = () => {errorText.style.display = "none";}
email.addEventListener("focus", hideErrorText);
password.addEventListener("focus", hideErrorText);

function showErrorText(message) {
    errorText.style.display = "inherit";
    errorText.innerHTML = message;
}

const invalidInputs = () => {
    const e = email.value;
    const p = password.value;
    if (e === "" || p === "" || firstName.value === "" || lastName.value === "") {
        showErrorText("Empty Field(s).");
        return true;
    }
    if (!e.endsWith('@u.northwestern.edu')) {
        showErrorText("Email must be a valid Northwestern email.");
        return true;
    }
    if (p.length < 8) {
        showErrorText("Password must be at least 8 characters in length.");
        return true;
    }
    const alphabetRegex = new RegExp('^[a-zA-Z]+$');
    if (p === p.toLowerCase() || p === p.toUpperCase() || alphabetRegex.test(p)) {
        showErrorText("Password must contain a combination of uppercase and lowercase letters and at least one non-letter character.");
        return true;
    }
    return false;
}

login.addEventListener("click", () => {
    window.location = "../login/login.html";
})