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
let pageNum = 0;
let maxPage = 0;
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");
let prevGray = false;
let nextGray = false;
const totalPages = document.getElementById("total-number-pages");
let pageInput = document.getElementById("page-number-input");
const errorPageControls = document.getElementsByClassName("error-page-controls");
let errorMessageDisplayed = false;

const userTile = (user) => {
    const tile = document.createElement('div');
    tile.className = 'user-tile';

    tile.appendChild(profilePicture(user.picUrl));

    tile.appendChild(userInfo(user));

    if(myUser){
        if(myUser.savedUsers.includes(user._id)){
            tile.appendChild(saveIndicate(user));
        }
    }

    tile.addEventListener('click', () => {
        localStorage.setItem('clickedUserId', user._id);
        const profilePage = window.open('../userProfile/userProfile.html', '_blank');
        profilePage.focus();
    })

    return tile;
}

const profilePicture = (picUrl) => {
    const profPic = document.createElement('img');
    profPic.src = picUrl;

    const profPicWrapper = document.createElement('div');
    profPicWrapper.className = 'profile-picture-wrapper';

    function handleResizing() {
        if (profPic.naturalHeight > profPic.naturalWidth) {
            profPic.height = profPicWrapper.offsetHeight;
            profPic.width = profPic.height * (profPic.naturalWidth / profPic.naturalHeight);
        } else {
            profPic.width = profPicWrapper.offsetWidth;
            profPic.height = profPic.width * (profPic.naturalHeight / profPic.naturalWidth);
        }
    }

    profPic.onerror = () => {
        profPic.src = defaultIcon;
    }

    profPic.onload = () => {
        handleResizing();
    }

    profPicWrapper.appendChild(profPic);
    return profPicWrapper;
}

const saveIndicate = (user) => {
    const star = document.createElement("div");
    star.id = "save-star"
    if(myUser.savedUsers.includes(user._id)){
        star.innerHTML = "<i class=\"material-icons\">star</i>";
    }

    return star;
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
                    getUser();
                    //constructList();
                    maxPage = findMaxPage(users.length);
                    setPageButtonColors();
                    setTotalPageNumber();
                    setPage();
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
        maxPage = findMaxPage(users.length);
        setPageButtonColors();
        setTotalPageNumber();
        setPage();
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

function findMaxPage(len) {
    val = Math.floor(len  / 10);
    if (len % 10 == 0) {
        val = val -1
    }
    return val;
}

function setPage() {
    if (maxPage === -1) {
        pageInput.value = 0;
        pageNum = -1;
    } else {
        pageInput.value = 1;
        pageNum = 0;
    }
}

function prevPage() {
    if (pageNum > 0) {
        pageNum--;
        pageInput.value = pageNum + 1;
        constructList();
        setPageButtonColors();
        if (errorMessageDisplayed) {
            toggleErrorMessage();
        }
    }
}

function nextPage() {
    if (pageNum < maxPage) {
        pageNum++;
        pageInput.value = pageNum + 1;
        constructList();
        setPageButtonColors();
        if (errorMessageDisplayed) {
            toggleErrorMessage();
        }
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
            if (!errorMessageDisplayed) {
                toggleErrorMessage();
            }
        } else {
            pageNum = newPageNum;
            constructList();
            setPageButtonColors();
            if (errorMessageDisplayed) {
                toggleErrorMessage();
            }
        } 
    }
}

function toggleErrorMessage() {
    errorPageControls[0].classList.toggle("error-page-controls-displayed");
    errorMessageDisplayed = !errorMessageDisplayed;
}

function stayAtPage() {
    pageInput.value = pageNum + 1;
    if (errorMessageDisplayed) {
        toggleErrorMessage();
    }
}