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
    ],
    [
        'In a secret room, there is a key that unlocks the way forward.',
        'But this key remains hidden unless the puzzle is solved.',
        'The parchment holds the clue to finding the room where the key is hidden.',
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

    setTimeout(() =>{
        if(index == 2){
        
            textContainer.innerHTML += 
            `<img src="img/map-rooms.png" id="map-rooms" alt="map-rooms">
                 <div id="rooms-container">
                    <p id="room1" onclick="showResultRooms(1)">Room 1</p>
                    <p id="room2" onclick="showResultRooms(2)">Room 2</p>
                    <p id="room3" onclick="showResultRooms(3)">Room 3</p>
                    <p id="room4" onclick="showResultRooms(4)">Room 4</p>
                 </div>`
        }
    }, 16000)

    
    

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
            else{
                document.getElementById("text-container-level1").style.display = "none";
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
    document.getElementById("pergament-close").style.display = "none";

    openMapRooms();
}

function openMapRooms(){
    document.getElementById("text-container-level1").style.top = "10vh";
    writeText(2);

}

function showResultRooms(answer){

    if(answer == 2){
        document.getElementById(`room2`).style.backgroundColor = "rgba(9, 84, 9, 0.5)";
    }
    else{
        document.getElementById(`room${answer}`).style.backgroundColor = "rgba(94, 10, 10, 0.5)";
    }

    for(let i = 0; i < 4; i++){
        if((i + 1) != answer){
            document.getElementById(`room${i + 1}`).style.opacity = '0';
        }
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
    speed: 1.5,
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
    moveEnemy();

    setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed); 
}
