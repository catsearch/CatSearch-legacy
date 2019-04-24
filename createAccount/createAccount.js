const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

const apiUrl = 'http://localhost:8080/auth/createAccount'
const apiHeader = {"Content-Type": "application/json"}

submit.addEventListener("click", () => {
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
                return response.json()
            })
            .then(json => {
                console.log(json.message);
            })
            .catch(err => {
                console.log(err);
            })
    }
});

const validInputs = () => {
    if (email.value === "" || password.value === "") {
        console.log("Empty Field(s)")
        return false;
    }
    if (password.value.length < 8) {
        console.log("Password must be at least 8 characters in length.")
        return false;
    }
    //you can see I hate regex
    if (!email.value.endsWith('u.northwestern.edu')) {
        return false;
    }
    const emailPrefix = email.value.split('u.northwestern.edu')[0];
    if (!emailPrefix.endsWith('@')) {
        return false;
    }
    return true
}