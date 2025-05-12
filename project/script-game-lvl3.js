let ENEMY3 = {
    box: document.getElementById("random-enemy2"),
    sprite: document.getElementById("random-enemy2-img"),
    speed: 0.8, 
    spriteImgNumber: 0,
    direction: 'down',
    yOffset: 0,
    targetX: 0,
    targetY: 0
};



function animateEnemy3() {
    if (ENEMY3.spriteImgNumber < 8) {
        ENEMY3.spriteImgNumber++;
        let x = parseFloat(ENEMY3.sprite.style.right) || 0;
        x += 31;
        ENEMY3.sprite.style.right = x + "px";
        ENEMY3.sprite.style.top = ENEMY3.yOffset + "px";
    } else {
        ENEMY3.sprite.style.right = "0px";
        ENEMY3.spriteImgNumber = 0;
    }
}

function pickRandomTargetForEnemy3() {
    const surfaceRect = GAME_SCREEN.surface.getBoundingClientRect();
    const topR = document.getElementById('collidertop').getBoundingClientRect();
    const bottomR = document.getElementById('colliderbottom').getBoundingClientRect();
    const leftR = document.getElementById('colliderleft').getBoundingClientRect();
    const rightR = document.getElementById('colliderright').getBoundingClientRect();

    const minX = leftR.right - surfaceRect.left;
    const maxX = rightR.left - surfaceRect.left - ENEMY3.box.offsetWidth;
    const minY = topR.bottom - surfaceRect.top;
    const maxY = bottomR.top - surfaceRect.top - ENEMY3.box.offsetHeight;

    ENEMY3.targetX = Math.random() * (maxX - minX) + minX;
    ENEMY3.targetY = Math.random() * (maxY - minY) + minY;
}

setInterval(() => {
    if (!gameEnded && !hintsOpen) pickRandomTargetForEnemy3();
}, 2500);


function moveEnemy3Randomly() {
    const enemyRect = ENEMY3.box.getBoundingClientRect();
    const surfaceRect = GAME_SCREEN.surface.getBoundingClientRect();

    const currX = enemyRect.left - surfaceRect.left;
    const currY = enemyRect.top - surfaceRect.top;

    let dx = ENEMY3.targetX - currX;
    let dy = ENEMY3.targetY - currY;
    const dist = Math.hypot(dx, dy);
    
    if (dist > 0) {
        dx /= dist;
        dy /= dist;
        
        const stepX = dx * ENEMY3.speed;
        const stepY = dy * ENEMY3.speed;
        const newX = currX + stepX;
        const newY = currY + stepY;
        ENEMY3.box.style.left = `${newX}px`;
        ENEMY3.box.style.top = `${newY}px`;
    }

    if (Math.abs(dx) > Math.abs(dy)) {
        ENEMY3.direction = dx > 0 ? 'right' : 'left';
    } else {
        ENEMY3.direction = dy > 0 ? 'down' : 'up';
    }
    
    switch (ENEMY3.direction) {
        case 'up':    ENEMY3.yOffset = 0;    break;
        case 'down':  ENEMY3.yOffset = -75;  break;
        case 'left':  ENEMY3.yOffset = -110; break;
        case 'right': ENEMY3.yOffset = -110; break;
    }

    if (ENEMY3.direction === 'left') {
        ENEMY3.box.style.transform = 'scaleX(-1)';
    } else if (ENEMY3.direction === 'right') {
        ENEMY3.box.style.transform = 'scaleX(1)';
    }

    animateEnemy3();
}

/***********************************
 * LEVEL 3
 * **********************************/
function switchToLevelThree(){
    hintsOpen = false;
    mysteryOpen = false;
    //switch to right board
    document.getElementById("storyTelling").style.display = "none";
   
    document.getElementById("quiz-lvl1").style.display = "none";
    document.getElementById("quiz-lvl2").style.display = "none";
    document.getElementById("gameBody").style.display = "block";

    //change enemy
    document.getElementById("enemy-skeleton").src = "img/enemy1-lvl3.png";
    document.getElementById("enemy").style.width = "2.75vw";

    document.getElementById("random-enemy-img").src = "img/enemy2-lvl3.png";
    document.getElementById("random-enemy2-img").style.display = "block";
    document.getElementById("random-enemy2").style.display = "block";
    document.getElementById("random-enemy").style.display = "block";

    //change background
    document.getElementById("gameBoard").style.backgroundImage = "url('img/game-board-level3.png')";

    //set colliders display none
    const colliders = document.querySelectorAll('.collider, .collider-lvl2');
    colliders.forEach(collider => {
        collider.style.display = "none";
    });
    
    document.getElementById("scarab").style.display = "block";

    document.getElementById("collider16").style.display = "none";
    document.getElementById("collidertop").style.display = "block";
    document.getElementById("colliderleft").style.display = "block";
    document.getElementById("colliderright").style.display = "block";
    document.getElementById("colliderbottom").style.display = "block";

    document.getElementById("transparent-box").style.display = "none";

    const items = document.querySelectorAll('.lvl2-items, .lvl1-items');
    items.forEach(collider => {
        collider.style.display = "none";
    });

    //set colliders display block
    const collidersLvl3 = document.querySelectorAll('.collider-lvl3');
    collidersLvl3.forEach(collider => {
        collider.style.display = "block";
    });

    //reset booleans
    collectedKey = false;
    hintsOpen = false;

    document.getElementById("text-container-level1").style.top = "30vh";

    //player position
    PLAYER.box.style.left = '580px'; 
    PLAYER.box.style.top = '600px'; 
    PLAYER.box.style.opacity = '1';

    //enemy position
    ENEMY.box.style.left = '500px';
    ENEMY.box.style.top = "200px";
    ENEMY.box.style.opacity = '1';
    ENEMY2.box.style.left = "650px";
    ENEMY2.box.style.top = "300px";
    ENEMY2.box.style.opacity = "1";
    ENEMY3.box.style.left = "700px";
    ENEMY3.box.style.top = "400px";
    ENEMY3.box.style.opacity = "1";

    ENEMY.speed = 0.6;

    document.getElementById("enemy-skeleton").style.right = '0px';
    document.getElementById("random-enemy-img").style.right = '0px';
    document.getElementById("random-enemy2-img").style.right = '0px';

    /*just for now*/
    playerImage = `<img id="spriteImg" src="${players[counter]}">`;
    document.getElementById("player").innerHTML = playerImage;

    resetLevel();
    writeText(7);
}

