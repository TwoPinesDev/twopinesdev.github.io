/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
const body = document.querySelector("body");
const startScreen = document.getElementById("overlay");
const hearts = document.querySelectorAll("li img");
let disabledArray = [];

//Function used in reset() method
function removeKeys() {
    $(".key").removeClass("chosen");
    $(".key").removeClass("wrong");
    $(".key").removeAttr("disabled");
}

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            new Phrase("Buy Local"),
            new Phrase("Register to Vote"),
            new Phrase("Limit Social Media"),
            new Phrase("Start Recycling"),
            new Phrase("Read More")
        ];
        this.activePhrase = null;
    }
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }
    //Sets a random phrase as the active phrase
    startGame() {
        $(startScreen).fadeOut(1000);
        const randomPhrase = game.getRandomPhrase();
        const randomNewPhrase = new Phrase(randomPhrase.phrase);
        randomNewPhrase.addPhraseToDisplay();
        this.activePhrase = randomNewPhrase;
    }
    //Handles the logic behind if a key typed or clicked corresponds with one in the active phrase
    //If so, it changes the key's color, disables it, and checks for a win
    //If not, it changes the key's color and removes a life
    //Finally, it checks for a win, if so, gameOver() method
    //The disabled array is to disable keys that have already been typed. If it has been typed, it's added to the array and won't be repeated. If it isn't a part of the array yet, it can be typed
    handleInteraction(event) {
        const screenKeys = event;
        const letter = screenKeys.textContent;
        if (letter) {
            if (disabledArray.includes(letter)) {
                
            } else {
                if (this.activePhrase.checkLetter(event.key)) {
                    this.activePhrase.showMatchedLetter(screenKeys);
                    screenKeys.classList.add("chosen");
                    disabledArray.push(letter);
                    this.checkForWin();
                }

                if (
                    this.activePhrase.checkLetter(letter) &&
                    !this.activePhrase.checkLetter(event.key)
                ) {
                    this.activePhrase.showMatchedLetter(screenKeys);
                    screenKeys.disabled = true;
                    screenKeys.classList.add("chosen");
                    this.checkForWin();
                } else if (
                    !this.activePhrase.checkLetter(letter) ||
                    !this.activePhrase.checkLetter(event.key)
                ) {
                    screenKeys.classList.add("wrong");
                    screenKeys.disabled = true;
                    disabledArray.push(letter);
                    this.removeLife();
                }
                if (this.checkForWin()) {
                    this.gameOver();
                }
            }
        }
    }
    //Removes hearts based on incorrect guesses
    removeLife() {
        if (this.activePhrase.checkLetter() === false) {
            this.missed++;
            if (this.missed === 1) {
                hearts[0].src = "images/lostHeart.png";
            } else if (this.missed === 2) {
                hearts[1].src = "images/lostHeart.png";
            } else if (this.missed === 3) {
                hearts[2].src = "images/lostHeart.png";
            } else if (this.missed === 4) {
                hearts[3].src = "images/lostHeart.png";
                alert("You're down to your last heart!");
            } else if (this.missed === 5) {
                hearts[4].src = "images/lostHeart.png";
                this.gameOver();
            }
        }
    }
    //Checks to see if the full activePhrase has been guessed
    checkForWin() {
        const keyCheck = document.querySelectorAll(".show");
        const letterCheck = document.querySelectorAll(".letter");

        for (let i = 0; i < keyCheck.length; i++) {
            let counter = letterCheck.length;
            if (counter === keyCheck.length) {
                return true;
            } else {
                return false;
            }
        }
    }
    //Toggles win and lose screens
    gameOver() {
        $("#overlay")
            .show()
            .append($("h1"));
        $("h1").insertBefore($("#btn__reset"));
        if (this.checkForWin()) {
            $("#overlay")
                .hide()
                .addClass("win")
                .fadeIn(1000);
            $("h1").text("Great job!");
        } else {
            $("#overlay")
                .hide()
                .addClass("lose")
                .fadeIn(1000);
            $("h1").text("Sorry, better luck next time!");
            removeKeys();
        }
    }
    //Resets overlay screen, hearts, and active phrase pieces for a new game
    resetGame() {
        removeKeys();
        $("#overlay").removeClass("lose");
        $("#overlay").removeClass("win");
        disabledArray = [];
        if (!this.activePhrase) {
            $(".letter").remove();
        }
        for (let j = 0; j < hearts.length; j++) {
            if ((hearts[j].src = "images/lostHeart.png")) {
                hearts[j].src = "images/liveHeart.png";
            }
        }
    }
}
