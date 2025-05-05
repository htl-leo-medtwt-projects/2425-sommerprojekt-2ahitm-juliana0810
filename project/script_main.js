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
let hintsOpen = false;
let openedPergamentStatistics = false;
let collectedKey = false;
let gameEnded = false;
let isInvincible = false;


let LIFES = {
    life3: document.getElementById("life1"),
    life2: document.getElementById("life2"),
    life1: document.getElementById("life3"),
    lifesCount: 3
}

let ITEM = {
    coinCounter: 0,
    coinbox: document.getElementById("coinBox")
} 

/***********************************
 * GAME CONFIG
 ***********************************/
let GAME_CONFIG = {
    gameSpeed: 24,
    characterSpeed: 5
}



let TEXTSNIPPETS = [
    [
        'The door stays closed while the Pharaoh’s key is hidden.',
        'No lock opens without knowledge – find the signs and escape ancient spirits!',
    ],
    [
        'A breeze reveals a yellowed parchment - now lies in plain sight.',
        'Find it – it holds the key to escape.'
    ],
    [
        'A secret room holds the key forward.',
        'But it stays hidden without solving the puzzle.',
        'The parchment reveals the key’s location - choose wise...',
    ],
    [
        'You’ve mastered Level 1 – impressive...',
        'But Anubis is casting shadows on your path.',
        'The trial isn’t over. He won’t let you escape so easily...'
    ],
    [
        'In a corner where light barely touches, ',
        'gold shimmers in the sun.',
        'Find the ancient vase, shaped by time and old curses...'
    ],
    [
        'Look for stone steps half-buried in weeds',
        '- the door waits at the top.',
        'One last test remains to win your freedom.'
    ],
    [
        'The sun’s light reveals the truth,',
        'the falcon guards the key of the afterlife,',
        'but only the eye of Horus can unlock the way...'
    ],
    [
        'Where the sun’s light fades, the scarab rests — ',
        'a bug looking artifact of gold, a key to secrets untold'
    ],
    [
        'Search for the mummified remains - ',
        'every artifact tells a story, but this one holds your answer.'
    ],
    [
        'A trap ?! - the door on the left side was fake,',
        'see the map to find the secret door to escape your fate'
    ]
    ,
    [
        "I’ll admit, the previous levels were almost too easy...",
        "But in this one, something unexpected waits in the shadows."
    ]
    ,[
        "Five ancient symbols rise from the sacred lake.",
        "Only the watcher knows the truth. Choose wisely..."
    ],
    [
        'Three special items were found in the mysterious box...',
        'Choose one, i’ll guide you the way'
    ]
    ,
    [
        "The wall bears an ancient print – a hand printed onto stone.",
        "The handprint was not left by chance – you have to identify it’s owner.",
    ]
];

let timeLeft;

/*******  TIMER *********** */
function startTimer() {
    clearInterval(countdown)
    timeLeft = 200;
    document.getElementById("sanduhr-box").innerHTML = `<p>${timeLeft}s</p>`
    
    countdown = setInterval(() => {
        timeLeft--
        document.getElementById("sanduhr-box").innerHTML = `<p>${timeLeft}s</p>`

        if (timeLeft <= 0) {
            clearInterval(countdown)
            document.getElementById("sanduhr-box").innerHTML = "";
            console.log("time ran out");
            gameOver();
        }
    }, 1000)
}

/***********************************
 * START GAME
 * **********************************/
function startGame() {
    PLAYER.box.style.left = '700px'; 
    PLAYER.box.style.top = '600px'; 
    ENEMY.box.style.left = '500px';
    ENEMY.box.style.top = "400px";
    ENEMY.box.style.opacity = '1';
    PLAYER.box.style.opacity = '1';
    document.getElementById("spriteImg").style.right = '0px'; 
    document.getElementById("enemy-skeleton").style.right = '0px';
    document.getElementById("coins-box").innerHTML = `<p>${PLAYER.coins} coins</p>`;
    startTimer(); 
    gameLoop();
}

/***********************************
 * TEXT ANIMATION
 * **********************************/
let finishedFirstText = false;

