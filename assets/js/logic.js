var timeAllocated = questions.length * 10;
var timerOnStartElement = document.getElementById("time");
var time = timeAllocated;
var startBtn = document.getElementById("start");
var questionsIndex = 0;
var score = 0;
var choiceIsSelected = false;
var allAnchorElements = document.querySelector("a");

function asksQuestion() {
    var questionTitleElement = document.getElementById("question-title");
    var questionObj = questions[questionsIndex];
    questionTitleElement.innerHTML = questionObj.question;
    generateChoices(questionObj);
    choiceIsSelected = false;
}

function generateChoices(questionObj) {
    var choicesElement = document.getElementById("choices");
    for (var choice of questionObj.choices) {
        var inputBtn = document.createElement("button");
        var choiceBtn = choicesElement.appendChild(inputBtn);
        choiceBtn.setAttribute("value", choice);
        choiceBtn.innerText = choice;
    }
}

function givesFeedback(choiceIsCorrect) {
    var feedbackElement = document.getElementById("feedback");
    var noAudioElementFound = document.getElementById("feedback-audio") === null;
    if (noAudioElementFound) {
        var audioElement = document.createElement("audio");
        console.log(audioElement);
        audioElement.setAttribute("id", "feedback-audio");
    } else {
        var audioElement = document.getElementById("feedback-audio");
    }
    if (choiceIsCorrect) {
        feedbackElement.innerText = "Correct!";
        console.log(document.getElementById("feedback-audio"));
        audioElement.setAttribute("src", "assets/sfx/correct.wav");
        audioElement.play();
    } else {
        feedbackElement.innerText = "Wrong!";
        audioElement.setAttribute("src", "assets/sfx/incorrect.wav");
        audioElement.play();
    }
    feedbackElement.classList.remove("hide");
    setTimeout(function () {
        feedbackElement.classList.add("hide");
    }, 9000);
}

allAnchorElements.addEventListener("click", function (event) {
    var linkIsclicked = confirm("Are you sure you want to leave? Any progress will be lost!");
    if (!linkIsclicked) {
        event.preventDefault();
    }
})


startBtn.addEventListener("click", function () {
    var startScreen = document.getElementById("start-screen");
    console.log("tests event listen on start button");
    startScreen.classList.add("hide");
    console.log(questions);
    var questionsElement = document.getElementById("questions");
    questionsElement.classList.remove("hide");
    var timer = setInterval(function () {
        var timerElement = document.getElementById("time");
        timerElement.innerHTML = time - 1;
        time--;
        console.log(`time: ${time}`)
        if (time <= 0) {
            clearTimeout(timer);
            questionsElement.classList.add("hide");
            var endScreenElement = document.getElementById("end-screen");
            endScreenElement.classList.remove("hide");
            timerElement.innerHTML = 0;
            var finalScoreElement = document.getElementById("final-score");
            if (choiceIsSelected) {
                finalScoreElement.innerText = score;
            } else {
                finalScoreElement.innerText = "0 🦉";
                finalScoreElement.setAttribute("style", "animation: grow 60s ease-out infinite")
                score = 0;
            }
        }
    }, 1000);
    asksQuestion();
});

var choicesElement = document.getElementById("choices");
choicesElement, addEventListener("click", function (event) {
    console.log(event);
    var questionObj = questions[questionsIndex];
    console.log(questionObj.answer);
    var buttonClicked = (event.target.tagName.toLowerCase() === "button") &&
        event.path[1].className === "choices";
    var choiceIsCorrect = event.target.value === questionObj.answer;
    var isLastQuestion = questionsIndex === questions.length - 1;
    if (isLastQuestion && buttonClicked && choiceIsCorrect) {
        choiceIsSelected = true;
        console.log("button - choice is correct + last question");
        choicesElement.innerHTML = ``;
        score = time;
        console.log(`score is ${score}`);
        givesFeedback(choiceIsCorrect)
        time = 0;
    } else if (isLastQuestion && buttonClicked && !choiceIsCorrect) {
        choiceIsSelected = true;
        console.log("button - choice is correct + last question");
        choicesElement.innerHTML = ``;
        time -= 10;
        score = time;
        console.log(`score is ${score}`);
        givesFeedback(choiceIsCorrect)
        time = 0;
    } else if (buttonClicked && choiceIsCorrect) {
        choiceIsSelected = true;
        console.log("button - choice is correct");
        choicesElement.innerHTML = ``;
        score = time;
        console.log(`score is ${score}`);
        givesFeedback(choiceIsCorrect)
        questionsIndex++;
        asksQuestion();
    } else if (buttonClicked && !choiceIsCorrect) {
        choiceIsSelected = true;
        console.log("button - choice is wrong");
        time -= 10;
        choicesElement.innerHTML = ``;
        score = time;
        console.log(`score is ${score}`);
        givesFeedback(choiceIsCorrect)
        questionsIndex++;
        asksQuestion();
    } if (score < 0) {
        score = 0;
    }
});

var submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function (event) {
    console.log("submit is working");
    var userInitials = document.getElementById("initials");
    var initials = userInitials.value;
    var noHiscoresDataFound = localStorage.getItem("hiscoresData") === null;
    if (noHiscoresDataFound) {
        var hiscoresData = [];
        console.log("no data found")
    } else {
        var hiscoresData = JSON.parse(localStorage.getItem("hiscoresData"));
        console.log("hiscores found");
    }
    var hiscoresDataObj = [{
        initials: initials,
        score: score
    }];
    hiscoresData.push(hiscoresDataObj)
    var hiscoresDataString = JSON.stringify(hiscoresData);
    console.log(hiscoresData);
    localStorage.setItem("hiscoresData", hiscoresDataString);
    location.href = "highscores.html";
});

timerOnStartElement.innerText = timeAllocated; 
