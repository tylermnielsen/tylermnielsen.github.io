/*jshint esversion: 6 */
const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const wscore = document.querySelector('#wscore');
const wstartButton = document.getElementById("wstartButton");

let wresult = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let countDownTimerId; 
let started = false;

wstartButton.addEventListener('click', () => {
    if(!started){
        moveMole();
        countDownTimerId = setInterval(countDown, 1000);
        started = true;
    }
});

function randomSquare(){
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    let randomPosition = squares[Math.floor(Math.random() * squares.length)];
    randomPosition.classList.add('mole');
    hitPosition = randomPosition.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(square.id == hitPosition){
            wresult++;
            wscore.textContent = wresult;
            hitPosition = null;
        }
    });
});

function moveMole(){
    timerId = setInterval(randomSquare, 500);
}

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if(currentTime == 0){
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        started = false;
        alert('GAME OVER! Your final score is ' + wresult);
    }
}   