/********* ROTATE IMAGE ***********/
let currentRotation = 90;
function enableImageRotation() {
    document.getElementById("select-direction").style.display = "block";

   const image = document.getElementById('rotatable-image');
   let isDragging = false;
   let startAngle = 0;


   image.style.display = 'block';

   image.addEventListener('mousedown', (e) => {
       isDragging = true;
       const rect = image.getBoundingClientRect();
       const centerX = rect.left + rect.width / 2;
       const centerY = rect.top + rect.height / 2;
       startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) - currentRotation;
   });

   document.addEventListener('mousemove', (e) => {
       if (!isDragging) return;
       const rect = image.getBoundingClientRect();
       const centerX = rect.left + rect.width / 2;
       const centerY = rect.top + rect.height / 2;
       const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
       currentRotation = angle - startAngle;
       image.style.transform = `rotate(${currentRotation}deg)`;
   });

   document.addEventListener('mouseup', () => {
       isDragging = false;
   });

   image.addEventListener('touchstart', (e) => {
       isDragging = true;
       const touch = e.touches[0];
       const rect = image.getBoundingClientRect();
       const centerX = rect.left + rect.width / 2;
       const centerY = rect.top + rect.height / 2;
       startAngle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * (180 / Math.PI) - currentRotation;
   });
   
   document.addEventListener('touchmove', (e) => {
       if (!isDragging) return;
       const touch = e.touches[0];
       const rect = image.getBoundingClientRect();
       const centerX = rect.left + rect.width / 2;
       const centerY = rect.top + rect.height / 2;
       const angle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * (180 / Math.PI);
       
       currentRotation = angle - startAngle;
       image.style.transform = `rotate(${currentRotation}deg)`;
   });
   
   document.addEventListener('touchend', () => {
       isDragging = false;
   });
}

function submitDirection(){
    document.getElementById("select-direction").style.display = "none";
    document.getElementById("text-scarab-lvl3").style.display = "block";

    if(-10 <=  currentRotation && currentRotation <= 10){
        document.getElementById("text-scarab-lvl3").innerHTML = `<p>You've chosen correctly, lucky for you the scarab is pointing to the North.</p>`
        setTimeout(() => closeScarab(), 3000);
    }
    else{
        document.getElementById("text-scarab-lvl3").innerHTML = `<p>Oh no the scarab is not really pointing to North is it...</p>`
        gameEnded = true;
        setTimeout(() => gameOver(), 3000);
    }
}
function closeScarab(){
    document.getElementById("text-scarab-lvl3").style.display = "none";
    document.getElementById("kompass").style.display = "none";
    document.getElementById("scarab").style.display = "none";
    document.getElementById("rotatable-image").style.display = "none";
    document.getElementById("transparent-box").style.display = "none";

    writeText(8);
}


/*************** Mummy ******************* */
let mummyMagnifier = null;

function showMummy() {
    document.getElementById("transparent-box").style.display = "block";
    document.getElementById("continue-map").style.display = "block";
    hintsOpen = true;
    const mummyBox = document.getElementById("mummy-box");
    const mummyImg = mummyBox.querySelector('img');
    
    if (!mummyMagnifier) {
        mummyMagnifier = new Magnifier(mummyImg, {
            zoomLevel: 7,
            radius: 120
        });
        
        mummyBox.style.cursor = 'zoom-in';
        mummyBox.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = mummyMagnifier.toggle();
            this.style.cursor = isActive ? 'zoom-out' : 'zoom-in';
        });
    }
    
    mummyBox.style.display = "block";
    document.getElementById("mummy-text").style.display = "block";
    
    document.getElementById("continue-map").addEventListener("click", continueMapSearch);
}


