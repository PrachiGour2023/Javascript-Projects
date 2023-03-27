let playBoard = document.querySelector(".play-board");
let scoreElem = document.querySelector(".score");
let highScoreElem = document.querySelector(".high-score");
let controls = document.querySelectorAll(".controls i");
let FoodX, FoodY, snakeY = 10, snakeX = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElem.innerText = `High Score : ${highScore}`;
let changeDirection = (e) => {
    // console.log(e)
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

let changeFoodPosition = () => {
    FoodX = Math.floor(Math.random() * 30) + 1;
    FoodY = Math.floor(Math.random() * 30) + 1;
    // console.log(FoodX, FoodY);
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over")
    location.reload();
}

controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }))
})
let initGame = () => {
    let htmlElement = `<div class="food" style="grid-area: ${FoodY} / ${FoodX}"></div>`;

    if (gameOver) {
        return handleGameOver();
    }
    if (snakeX === FoodX && snakeY === FoodY) {
        changeFoodPosition();
        snakeBody.push([FoodX, FoodY]);
        score++;

        scoreElem.innerText = `Score : ${score}`;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);

    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    if (snakeX < 0 || snakeX > 30 || snakeY < 0 || snakeY > 30) {
        gameOver = true;
    }
    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = 0; i < snakeBody.length; i++) {
        htmlElement += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    playBoard.innerHTML = htmlElement;
}
changeFoodPosition();
setIntervalId = setInterval(initGame, 120)
// initGame();
document.addEventListener("keydown", changeDirection)