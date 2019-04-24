const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

const apiUrl = 'http://localhost:8080/auth/login'
const apiHeader = {"Content-Type": "application/json"}

submit.addEventListener('click', () => {
    if (email.value === "" || password.value === "") {
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
            .then((response) => {
                console.log(response.body);
            })
            .catch((err) => {
                console.log(err);
            })
    }
});