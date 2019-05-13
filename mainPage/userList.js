const userTiles = document.getElementById('user-tiles');

const genericPic = "data:image/png;base64,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";
let users = [
    {
        firstName: "Cooper",
        lastName: "Barth",
        picUrl: genericPic,
        blurb: "This is NOT Michael Ji. Don't even FUCKING THINK about calling me Michael Ji or I swear to FUCKING god i will dropkick you into the sun. This part is just filler text now to see if my code works, but it's still unforgivable to think that you would even have the BALLS to call me Michael Ji."
    },
];
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

function buildList() {
    for (user of users) {
        const newTile = userTile(user);
        userTiles.appendChild(newTile);
    }
}

buildList();