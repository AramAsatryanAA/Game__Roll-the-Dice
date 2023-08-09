"use strict";

import { isSupportedWebp } from "./modules/functions.js";

// --- Function to show images on the page in correct format (webp or not)
isSupportedWebp();

// --- Declaring variables
const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");
const scorePlayer1 = document.getElementById("score-1");
const scorePlayer2 = document.getElementById("score-2");
const curScorePlayer1 = document.getElementById("current-1");
const curScorePlayer2 = document.getElementById("current-2");
const diceImg = document.querySelector(".dice-img");
const newGame = document.querySelector(".btn-new");
const rollDice = document.querySelector(".btn-roll");
const holdScore = document.querySelector(".btn-hold");

let playingGame = true;

// --- Generate a random dice number (from 1 to 6)
function getDiceNum() {
  return Math.trunc(Math.random() * 6) + 1;
}

// --- Change active player
function changeActivePlayer() {
  player1.classList.toggle("player-active");
  player2.classList.toggle("player-active");
}

// --- Reset the current score of both players
function resetCurrentScores() {
  curScorePlayer1.textContent = curScorePlayer2.textContent = 0;
}

// --- Check for winner.
function checkForWinner() {
  return +scorePlayer1.textContent >= 101 || +scorePlayer2.textContent >= 101;
}

// --- Declare the winner and End the game
function declareWinner() {
  if (+scorePlayer1.textContent >= 101) {
    player1.classList.add("game-winner");
    player1.classList.remove("player-active");
  } else {
    player2.classList.add("game-winner");
    player2.classList.remove("player-active");
  }

  diceImg.classList.add("hidden");
  resetCurrentScores();
  playingGame = false;
}

// --- Game playing process
rollDice.addEventListener("click", function () {
  //--- Will only work if the game is in progress
  if (playingGame) {
    // - roll the dice
    let dice = getDiceNum();

    // - show the dice image
    diceImg.classList.remove("hidden");
    diceImg.src = `images/dice-${dice}.png`;

    // - if dice === 1 -> change active player and reset current scores
    if (dice === 1) {
      changeActivePlayer();
      resetCurrentScores();
    } else {
      // if dice !== 1 -> add dice number to the current score of the the active player
      player1.classList.contains("player-active")
        ? (curScorePlayer1.textContent = +curScorePlayer1.textContent + dice)
        : (curScorePlayer2.textContent = +curScorePlayer2.textContent + dice);
    }
  }
});

// --- Hold current score
holdScore.addEventListener("click", function () {
  // --- Will work only if game playing is in process
  if (playingGame) {
    // - add current score of the the active player to its score
    player1.classList.contains("player-active")
      ? (scorePlayer1.textContent =
          +scorePlayer1.textContent + +curScorePlayer1.textContent)
      : (scorePlayer2.textContent =
          +scorePlayer2.textContent + +curScorePlayer2.textContent);

    // --- check for the winning condition
    // - if yes -> declare winner, else -> change current player
    if (checkForWinner()) {
      declareWinner();
    } else {
      changeActivePlayer();
      resetCurrentScores();
    }
  }
});

// --- Play a New Game
newGame.addEventListener("click", function () {
  playingGame = true;

  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  curScorePlayer1.textContent = 0;
  curScorePlayer2.textContent = 0;

  diceImg.classList.add("hidden");

  player1.classList.remove("game-winner");
  player2.classList.remove("game-winner");

  player1.classList.add("player-active");
  player2.classList.remove("player-active");
});