function writeText(index) {
    const textContainer = document.getElementById("text-container-level1");
    textContainer.style.display = 'block';
    textContainer.innerHTML = "";

    let textArray = TEXTSNIPPETS[index];
    let delay = 0;

    textArray.forEach((sentence, i) => {
        setTimeout(() => {
            let p = document.createElement('p');
            p.classList.add("typewriter-lvl1");
            p.innerText = sentence;
            textContainer.appendChild(p);
        }, delay);

        delay += 300;
    });

    setTimeout(() => {
        let closeHint = document.createElement('p');
        closeHint.id = 'text-cont-close';
        closeHint.innerText = 'continue';
        closeHint.style.cursor = 'pointer';
        closeHint.onclick = () => {
            textContainer.style.display = 'none';
            if (index === 0) {
                writeText(1);
            }
            else if(index === 1){
                startGame();
            }
            else if(index === 2){
                showMap();
            }
            else if(index == 3){
                writeText(4);
            }
            else if(index == 4){
                document.getElementById("door-lvl2").style.display = "block";
                hintsOpen = false;
                startTimer();
                gameLoop();
            }
            else if(index == 5){
                hintsOpen = false;
                document.getElementById("collider87").style.display = "none";
                document.getElementById("collider87-transparent").style.display = "block";
                gameLoop();
            }
            else if(index == 7){
                startTimer();
                gameLoop()
            }
            else if(index == 8){
                document.getElementById("mummy").style.display = "block";
                hintsOpen = false;
                gameLoop();
            }
            else if(index == 10){
                document.getElementById("special-box").style.display = "block";
                startTimer();
                gameLoop();
            }
            else if(index == 13){
                document.getElementById("transparent-box").style.display = "block";
                document.getElementById("handscan-wrapper").style.display = "block";
            }
        };
        textContainer.appendChild(closeHint);
    }, delay); 

}

/***********************************
 * COIN
 * **********************************/

function respawnCoin() {
    const surface = GAME_SCREEN.surface.getBoundingClientRect();
    const colliders = document.querySelectorAll('.collider, .collider-lvl2, .collider-lvl3, .collider-lvl4');
    
    const colliderRects = Array.from(colliders).map(collider => collider.getBoundingClientRect());

    const safeLeft = surface.left;
    const safeRight = surface.right - GAME_SCREEN.coinbox.offsetWidth;
    const safeTop = surface.top;
    const safeBottom = surface.bottom - GAME_SCREEN.coinbox.offsetHeight;

    let randomX, randomY, isColliding;

    do {
        randomX = Math.floor(Math.random() * (safeRight - safeLeft)) + safeLeft;
        randomY = Math.floor(Math.random() * (safeBottom - safeTop)) + safeTop;
        
        const coinRect = {
            left: randomX,
            right: randomX + GAME_SCREEN.coinbox.offsetWidth,
            top: randomY,
            bottom: randomY + GAME_SCREEN.coinbox.offsetHeight
        };


        isColliding = colliderRects.some(collider => 
            !(coinRect.right < collider.left || 
              coinRect.left > collider.right || 
              coinRect.bottom < collider.top || 
              coinRect.top > collider.bottom)
        );
        
    } while (isColliding); 

    GAME_SCREEN.coinbox.style.left = `${randomX - surface.left}px`;
    GAME_SCREEN.coinbox.style.top = `${randomY - surface.top}px`;
}


function handleCollision() {
    if (isColliding(PLAYER.box, GAME_SCREEN.coinbox)) {
        PLAYER.coins++;
        document.getElementById("coins-box").innerHTML = `<p>${PLAYER.coins} coins</p>`;
        respawnCoin();
    }
}

/***********************************
 * HANDEL LIFES
 * **********************************/
function removeLife(){
    if(LIFES.lifesCount == 3){
        LIFES.life3.style.opacity = '0';
        LIFES.lifesCount--;
    }
    else if(LIFES.lifesCount == 2){
        LIFES.life2.style.opacity = '0';
        LIFES.lifesCount--;
    }
    else{
        LIFES.life1.style.opacity = '0';
        LIFES.lifesCount--;
        gameOver();
    }

}


/***********************************
 * RESET LEVEL
 * **********************************/
