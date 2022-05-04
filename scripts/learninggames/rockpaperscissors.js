const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');

const possibleChoices = document.querySelectorAll('button');
let result;

possibleChoices.forEach(pC => pC.addEventListener('click', (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    getResult()
})) 

function generateComputerChoice(){
    const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1;
    
    if(randomNumber === 1){
        computerChoice = 'rock';
    }
    else if(randomNumber === 2){
        computerChoice = 'scissors';
    }
    else if(randomNumber === 3){
        computerChoice = 'paper';
    }

    computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult() {
    if(computerChoice === userChoice){
        result = "it's a draw!"
    }
    else if(computerChoice === 'rock' && userChoice === 'paper'){
        result = 'you win!'
    }
    else if(computerChoice === 'rock' && userChoice === 'scissors'){
        result = 'you lose!'
    }
    else if(computerChoice === 'paper' && userChoice === 'scissors'){
        result = 'you win!'
    }
    else if(computerChoice === 'paper' && userChoice === 'rock'){
        result = 'you lose!'
    }
    else if(computerChoice === 'scissors' && userChoice === 'paper'){
        result = 'you lose!'
    }
    else if(computerChoice === 'scissors' && userChoice === 'rock'){
        result = 'you win!'
    }
    resultDisplay.innerHTML = result;
}