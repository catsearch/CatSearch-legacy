const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

const apiUrl = 'http://localhost:8080/auth/login/'
const apiHeader = {"Content-Type": "application/json"}

submit.addEventListener('click', () => {
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
                    console.log("Login unsuccessful.")
                }
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
    return true
}