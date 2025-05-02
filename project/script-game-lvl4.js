/***********************************
 * LEVEL 3
 * **********************************/
function switchToLevelFour(){

    valueEnemy2 = LEVEL_FOUR_X;
    hintsOpen = false;

    //switch to right board
    document.getElementById("storyTelling").style.display = "none";
   
    document.getElementById("quiz-lvl3").style.display = "none";
    document.getElementById("gameBody").style.display = "block";

    //change enemy
    document.getElementById("enemy-skeleton").src = "img/enemy1-lvl4.png";
    document.getElementById("enemy").style.width = "2.75vw";

    document.getElementById("random-enemy").style.display = "none";
    document.getElementById("random-enemy3").style.display = "block";
    document.getElementById("random-enemy2").style.display = "none";
    document.getElementById("random-enemy2-img").style.display = "none";
   

    //change background
    document.getElementById("gameBoard").style.backgroundImage = "url('img/game-board-level4.png')";

    //set colliders display none
    const colliders = document.querySelectorAll('.collider, .collider-lvl2');
    colliders.forEach(collider => {
        collider.style.display = "none";
    });

    document.getElementById("collider16").style.display = "none";
    document.getElementById("collidertop").style.display = "block";
    document.getElementById("colliderleft").style.display = "block";
    document.getElementById("colliderright").style.display = "block";
    document.getElementById("colliderbottom").style.display = "block";


    const items = document.querySelectorAll('.lvl3-items');
    items.forEach(collider => {
        collider.style.display = "none";
    });

    //set colliders display block
    const collidersLvl4 = document.querySelectorAll('.collider-lvl4');
    collidersLvl4.forEach(collider => {
        collider.style.display = "block";
    });

    document.getElementById("text-container-level1").style.top = "30vh";

    //player position
    PLAYER.box.style.left = '560px'; 
    PLAYER.box.style.top = '600px'; 
    PLAYER.box.style.opacity = '1';

    //enemy position
    ENEMY.box.style.left = '500px';
    ENEMY.box.style.top = "200px";
    ENEMY.box.style.opacity = '1';
    ENEMY3.box.style.left = "750px";
    ENEMY3.box.style.top = "300px";
    ENEMY3.box.style.opacity = "1";

    ENEMY.speed = 0.6;

    document.getElementById("enemy-skeleton").style.right = '0px';
    document.getElementById("random-enemy3-img").style.right = '0px';
    document.getElementById("random-enemy3-img").style.right = '0px';

    /*just for now*/
    playerImage = `<img id="spriteImg" src="${players[counter]}">`;
    document.getElementById("player").innerHTML = playerImage;

    resetLevel();
    writeText(10);
}

/***********************************
 *  ENEMY 4
 * **********************************/

let ENEMY4 = {
    box: document.getElementById("random-enemy3"),
    sprite: document.getElementById("random-enemy3-img"),
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
