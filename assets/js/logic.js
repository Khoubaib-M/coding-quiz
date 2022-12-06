var questionWrap = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var startScreen = document.querySelector("#start-screen");
var choices = document.querySelector("#choices");
var startBtn = document.querySelector("#start");

function countDown(timerSec) {

    var interVal = setInterval(function () {
        var timerUpdate = doc.querySelector('#time');
        timerUpdate.innerText = timerSec;
        if (timerSec == 0) {
            clearInterval(interVal);
        };
        timerSec--;
    }, 1000
    );
}

var click = true;
choices.addEventListener('click', function (e) {
    if (click) {
        ChoiceIndex = currentIndex;
        userSelection(e);
        setTimeout(() => {
            currentIndex++;
            presentQuiz(currentIndex);
        }, 1000);
    }
});

function presentQuiz(currIndex) {

    var questionWrap = doc.querySelector("#questions");
    var startScreen = doc.querySelector("#start-screen");
    var questionTitle = doc.querySelector("#question-title");

    for (var i = 0; i < questions[currIndex].choices.length; i++) {

        questionTitle.innerText = questions[currIndex].title;

        var btn = doc.createElement('BUTTON');
        btn.setAttribute("class", "userChoice");
        btn.setAttribute("data-choice", questions[currIndex].choices[i]);
        btn.innerText = i + 1 + " " + questions[currIndex].choices[i];
        console.log("array obj index " + currIndex);
        choices.append(btn);
    }
    questionWrap.classList.remove("hide");
    startScreen.classList.add('hide');
}

function userSelection(e) {
    var clickFeedBack;
    if (e.target) {
        var userClicpResult = e.target;
        clickFeedBack = userClicpResult.dataset.choice;
        console.log("this is user feeback from userSelection e " + clickFeedBack);
    }
    userFeedback(clickFeedBack);
}