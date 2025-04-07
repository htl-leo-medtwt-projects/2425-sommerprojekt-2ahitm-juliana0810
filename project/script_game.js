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

/***********************************
 * ENEMY
 ***********************************/
let ENEMY = {
    box: document.getElementById('enemy'),
    spriteImgNumber: 0, 
    spriteDirection: 1,
    speed: 2,
    spriteImg: document.getElementById('enemy-skeleton')  
};
let yValueEnemy = 0;

let TEXTSNIPPETS = [
    [
        'The door remains sealed as long as the Pharaoh\'s key lies uncovered.',
        'No lock opens without knowledge – seek the hidden signs,',
        'for only those who decipher the clues shall find it.'
    ],
    [
        'In the corner of the room, a gentle breeze stirs the sand,',
        '– as if something had just moved.',
        'From a hidden corner, a parchment peeks out…',
        'Not finding the relic shall be your final demise, so search well'
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
    const player = PLAYER.box;
    const collider = document.getElementById(id);

    const pLeft = player.offsetLeft;
    const pTop = player.offsetTop;
    const pRight = pLeft + player.offsetWidth;
    const pBottom = pTop + player.offsetHeight;

    const cLeft = collider.offsetLeft;
    const cTop = collider.offsetTop;
    const cRight = cLeft + collider.offsetWidth;
    const cBottom = cTop + collider.offsetHeight;

    return !(
        pRight <= cLeft ||
        pLeft >= cRight ||
        pBottom <= cTop ||
        pTop >= cBottom
    );
}


function showPergament() {
    const container = document.getElementById("pergament-box");
    container.style.display = 'block'; 
    container.innerHTML = `
        <img id="pergament" src="img/pergament.png">`;

    PLAYER.triggeredCollider16 = true;
    document.getElementById("pergament-close").style.display = "block";
}
function closePergament(){
    document.getElementById("pergament-box").style.display = "none";
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
 * ENEMY - MOVE TOWARD PLAYER
 ***********************************/
function moveEnemyTowardPlayer() {
    const playerX = parseFloat(PLAYER.box.style.left);
    const playerY = parseFloat(PLAYER.box.style.top);  
    let enemyX = parseFloat(ENEMY.box.style.left);    
    let enemyY = parseFloat(ENEMY.box.style.top);      

    const dx = playerX - enemyX;  
    const dy = playerY - enemyY;  

    const distance = Math.sqrt(dx * dx + dy * dy);

 
    if (distance > 1) {
        const speed = ENEMY.speed; 

        const moveX = (dx / distance) * speed;
        const moveY = (dy / distance) * speed;

    
        ENEMY.box.style.left = (enemyX + moveX) + 'px';
        ENEMY.box.style.top = (enemyY + moveY) + 'px';

        
        if (Math.abs(dx) > Math.abs(dy)) {  
            if (dx > 0) {
                ENEMY.spriteDirection = 1; 
            } else {
                ENEMY.spriteDirection = -1; 
            }
        } else { 
            if (dy > 0) {
                ENEMY.spriteDirection = 2; 
            } else {
                ENEMY.spriteDirection = 3; 
            }
        }

        animateEnemy();
    }
}

/***********************************
 * ENEMY - ANIMATION
 ***********************************/

function animateEnemy() {
    if (ENEMY.spriteImgNumber < 8) { 
        ENEMY.spriteImgNumber++;

        ENEMY.spriteImgNumber++;
        let x = parseFloat(document.getElementById("enemy-skeleton").style.left);
        x += 30; 
        document.getElementById("enemy-skeleton").style.left = x + "px"; 
        let yValueEnemy = 0; 
        if (ENEMY.spriteDirection === 1 || ENEMY.spriteDirection === -1) {

            yValueEnemy = -90;
        } else if (ENEMY.spriteDirection === 2) {
          
            yValueEnemy = -60; 
        } else if (ENEMY.spriteDirection === 3) {
           
            yValueEnemy = 0; 
        }

       
        document.getElementById("enemy-skeleton").style.top = yValueEnemy + "px";
    } else { 
        document.getElementById("enemy-skeleton").style.left = "0px"; 
        ENEMY.spriteImgNumber = 0; 
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
            console.log("collider16")
            showPergament();
        }
    }
    moveEnemyTowardPlayer();  
    animateEnemy();   


    setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed); 
}
