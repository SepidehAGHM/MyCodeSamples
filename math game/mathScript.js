/*eslint-env browser*/

//Initialize variables we need!

var playing = false;
var score;
var action;
var timeRemaining;
var correctAns;

//hide an element function

function hide(Id) {
    "use strict";
    document.getElementById(Id).style.display = "none";
}

//show an element function

function show(Id) {
    "use strict";
    document.getElementById(Id).style.display = "block";
}

//set an context to an element function

function setContext(Id, context) {
    "use strict";
    document.getElementById(Id).innerHTML = context;
}

// Still playing

function stillPlaying() {
    //Stop at 0!
    clearInterval(action);

    //Show game over message
    show("gameover");

    // set score to message

    setContext("gameover", "<p>Game Over</p><p> Your Score is " + score + "</p>")
    //document.getElementById("gameover").innerHTML = ;

    //dissapear the timer
    hide("timeremaining");

    hide("wrong");
    hide("correct");
    playing = false;
    setContext("startreset", "Let's Start!");
}

//CountDown timer function

function startCountdown() {
    action = setInterval(function () {
        "use strict";
        timeRemaining -= 1;

        setContext("timeremainingval", timeRemaining);
        if (timeRemaining === 0) {
            //Call Still playing function
            stillPlaying();
        }
    }, 1000);
}

//Generate Q&A

function generateQA() {
    "use strict";
    var x, y, correctPos;
    x = 1 + Math.round(9 * Math.random());
    y = 1 + Math.round(9 * Math.random());
    correctAns = x * y;

    //set question to div
    setContext("question", x + "X" + y);
    correctPos = 1 + Math.round(3 * Math.random());
    setContext("box" + correctPos, correctAns);

    // fill other boxe
    var ans = [correctAns];
    for (var i = 1; i < 5; i++) {
        if (i != correctPos) {
            var wrongAns;
            do {
                wrongAns = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            } while (ans.indexOf(wrongAns) > -1)
            setContext("box" + i, wrongAns);
            ans.push(wrongAns);
        }
    }
}


//Main code!

document.getElementById("startreset").onclick = function () {
    "use strict";
    //if we are playing
    if (playing) {
        location.reload(); //reload page
    } else {
        //if we are not playing
        //change mode to playing

        playing = true;
        score = 0;

        //Set Score
        setContext("scoreVal", score);

        //show timer
        show("timeremaining");
        timeRemaining = 30;
        setContext("timeremainingval", timeRemaining);

        //hide game over message
        hide("gameover");

        //change btn label to reset game
        setContext("startreset", "Reset game");

        //Start count down
        startCountdown();

        generateQA();
    }
};

//Clicking on answer box
document.getElementById("choices").onclick = function (e) {
    //alert("you Clicked" + e.target.getAttribute("id"));
    if (playing) {
        if (e.target.innerHTML == correctAns) {
            score++;
            timeRemaining += 3;
            setContext("scoreVal", score);
            hide("wrong");
            show("correct");
            setTimeout(function () {
                hide("correct");
            }, 1000);

            generateQA();
        } else {
            if (timeRemaining > 5) {
                timeRemaining -= 5;
            }

            show("wrong");
            setTimeout(function () {
                hide("wrong");
            }, 1000);

            generateQA();
        }
    }
}
