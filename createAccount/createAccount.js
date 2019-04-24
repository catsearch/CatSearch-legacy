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
    const e = email.value;
    const p = password.value;
    if (e === "" || p === "") {
        console.log("Empty Field(s)")
        return false;
    }
    if (!e.endsWith('u.northwestern.edu')) {
        return false;
    }
    const emailPrefix = e.split('u.northwestern.edu')[0];
    if (!emailPrefix.endsWith('@')) {
        return false;
    }
    if (p.length < 8) {
        console.log("Password must be at least 8 characters in length.")
        return false;
    }
    const alphabetRegex = new RegExp('^[a-zA-Z]+$');
    if (p === p.toLowerCase() || p === p.toUpperCase() || alphabetRegex.test(p)) {
        console.log(p === p.toLowerCase(), p === p.toUpperCase(), alphabetRegex.test(p));
        console.log("Password must contain a combination of uppercase and lowercase letters and contain at least one non-letter character.")
        return false;
    }
    return true
}