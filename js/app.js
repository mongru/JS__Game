// var Engine = require('engine.js');


const Board = function() {
    this.width = 400;
    this.height = 400;
}

const board = new Board();
const cellWidth = board.width/5;
const counterBox = document.querySelector('.counter__value');
const livesCounterBox = document.querySelector('.lives-counter__value');
const gameOverScreen = document.querySelector('.gameover__screen');
let counter = 0;
let livesCounter = 0;

// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -cellWidth;
    this.y = cellWidth * Math.round(Math.random() * 2) + cellWidth;
    this.speed = Math.ceil(Math.random() * cellWidth + cellWidth);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Uptade location
    this.x < board.width + cellWidth ? this.x += this.speed * dt : this.x = -cellWidth;

    //Handle collision with the Player
    this.handleCollision();
};

Enemy.prototype.handleCollision = function() {
    if (this.y === player.y && Math.abs(this.x - player.x) < cellWidth) {
        console.log('BOOM');
        if (livesCounter > 0) {
            player.resetPosition();
            livesCounter--;
        } else {
            gameOverScreen.style.display = "block";
            setTimeout(() => location.reload(), 1000);
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = board.width/2;
    this.y = board.height;
};

Player.prototype.update = function() {
    counterBox.textContent = counter;
    livesCounterBox.textContent = livesCounter;

    if (this.y === 0) {
        counter++;
        this.resetPosition();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x > 0) {
                this.x -= 100;
            }
            // console.log(this.x);
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= cellWidth;
            }
            // console.log(this.y);
            break;
        case 'right':
            if (this.x < board.width) {
                this.x += 100;
            }
            // console.log(this.x);
            break;
        case 'down':
            if (this.y < board.width) {
                this.y += cellWidth;
            }
            // console.log(this.y);
            break;
    }
};

Player.prototype.resetPosition = function() {
    this.x = board.width/2;
    this.y = board.height;
};

const Gem = function() {
    this.x = Math.floor(Math.random() * 5) * 100;
    this.y = cellWidth * Math.round(Math.random() * 2) + cellWidth;
    this.sprites = ['images/Gem Orange.png', 'images/Gem Green.png', 'images/Gem Blue.png'];
    this.index = Math.round(Math.random() * 2);
}

// Gem.prototype.gemPos = function() {
//     let num = Math.floor(Math.random() * 401);
//     if (num % 100 === 0) {
//         this.x = num;
//     } else {
//         this.gemPos();
//     }
// };

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprites[this.index]), this.x, this.y);
};

Gem.prototype.update = function() {
    this.collect();
};

Gem.prototype.collect = function() {
    if (this.y === player.y && this.x === player.x) {
        console.log('GEM');
        livesCounter++;
        gem = new Gem();
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [new Enemy(), new Enemy()];

const player = new Player();

let gem = new Gem();
// console.log(gem);

// gem.gemPos();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', (e) => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    // console.log(player);


});
