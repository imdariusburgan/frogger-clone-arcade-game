// Select score number
const scoreboard = document.querySelector('.score');
console.log(scoreboard);
let currentScore = 0;

// Enemies the player must avoid
const Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // Player collision
    if (Math.abs(player.x - this.x) < 50 && Math.abs(player.y - this.y) < 50) {
        player.reset();
    }

    // Updates the enemy's location
    this.x += this.speed * dt;

    // When enemy is off screen, loop him back to beginning of board.
    if (this.x >505) {
        this.x = Math.ceil((Math.random() * -300) - 100);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
const Player = function(x, y) {

    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // Reset player once he reaches water
    if (player.y < 20) {
        currentScore += 1;
        scoreboard.innerHTML = currentScore;
        player.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(arrow) {
    if (arrow === 'left' && this.x > 80) {
        this.x -= 100;
    } else if (arrow === 'up' && this.y > 20) {
        this.y -= 90;
    } else if (arrow === 'right' && this.x < 400) {
        this.x += 100;
    } else if (arrow === 'down' && this.y < 350) {
        this.y += 90;
    }
};

Player.prototype.reset = function() {
    player.x = 200;
    player.y = 400;
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(0,60, 150);
const enemy2 = new Enemy(-200, 145, 250);
const enemy3 = new Enemy(-50, 225, 200);
const player = new Player(200, 400);
const allEnemies = [enemy1, enemy2, enemy3];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
