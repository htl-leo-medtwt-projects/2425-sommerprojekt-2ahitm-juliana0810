/***********************************
 * LEVEL 5
 * **********************************/
function switchToLevelFive(){
    hintsOpen = false;
    mysteryOpen = false;
    document.getElementById("collider16").style.display = "none"
    document.getElementById("collider240").style.display = "block"
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
   
    if(!savedExplorer){
        document.getElementById("random-enemy-img").src = "img/otherExplorer.png";
        document.getElementById("random-enemy").style.display = "block";
        document.getElementById("random-enemy").style.opacity = "1";
        document.getElementById("random-enemy-img").style.display = "block";
    }
    else{
        initBuddy();
    }


    //change background
    document.getElementById("gameBoard").style.backgroundImage = "url('img/game-board-level5.png')";

    //set colliders display none
    const colliders = document.querySelectorAll('.collider, .collider-lvl2, .collider-lvl3, .collider-lvl4');
    colliders.forEach(collider => {
        collider.style.display = "none";
    });

    const collidersLvl5 = document.querySelectorAll('.collider-lvl5');
    collidersLvl5.forEach(collider => {
        collider.style.display = "block";
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
    ENEMY.box.style.left = '700px';
    ENEMY.box.style.top = "100px";
    ENEMY.box.style.opacity = '1';
    ENEMY3.box.style.left = "550px";
    ENEMY3.box.style.top = "300px";
    ENEMY2.box.style.left = "600px";
    ENEMY2.box.style.top = "200px";

    ENEMY.speed = 0.3;
    ENEMY3.speed = 1.1;
    ENEMY2.speed = 0.9;

    document.getElementById("enemy-skeleton").style.right = '0px';
    document.getElementById("random-enemy2-img").style.right = '0px';

    document.getElementById("gras").style.display = "block";
    document.getElementById("lake-lvl5").style.display = "block";
    document.getElementById("audio-device").style.display = "block";

    /*just for now*/
    playerImage = `<img id="spriteImg" src="${players[counter]}">`;
    document.getElementById("player").innerHTML = playerImage;

    resetLevel();
    startTimer();
    gameLoop();
}

let originalEnemySpeed = 0.3;

/**********************************\
*             LIANEN 
\**********************************/
let vinesActive = false;
let vines = [];
let vineInterval;
let vineUpdateInterval;
const VINE_SPEED = 2.5;

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
        document.getElementById("lianen-textbox").style.display = "block";
        startVines();
        startTimerLianen();
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

let countdownVine;
let timeLeftLil;

/*******  TIMER *********** */
function startTimerLianen() {
    clearInterval(countdownVine)
    timeLeftLil = 5;
    document.getElementById("timer-lianen").innerHTML = `<p>${timeLeftLil}s</p>`
    
    countdownVine = setInterval(() => {
        timeLeftLil--
        document.getElementById("timer-lianen").innerHTML = `<p>${timeLeftLil}s</p>`

        if (timeLeftLil <= 0) {
            clearInterval(countdownVine)
            document.getElementById("lianen-box").style.display = "none";
            document.getElementById("gras").style.display = "none";
            document.getElementById("lianen-textbox").style.display = "none";
            hintsOpen = false;  
            gameLoop();
        }
    }, 1000)
}

const TARGET_POSITIONS = [
    {x: 125, y: 25},
    /*{x: 125, y: 75},
    {x: 125, y: 125},
    {x: 125, y: 175},
    {x: 125, y: 225},
    {x: 125, y: 275},
    {x: 125, y: 325},*/
];

const BOX_WIDTH = 290;
const BOX_HEIGHT = 60;

function startPlankPuzzle() {
   

    createTargetBoxes();

    const plankOverlay = document.getElementById('board-overlay');
    const planks = document.querySelectorAll('.plank');
    document.getElementById("check-planks").style.display = "block";
    let draggedPlank = null;
    let countMistakes = 0;

    planks.forEach(plank => {
        plank.addEventListener('dragstart', (e) => {
            draggedPlank = plank;
            e.dataTransfer.setData('text/plain', plank.id);
        });
    });

    plankOverlay.addEventListener('dragover', (e) => e.preventDefault());

    plankOverlay.addEventListener('drop', (e) => {
        document.getElementById("text-planks").style.display= "none";
        if (!draggedPlank) return;
        const rect = plankOverlay.getBoundingClientRect();
        const x = e.clientX - rect.left - 15;
        const y = e.clientY - rect.top - 15;
        draggedPlank.style.position = 'absolute';
        draggedPlank.style.left = `${x}px`;
        draggedPlank.style.top = `${y}px`;
        plankOverlay.appendChild(draggedPlank);
    });

    document.getElementById('check-planks').addEventListener('click', () => {
        const placedPlanks = plankOverlay.querySelectorAll('.plank');
        const usedTargets = [...TARGET_POSITIONS];
        const TOLERANCE = 20;
        let correct = 0;



        placedPlanks.forEach(plank => {
            plank.style.border = "none";
        });

        placedPlanks.forEach(plank => {
            const x = parseFloat(plank.style.left);
            const y = parseFloat(plank.style.top);

            const PLANK_WIDTH = draggedPlank.offsetWidth;
            const PLANK_HEIGHT = draggedPlank.offsetHeight;

            const matchIndex = usedTargets.findIndex(target => {
                const boxLeft = target.x - BOX_WIDTH / 2;
                const boxRight = target.x + BOX_WIDTH / 2;
                const boxTop = target.y - BOX_HEIGHT / 2;
                const boxBottom = target.y + BOX_HEIGHT / 2;

                const plankRight = x + PLANK_WIDTH;
                const plankBottom = y + PLANK_HEIGHT;

                return (
                    x >= boxLeft &&
                    plankRight <= boxRight &&
                    y >= boxTop &&
                    plankBottom <= boxBottom
                );
            });
            

            if (matchIndex !== -1) {
                correct++;
                usedTargets.splice(matchIndex, 1);
            } else {
                plank.style.border = "2px solid red";
            }
        });

        if (correct === TARGET_POSITIONS.length) {
            document.getElementById("check-planks").style.display = "none";
            document.getElementById("text-planks").style.display= "block";
            document.getElementById("text-planks").innerText = "All planks are correctly placed!";
            setTimeout(() => closeBlanks(), 2500);
        } else {
            countMistakes++;
            const message = countMistakes < 3
                ? `You placed ${correct}/${TARGET_POSITIONS.length} correctly. Try again!`
                : `You failed to build the plank wall...`;
            document.getElementById("text-planks").style.display = "block";
            document.getElementById("text-planks").innerText = message;

            if (countMistakes >= 3) {
                setTimeout(() => gameOver(), 2500);
            }
        }
    });
}

function createTargetBoxes() {
    const plankOverlay = document.getElementById('board-overlay');

    TARGET_POSITIONS.forEach((pos) => {
        const box = document.createElement('div');
        box.classList.add('target-box');
        box.style.position = 'absolute';
        box.style.left = `${pos.x - BOX_WIDTH / 2}px`;
        box.style.top = `${pos.y - BOX_HEIGHT / 2}px`;
        box.style.width = `${BOX_WIDTH}px`;
        box.style.height = `${BOX_HEIGHT}px`;
        box.style.pointerEvents = 'none'; 
        plankOverlay.appendChild(box);
    });
}
function closeBlanks(){
    document.getElementById("container-blanks").style.display = "none";
    document.getElementById("collider240").style.display = "none";
    document.getElementById("planks-lake-box").style.display = "block";
    document.getElementById("lake-lvl5").style.display = "none";
    hintsOpen = false;
    gameLoop();
}

/* audio */
function playSound(){
    SOUNDS.audioSpeech.play();
}
function closeAudio(){
    hintsOpen = true;
    document.getElementById("audio-device").style.display = "none";
    document.getElementById("audio-container").style.display = "none";
    writeText(17);
}

/* dinosaur mystery*/
function startDinoPuzzle(){
    document.getElementById("transparent-box").style.display = "block";
    
    const canvas = document.getElementById("symbolCanvas");
    const ctx = canvas.getContext("2d");

    const correctSymbol = "Crowbar";

    const symbols = [
        { name: "Crowbar", x: 275, y: 100, imgSrc: "img/crowbar-door-lvl5.png", floatOffset: 0 },
        { name: "Axt", x: 575, y: 120, imgSrc: "img/axt-door-lvl5.png", floatOffset: 0 },
        { name: "Key", x: 825, y: 130, imgSrc: "img/key-door-lvl5.png", floatOffset: 0 },
    ];


    const images = {};
    let imagesLoaded = 0;

    symbols.forEach(sym => {
        const img = new Image();
        img.src = sym.imgSrc;
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === symbols.length) {
                startAnimationDino();
            }
        };
        images[sym.name] = img;
    });

    let floatAngle = 0;
    function startAnimationDino(){
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            floatAngle += 0.05;
        
            const scale = 0.03; 
        
            symbols.forEach(sym => {
                const img = images[sym.name];
                const floatY = Math.sin(floatAngle + sym.x / 100) * 5;
                sym.floatOffset = floatY;
        
                const imgWidth = img.width * scale;
                const imgHeight = img.height * scale;
                const drawX = sym.x - imgWidth / 2;
                const drawY = sym.y + floatY - imgHeight / 2;
        
                ctx.drawImage(img, drawX, drawY, imgWidth, imgHeight);
        
                ctx.fillStyle = "#ddba82";
                ctx.font = "14px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(sym.name, sym.x, sym.y + floatY + imgHeight / 2 + 15);
            });
        
            requestAnimationFrame(draw);
        }
        
        draw();
    }
    
    document.getElementById("text-container-level1").style.top = "60vh";
    writeText(18);

    canvas.addEventListener("click", handleClickDino);

    function handleClickDino(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        for (let sym of symbols) {
            const imgX = sym.x - 32;
            const imgY = sym.y + sym.floatOffset - 32;
            if (
                mouseX >= imgX &&
                mouseX <= imgX + 64 &&
                mouseY >= imgY &&
                mouseY <= imgY + 64
            ) {
                canvas.removeEventListener("click", handleClickDino);
                    canvas.style.display = "none";
                    document.getElementById("text-container-level1").style.display = "none";
                    document.getElementById("transparent-box").style.display = "none";
                    document.getElementById("textboxDino").style.display = "block";

                if (sym.name === correctSymbol) {
                    hintsOpen = false;
                    document.getElementById("textboxDino").innerHTML = `<p>You've chosen right. The door will open for your freedom!</p>`
                    document.getElementById("dinosaur").style.display = "none";
                    document.getElementById("door-lvl5").style.display = "block";
                    setTimeout(() => document.getElementById("textboxDino").style.display = "none", 3000);
                    setTimeout(() => gameLoop(), 3000);
                } else {
                    document.getElementById("textboxDino").innerHTML = `<p>You have chosen the wrong symbol! Sadly your expedition is over now...</p>`
                    gameEnded = true;
                    setTimeout(() => gameOver(), 3000);
                }
            }
        }
    }
    canvas.style.display = "block";
}

