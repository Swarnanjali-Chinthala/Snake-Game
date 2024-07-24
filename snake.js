const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreBoard = document.getElementById('scoreBoard');

const box = 20; // Size of the snake and food
const canvasSize = 400; // Canvas size
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

let score = 0;
let d = 'RIGHT'; // Initial direction of the snake

// Control the snake
document.addEventListener('keydown', direction);

function direction(event) {
    console.log('Key pressed:', event.keyCode); // Debug: Log the key pressed
    if ([37, 38, 39, 40].includes(event.keyCode)) {
        console.log('Current direction:', d); // Debug: Log the current direction before change
        if (event.keyCode == 37 && d != 'RIGHT') {
            d = 'LEFT';
        } else if (event.keyCode == 38 && d != 'DOWN') {
            d = 'UP';
        } else if (event.keyCode == 39 && d != 'LEFT') {
            d = 'RIGHT';
        } else if (event.keyCode == 40 && d != 'UP') {
            d = 'DOWN';
        }
        console.log('New direction:', d); // Debug: Log the new direction after change
    }
}

// Check for collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Draw everything on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? '#fff' : '#00ff00';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        
        ctx.strokeStyle = '#000';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = '#ff0000';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move the snake
    console.log('Current snake position:', snakeX, snakeY); // Debug: Log current position
    if (d == 'LEFT') snakeX -= box;
    if (d == 'UP') snakeY -= box;
    if (d == 'RIGHT') snakeX += box;
    if (d == 'DOWN') snakeY += box;
    console.log('New snake position:', snakeX, snakeY); // Debug: Log new position

    // If the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Game over
    if (snakeX < -1 || snakeY < -1 || snakeX >= canvasSize+1 || snakeY >= canvasSize+1 || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over!');
        document.location.reload();
        return;
    }

    snake.unshift(newHead);

    scoreBoard.innerHTML = 'Score: ' + score;
}

let game = setInterval(draw, 500);
