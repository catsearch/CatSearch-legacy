const filterButton = document.getElementById('filterButton');

const apiUrl = 'http://localhost:8080/auth/user/';
const apiHeader = {"Content-Type": "application/json"};

const userTile = (userInfo) => {
    const tile = document.createElement('div');
    tile.className = 'user-tile'
}

const validInputs = () => {

}

filterButton.addEventListener("click", () => {
    if (!validInputs()) {
        return;
    } else {
        const apiBody = JSON.stringify({
            //fieldName: elementName.value
        });
        fetch(apiUrl + "filter", {
            method: "POST", 
            headers: apiHeader,
            body: apiBody
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                
            })
    }
});

function buildList() {

}

buildList();