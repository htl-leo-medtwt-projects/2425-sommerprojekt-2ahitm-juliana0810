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

/***********************************
 * ENEMY
 ***********************************/


let TEXTSNIPPETS = [
    [
        'The door remains closed as long as the Pharaoh\'s key lies uncovered.',
        'No lock opens without knowledge – search for the hidden signs!',
        'Careful, the ancient spirits are determined to prevent you from escaping...'
    ],
    [
        'In the corner of a room, a gentle breeze uncovers something in the sand,',
        'Almost too obvious, a yellowed pergament lies on the ground, waiting to be discovered.',
        'Find it, pick it up, and uncover the truth that holds the solution to your escape',
    ],
    [
        'In a secret room, there is a key that unlocks the way forward.',
        'But this key remains hidden unless the puzzle is solved.',
        'The pergament holds the clue to finding the room where the key is hidden.',
        'The key opens the door to the next adventure, choose the right answer to continue...'
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

        delay += 4000;
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
        };
        textContainer.appendChild(closeHint);
    }, delay); 

}
function showMap(){
    document.getElementById("text-container-level1").style.top = "15vh";
    document.getElementById("text-container-level1").style.display = "block";
    document.getElementById("text-container-level1").innerHTML = 
            `<img src="img/map-rooms.png" id="map-rooms" alt="map-rooms">
                 <div id="rooms-container">
                    <p id="room1" onclick="showResultRooms(1)">Room 1</p>
                    <p id="room2" onclick="showResultRooms(2)">Room 2</p>
                    <p id="room3" onclick="showResultRooms(3)">Room 3</p>
                    <p id="room4" onclick="showResultRooms(4)">Room 4</p>
                 </div>
            <div id="hint-pergament"><p>show pergament</p></div>`
            
    document.getElementById("hint-pergament").addEventListener('click', openPergamentStatistiken);

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
    hintsOpen = true;
    const container = document.getElementById("pergament-box");
    container.style.display = 'block'; 
    container.innerHTML = `
        <img id="pergament" src="img/pergament.png">`;

    PLAYER.triggeredCollider16 = true;
    document.getElementById("pergament-close").style.display = "block";
}
function closePergament(){
    document.getElementById("pergament-box").style.display = "none";
    document.getElementById("pergament-close").style.display = "none";

    if(openedPergamentStatistics){
        hintsOpen = false;
    }
    else{
        openMapRooms();
    }
    
}

function openMapRooms(){
    writeText(2);
}

function showResultRooms(answer){

    if(answer == 2){
        document.getElementById(`room2`).style.backgroundColor = "rgba(9, 84, 9, 0.5)";
    }
    else{
        document.getElementById(`room${answer}`).style.backgroundColor = "rgba(94, 10, 10, 0.5)";
        document.getElementById("text-container-level1").innerHTML += `<p id="correctRoomText">The correct room is room 2.</p>`
        removeLife();
    }

    for(let i = 0; i < 4; i++){
        if((i + 1) != answer){
            document.getElementById(`room${i + 1}`).style.opacity = '0';
        }
    }
    setTimeout(() =>{
        document.getElementById("text-container-level1").style.display = "none";
        placeKey();
    }, 2000)
}

function placeKey(){
    hintsOpen = false;
    document.getElementById("key-placeholder").style.display = "block";
    document.getElementById("collider25").style.display = "none";

    setTimeout(() =>{
        gameLoop();
    },1000)
    
}

function openPergamentStatistiken(){
    hintsOpen = true;
    openedPergamentStatistics = true;
    const container = document.getElementById("pergament-box");
    container.style.display = 'block'; 
    container.innerHTML = `
        <img id="pergament" src="img/pergament.png">`;
    document.getElementById("pergament-close").style.display = "block";
}

/***********************************
 * ESCAPE ROOM
 * **********************************/

/* KEY */
function checkKeyCollision() {
    const key = document.getElementById("key-placeholder");
    if (key.style.display !== "none" && isCollidingWith("key-placeholder")) {
        key.style.display = "none"; 
        collectedKey = true;
        onKeyCollected(); 
    }
}
function onKeyCollected(){
    document.getElementById("key-statistics-img").style.display = "block";
}
/* DOOR*/
function checkDoorCollision() {
    const door = document.getElementById("door");
    if (door && isCollidingWith("door")) {
        doorEntered(); 
    }
}