function resetLevel(){
    //reset stats
    levelCount++;
    document.getElementById("level").innerHTML = `<p>${levelCount}</p>`
    timeLeft = 200;
    LIFES.life1.style.opacity = "1";
    LIFES.life2.style.opacity = "1";
    LIFES.life3.style.opacity = "1";
    LIFES.lifesCount = 3;
    document.getElementById("key-statistics").style.display = "none";

    document.getElementById("enemy-skeleton").style.right = '0px';
}

/***********************************
 * GAME LOOP
 * **********************************/
function gameLoop() {
    if(!hintsOpen && !gameEnded){
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

        /****** CHECKING COLLISIONS ****** */
    
        handleCollision();
        checkKeyCollision();
        checkDoorCollision();


        /*********** IS COLLIDING WITH *********** */
        /*********** level 1 *********** */
        if (isCollidingWith("collider16")) {
            if (!PLAYER.triggeredCollider16) {
                console.log("collider16")
                showPergament();
            }
        }

        /*********** level 2 *********** */
        if (isCollidingWith("vase")) {
            if (!PLAYER.triggeredVase) {
                showVase();
            }
        }
        if (isCollidingWith("bench")) {
            if (!PLAYER.triggeredBench) {
                hintsOpen = true; 
                writeText(5);
                PLAYER.triggeredBench = true;

            }
        }
        if (isCollidingWith("door-lvl2")) {
            hintsOpen = true; 
            showStone();
        }

        /*********** level 3 *********** */
        if (isCollidingWith("scarab")) {
            if (!PLAYER.triggeredScarab) {
                hintsOpen = true;
                document.getElementById("kompass").style.display = "block";
                document.getElementById("transparent-box").style.display = "block";
                enableImageRotation()
            }
        }
        if (isCollidingWith("mummy")) {
            showMummy();
        }
        if (isCollidingWith("map")) {
            hintsOpen = true;
            showMapLvl3();
        }
        if (isCollidingWith("door-lvl3")) {
            hintsOpen = true;
            switchToMystery3();
        }

        /*********** level 4 *********** */
        if (isCollidingWith("lake")) {
            hintsOpen = true;
            document.getElementById("symbolCanvas").style.display = "block";
            document.getElementById("text-container-level1").style.top = "60vh";
            startSymbolPuzzle();
        }
        if (isCollidingWith("special-box")) {
            hintsOpen = true;
            showItemsSpecialBox();
        }
        if (isCollidingWith("tatort")) {
            hintsOpen = true;
            showMysteriousSpace();
        }
        if (isCollidingWith("footprints")) {
            hintsOpen = true;
            showFootPrints();
        }


        /*********** ENEMYS *********** */
        if (isColliding(PLAYER.box, ENEMY2.box) && !isInvincible) {
            removeLife();
            isInvincible = true;
            PLAYER.box.classList.add('invincible');
        
            setTimeout(() => {
                isInvincible = false;
                PLAYER.box.classList.remove('invincible');
            }, 2000);
        }        
        if (isColliding(PLAYER.box, ENEMY.box) && !isInvincible) {
            removeLife();
            isInvincible = true;
            PLAYER.box.classList.add('invincible');
        
            setTimeout(() => {
                isInvincible = false;
                PLAYER.box.classList.remove('invincible');
            }, 2000);
        }    
        if (isColliding(PLAYER.box, ENEMY3.box) && !isInvincible) {
            removeLife();
            isInvincible = true;
            PLAYER.box.classList.add('invincible');
        
            setTimeout(() => {
                isInvincible = false;
                PLAYER.box.classList.remove('invincible');
            }, 2000);
        }
        
        moveEnemy();
        moveEnemy2Randomly();
        moveEnemy3Randomly();
       
    
        setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed); 
    }
}

/***********************************
 * GAME OVER
 * **********************************/
function gameOver(){
    gameEnded = true;
    document.getElementById("gameBody").style.display = "none";
    document.getElementById("quiz-lvl1").style.display = "none";
    document.getElementById("quiz-lvl2").style.display = "none";
    document.getElementById("quiz-lvl3").style.display = "none";
    document.getElementById("game-over").style.display = "block";
}