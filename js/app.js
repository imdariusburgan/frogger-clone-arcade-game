// Select score holder HTML element
const scoreboard = document.querySelector('.score');

// Variable for holding current score
let currentScore = 0;

// Function that updates the score
const updateScore = () => { scoreboard.innerHTML = currentScore; }

// Enemies the player must avoid
const Enemy = function(x, y, speed) {
    // Starting location variables
    this.x = x;
    this.y = y;

    // How fast the enemy will move
    this.speed = speed;

    //Enemy graphic
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // If enemy hits player, decrease score by 5, update score on screen, and reset player to starting locations
    if (Math.abs(player.x - this.x) < 50 && Math.abs(player.y - this.y) < 50) {
        if (currentScore > 0) {
            currentScore -= 5;
        }
        updateScore();
        player.reset();
    }

    // Moves the enemy across the screen
    this.x += this.speed * dt;

    // When enemy is off screen, loop him back to beginning of board.
    if (this.x > 505) {
        this.x = Math.ceil((Math.random() * -300) - 100);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
const Player = function(x, y) {
    // Player starting location
    this.x = x;
    this.y = y;

    // Player graphic
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // Once player reaches water, add 10 points to his score, and then reset his position
    if (player.y < 20) {
        currentScore += 10;
        updateScore();
        player.reset();
    }

    // Modal congratulating player once he wins the game (30 points)
    if (currentScore >= 30) {
        //alert('Congratulations you won!')

        // Select the modal
        const modalPopup = document.querySelector('.modal');

        // Select the modal's close button
        const modalCloseBtn = document.querySelector('.close');

        // Select the modal's paragraph tag
        const modalParagraph = document.querySelector('p');

         // Add content to modal paragraph
         modalParagraph.innerHTML = `Congratulations you won!`;

        // Select the restart game button
        const restartGameModalButton = document.querySelector('.restartbtn');

        // Make modal visible
        modalPopup.style.display = "block";

        // Close modal
        const closeModal = () => {
            modalPopup.style.display = "none";
        }

        restartGameModalButton.addEventListener('click', () => {
            location.reload(true);
        })

        //currentScore = 0;
        //scoreboard.innerHTML = currentScore;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(arrow) {
    // Moves the player based on keyboard arrow pressed. Also prevents the player from being moved off screen
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
    // Changes player's location
    player.x = 200;
    player.y = 400;
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(0,60, 150);
const enemy2 = new Enemy(-120, 60, 100);
const enemy3 = new Enemy(-200, 145, 250);
const enemy4 = new Enemy(-50, 225, 200);
const enemy5 = new Enemy(-500, 225, 400);
const player = new Player(200, 400);
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];


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
