// Superclass for any object that can move across the board
class MovableThing{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends MovableThing{
    constructor(x, y, spriteURL, speed){
        super(x, y);
        this.spriteURL = 'images/enemy-bug.png';
        this.speed = speed;
    }

    update(dt){
        // If enemy hits player, decrease score by 5, update score on screen, and reset player to starting locations
        if (Math.abs(player.x - this.x) < 50 && Math.abs(player.y - this.y) < 50) {
            if (player.currentScore > 0) {
                player.currentScore -= 5;
            }
            player.updateScoreboard();
            player.reset();
        }
    
        // Moves the enemy across the screen
        this.x += this.speed * dt;
    
        // When enemy is off screen, loop him back to beginning of board.
        if (this.x > 505) {
            this.x = Math.ceil((Math.random() * -300) - 100);
        }
    }

}

class Player extends MovableThing{
    constructor(x, y, spriteURL){

    }
}

/*
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
        if (player.currentScore > 0) {
            player.currentScore -= 5;
        }
        player.updateScoreboard();
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
};*/

// Player class
const Player = function(x, y) {
    // Player starting location
    this.x = x;
    this.y = y;

    // Variable for keeping score
    this.currentScore = 0;

    // Player graphic
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // Once player reaches water, add 10 points to his score, and then reset his position
    if (this.y < 20) {
        this.currentScore += 10;
        this.updateScoreboard();
        this.reset();
    }

    // Modal congratulating player once he wins the game (30 points)
    if (this.currentScore >= 30) {
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

// Function that updates the score
Player.prototype.updateScoreboard = function() {
    const scoreboard = document.querySelector('.score');

    scoreboard.innerHTML = this.currentScore;
}

Player.prototype.reset = function() {
    // Changes player's location
    this.x = 200;
    this.y = 400;
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
