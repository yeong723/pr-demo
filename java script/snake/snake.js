for(let i=0; i<100; i++){
    const square = document.createElement("div");
    document.querySelector(".grid").appendChild(square);
}

const grid = document.querySelector(".grid");
const squares = document.querySelectorAll(".grid div");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const scoreDisplay = document.querySelector("#score");
const width = 10;

let snake = [2,1,0];
let interval;
let intervalTime = 1000;
let dir = 1;
let appleLoc = 0;
let socore = 0;

function start(){
    stop();
    snake.forEach(function(item){
        squares[item].classList.add("snake");
    });
    makeApple();
    scoreDisplay.innerText = socore;
    interval = setInterval(runGame,intervalTime);
}
function stop(){
    snake.forEach(function(item){
        squares[item].classList.remove("snake");
    });
    squares[appleLoc].classList.remove("apple");
    clearInterval(interval);
    socore = 0;
    intervalTime = 1000;
    snake = [2,1,0];
    dir = 1;
    appleLoc = 0;
    socore = 0;
}
function runGame(){
    if((snake[0]%width === width-1 && dir === 1) || 
    (snake[0]%width === 0 && dir === -1) ||
    (snake[0]+width >= width*width && dir === width) ||
    (snake[0]-width < 0 && dir === -width) ||
    (squares[snake[0]+dir].classList.contains("snake"))
    ){
        clearInterval(interval);
        return;
    }
    snake.unshift(snake[0]+dir);
    if(squares[snake[0]].classList.contains("apple")){
        intervalTime = intervalTime * 0.9;
        clearInterval(interval);
        interval = setInterval(runGame,intervalTime);
        squares[snake[0]].classList.remove("apple");
        squares[snake[0]].classList.add("snake");
        makeApple();
        scoreDisplay.innerText = ++socore;
    }
    else{
        const tail = snake.pop();
        squares[tail].classList.remove("snake");
    }
    squares[snake[0]].classList.add("snake");
}
function move(e){
    if(e.keyCode == 37){dir = -1}
    else if(e.keyCode === 39){dir = 1}
    else if(e.keyCode === 38){dir = -width}
    else if(e.keyCode === 40){dir = width}
}
function makeApple(){
    do{
        appleLoc = Math.floor(Math.random() * squares.length);
    }while(squares[appleLoc].classList.contains("snake"));
    squares[appleLoc].classList.add("apple");
}
document.addEventListener("keyup",move);
startBtn.addEventListener("click",start);
stopBtn.addEventListener("click",stop);