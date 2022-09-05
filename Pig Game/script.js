'use strict';

/* Elements */
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll"); 
const btnHold = document.querySelector(".btn--hold");

/* Stating conditions */
let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
}

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};

/* rolling dice */
btnRoll.addEventListener("click", function () {
    if(playing){
    const dice = Math.floor(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `img/dice-${dice}.png`;
    if(dice !== 1){
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else{
            switchPlayer();
        };
    };
});

btnHold.addEventListener("click", function () {
    if(playing){
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if(scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        }else{
            switchPlayer();
        };
    };
});

btnNew.addEventListener("click", init);


/* MODAL */
/* elements */

const rullsBtn = document.querySelector(".rulls-btn");
const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".close-modal");
const modalBgColor = document.querySelector(".body-color")

rullsBtn.addEventListener("click", function () {
  /*   modal.style.display = "block" 
    modalBgColor.style.display = "block"  */
    modal.classList.remove("hidden");
    modalBgColor.classList.remove("hidden")
});

btnCloseModal.addEventListener("click", function () {
   /*  modal.style.display = "none" 
    modalBgColor.style.display = "none"  */
    modal.classList.add("hidden");
    modalBgColor.classList.add("hidden")
});
