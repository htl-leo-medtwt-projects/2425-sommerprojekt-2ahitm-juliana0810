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
        'No lock opens without knowledge – find the signs!',
        'Ancient spirits try to stop your escape...'
    ],
    [
        'A breeze reveals something in the sand.',
        'A yellowed parchment lies in plain sight.',
        'Find it – it holds the key to escape.'
    ],
    [
        'A secret room holds the key forward.',
        'But it stays hidden without solving the puzzle.',
        'The parchment reveals the key’s location.',
        'Choose the right answer to move on...'
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
                hintsOpen = false;
                startTimer();
                gameLoop();
            }
            else if(index == 5){
                hintsOpen = false;
                document.getElementById("collider87").style.display = "none";
                gameLoop();
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
        gameEnded = true;
        doorEntered(); 
    }
}

function doorEntered(){
    if(collectedKey){
        document.getElementById("gameBody").style.display = "none";
        document.getElementById("quiz-lvl1").style.display = "block";
        document.getElementById("quiz-lvl1").innerHTML = 
        `<h1 id="quiz-headline">mystery one</h1>
        <div id="quiz-container">
            <p>Among these statues, only one is Anubis - the guardian who watched as you took the key from its resting place.</p>
            <div id="mystery-choices">
                <img id="mystery-img1" src="img/mystery-img1.png" alt="mystery-img1">
                <img id="mystery-img2" src="img/mystery-img2.png" alt="mystery-img2">
                <img id="mystery-img3" src="img/mystery-img3.png" alt="mystery-img3">
            </div>
            <p onclick="selectedAnswer()" id="mystery-one-select">select</p>
        </div>`

        setupMysterySelection();
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

let ENEMY2 = {
    box: document.getElementById("random-enemy"),
    sprite: document.getElementById("random-enemy-img"),
    speed: 1.2,
    spriteImgNumber: 0,
    direction: 'down',
    yOffset: 0,
    targetX: 0,
    targetY: 0
  };


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

function animateEnemy2() {
    if (ENEMY2.spriteImgNumber < 8) {
        ENEMY2.spriteImgNumber++;
        let x = parseFloat(ENEMY2.sprite.style.right) || 0;
        x += 31;
        ENEMY2.sprite.style.right = x + "px";
        ENEMY2.sprite.style.top= ENEMY2.yOffset + "px";
    } else {
        ENEMY2.sprite.style.right= "0px";
        ENEMY2.spriteImgNumber = 0;
    }
}
  
function pickRandomTargetForEnemy2() {
    const surfaceRect = GAME_SCREEN.surface.getBoundingClientRect();
    const topR    = document.getElementById('collidertop').getBoundingClientRect();
    const bottomR = document.getElementById('colliderbottom').getBoundingClientRect();
    const leftR   = document.getElementById('colliderleft').getBoundingClientRect();
    const rightR  = document.getElementById('colliderright').getBoundingClientRect();
  
  
    const minX = leftR.right   - surfaceRect.left;
    const maxX = rightR.left   - surfaceRect.left - ENEMY2.box.offsetWidth;
    const minY = topR.bottom   - surfaceRect.top;
    const maxY = bottomR.top   - surfaceRect.top - ENEMY2.box.offsetHeight;
  
    ENEMY2.targetX = Math.random() * (maxX - minX) + minX;
    ENEMY2.targetY = Math.random() * (maxY - minY) + minY;
}
  

setInterval(() => {
    if (!gameEnded && !hintsOpen) pickRandomTargetForEnemy2();
}, 4000);
  

function moveEnemy2Randomly() {
    const enemyRect   = ENEMY2.box.getBoundingClientRect();
    const surfaceRect = GAME_SCREEN.surface.getBoundingClientRect();
  
    const currX = enemyRect.left - surfaceRect.left;
    const currY = enemyRect.top  - surfaceRect.top;
  
   
    let dx = ENEMY2.targetX - currX;
    let dy = ENEMY2.targetY - currY;
    const dist = Math.hypot(dx, dy);
    if (dist > 0) {
      dx /= dist;
      dy /= dist;
      
      const stepX = dx * ENEMY2.speed;
      const stepY = dy * ENEMY2.speed;
      const newX = currX + stepX;
      const newY = currY + stepY;
      ENEMY2.box.style.left = `${newX}px`;
      ENEMY2.box.style.top  = `${newY}px`;
    }
  
    if (Math.abs(dx) > Math.abs(dy)) {
      ENEMY2.direction = dx > 0 ? 'right' : 'left';
    } else {
      ENEMY2.direction = dy > 0 ? 'down' : 'up';
    }
    switch (ENEMY2.direction) {
      case 'up':    ENEMY2.yOffset = 0;    break;
      case 'down':  ENEMY2.yOffset = -75;  break;
      case 'left':  ENEMY2.yOffset = -110; break;
      case 'right': ENEMY2.yOffset = -110; break;
    }
    

    if (ENEMY2.direction === 'left') {
        ENEMY2.box.style.transform = 'scaleX(-1)';
    } else if (ENEMY2.direction === 'right') {
        ENEMY2.box.style.transform = 'scaleX(1)';
    }    
  
    animateEnemy2();
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
let selectedMysteryId = null;

function setupMysterySelection() {
    const mysteryContainer = document.getElementById("mystery-choices");

    mysteryContainer.addEventListener("click", function (e) {
        if (e.target.tagName.toLowerCase() === "img") {
            const images = mysteryContainer.querySelectorAll("img");
            images.forEach(img => {
                img.style.border = "none";
                img.style.borderRadius = "0";
            });
            e.target.style.border = "2px solid #592a1d";
            e.target.style.borderRadius = "1em";

            selectedMysteryId = e.target.id;
        }
    });
}

function selectedAnswer() {
    if (selectedMysteryId === "mystery-img3") {
        document.getElementById("quiz-container").innerHTML =
            `<p class="mystery1-result">Congratulations! You've chosen the right answer!</p>`;
            switchToLevelTwo();
    } else {
        document.getElementById("quiz-container").innerHTML =
            `<p class="mystery1-result">I'm sorry, but that was the wrong answer!</p>`;
        setTimeout(() => {
            gameOver();
        }, 2000);
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

        /****** CHECKING COLLISIONS ****** */
    
        handleCollision();
        checkKeyCollision();
        checkDoorCollision();

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
        if (isCollidingWith("collider16")) {
            if (!PLAYER.triggeredCollider16) {
                console.log("collider16")
                showPergament();
            }
        }
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
        
        moveEnemy();
        moveEnemy2Randomly();
       
    
        setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed); 
    }
}



/***********************************
 *  LEVEL TWO
 * **********************************/

function switchToLevelTwo() {

    //switch to right board
    document.getElementById("storyTelling").style.display = "none";
    document.getElementById("quiz-lvl1").style.display = "none";
    document.getElementById("gameBody").style.display = "block";

    //change enemy
    document.getElementById("enemy-skeleton").src = "img/enemy-level2.png";
    document.getElementById("enemy").style.width = "2.75vw";

    //change background
    document.getElementById("gameBoard").style.backgroundImage = "url('img/game-board-level2.png')";

    //set colliders display none
    const colliders = document.querySelectorAll('.collider');
    colliders.forEach(collider => {
        collider.style.display = "none";
    });

    document.getElementById("collider16").style.display = "none";
    document.getElementById("collidertop").style.display = "block";
    document.getElementById("colliderleft").style.display = "block";
    document.getElementById("colliderright").style.display = "block";
    document.getElementById("colliderbottom").style.display = "block";

    //reset booleans
    collectedKey = false;
    gameEnded = false;
    hintsOpen = false;

    resetLevel();
    setTimeout(() => writeText(3), 2000);

}

function resetLevel(){
    //reset stats
    levelCount++;
    document.getElementById("level").innerHTML = `<p>${levelCount}</p>`
    PLAYER.coins = 0;
    document.getElementById("coins-box").innerHTML = `<p>${PLAYER.coins} coins</p>`;
    timeLeft = 200;
    LIFES.life1.style.opacity = "1";
    LIFES.life2.style.opacity = "1";
    LIFES.life3.style.opacity = "1";
    LIFES.lifesCount = 3;
    document.getElementById("key-statistics").style.display = "none";

    //dont know if i need it later but for now...
    value = counter;

    playerImage = `<img id="spriteImg" src="${players[counter]}">`;
    document.getElementById("player").innerHTML = playerImage;
    
    if (profileImageSrc) {
        document.getElementById("level1-profilimg").src = profileImageSrc;
    }
    else{
        document.getElementById("level1-profilimg").src = "img/profil-placeholder.png";
    }
    document.querySelector(".username").innerHTML = username;
    //***** */

    //set players & enemys start positions

    PLAYER.box.style.left = '700px'; 
    PLAYER.box.style.top = '600px'; 
    ENEMY.box.style.left = '500px';
    ENEMY.box.style.top = "400px";
    ENEMY.box.style.opacity = '1';
    PLAYER.box.style.opacity = '1';
    ENEMY2.box.style.left = "500px";
    ENEMY2.box.style.top = "300px";
    ENEMY2.box.style.opacity = "1";

    document.getElementById("spriteImg").style.right = '0px'; 
    document.getElementById("enemy-skeleton").style.right = '0px';
}


/***********************************
 * HINTS LVL 2
 * **********************************/

function showVase(){
    PLAYER.triggeredVase = true;
    hintsOpen = true;
    const container = document.getElementById("vase-box");
    container.style.display = 'block'; 
    container.innerHTML = `
        <img id="vase-img" src="img/vase.png">`;

    document.getElementById("vase-close").style.display = "block";

}
function closeVase(){
    document.getElementById("vase-box").style.display = "none";
    document.getElementById("vase-close").style.display = "none";
    hintsOpen = false;
    document.getElementById("collider63").style.display = "none";
    gameLoop();
}
function showStone(){
    document.getElementById("stone-box").style.display = "block";
    document.getElementById("stone-close").style.display = "block";
    document.getElementById("stone-box").innerHTML = '<img id="stone-img" src="img/ringOfLife.png">';
    document.getElementById("text-container-level1").style.top = "65vh";
    writeText(6);
}
function showOptionsStone(){
    document.getElementById("stone-box").innerHTML = 
        `<div>
            <img class="options" id="option1" src="img/option1-ring.png">
            <img class="options" id="option2" src="img/option2-ring.png">
            <img class="options" id="option3" src="img/option3-ring.png">
        </div>`
}

/***********************************
 * GAME OVER
 * **********************************/
function gameOver(){
    gameEnded = true;
    document.getElementById("gameBody").style.display = "none";
    document.getElementById("quiz-lvl1").style.display = "none";
    document.getElementById("game-over").style.display = "block";
}