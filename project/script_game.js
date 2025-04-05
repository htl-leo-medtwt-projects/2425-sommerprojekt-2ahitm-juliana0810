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

let TEXTSNIPPETS = [
    [
        'Die Tuer bleibt versiegelt, solange der Schluessel des Pharaos ruht.', 
        'Kein Schloss oeffnet sich ohne Wissen - suche die verborgenen Zeichen, ',
        'denn nur wer die Hinweise entschluesselt, wird ihn finden'

    ],
    [
        'In der Ecke des Raumes wirbelt ein leichter Luftzug den Sand auf', 
        '- als haette sich gerade etwas bewegt', 
        'Aus einer versteckten Ecke ragt eine vergilbte Ecke Pergament hervor…', 
    ]
];


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

        delay += 4000;
    });

    setTimeout(() => {
        let closeHint = document.createElement('p');
        closeHint.id = 'text-cont-close';
        closeHint.innerText = 'close hint';
        closeHint.style.cursor = 'pointer';
        closeHint.onclick = () => {
            textContainer.style.display = 'none';
            if (index === 0) {
                writeText(1);
            }
            else if(index === 1){
                startGame();
            }
        };
        textContainer.appendChild(closeHint);
    }, delay); 

}
/***********************************
 * FINDING KEY - HINTS
 * **********************************/
function isCollidingWith(id) {
    const playerRect = PLAYER.box.getBoundingClientRect();
    const colliderRect = document.getElementById(id).getBoundingClientRect();

    return !(
        playerRect.right < colliderRect.left ||
        playerRect.left > colliderRect.right ||
        playerRect.bottom < colliderRect.top ||
        playerRect.top > colliderRect.bottom
    );
}

function showPergament(){
    document.getElementById("text-container-level1").innerHTML = 
        `<img id="pergament" src="img/pergament.png">`
}


/***********************************
 * COIN
 * **********************************/

function respawnCoin() {
    const surface = GAME_SCREEN.surface.getBoundingClientRect();
    const colliders = document.querySelectorAll('.collider');
    
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

    if (isCollidingWith("collider16")) {
        if (!PLAYER.triggeredCollider16) {
            PLAYER.triggeredCollider16 = true;
            console.log("collider16")
            showPergament();
        }
    }

    setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed); 
}
