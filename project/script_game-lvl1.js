 /*map*/
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
    document.getElementById("key").style.display = "block";
    document.getElementById("collider25").style.display = "none";
    document.getElementById("collider25-transparent").style.display = "block";


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
        mysteryOpen = true;
        document.getElementById("gameBody").style.display = "none";
        document.getElementById("quiz-lvl1").style.display = "block";

        setupMysterySelection();
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
    speed: 0.8
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
 * MYSTERY 1
 ***********************************/
let selectedMysteryId = null;

function setupMysterySelection() {
    const mysteryContainer = document.getElementById("mystery-choices");
    if (!mysteryContainer) {
        console.error("Element #mystery-choices nicht gefunden!");
        return;
    }

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
