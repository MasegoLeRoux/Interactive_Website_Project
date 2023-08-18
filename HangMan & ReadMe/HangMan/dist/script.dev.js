"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var wordDisplay = document.querySelector(".word-display");
var guessesText = document.querySelector(".guesses-text b");
var keyboardDiv = document.querySelector(".keyboard");
var hangmanImage = document.querySelector(".hangman-box img");
var gameModal = document.querySelector(".game-modal");
var playAgainBtn = gameModal.querySelector("button"); // Initializing game variables

var currentWord, correctLetters, wrongGuessCount;
var maxGuesses = 6;

var resetGame = function resetGame() {
  // Resettings game variables and UI elements
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = "images/hangman-0.svg";
  guessesText.innerText = "".concat(wrongGuessCount, " / ").concat(maxGuesses);
  wordDisplay.innerHTML = currentWord.split("").map(function () {
    return "<li class=\"letter\"></li>";
  }).join("");
  keyboardDiv.querySelectorAll("button").forEach(function (btn) {
    return btn.disabled = false;
  });
  gameModal.classList.remove("show");
};

var getRandomWord = function getRandomWord() {
  // Selecting a random word and hint from the hangmanQuizData
  var _hangmanQuizData$Math = hangmanQuizData[Math.floor(Math.random() * hangmanQuizData.length)],
      word = _hangmanQuizData$Math.word,
      hint = _hangmanQuizData$Math.hint;
  currentWord = word; // Making currentWord as random word

  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

var gameOver = function gameOver(isVictory) {
  // After game complete.. showing modal with relevant details
  var modalText = isVictory ? "You found the word:" : 'The correct word was:';
  gameModal.querySelector("img").src = "images/".concat(isVictory ? 'beyonce-hair-flip' : 'loser-online', ".gif");
  gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
  gameModal.querySelector("p").innerHTML = "".concat(modalText, " <b>").concat(currentWord, "</b>");
  gameModal.classList.add("show");
};

var initGame = function initGame(button, clickedLetter) {
  // Checking if clickedLetter is exist on the currentWord
  if (currentWord.includes(clickedLetter)) {
    // Showing all correct letters on the word display
    _toConsumableArray(currentWord).forEach(function (letter, index) {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
    wrongGuessCount++;
    hangmanImage.src = "images/hangman-".concat(wrongGuessCount, ".svg");
  }

  button.disabled = true; // Disabling the clicked button so user can't click again

  guessesText.innerText = "".concat(wrongGuessCount, " / ").concat(maxGuesses); // Calling gameOver function if any of these condition meets

  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
}; // Creating keyboard buttons and adding event listeners


var _loop = function _loop(i) {
  var button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", function (e) {
    return initGame(e.target, String.fromCharCode(i));
  });
};

for (var i = 94; i <= 122; i++) {
  _loop(i);
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);