function doorEntered(){
    if(collectedKey){
        document.getElementById("gameBody").style.display = "none";
        document.getElementById("quiz-lvl1").style.display = "block";
    }

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
let ENEMY = {
    box: document.getElementById('enemy'),
    sprite: document.getElementById('enemy-skeleton'),
    spriteImgNumber: 0,
    direction: 'down', 
    yOffset: 0, 
    speed: 1,
}
ENEMY.currentFrame = 0;
ENEMY.totalFrames = 8; 
ENEMY.frameWidth = 1.5; 

function animateEnemy() {
    if (ENEMY.spriteImgNumber < 8) { 
        ENEMY.spriteImgNumber++;
        let x = parseFloat(ENEMY.sprite.style.right) || 0;
        x += 31; 
        ENEMY.sprite.style.right = x + "px";
        ENEMY.sprite.style.top = ENEMY.yOffset + "px";
    } else {
        ENEMY.sprite.style.right = "0px";
        ENEMY.spriteImgNumber = 0;
    }
}


function moveEnemy() {
    let playerRect = PLAYER.box.getBoundingClientRect();
    let enemyRect = ENEMY.box.getBoundingClientRect();
    let surfaceRect = GAME_SCREEN.surface.getBoundingClientRect();

    let dx = playerRect.left - enemyRect.left;
    let dy = playerRect.top - enemyRect.top;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
        dx /= distance;
        dy /= distance;

        let newX = enemyRect.left + dx * ENEMY.speed;
        let newY = enemyRect.top + dy * ENEMY.speed;

        if (
            newX >= surfaceRect.left &&
            newX + enemyRect.width <= surfaceRect.right &&
            newY >= surfaceRect.top &&
            newY + enemyRect.height <= surfaceRect.bottom
        ) {
            ENEMY.box.style.left = `${newX}px`;
            ENEMY.box.style.top = `${newY}px`;
        }
    }
    if (Math.abs(dx) > Math.abs(dy)) {
        ENEMY.direction = dx > 0 ? 'right' : 'left';
    } else {
        ENEMY.direction = dy > 0 ? 'down' : 'up';
    }
    
    switch (ENEMY.direction) {
        case 'up': ENEMY.yOffset = 0; break;
        case 'down': ENEMY.yOffset = -75; break;
        case 'left': ENEMY.yOffset = -110; break;
        case 'right': ENEMY.yOffset = -110; break;
    }
    if (ENEMY.direction === 'left') {
        ENEMY.box.style.transform = 'scaleX(-1)';
    } else if (ENEMY.direction === 'right') {
        ENEMY.box.style.transform = 'scaleX(1)';
    }    
    animateEnemy();
}

function isColliding(player, enemy) {
    const rect1 = player.getBoundingClientRect();
    const rect2 = enemy.getBoundingClientRect();

    return !(
        rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom
    );
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
 * MYSTERY 1
 ***********************************/
let selectedRightAnswer = false;

function selectAnswerMysteryOne(id){
    document.getElementById(`${id}`).style.border = "1px solid #30211c";
    document.getElementById(`${id}`).style.borderRadius = "1em";

    if(id === "mystery-img3"){
        selectedRightAnswer = true;
    }

}
function selectedAnswer(){
    if(selectedRightAnswer){
        document.getElementById("quiz-container").innerHTML = `<p class="mystery1-result">Congraulations! You've choosen the right answer!</p>`
    }
    else{
        document.getElementById("quiz-container").innerHTML = `<p class="mystery1-result">I'm sorry, but that was the wrong answer!</p>`
        setTimeout(() =>{
            gameOver(); 
        })
    }
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
    
        handleCollision();
        checkKeyCollision();
        checkDoorCollision();
    
        if (isCollidingWith("collider16")) {
            if (!PLAYER.triggeredCollider16) {
                console.log("collider16")
                showPergament();
            }
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
        
        moveEnemy();
    
        setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed); 
    }
}
/***********************************
 * GAME OVER
 * **********************************/
function gameOver(){
    gameEnded = true;
    document.getElementById("gameBody").style.display = "none";
    document.getElementById("game-over").style.display = "block";
}