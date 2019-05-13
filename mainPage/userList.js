const userTiles = document.getElementById('user-tiles');
const users = sessionStorage.getItem("users");
const userId = getCookie("userId");

const apiUrl = 'http://localhost:8080/user/'
const apiHeader = {"Content-Type": "application/json"}

//add in message if no users are found

const userTile = (user) => {
    const tile = document.createElement('div');
    tile.className = 'user-tile';

    tile.appendChild(profilePicture(user.picUrl));
    tile.appendChild(userInfo(user));

    tile.addEventListener('click', () => {
        const profilePage = window.open('../userProfile/userProfile.html', '_blank');
        profilePage.focus();
    })
    //make visibility with mouseover

    return tile;
}

const profilePicture = (picUrl) => {
    const profPic = document.createElement('img');
    profPic.className = 'profile-picture';
    profPic.src = picUrl;
    return profPic;
}

const userInfo = (user) => {
    const container = document.createElement('div');
    container.className = 'user-info';

    container.appendChild(userHeader(user.firstName, user.lastName));
    container.appendChild(userBlurb(user.blurb));
    return container;
}

const userHeader = (firstName, lastName) => {
    const container = document.createElement('div');
    container.className = 'user-header';
    container.innerHTML = `${firstName} ${lastName}`;
    return container;
}

const userBlurb = (blurb) => {
    const container = document.createElement('div');
    container.className = 'user-blurb';
    container.innerHTML = (blurb.length < 360) ? blurb : blurb.substring(0, 358) + "...";
    return container;
}

function init() {
    if (userId === "") {
        window.open('../login/login.html')
        return;
    }
    if (!users) {
        fetch(apiUrl + `${userId}/others`, {
            method: "GET",
            headers: apiHeader
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json.message);
                if (json.success) {
                    users = json;
                } else {
                    //there are no users!
                }
            })
            .catch(err => {
                console.log(err);
                return;
            })
    }
    for (user of users) {
        const newTile = userTile(user);
        userTiles.appendChild(newTile);
    }
}

init();