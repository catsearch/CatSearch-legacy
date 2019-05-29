const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
const errorText = document.getElementById("error-text");

const apiUrl = 'http://localhost:8080/auth/login/'
const apiHeader = {"Content-Type": "application/json"}

submit.addEventListener('click', function() {
    login();;
});

function login() {
    if (!validInputs()) {
        return;
    } else {
        const apiBody = JSON.stringify({
            email: email.value,
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
                    localStorage.setItem('userId', json._id);
                    window.location.href = '../mainPage/mainPage.html';
                } else {
                    console.log("Login unsuccessful.");
                    showErrorText("Incorrect email or password");
                }
            })
            .catch(err => {
                console.log(err);
                showErrorText("Incorrect email or password");
            })
    }
}

const validInputs = () => {
    if (email.value === "" || password.value === "") {
        console.log("Empty Field(s)");
        showErrorText("Empty Field(s)");
        return false;
    }
    return true
}

email.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      login();
    }
});

password.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      login();
    }
});

const hideErrorText = () => {errorText.style.display = "none";}
email.addEventListener("focus", hideErrorText);
password.addEventListener("focus", hideErrorText);

function showErrorText(message) {
    errorText.style.display = "inherit";
    errorText.innerHTML = message;
}

document.getElementById("createAccount").addEventListener("click", () => {
    window.location = "../createAccount/createAccount.html";
})

document.getElementById("goToMain").addEventListener("click", () => {
    window.location = "../mainPage/mainPage.html";
})