const userTiles = document.getElementById('user-tiles');
const defaultIcon = "data:image/png;base64,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";
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
let pageNum = 0;
let maxPage = 0;
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");
let prevGray = false;
let nextGray = false;
const totalPages = document.getElementById("total-number-pages");
let pageInput = document.getElementById("page-number-input");

const userTile = (user) => {
    const tile = document.createElement('div');
    tile.className = 'user-tile';

    if (user.picUrl && user.picUrl != "") {
        tile.appendChild(profilePicture(user.picUrl));
    } else {
        tile.appendChild(profilePicture(defaultIcon));
    }
    
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
    let start = pageNum * 10;
    for (let i = start; i < start + 10; i++) {
        if (i >= users.length) {
            break;
        } else {
            const newTile = userTile(users[i]);
            userTiles.appendChild(newTile);
        }
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
                    maxPage = Math.floor(users.length  / 10);
                    setPageButtonColors();
                    setTotalPageNumber();
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
        maxPage = Math.floor(users.length  / 10);
        setPageButtonColors();
        setTotalPageNumber();
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

function prevPage() {
    if (pageNum > 0) {
        pageNum--;
        pageInput.value = pageNum + 1;
        constructList();
        setPageButtonColors();
    }
}

function nextPage() {
    if (pageNum < maxPage) {
        pageNum++;
        pageInput.value = pageNum + 1;
        constructList();
        setPageButtonColors();
    }
}

/// i dunno i just wanna make it obvious if you can click or not
function setPageButtonColors() {
    if (pageNum === 0 && !prevGray) {
        prevButton.classList.toggle("page-buttons-gray");
        prevButton.disabled = true;
        prevGray = true;
    } else if (pageNum > 0 && prevGray) {
        prevButton.classList.toggle("page-buttons-gray");
        prevGray = false;
        prevButton.disabled = false;
    }
    if (pageNum === maxPage && !nextGray) {
        nextButton.classList.toggle("page-buttons-gray");  
        nextGray = true;
        nextButton.disabled = true;
    } else if (pageNum < maxPage && nextGray) {
        nextButton.classList.toggle("page-buttons-gray");
        nextGray = false;
        nextButton.disabled = false;
    }
}

function setTotalPageNumber() {
    totalPages.innerHTML = "of " + (maxPage + 1).toString();
}

function goToPage(event) {
    if (event.keyCode === 13) {
        newPageNum = parseInt(pageInput.value) - 1;
        if (isNaN(newPageNum) || newPageNum < 0 || newPageNum > maxPage) {
            // display an error message
        } else {
            pageNum = newPageNum;
            constructList();
            setPageButtonColors();
        } 
    }
}