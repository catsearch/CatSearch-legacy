const userList = document.getElementById("user-list");
let users = []; //array of user objects

const userTile = (user) => {
    const tile = document.createElement('div');
    tile.className = 'user-tile';
    //add info
    return tile;
}

function buildList() {
    for (user of users) {
        const newTile = userTile(user);
        userList.appendChild(newTile);
    }
}

function init() {
    buildList();
}
init();