/* BUDDY */
/***********************************
 * BUDDY SYSTEM
 ***********************************/
let BUDDY = {
    box: document.getElementById('buddy'),
    spriteImg: document.getElementById('buddy-img'),
    spriteImgNumber: 0,
    followingDistance: 50, 
    stoppingRadius: 150, 
    speed: 5,
    direction: 'right',
    yOffset: 0,
};

function animateBuddy() {
    if (BUDDY.spriteImgNumber < 8) {
        BUDDY.spriteImgNumber++;
        let x = parseFloat(BUDDY.spriteImg.style.right) || 0;
        x += 31; 
        BUDDY.spriteImg.style.right = x + "px";
        BUDDY.spriteImg.style.top = BUDDY.yOffset + "px";
    } else {
        BUDDY.spriteImg.style.right = "0px";
        BUDDY.spriteImgNumber = 0;
    }
}
function moveBuddy() {
    if (!savedExplorer || gameEnded || hintsOpen || mysteryOpen) return;

    const playerRect = PLAYER.box.getBoundingClientRect();
    const buddyRect = BUDDY.box.getBoundingClientRect();
    const enemyRect = ENEMY.box.getBoundingClientRect();

    const distanceToPlayer = Math.hypot(
        playerRect.left - buddyRect.left,
        playerRect.top - buddyRect.top
    );
    
    const distanceToEnemy = Math.hypot(
        enemyRect.left - buddyRect.left,
        enemyRect.top - buddyRect.top
    );

    let dx = 0;
    let dy = 0;
    let isAttacking = false;


    if (distanceToEnemy < BUDDY.stoppingRadius && distanceToPlayer < BUDDY.followingDistance * 2) {
        
        const angle = Math.atan2(enemyRect.top - buddyRect.top, enemyRect.left - buddyRect.left);
        const targetX = enemyRect.left - Math.cos(angle) * 30;
        const targetY = enemyRect.top - Math.sin(angle) * 30;
        
        dx = (targetX - buddyRect.left) * 0.1;
        dy = (targetY - buddyRect.top) * 0.1;
        
       
        ENEMY.speed = 0;
        isAttacking = true;
    } else {
       
        const targetX = playerRect.left - BUDDY.followingDistance;
        const targetY = playerRect.top;
        
        dx = targetX - buddyRect.left;
        dy = targetY - buddyRect.top;
        const dist = Math.hypot(dx, dy);
        
        if (dist > 0) {
            dx = (dx / dist) * BUDDY.speed;
            dy = (dy / dist) * BUDDY.speed;
        }

        if (ENEMY.speed === 0) {
            ENEMY.speed = originalEnemySpeed; 
        }
    }

    BUDDY.box.style.left = (buddyRect.left - GAME_SCREEN.surface.getBoundingClientRect().left + dx) + 'px';
    BUDDY.box.style.top = (buddyRect.top - GAME_SCREEN.surface.getBoundingClientRect().top + dy) + 'px';

    if (Math.abs(dx) > Math.abs(dy)) {
        BUDDY.direction = dx > 0 ? 'right' : 'left';
    } else {
        BUDDY.direction = dy > 0 ? 'down' : 'up';
    }


    switch (BUDDY.direction) {
        case 'up':    
            BUDDY.yOffset = 0;    
            break;
        case 'down':  
            BUDDY.yOffset = -75;  
            break;
        case 'left':  
            BUDDY.yOffset = -110;  
            break;
        case 'right': 
            BUDDY.yOffset = -110; 
            break;
    }

    if (BUDDY.direction === 'left') {
        BUDDY.box.style.transform = 'scaleX(-1)';
    } else if (BUDDY.direction === 'right') {
        BUDDY.box.style.transform = 'scaleX(1)';
    }

    if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        animateBuddy();
    }
}


function initBuddy() {
    if (savedExplorer) {
        BUDDY.box.style.display = 'block';
        BUDDY.box.style.opacity = '1';
        BUDDY.box.style.left = '630px'; 
        BUDDY.box.style.top = '600px'; 
        BUDDY.spriteImg.style.display = 'block';
    } else {
        BUDDY.box.style.display = 'none';
    }
}
