/*globals $:false */
/*globals location:false*/

var playing = false;
var score;
var step;
var rf;
var action; //Used for Set itervall function
var trialsLeft;
var fruits = ['Banana', 'BluePineapple', 'Cherry', 'Grape', 'GreenApple', 'Melon', 'Orange', 'Peach', 'Pear', 'RedApple', 'YellowPineapple'];

//Add Trials


$(function () {
    "use strict";
    //Click on start reset btn
    $("#startreset").click(function () {

        //We are playing
        if (playing) {
            //reload the page
            location.reload();
        } else {
            // Not Playing
            playing = true; //game initiated!
            score = 0; //set Score to zero
            $("#scoreVal").html(score);

            //show Trials
            $("#trialsleft").show();
            trialsLeft = 3;
            addHeart();

            //Hide Game over message at restarting Game
            $("#gameover").hide();

            //Change the text of btn rto reset
            $("#startreset").html("Reset Game!");
            startAction();

        }
    });



    //Hover on Fruit
    $("#fruit").mouseover(function () {
        "use strict";
        score++;
        $("#scoreVal").html(score);
        $("#sliceSound")[0].play();

        clearInterval(action);
        $("#fruit").hide("explode", {
            pieces: 43
        }, 500);
        setTimeout(startAction, 800);

    });

    function addHeart() {
        "use strict";
        $("#trialsleft").empty();
        for (var i = 0; i < trialsLeft; i++) {
            $("#trialsleft").append('<img src="Images/heart.png" class="hearts">');
        }
    }

    function chooseFruit() {
        "use strict";
        //to choose a random fruit
        rf = Math.round(10 * Math.random());
        $("#fruit").attr('src', 'Images/' + fruits[rf] + '.png');
    }

    //Generating Fruits function
    function generateFruits() {
        "use strict";
        //Generate Fruit
        $("#fruit").show();

        chooseFruit(); //Random Fruit
        //Random Left Property
        var rlp = Math.round(580 * Math.random());
        $("#fruit").css({
            'left': rlp,
            'top': -100
        });

        //random Step
        step = 1 + Math.round(5 * Math.random());
    }

    //Stoping Game
    function stopAction() {
        "use strict";
        clearInterval(action);
        $("#fruit").hide();
    }

    //Start Sending Fruits
    function startAction() {
        "use strict";

        //Generate Fruit
        generateFruits();

        //Move Fruit Down 1 Step in 10ms
        action = setInterval(function () {
            "use strict";
            $("#fruit").css(
                'top', $("#fruit").position().top + step);

            //Check if the fruit is too low
            if ($("#fruit").position().top > $("#fruitsContainer").height()) {
                //Check for Trials left
                if (trialsLeft > 1) {
                    generateFruits();

                    //Reduce trials by 1
                    trialsLeft--;

                    //Populate Trials box
                    addHeart();
                } else {
                    //Game over
                    playing = false;
                    //We are not playing anymore

                    //Change btn Text
                    $("#startreset").html("Let's PLAY");

                    //Show Game Over!
                    $("#gameover").show();
                    $("#gameover").html('<p>Game Over!</p><p>Your Score Is ' + score + '</p>');

                    //Stoping Game
                    stopAction();

                    //Hide Trials Left Box
                    $("#trialsleft").hide();
                }
            }
        }, 10);

    }

});
