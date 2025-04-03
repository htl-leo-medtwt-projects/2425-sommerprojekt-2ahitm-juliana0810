/***********************************
 * GAME SCREEN
 ***********************************/
let GAME_SCREEN = {
    surface: document.getElementById('surface'),
    surfaceScale: '80%',
    coinbox: document.getElementById("coinBox")
}

// Scale the surface to xx% of the screen width
surface.style.transform = `scale(${parseFloat(GAME_SCREEN.surfaceScale)/100 * (window.innerWidth / surface.clientWidth)})`;

/*var*/
let countdown;

let ITEM = {
    coinCounter: 0,
    coinbox: document.getElementById("coinBox")
} 

/***********************************
 * GAME CONFIG
 ***********************************/
let GAME_CONFIG = {
    gameSpeed: 24,
    characterSpeed: 7 
}


/*******  TIMER *********** */
function startTimer() {
    clearInterval(countdown)
    let timeLeft = 200;
    document.getElementById("sanduhr-box").innerHTML = `<p>${timeLeft}s</p>`
    
    countdown = setInterval(() => {
        timeLeft--
        document.getElementById("sanduhr-box").innerHTML = `<p>${timeLeft}s</p>`

        if (timeLeft <= 0) {
            clearInterval(countdown)
            document.getElementById("sanduhr-box").innerHTML = "";
        }
    }, 1000)
}

/***********************************
 * START GAME
 * **********************************/
function startGame() {
    PLAYER.box.style.left = '700px'; 
    PLAYER.box.style.top = '600px'; 
    PLAYER.box.style.opacity = '1';
    document.getElementById("spriteImg").style.right = '0px'; 
    document.getElementById("coins-box").innerHTML = `<p>${PLAYER.coins} coins</p>`;
    startTimer(); 
    gameLoop();
    
}


/***********************************
 * COIN
 * **********************************/

function respawnCoin() {
    const surface = GAME_SCREEN.surface.getBoundingClientRect();
    const colliderTop = document.getElementById('collidertop').getBoundingClientRect();
    const colliderBottom = document.getElementById('colliderbottom').getBoundingClientRect();
    const colliderRight = document.getElementById('colliderright').getBoundingClientRect();
    const colliderLeft = document.getElementById('colliderleft').getBoundingClientRect();

    const safeLeft = colliderLeft.right - surface.left;
    const safeRight = colliderRight.left - surface.left;
    const safeTop = colliderTop.bottom - surface.top;
    const safeBottom = colliderBottom.top - surface.top;

    const randomX = Math.floor(Math.random() * (safeRight - safeLeft - GAME_SCREEN.coinbox.offsetWidth)) + safeLeft;
    const randomY = Math.floor(Math.random() * (safeBottom - safeTop - GAME_SCREEN.coinbox.offsetHeight)) + safeTop;

    GAME_SCREEN.coinbox.style.left = `${randomX}px`;
    GAME_SCREEN.coinbox.style.top = `${randomY}px`;
}

function handleCollision() {
    if (isColliding(PLAYER.box, GAME_SCREEN.coinbox)) {
        PLAYER.coins++;
        document.getElementById("coins-box").innerHTML = `<p>${PLAYER.coins} coins</p>`;
        respawnCoin();
    }
}


/***********************************
 * GAME LOOP
 * **********************************/
function gameLoop() {
    /*if(!gameEnded){*/
    if (KEY_EVENTS.leftArrow) {
        movePlayer((-1) * GAME_CONFIG.characterSpeed, 0, -1);
        animatePlayer();
    }
    if (KEY_EVENTS.rightArrow) {
        movePlayer(GAME_CONFIG.characterSpeed, 0, 1);
        animatePlayer();
    }
    if (KEY_EVENTS.upArrow) {
        movePlayer(0, (-1) * GAME_CONFIG.characterSpeed, 0);
        animatePlayer();
    }
    if (KEY_EVENTS.downArrow) {
        movePlayer(0, GAME_CONFIG.characterSpeed, 0);
        animatePlayer();
    }

    handleCollision();
    setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed); 
}
