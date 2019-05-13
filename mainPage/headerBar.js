const headerMenu = document.getElementById("header-dropdown-content");
const searchBar = document.getElementById("search-bar");
const dropdownText = document.getElementById("header-dropdown-text");

let mouse = false;

// search: backend call, not implemented
function search() {
    if (searchBar.value === "") {
        users = null;
        getUsers();
    } else {
        const apiBody = JSON.stringify({
            text: searchBar.value
        });
        fetch(apiUrl + `${userId}/search`, {
            method: "POST",
            headers: apiHeader,
            body: apiBody
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json.success) {
                    console.log(json.users);
                    users = json.users;
                    getUsers();
                } else {
                    //rip
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

function mouseStatus(n) {
     mouse = n;
}

// closeDropdown: closes dropdown if open and mouse is not over the dropdown
// Called when click off the dropdown
function closeDropdown() {
    if (!mouse){
        if (headerMenu.style.display === "block") {
            headerMenu.style.display = "none";
        }
    }
}

// toggleDropdown: open or close dropdown menu
// Called when clicking on actual text
function toggleDropdown() {
    if (headerMenu.style.display === "block"){
        headerMenu.style.display = "none";
    }
    else {
        headerMenu.style.display = "block"; 
    }
}

searchBar.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      search();
    }
});

if (localStorage.getItem("userId")) {
    fetch(apiUrl + localStorage.getItem("userId"), {
        method: "GET",
        headers: apiHeader
    })
        .then(user => {
            dropdownText.innerHTML = `<u>${user.firstName ? user.firstName : "User"}</u> &#x25BE`;
        })
        .catch(err => {
            console.log(err);
            dropdownText.innerHTML = `<u>User</u> &#x25BE`;
        })
}
