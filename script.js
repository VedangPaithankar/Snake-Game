document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const restartButton = document.getElementById("restartButton");
    const gameBoard = document.getElementById("gameBoard");
    const scoreDisplay = document.getElementById("score");
    const gameOverMessage = document.createElement("div");
    gameOverMessage.className = "game-over";
    gameOverMessage.innerText = "Game Over";
    gameOverMessage.style.display = "none";

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 5, y: 5 };
    let direction = "right";
    let score = 0;
    let intervalId = null;
    let gameInProgress = false;

    function createGameBoard() {
        for (let y = 0; y < 15; y++) {
            for (let x = 0; x < 15; x++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.id = `cell-${x}-${y}`;
                gameBoard.appendChild(cell);
            }
        }
    }

    function drawSnake() {
        snake.forEach(segment => {
            const snakeSegment = document.createElement("div");
            snakeSegment.className = "snake";
            snakeSegment.style.left = `${segment.x * 20}px`;
            snakeSegment.style.top = `${segment.y * 20}px`;
            gameBoard.appendChild(snakeSegment);
        });
    }

    function drawFood() {
        const foodElement = document.createElement("div");
        foodElement.className = "food";
        foodElement.style.left = `${food.x * 20}px`;
        foodElement.style.top = `${food.y * 20}px`;
        gameBoard.appendChild(foodElement);
    }

    function moveSnake() {
        let newHead = { ...snake[0] };
        switch (direction) {
            case "up":
                newHead.y -= 1;
                break;
            case "down":
                newHead.y += 1;
                break;
            case "left":
                newHead.x -= 1;
                break;
            case "right":
                newHead.x += 1;
                break;
        }
        snake.unshift(newHead);

        if (newHead.x === food.x && newHead.y === food.y) {
            score += 10;
            scoreDisplay.innerText = `Score: ${score}`;
            generateFood();
        } else {
            snake.pop();
        }

        if (checkCollision()) {
            gameOver();
        }
    }

    function checkCollision() {
        const head = snake[0];
        if (
            head.x < 0 ||
            head.x >= 15 ||
            head.y < 0 ||
            head.y >= 15 ||
            snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        ) {
            return true;
        }
        return false;
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * 15),
            y: Math.floor(Math.random() * 15)
        };
        const foodElement = document.querySelector(".food");
        foodElement.style.left = `${food.x * 20}px`;
        foodElement.style.top = `${food.y * 20}px`;
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case "ArrowUp":
                if (direction !== "down") direction = "up";
                break;
            case "ArrowDown":
                if (direction !== "up") direction = "down";
                break;
            case "ArrowLeft":
                if (direction !== "right") direction = "left";
                break;
            case "ArrowRight":
                if (direction !== "left") direction = "right";
                break;
        }
    }

    function startGame() {
        if (!gameInProgress) {
            snake = [{ x: 10, y: 10 }];
            direction = "right";
            score = 0;
            scoreDisplay.innerText = `Score: ${score}`;
            gameOverMessage.style.display = "none";
            gameInProgress = true;
            intervalId = setInterval(() => {
                moveSnake();
                drawGame();
            }, 150);
            generateFood();
        }
    }

    function gameOver() {
        clearInterval(intervalId);
        gameOverMessage.style.display = "block";
        gameInProgress = false;
    }

    function drawGame() {
        gameBoard.innerHTML = "";
        drawSnake();
        drawFood();
    }

    createGameBoard();
    drawGame();

    document.addEventListener("keydown", handleKeyPress);
    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", startGame);
});
