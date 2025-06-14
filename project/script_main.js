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
let mysteryOpen = false;
let collectedKeyLvl5 = false;


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
 * SPEED ITEM
 * **********************************/
let SPEED_ITEM = {
    name: "Speed Boost",
    image: "img/speed.png",
    active: false, 
    element: null 
};

let SOUNDS = {
    collect: new Audio("audio/collect.mp3"),
    countdown: new Audio("audio/countdown-sound.mp3"),
    background_music: new Audio("audio/Frank Ocean - Pyramids.mp3"),
    lifeLost: new Audio("audio/life-lost.mp3"),
    gameEndedSound: new Audio("audio/game-over.mp3"),
    speedCollect: new Audio("audio/speed-audio.mp3"),
    audioSpeach: new Audio("audio/speech-lvl5.wav"),
    keys: new Audio("audio/keys-lvl1.mp3"),
    scanner: new Audio("audio/scanner.mp3"),
    stars: new Audio("audio/stars-mystery.mp3"),
    map: new Audio("audio/map.mp3")
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
    ],
    [
        'Three options...one choice to make, that could cost a life...',
        'Choose wise if you want Jack to be by your side from now on.'
    ],
    [
        'Still alive? The stairs in the top left corner lead to freedom...'
    ],
    [
        'A voice is resting on the other side of the lake',
        'Build yourself a way to get to the hidden answers',
    ],
    [
        'One last challenge is remaining... ',
        'look under the dinosaur remains, you will find the way out'
    ],
    [
        'Three tools I offer, cold and true —',
        'One bends the lock, the door breaks through.'
    ],
    [
        'The crowbar was mighty—it shattered the first door with ease!',
        'But... the second is still closed - find the key to overcome the last barrier'
    ],
];

let timeLeft;

/*******  TIMER *********** */
function startTimer() {
    clearInterval(countdown)
    timeLeft = 150;
    document.getElementById("sanduhr-box").innerHTML = `<p>${timeLeft}s</p>`
    
    if(!mysteryOpen){
        countdown = setInterval(() => {
            if (gameEnded) {  
                clearInterval(countdown);
                return;
            }

            timeLeft--
            document.getElementById("sanduhr-box").innerHTML = `<p>${timeLeft}s</p>`

            if(timeLeft == 5){
                SOUNDS.countdown.play();
            }

            if (timeLeft <= 0) {
                clearInterval(countdown)
                document.getElementById("sanduhr-box").innerHTML = "";
                console.log("time ran out");
                gameOver();
            }
        }, 1000)
    }
    
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

        delay += 1000;
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
            else if(index == 14){
                setTimeout(()=> setupMedicineSelection(), 500);
            }
            else if(index == 15){
                document.getElementById("door-lvl4").style.display = "block";
                hintsOpen = false;
                gameLoop();
            }
            else if(index == 16){
                hintsOpen = true;
                document.getElementById("container-blanks").style.display = "block"; 
                startPlankPuzzle();
            }
            else if(index == 17){
                hintsOpen = false;
                document.getElementById("dinosaur").style.display = "block";
                gameLoop();
            }
            else if(index == 19){
                document.getElementById("door-lvl5").style.display = "none";
                document.getElementById("key-door-lvl5").style.display = "block";
                hintsOpen = false;
                gameLoop();
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
        SOUNDS.collect.play();
        PLAYER.coins++;
        document.getElementById("coins-box").innerHTML = `<p>${PLAYER.coins} coins</p>`;
        respawnCoin();
    }
}

/***********************************
 * SPEED ITEM
 * **********************************/
function spawnSpeedItem() {
    const surface = GAME_SCREEN.surface.getBoundingClientRect();
    const colliders = document.querySelectorAll('.collider, .collider-lvl2, .collider-lvl3, .collider-lvl4');
    const colliderRects = Array.from(colliders).map(c => c.getBoundingClientRect());

    const itemWidth = 20; 
    const itemHeight = 20;

    const safeLeft = surface.left;
    const safeRight = surface.right - itemWidth;
    const safeTop = surface.top;
    const safeBottom = surface.bottom - itemHeight;

    let randomX, randomY, isColliding;

    do {
        randomX = Math.floor(Math.random() * (safeRight - safeLeft)) + safeLeft;
        randomY = Math.floor(Math.random() * (safeBottom - safeTop)) + safeTop;

        const newItemRect = {
            left: randomX,
            right: randomX + itemWidth,
            top: randomY,
            bottom: randomY + itemHeight
        };

        isColliding = colliderRects.some(collider =>
            !(newItemRect.right < collider.left ||
              newItemRect.left > collider.right ||
              newItemRect.bottom < collider.top ||
              newItemRect.top > collider.bottom)
        );

    } while (isColliding);

    const speedItemElement = document.createElement("img");
    speedItemElement.src = SPEED_ITEM.image; 
    speedItemElement.classList.add("item", "speedItem");
    speedItemElement.style.position = 'absolute';
    speedItemElement.style.left = `${randomX - surface.left}px`;
    speedItemElement.style.top = `${randomY - surface.top}px`;
    speedItemElement.style.width = '2.5em';
    speedItemElement.style.height = '2.5em';
    speedItemElement.style.zIndex = '1000';

    GAME_SCREEN.surface.appendChild(speedItemElement);

    SPEED_ITEM.active = true;
    SPEED_ITEM.element = speedItemElement;

    setTimeout(() => {
        if (SPEED_ITEM.active) {
            removeSpeedItem();
        }
    }, 5000);
}


