/***********************************
 *  LEVEL TWO
 * **********************************/

function switchToLevelTwo() {
    levelCount++;
    hintsOpen = false;

    //switch to right board
    document.getElementById("storyTelling").style.display = "none";

    document.getElementById("quiz-lvl1").style.display = "none";
    document.getElementById("gameBody").style.display = "block";

    //change enemy
    document.getElementById("enemy-skeleton").src = "img/enemy-level2.png";
    document.getElementById("enemy").style.width = "2.75vw";

    document.getElementById("random-enemy-img").style.display = "block";
    document.getElementById("random-enemy").style.display = "block";

    //change background
    document.getElementById("gameBoard").style.backgroundImage = "url('img/game-board-level2.png')";

    //set colliders display none
    const colliders = document.querySelectorAll('.collider');
    colliders.forEach(collider => {
        collider.style.display = "none";
    });

    const collidersLvl2 = document.querySelectorAll('.collider-lvl2');
    collidersLvl2.forEach(collider => {
        collider.style.display = "block";
    });

    const itemsLvl2 = document.querySelectorAll('.items-lvl2');
    itemsLvl2.forEach(collider => {
        collider.style.display = "none";
    });

    //items
    document.getElementById("collider25-transparent").style.display = "none";
    document.getElementById("vase").style.display = "block";
    document.getElementById("text-container-level1").style.top = "30vh";

    document.getElementById("collider16").style.display = "none";
    document.getElementById("collidertop").style.display = "block";
    document.getElementById("colliderleft").style.display = "block";
    document.getElementById("colliderright").style.display = "block";
    document.getElementById("colliderbottom").style.display = "block";

    
    PLAYER.box.style.left = '700px'; 
    PLAYER.box.style.top = '600px'; 
    ENEMY.box.style.left = '500px';
    ENEMY.box.style.top = "400px";
    ENEMY.box.style.opacity = '1';
    PLAYER.box.style.opacity = '1';
    ENEMY2.box.style.left = "500px";
    ENEMY2.box.style.top = "300px";
    ENEMY2.box.style.opacity = "1";

    /*just for now*/
    playerImage = `<img id="spriteImg" src="${players[counter]}">`;
    document.getElementById("player").innerHTML = playerImage;

    //reset booleans
    collectedKey = false;
    hintsOpen = false;

    resetLevel();
    setTimeout(() => writeText(3), 2000);

}

/***********************************
 *  ENEMY
 * **********************************/

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
    document.getElementById("collider63-transparent").style.display = "block";
    document.getElementById("bench").style.display = "block";
    gameLoop();
}
function showStone(){
    document.getElementById("transparent-box").style.display = "block";
    document.getElementById("stone-box").style.display = "block";
    document.getElementById("stone-close").style.display = "block";
    document.getElementById("stone-box").innerHTML = '<img id="stone-img" src="img/ringOfLife.png">';
    document.getElementById("text-container-level1").style.top = "65vh";
    writeText(6);
}
function showOptionsStone(){
    document.getElementById("stone-box").innerHTML = 
        `<div id="stone-choices">
            <img class="options" onclick="setupOptions()" id="option1" src="img/option1-ring.png">
            <img class="options" onclick="setupOptions()" id="option2" src="img/option2-ring.png">
            <img class="options" onclick="setupOptions()" id="option3" src="img/option3-ring.png">
        </div>`

    document.getElementById("select-option").style.display = "block";
    document.getElementById("stone-close").style.display = "none";
    
}
let chosenOptionsStone = "";

function setupOptions() {
    const optionsContainer = document.getElementById("stone-choices");

    optionsContainer.addEventListener("click", function (e) {
        if (e.target.tagName.toLowerCase() === "img") {
            const images = optionsContainer.querySelectorAll("img");
            images.forEach(img => {
                img.style.border = "none";
                img.style.borderRadius = "0";
            });
            e.target.style.border = "3px solid #87817c";

            chosenOptionsStone = e.target.id;
        }
    });
}
function selectOptionStone(){
    if(chosenOptionsStone == "option3"){
        document.getElementById("stone-box").innerHTML = `<p id="answer-mystery-stone">Very wise choice, you may continue your expedition...</p>`
        setTimeout(() => switchToMystery2(), 3000);
    }
    else{
        document.getElementById("stone-box").innerHTML = `<p id="answer-mystery-stone">Sadly that wasn't the correct answer, your expedition ends here...</p>`
        setTimeout(() => gameOver(), 3000);
    }
}
function switchToMystery2(){
    hintsOpen = true;
    document.getElementById("gameBody").style.display = "none";
    document.getElementById("quiz-lvl2").style.display = "block";
    document.getElementById("quiz-lvl2").innerHTML = 
        `<h1 id="quiz-headline-lvl2">mystery two</h1>
        <img id="scale" src="img/scale.png">
        <div id="quiz-container-lvl2">
            <p>Choose wisely, seeker—only truth can balance the scale of eternity. Will your soul be light as wisdom, heavy as sin, or cursed as greed?</p>
            <div id="mystery-choices-lvl2">
                <img id="mystery2-img1" onclick="setupMysteryTwo()" src="img/scroll-mystery2.png" alt="scroll-mystery2">
                <img id="mystery2-img2" onclick="setupMysteryTwo()" src="img/sword.png" alt="sword">
                <img id="mystery2-img3" onclick="setupMysteryTwo()" src="img/gold.png" alt="gold">
            </div>
            <p onclick="selectedAnswerMysteryTwo()" id="mystery-two-select">select</p>
        </div>`
}
let chosenOptionsMysteryTwo = "";
function setupMysteryTwo() {
    const optionsContainer = document.getElementById("mystery-choices-lvl2");

    optionsContainer.addEventListener("click", function (e) {
        if (e.target.tagName.toLowerCase() === "img") {
            const images = optionsContainer.querySelectorAll("img");
            images.forEach(img => {
                img.style.border = "none";
                img.style.borderRadius = "0";
            });
            e.target.style.border = "1.5px solid #592a1d";
            e.target.style.borderRadius = "1em";

            chosenOptionsMysteryTwo = e.target.id;
        }
    });
}
function selectedAnswerMysteryTwo(){
    if(chosenOptionsMysteryTwo == "mystery2-img1"){
        document.getElementById("quiz-container-lvl2").innerHTML = `<p>Very wise choice, good luck...</p>`
        setTimeout(() => switchToLevelThree(), 3000);
    }
    else{
        document.getElementById("quiz-container-lvl2").innerHTML = `<p>That answer doesn't do the scale justice...</p>`
        setTimeout(()=> gameOver(), 3000)
    }
}