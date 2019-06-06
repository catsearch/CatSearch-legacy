const email = document.getElementById("email");
const name = document.getElementById("name");
const password = document.getElementById("password");
const errorText = document.getElementById("error-text");
const submit = document.getElementById("submit");
const login = document.getElementById("login");

const apiUrl = `${authRoute}createAccount`;
const apiHeader = {"Content-Type": "application/json"};

submit.addEventListener('click', function() {
    createAccount();
});

function createAccount() {
    if (invalidInputs()) {return;}
    submit.disabled = true;
    const apiBody = JSON.stringify({
        email: email.value,
        name: name.value,
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
            submit.disabled = false;
            if (json.success) {
                localStorage.setItem('userId', json._id);
                window.location.href = '../myProfile/myProfile.html';
            } else {
                showErrorText("Account creation was unsuccessful.");
            }
        })
        .catch(err => {
            submit.disabled = false;
            console.log(err);
        })
}

name.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      createAccount();
    }
});

email.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      createAccount();
    }
});

password.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      createAccount();
    }
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
    if (e === "" || p === "" || name.value === "") {
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