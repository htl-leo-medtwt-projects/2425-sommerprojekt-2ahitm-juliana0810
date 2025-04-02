/***********************************
 * GAME SCREEN
 ***********************************/
let GAME_SCREEN = {
    surface: document.getElementById('surface'),
    surfaceScale: '80%',
}

// Scale the surface to xx% of the screen width
surface.style.transform = `scale(${parseFloat(GAME_SCREEN.surfaceScale)/100 * (window.innerWidth / surface.clientWidth)})`;


/***********************************
 * GAME CONFIG
 ***********************************/
let GAME_CONFIG = {
    gameSpeed: 24,
    characterSpeed: 7 
}

/***********************************
 * START GAME
 * **********************************/
function startGame() {
    PLAYER.box.style.left = '700px'; 
    PLAYER.box.style.top = '600px'; 
    PLAYER.box.style.opacity = '1';
    document.getElementById("spriteImg").style.right = '0px';  
    gameLoop();
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
    setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed); 
}