function removeSpeedItem() {
    if (SPEED_ITEM.active && SPEED_ITEM.element) {
        SPEED_ITEM.element.remove(); 
        SPEED_ITEM.active = false;
        SPEED_ITEM.element = null;
    }
}
function activateSpeedBoost() {
    if (GAME_CONFIG.characterSpeed == 5) {
        GAME_CONFIG.characterSpeed += 3; 
    }
    document.getElementById("speed-grey").innerHTML = "<img class='item' id='speed-grey-img' src='img/speed.png' alt='speed'>";
    document.getElementById("speed-grey-img").classList.add("speed-on");

    setTimeout(() => {
        if (GAME_CONFIG.characterSpeed != 5) {
            GAME_CONFIG.characterSpeed -= 3; 
        }
        document.getElementById("speed-grey").innerHTML = "<img class='item' src='img/speed-grey.png' alt='speed-grey'>";
        document.getElementById("speed-grey").classList.remove("speed-on");
    }, 5000);
}
function checkSpeedItemCollision() {
    if (SPEED_ITEM.active && SPEED_ITEM.element) {
        if (isColliding(PLAYER.box, SPEED_ITEM.element)) {
            SOUNDS.speedCollect.play();
            activateSpeedBoost();
            removeSpeedItem();
        }
    }
}


/***********************************
 * HANDEL LIFES
 * **********************************/
function removeLife(){
    if(LIFES.lifesCount == 3){
        LIFES.life3.style.opacity = '0';
        LIFES.lifesCount--;
        SOUNDS.lifeLost.play();
    }
    else if(LIFES.lifesCount == 2){
        LIFES.life2.style.opacity = '0';
        LIFES.lifesCount--;
        SOUNDS.lifeLost.play();
    }
    else{
        LIFES.life1.style.opacity = '0';
        LIFES.lifesCount--;
        console.log("lifes ran out")
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
    timeLeft = 250;
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
    if(!hintsOpen && !gameEnded && !mysteryOpen){
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
                SOUNDS.map.play()
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
            SOUNDS.map.play();
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
        if (isCollidingWith("door-lvl4")) {
            hintsOpen = true;
            switchToMystery4();
        }
        

        /*********** level 5 *********** */
        if (isCollidingWith("collider240")) {
            hintsOpen = true;
            writeText(16);
        }
        if (isCollidingWith("lake-lvl5")) {
            hintsOpen = true;
            writeText(16);
        }
        if (isCollidingWith("audio-device")) {
            hintsOpen = true;
            SOUNDS.background_music.volume = 0.3;
            document.getElementById("audio-container").style.display = "block";
        }
        if (isCollidingWith("dinosaur")) {
            hintsOpen = true;
            startDinoPuzzle();
        }

        if (isCollidingWith("door-lvl5") && !collectedKeyLvl5) {
            console.log(collectedKeyLvl5)
            hintsOpen = true;
            document.getElementById("text-container-level1").style.top = "30vh";
            writeText(19);
        }
        if (isCollidingWith("key-door-lvl5") ) {
            SOUNDS.keys.play();
            collectedKeyLvl5 = true;
            document.getElementById("door-lvl5").style.display = "block";
            document.getElementById("key-door-lvl5").style.display = "none";
            document.getElementById("key-statistics").innerHTML = `<img id="key-statistics-img" src="img/key-door-lvl5.png" alt="key-door-lvl5">`
            document.getElementById("key-statistics").style.display = "block";
        }
        if (isCollidingWith("door-lvl5") && collectedKeyLvl5) {
            console.log(collectedKeyLvl5)
            hintsOpen = true;
            gameEnded = true;
            switchToLeavingRoom()
        }

        /*********** ENEMYS *********** */
        /*********** ENEMYS *********** */
        if (!hintsOpen && !gameEnded) {  
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

        }
        
        moveEnemy();
        moveEnemy2Randomly();
        moveEnemy3Randomly();

        if (savedExplorer) {
            moveBuddy();
        }
    
        checkSpeedItemCollision();
        checkGrassCollision();

        if (!SPEED_ITEM.active && Math.random() < 0.01) { 
            console.log("speed item active");
            spawnSpeedItem();
        }

       
    
        setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed); 
    }
}

/***********************************
 * GAME OVER
 * **********************************/
function gameOver(){
    SOUNDS.gameEndedSound.play();
    gameEnded = true;
    
     const score = PLAYER.coins + levelCount * 10;
    saveToLeaderBoard(username, score);

    document.getElementById("gameBody").style.display = "none";
    document.getElementById("quiz-lvl1").style.display = "none";
    document.getElementById("quiz-lvl2").style.display = "none";
    document.getElementById("quiz-lvl3").style.display = "none";
    document.getElementById("quiz-lvl4").style.display = "none";
    document.getElementById("game-over").style.display = "block";
}