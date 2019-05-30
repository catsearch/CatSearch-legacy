const userTiles = document.getElementById('user-tiles');
const defaultIcon = "../resources/DefaultProfile.png";
const defaultUsers = [
    {
        name: "Cooper Barth",
        blurb: "This is Cooper's blurb! Isn't it nice?",
        picUrl: "",
        _id: "asdfjkl123456789"
    },
    {
        name: "Michael Ji",
        blurb: "This is Michael's blurb! Isn't it nice?",
        picUrl: "",
        _id: "asdfjkl123456789"
    },
    {
        name: "Beth Mallon",
        blurb: "This is Beth's blurb! Isn't it nice?",
        picUrl: "",
        _id: "asdfjkl123456789"
    },
    {
        name: "Sanfeng Wang",
        blurb: "This is Sanfeng's blurb! Isn't it nice?",
        picUrl: "",
        _id: "asdfjkl123456789"
    },
    {
        name: "Armaan Dhingra",
        blurb: "This is Armaan's blurb! Isn't he nice?",
        picUrl: "",
        _id: "asdfjkl123456789"
    },
    {
        name: "Michael Horn",
        blurb: "This is Michael's blurb! Isn't it nice?",
        picUrl: "",
        _id: "asdfjkl123456789"
    },
]

const userTile = (user) => {
    const tile = document.createElement('div');
    tile.className = 'user-tile';

    tile.appendChild(profilePicture(user.picUrl));
    tile.appendChild(userInfo(user));

    tile.addEventListener('click', () => {
        localStorage.setItem('clickedUserId', user._id);
        const profilePage = window.open('../userProfile/userProfile.html', '_blank');
        profilePage.focus();
    })

    return tile;
}

const profilePicture = (picUrl) => {
    const profPic = document.createElement('img');
    profPic.className = 'profile-picture';
    profPic.src = picUrl;
    profPic.onerror = () => {
        profPic.src = defaultIcon;
    }

    return profPic;
}

const userInfo = (user) => {
    const container = document.createElement('div');
    container.className = 'user-info';

    const name = user.name ? user.name : user.email;
    container.appendChild(userHeader(name));

    const blurb = user.blurb ? user.blurb : "This user has not added a blurb yet.";
    container.appendChild(userBlurb(blurb));

    return container;
}

const userHeader = (userName) => {
    const container = document.createElement('div');
    container.className = 'user-header';
    container.innerHTML = userName;
    return container;
}

const userBlurb = (blurb) => {
    const container = document.createElement('div');
    container.className = 'user-blurb';
    container.innerHTML = (blurb.length < 360) ? blurb : blurb.substring(0, 358) + "...";
    return container;
}

function removeChildren() {
    while (userTiles.hasChildNodes()) {
        userTiles.removeChild(userTiles.childNodes[0]);
    }
}

function constructList() {
    removeChildren();
    for (user of users) {
        const newTile = userTile(user);
        userTiles.appendChild(newTile);
    }
}

function constructSampleList() {
    removeChildren();
    for (user of defaultUsers) {
        const newTile = userTile(user);
        userTiles.appendChild(newTile);
    }
}

function getUsers() {
    if (!users && users != []) {
        const fetchUrl = (userId !== "null" && userId !== null) ? `${apiUrl + userId}/others` : apiUrl;
        fetch(fetchUrl, {
            method: "GET",
            headers: apiHeader
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json.success) {
                    users = json.users;
                } else {
                    //there are no users!
                }
            })
            .then(() => {
                if (users.length !== 0) {
                    constructList();
                } else {
                    console.log("You deleted this user via Postman but didn't log out first :(");
                    constructSampleList();
                }
            })
            .catch(err => {
                console.log(err);
                constructSampleList();
                return;
            })
    } else if (users == []) {
        console.log("There are no users with those filters.");
    } else {
        constructList();
    }
}

let externalSearch = localStorage.getItem("externalSearch");
if (externalSearch !== null) {
    search();
    localStorage.removeItem("externalSearch");
    externalSearch = null;
} else {
    getUsers();
}