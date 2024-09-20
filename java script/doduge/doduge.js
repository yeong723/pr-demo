const timeLeft = document.querySelector("#time-left")
const score = document.querySelector("#score")
const grid = document.querySelector(".grid")

var squares;
let result = 0;
let targetPosition = null;
let currentTime = 60;
let countdownTimer;

// 그리드 생성
for (let i = 0; i < 9; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
}

squares = document.querySelectorAll(".square")

// 랜덤으로 두더지 위치 정하기
function randomSquare() {
    squares.forEach(function(square) {
        square.classList.remove('mole')
    })
    let randomNumber = Math.floor(Math.random() * 9);
    targetPosition = randomNumber;
    let randomSquare = squares[randomNumber];
    randomSquare.classList.add("mole")
}

// 처음에만 두더지 한 마리 스폰
randomSquare()

// 클릭 시 점수 업데이트 및 새로운 두더지 생성
for (let i = 0; i < 9; i++) {
    squares[i].addEventListener('mousedown', function() {
        if (i === targetPosition) {
            result++
            score.textContent = result
            randomSquare() // 두더지를 클릭하면 즉시 새 위치에 생성
        }
    })
}

// 카운트다운 및 게임 종료
function countdown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if (currentTime == 0) {
        clearInterval(countdownTimer)
        alert("GAME OVER! Score: " + result)
    }
}

countdownTimer = setInterval(countdown, 1000)
