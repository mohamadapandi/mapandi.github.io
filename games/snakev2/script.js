const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const controls = document.querySelectorAll(".controls button");
let scorescope = document.querySelector(".score");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 5;
let tileCount = 20;
let tileSize = canvas.width / tileCount;
let headX = 0;
let headY = 0;
let snakePart = [];
let tailLength = 0;

let foodX = Math.floor(Math.random() * tileCount);
let foodY = Math.floor(Math.random() * tileCount);

let xVelocity = 0;
let yVelocity = 0;
let score = 0;

function game() {
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }
  clearScreen();

  checkFoodCollision();
  drawFood();
  drawSnake();
  drawscore();
  setTimeout(game, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;
  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
    gameOver = true;
  }
  for (let i = 0; i < snakePart.length; i++) {
    let element = snakePart[i];
    if (element.x == headX && element.y == headY) {
      gameOver = true;
      break;
    }
  }
  if (gameOver) {
    if (confirm("GAME OVER\nMain Lagi?") == true) {
      location.reload();
    } else {
      alert("Thank You");
    }
  }
  return gameOver;
}

function drawscore() {
  scorescope.innerHTML = "Score : " + score;
}

function clearScreen() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  context.fillStyle = "yellow";
  for (let i = 0; i < snakePart.length; i++) {
    let part = snakePart[i];
    context.fillRect(
      part.x * tileCount,
      part.y * tileCount,
      tileSize,
      tileSize
    );
  }
  snakePart.push(new SnakePart(headX, headY));
  while (snakePart.length > tailLength) {
    snakePart.shift();
  }

  context.fillStyle = "green";
  context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

function checkFoodCollision() {
  if (foodX === headX && foodY === headY) {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}
controls.forEach((button) => button.addEventListener("click", keyDown));
document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  // up
  if (event.code == "ArrowUp" || event.target.dataset.key == "ArrowUp") {
    if (yVelocity == 1) {
      return;
    }
    xVelocity = 0;
    yVelocity = -1;
  }
  if (event.code == "ArrowDown" || event.target.dataset.key == "ArrowDown") {
    if (yVelocity == -1) {
      return;
    }
    xVelocity = 0;
    yVelocity = 1;
  }
  if (event.code == "ArrowLeft" || event.target.dataset.key == "ArrowLeft") {
    if (xVelocity == 1) {
      return;
    }
    xVelocity = -1;
    yVelocity = 0;
  }
  if (event.code == "ArrowRight" || event.target.dataset.key == "ArrowRight") {
    if (xVelocity == -1) {
      return;
    }
    xVelocity = 1;
    yVelocity = 0;
  }
}

game();
