/***********************************
 * LEVEL 5
 * **********************************/
function switchToLevelFive(){
    hintsOpen = false;
    initVines();

    //switch to right board
    document.getElementById("storyTelling").style.display = "none";
   
    document.getElementById("quiz-lvl4").style.display = "none";
    document.getElementById("gameBody").style.display = "block";

    //change enemy
    document.getElementById("enemy-skeleton").src = "img/enemy2-lvl5.png";
    document.getElementById("enemy").style.width = "2.75vw";

    document.getElementById("random-enemy2-img").src = "img/enemy1-lvl5.png";
    document.getElementById("random-enemy2").style.display = "block";
    document.getElementById("random-enemy2").style.opacity = "1";
    document.getElementById("random-enemy2-img").style.display = "block";
   

    //change background
    document.getElementById("gameBoard").style.backgroundImage = "url('img/game-board-level5.png')";

    //set colliders display none
    const colliders = document.querySelectorAll('.collider, .collider-lvl2, .collider-lvl3, .collider-lvl4');
    colliders.forEach(collider => {
        collider.style.display = "none";
    });

    document.getElementById("collidertop").style.display = "block";
    document.getElementById("colliderleft").style.display = "block";
    document.getElementById("colliderright").style.display = "block";
    document.getElementById("colliderbottom").style.display = "block";


    const items = document.querySelectorAll('.lvl4-items');
    items.forEach(collider => {
        collider.style.display = "none";
    });

    //set colliders display block
    const collidersLvl4 = document.querySelectorAll('.collider-lvl5');
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

    ENEMY.speed = 0.8;
    ENEMY3.speed = 1.1;

    document.getElementById("enemy-skeleton").style.right = '0px';
    document.getElementById("random-enemy2-img").style.right = '0px';

    document.getElementById("gras").style.display = "block";

    /*just for now*/
    playerImage = `<img id="spriteImg" src="${players[counter]}">`;
    document.getElementById("player").innerHTML = playerImage;

    resetLevel();
    gameLoop();
}

/**********************************\
* LIANEN MECHANIK BEI GRASKOLLISION
\**********************************/
let vinesActive = false;
let vines = [];
let vineInterval;
let vineUpdateInterval;
const VINE_SPEED = 3;

function initVines() {
    // CSS für Lianen dynamisch hinzufügen
    const style = document.createElement('style');
    style.innerHTML = `
        .vine {
            position: absolute;
            width: 8px;
            background-color: green;
            z-index: 500;
            border-radius: 4px;
            box-shadow: 0 0 5px rgba(0,0,0,0.5);
            pointer-events: none;
        }
        .danger-grass {
            animation: danger-pulse 1s infinite;
        }
        @keyframes danger-pulse {
            0% { opacity: 0.7; }
            50% { opacity: 1; }
            100% { opacity: 0.7; }
        }
    `;
    document.head.appendChild(style);
}

function createVine() {
    if (!vinesActive) return;
    
    const vine = document.createElement('div');
    vine.className = 'vine';
    
    // Position über dem Gras-Element
    const grassRect = document.getElementById('gras').getBoundingClientRect();
    const surfaceRect = GAME_SCREEN.surface.getBoundingClientRect();
    
    const startX = grassRect.left - surfaceRect.left + Math.random() * grassRect.width;
    vine.style.left = `${startX}px`;
    vine.style.top = '0px';
    
    vine.style.height = `${Math.random() * 100 + 100}px`; // 100-200px Länge
    vine.style.backgroundColor = `hsl(${Math.random() * 60 + 80}, 70%, 30%)`; // Grüntöne
    
    GAME_SCREEN.surface.appendChild(vine);
    vines.push({
        element: vine,
        x: startX,
        y: 0,
        speed: VINE_SPEED + Math.random() * 2
    });
}

function updateVines() {
    for (let i = vines.length - 1; i >= 0; i--) {
        const vine = vines[i];
        vine.y += vine.speed;
        vine.element.style.top = `${vine.y}px`;
        
        // Kollision mit Spieler
        if (isColliding(PLAYER.box, vine.element) && !isInvincible) {
            removeLife();
            isInvincible = true;
            PLAYER.box.classList.add('invincible');
            setTimeout(() => isInvincible = false, 2000);
            removeVine(i);
            continue;
        }
        
        // Entfernen wenn außerhalb
        if (vine.y > GAME_SCREEN.surface.clientHeight) {
            removeVine(i);
        }
    }
}

function removeVine(index) {
    if (vines[index] && vines[index].element) {
        vines[index].element.remove();
        vines.splice(index, 1);
    }
}

function clearAllVines() {
    while (vines.length > 0) {
        removeVine(0);
    }
}

function startVines() {
    if (vinesActive) return;
    
    vinesActive = true;
    const grass = document.getElementById('gras');
    grass.classList.add('danger-grass');
    
    // Lianen spawnen
    vineInterval = setInterval(createVine, 1500);
    
    // Lianen bewegen
    vineUpdateInterval = setInterval(updateVines, 1000/60);
}

function stopVines() {
    if (!vinesActive) return;
    
    vinesActive = false;
    clearInterval(vineInterval);
    clearInterval(vineUpdateInterval);
    document.getElementById('gras').classList.remove('danger-grass');
    clearAllVines();
}
function checkGrassCollision() {
    const grassCollision = isCollidingWith("gras");
    
    if (grassCollision && !vinesActive) {
        startVines();
    } 
    else if (!grassCollision && vinesActive) {
        stopVines();
    }
}