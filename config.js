const environment = "production";

const config = {
    "development": "http://localhost:8081/",
    "production": "https://catsearch-server.herokuapp.com/"
}

const authRoute = `${config[environment]}auth/`
const userRoute = `${config[environment]}user/`