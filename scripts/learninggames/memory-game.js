/*jshint esversion: 6 */
const cardArray = [
    {
        name: 'fries',
        img: 'images/memoryGameImages/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/memoryGameImages/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/memoryGameImages/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/memoryGameImages/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/memoryGameImages/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/memoryGameImages/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/memoryGameImages/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/memoryGameImages/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/memoryGameImages/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/memoryGameImages/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/memoryGameImages/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/memoryGameImages/pizza.png'
    }
];

cardArray.sort(() => 0.5 - Math.random());


const gridDisplay = document.querySelector('#grid');
const scoreDisplay = document.querySelector('#score');
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
    for(let i = 0; i < cardArray.length; i++){
        const card = document.createElement('img');
        card.setAttribute('src', 'images/memoryGameImages/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.append(card);
    }
}

createBoard();

function checkMatch() {
    const cards = document.querySelectorAll('#grid img');
    if(cardsChosen[0] == cardsChosen[1] && cardsChosenIds[0] != cardsChosenIds[1]){
        //alert('You found a match!');
        cards[cardsChosenIds[0]].setAttribute('src', 'images/memoryGameImages/white.png');
        cards[cardsChosenIds[1]].setAttribute('src', 'images/memoryGameImages/white.png');
        cards[cardsChosenIds[0]].removeEventListener('click', flipCard);
        cards[cardsChosenIds[1]].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
    }
    else {
        cards[cardsChosenIds[0]].setAttribute('src', 'images/memoryGameImages/blank.png');
        cards[cardsChosenIds[1]].setAttribute('src', 'images/memoryGameImages/blank.png');
    }
    cardsChosen = [];
    cardsChosenIds = [];
    scoreDisplay.innerHTML = cardsWon.length;

    if(cardsWon.length == cardArray.length/2){
        scoreDisplay.innerHTML = "You Win!";
    }
}

function flipCard(){
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if(cardsChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}