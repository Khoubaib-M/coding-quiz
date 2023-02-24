var hiscoresBtn = document.getElementById("clear");

function searchForHiscoresData() {
    var hiscoresLocalStorage = JSON.parse(localStorage.getItem("hiscoresData"));
    var hiscoresDataExists = (hiscoresLocalStorage !== null);
    if (hiscoresDataExists) {
        generateHiscores(hiscoresLocalStorage);
    } else {
        console.log("local storage data does not exist.");
    }
}

function generateHiscores(hiscoresLocalStorage) {
    hiscoresLocalStorage.sort(function (a, b) {
        console.log(a[0].score - b[0].score);
        return b[0].score - a[0].score
    });
    console.log(hiscoresLocalStorage);

    for (var hiscoresObj of hiscoresLocalStorage) {
        hiscoresObj = hiscoresObj[0];
        console.log(hiscoresObj);
        var orderedListElement = document.getElementById("highscores");
        var newListItem = document.createElement("li");
        var initialsGiven = (hiscoresObj.initials.length > 0);
        if (initialsGiven) {
            newListItem.innerText = `${hiscoresObj.initials} - ${hiscoresObj.score}`;
        } else {
            newListItem.innerText = `anonymous submission - ${hiscoresObj.score}`;
        }
        orderedListElement.appendChild(newListItem);
    }
}

hiscoresBtn.addEventListener("click", function (event) {
    console.log(event);
    localStorage.clear();
    location.reload();
})

searchForHiscoresData();