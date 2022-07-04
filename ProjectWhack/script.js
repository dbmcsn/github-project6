const square = document.querySelectorAll ('.square');
const mole = document.querySelectorAll ('.mole');
const timeLeft = document.querySelector ('#timeLeft');
const startBtn = document.querySelector("#start");
const secsLeft = document.querySelector("#secsLeft");
const timerContainer = document.querySelector(".timerContainer");
const score = document.querySelector('#score');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const finalScore = document.querySelector('.finalScore');
const closeModalBtn = document.querySelector('.closeModalBtn');
let result = 0;
let gameStarted = false;


function randomSquare() {
    square.forEach(className => {
        className.classList.remove('mole');
    })
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole');
    hitPosition = randomPosition.id
}

square.forEach(hit => {
    hit.addEventListener('click', () => {
        if(hit.id === hitPosition && gameStarted === true){
            result = result + 1;
            score.textContent = result;
        }
    })
})

let currentTime = 60;

function countDown() {
    let startGame = setInterval(randomSquare, 350);
    let timerId = setInterval(
    function (){
        currentTime--;
        timeLeft.textContent = currentTime;

        if (currentTime === 0) {
            clearInterval(timerId);
            modal.classList.remove('hidden');
            overlay.classList.remove('hidden');
            currentTime = 60;
            startBtn.classList.remove('hidden');
            timerContainer.classList.add('hidden');
            clearInterval(startGame);
            gameStarted = false;
            finalScore.textContent = result;
        }
    },1000)  
}

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

closeModalBtn.addEventListener("click", closeModal);

window.addEventListener("keydown", () => {
    if (event.key === "Escape") {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    }
});

startBtn.addEventListener("click", function () {
    score.textContent = 0;
    result = 0;
    countDown();
    startBtn.classList.add('hidden');
    timerContainer.classList.remove('hidden');
    gameStarted = true;
})