/*************** Map******************* */
function continueMapSearch(e) {
    if (e) e.stopPropagation(); 
    
    document.getElementById("transparent-box").style.display = "none";
    document.getElementById("continue-map").style.display = "none";
    document.getElementById("mummy-box").style.display = "none";
    document.getElementById("mummy-text").style.display = "none";
    document.getElementById("mummy").style.display = "none";
    document.getElementById("map").style.display = "block";
  
    document.getElementById("continue-map").removeEventListener("click", continueMapSearch);
    
    hintsOpen = false;
    gameLoop();
}
function showMapLvl3(){
    document.getElementById("map-found").style.display = "block";
    document.getElementById("transparent-box").style.display = "block";
    document.getElementById("text-container-level1").style.top = "70vh";
    writeText(9);
}
function showMapSecretRoom(){
    document.getElementById("map-found").style.display = "none";
    document.getElementById("close-map").style.display = "block";
    document.getElementById("secret-door-map").style.display = "block";
    document.getElementById("map").style.display = "none";
}
function closeSecretRoomMap(){
    document.getElementById("transparent-box").style.display = "none";
    document.getElementById("secret-door-map").style.display = "none";
    document.getElementById("close-map").style.display = "none";
    document.getElementById("text-container-level1").style.display = "none";
    document.getElementById("door-lvl3").style.display = "block";

    hintsOpen = false;
    gameLoop();
}

/*************** MYSTERY ******************* */
let countMistakes = 0;
function switchToMystery3() {
    hintsOpen = true;
    gameEnded = false;
    mysteryOpen = true;

    console.log("gameEnded:", gameEnded);
    console.log("hintsOpen:", hintsOpen);
    
    
    document.getElementById("gameBody").style.display = "none";
    document.getElementById("quiz-lvl3").style.display = "block";
    
    const TARGET_POSITIONS = [
        {x: 170, y: 78},
        {x: 228, y: 92},
        {x: 140, y: 135},
        {x: 240, y: 217},
        {x: 255, y: 190},
        {x: 265, y: 174},
        {x: 270, y: 305},
        {x: 385, y: 230},
    ];

    const starsOverlay = document.getElementById('stars-overlay');
    const stars = document.querySelectorAll('.star');
    let draggedStar = null;

    stars.forEach(star => {
        star.addEventListener('dragstart', (e) => {
            draggedStar = star;
            e.dataTransfer.setData('text/plain', star.id);
        });

        star.style.border = "none";
    });

    starsOverlay.addEventListener('dragover', (e) => e.preventDefault());

    starsOverlay.addEventListener('drop', (e) => {
        document.getElementById("text-stars").style.display= "none";
        e.preventDefault();
        if (!draggedStar) return;
        const rect = starsOverlay.getBoundingClientRect();
        const x = e.clientX - rect.left - 15;
        const y = e.clientY - rect.top - 15;
        draggedStar.style.position = 'absolute';
        draggedStar.style.left = `${x}px`;
        draggedStar.style.top = `${y}px`;
        starsOverlay.appendChild(draggedStar);
    });

    document.getElementById('check-stars').addEventListener('click', () => {
        const placedStars = starsOverlay.querySelectorAll('.star');
        const usedTargets = [...TARGET_POSITIONS];
        let correct = 0;
        const TOLERANCE = 20;

        placedStars.forEach(star => {
            star.style.border = "none";
        });

        placedStars.forEach(star => {
            const x = parseFloat(star.style.left);
            const y = parseFloat(star.style.top);

            const matchIndex = usedTargets.findIndex(target =>
                Math.abs(x - target.x) < TOLERANCE &&
                Math.abs(y - target.y) < TOLERANCE
            );

            if (matchIndex !== -1) {
                correct++;
                usedTargets.splice(matchIndex, 1);
            } else {
                star.style.border = "2px solid red";
            }
        });

        TARGET_POSITIONS.forEach(pos => {
            const marker = document.createElement('div');
            marker.style.position = 'absolute';
            marker.style.width = `${TOLERANCE * 2}px`;
            marker.style.height = `${TOLERANCE * 2}px`;
            marker.style.left = `${pos.x - TOLERANCE}px`;
            marker.style.top = `${pos.y - TOLERANCE}px`;
            marker.style.pointerEvents = 'none';
            marker.style.zIndex = '10';
            starsOverlay.appendChild(marker);
          });

        if (correct === TARGET_POSITIONS.length) {
            document.getElementById("check-stars").style.display = "none";
            document.getElementById("text-stars").style.display= "block";
            document.getElementById("text-stars").innerHTML = "You placed all stars correct, well done...";
            setTimeout(() => switchToLevelFour(), 2500);
        } else {
            if(countMistakes <= 2){
                countMistakes++;
                document.getElementById("text-stars").style.display= "block";
                document.getElementById("text-stars").innerHTML = `You placed ${correct}/${TARGET_POSITIONS.length} stars correct. Try again!`;
            }
            else{
                countMistakes++;
                document.getElementById("text-stars").style.display= "block";
                document.getElementById("text-stars").innerHTML = `Unfortunately you didn't manage to fill Osiris’ constellation...`;
                setTimeout(() => gameOver(), 2500);
            }
        }
    });
}