/*jshint esversion: 6 */
const bgrid = document.querySelector('.bgrid');
const blockWidth = 120;
const blockHeight = 20;
const boardWidth = 600;
const boardHeight = 300;

const userStart = [230, 10];
let currentPosition = userStart;
const userWidth = 100;
const userHeight = 20;

const ballStart = [270,40];
let ballCurrentPosition = ballStart;
const ballDiameter = 20;
let ballMover;
let xDirection = 2;
let yDirection = 2;

const blockDivs = [];

const bbegin = document.getElementById('bbegin');
bbegin.addEventListener('click', () => {
    ballMover = setInterval(moveBall, 20);
});

//Block class
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis+blockWidth, yAxis];
        this.topLeft = [xAxis,yAxis + blockHeight];
        this.toRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

const blocks = [];
for(let i = 0; i < 5; i++){
    for(let j = 0; j < 3; j++){
        blocks.push(new Block(10+i*(blockWidth),270-j*(blockHeight+10)));
    }
}

//draw  block
function addBlocks() {
    for(let i = 0; i < blocks.length; i++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        bgrid.appendChild(block);
        blockDivs.push(block);
    }
}

addBlocks();

const user = document.createElement('div');
user.classList.add('user');
drawUser();
bgrid.appendChild(user);

//draw user
function drawUser(){
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

function drawBall(){
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

//move user
function moveUser(e) {
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] > 0){
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if(currentPosition[0] < boardWidth-(blockWidth-20)){
                currentPosition[0] += 10;
                drawUser();
            }
            break;
        
    }
}

document.addEventListener('keydown', moveUser);

// add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
bgrid.appendChild(ball);

function moveBall(){
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}



//check for collisions
function checkForCollisions() {
    //check for wall collisions
    if(ballCurrentPosition[0] >= (boardWidth - ballDiameter)){
        xDirection = -2;
    }
    else if(ballCurrentPosition[0] <= 0){
        xDirection = 2;
    }
    if(ballCurrentPosition[1] >= (boardHeight - ballDiameter)){
        yDirection = -2;
    }
    else if(ballCurrentPosition[1] <= 0){
        yDirection = 2;
    }
    
    if(Math.abs(ballCurrentPosition[1] - (currentPosition[1] + userHeight) + 5) < 5 && ballInline()){
        yDirection = 2;
    }

    for(let i = 0; i < blocks.length; i++){
        let bl = blocks[i];
        let ballx = ballCurrentPosition[0];
        let bally = ballCurrentPosition[1];
        let hit = false;
        if(blockInline(bl)){
            if(Math.abs(bally+ballDiameter - bl.bottomLeft[1]) < 3){
                yDirection = -2;
                hit = true;
                console.log('bottom');
            }
            else if(Math.abs(bally - bl.topLeft[1]) < 5){
                yDirection = 2;
                hit = true;
                console.log('top');
            }
            else if(bally < bl.topLeft[1] && bally > bl.bottomLeft[1]){
                if(Math.abs(ballx - bl.bottomLeft[0]) < 5){
                    xDirection = -2;
                    hit = true;
                    console.log('left');
                }
                else if(Math.abs(ballx - bl.bottomRight[0]) < 5){
                    xDirection = 2;
                    hit = true;
                    console.log('right');
                }
            }
        }
        if(hit){
            //blocks[i].classList.remove('block');
            //let blockList = document.querySelectorAll(".bgrid .block");
            blockDivs[i].style.visibility = 'hidden';
            blockDivs.splice(i,1);
            blocks.splice(i,1);
            //addBlocks();
            //console.log("kill");
        }   
    }
}

function blockInline(b){
    return ballCurrentPosition[0]+ballDiameter > b.bottomLeft[0] && ballCurrentPosition[0] < b.bottomRight[0];
}

function ballInline(){
    return ballCurrentPosition[0]+ballDiameter > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0]+userWidth;
}