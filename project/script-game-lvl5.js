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
    
    const grassRect = document.getElementById('gras').getBoundingClientRect();
    const surface = document.getElementById('lianen-box');
    const surfaceRect = surface.getBoundingClientRect();
    
    const boxWidth = surfaceRect.width;
    const centerMin = boxWidth * 0.3;
    const centerMax = boxWidth * 0.7;
    const startX = centerMin + Math.random() * (centerMax - centerMin);
    
    vine.style.left = `${startX}px`;
    vine.style.top = '0px';
    
    vine.style.height = `${Math.random() * 100 + 100}px`; 
    vine.style.backgroundColor = `hsl(${Math.random() * 60 + 80}, 70%, 30%)`;
    
    surface.appendChild(vine);
    vines.push({
        element: vine,
        x: startX,
        y: 0,
        baseX: startX,
        speed: VINE_SPEED + Math.random() * 2,
        swingAmplitude: 30 + Math.random() * 20,
        swingFrequency: 0.002 + Math.random() * 0.003,
        createdAt: Date.now()
    });
    
    
}

function updateVines() {
    for (let i = vines.length - 1; i >= 0; i--) {
        const vine = vines[i];
        vine.y += vine.speed;
        const timeElapsed = Date.now() - vine.createdAt;
        const offsetX = Math.sin(timeElapsed * vine.swingFrequency) * vine.swingAmplitude;
        vine.element.style.transform = `translateX(${offsetX}px) translateY(${vine.y}px)`;


        const fangbox = document.getElementById('lianen-player');
        if (isColliding(fangbox, vine.element)) {
            removeLife();
            removeVine(i);
            continue;
        }
        const vineBottom = vine.y + vine.element.offsetHeight;
        if (vineBottom >= surface.clientHeight) {
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
    
    vineInterval = setInterval(createVine, 1500);
    
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
        hintsOpen = true;
        document.getElementById("lianen-box").style.display = "block";
        startVines();
    
    } 
    else if (!grassCollision && vinesActive) {
        stopVines();
    }
}
let fangbox = document.getElementById('lianen-player');
let fangboxX = 50; 
let fangboxSpeed = 2; 

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") {
        fangboxX = Math.max(0, fangboxX - fangboxSpeed);
    } else if (e.key === "ArrowRight") {
        fangboxX = Math.min(100, fangboxX + fangboxSpeed);
    }

    fangbox.style.left = `${fangboxX}%`;
});
