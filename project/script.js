let infoOpen = false;
let profileImageSrc = ""; 
let username = "";
let counter = 0;
let choosenCharacter = "";
let playerImage = "";
let value = 0;
let levelCount = 0;
let selectedCharacter = null;
let firstTimePlaying = true;

let images = [
    'img/character1-option.png',
    'img/character2-option.png',
    'img/character3-option.png',
    'img/character4-option.png' 
]

let players = [
    'img/character1.png',
    'img/character2.png',
    'img/character3.png',
    'img/character4.png' 
]

function openInfo(index){
    if(!infoOpen){
        document.getElementById(`howTo${index}`).style.display = "block";
    }
    else{
        document.getElementById(`howTo${index}`).style.display = "none";
    }
    infoOpen = !infoOpen;
}

/******** switch pages ********/
function openInfoText(){
    document.getElementById(`storyText`).style.display = "block";
}
function closeInfoText(){
    document.getElementById(`storyText`).style.display = "none";
}
function switchToStory(){
    document.getElementById("entry").style.display = "none";
    document.getElementById("storyTelling").style.display = "block";
}
function switchToEntry(){
    SOUNDS.background_music.play();
    SOUNDS.background_music.duration = Infinity;
    document.getElementById("startpage").style.display = "none";
    document.getElementById("entry").style.display = "block";
}
function switchToLogin(){
    document.getElementById("storyTelling").innerHTML = 
        `<div id="name-input">
            <label for="username">username: </label>
            <input id="username" type="text">
            <br>
            <div id="container-profilpicture">
                <img class="profil-placeholder" id="profil-placeholder" src="img/profil-placeholder.png" alt="profil-placeholder">
                <p id="profilpicture-click">click to upload profil picture</p>
                <input type="file" id="fileInput" accept="image/*" style="display: none;">
            </div>
            <p id="next" onclick="switchToCharacter()">next</p>
        </div>`

        document.getElementById("profilpicture-click").addEventListener("click", function() {
            document.getElementById("fileInput").click();
        });
        
        /*Fremdcode*/
        document.getElementById("fileInput").addEventListener("change", function(event) {
            const file = event.target.files[0]; 
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImageSrc = e.target.result;
                    document.querySelector(".profil-placeholder").src = e.target.result; 
                };
                reader.readAsDataURL(file); 
            }
        });
        /**********/
}
function switchToCharacter(){
    let usernameInput = document.getElementById("username").value;
    
    if(usernameInput == ""){
        alert("Username must not be empty!");
    }
    else{
        username = document.getElementById("username").value;

        document.getElementById("storyTelling").innerHTML = 
        `<div id="characterChoosing">
            <div id="container-character">
                <img onclick="goLeft()" class="arrows-character" src="img/arrow-left.png">
                <div id="characterBox">
                    <img class=characters id="choosenChar${counter}" src="${images[counter]}">
                </div>
                <img onclick="goRight()" class="arrows-character" src="img/arrow-right.png">
            </div>
            <p id="select" onclick="switchToGame()">select</p>
        </div>`
    }
    
}
function goRight(){
    if(counter >= 3){
        counter = 0;
    }
    else{
        counter++;
    }

    document.getElementById("characterBox").innerHTML = `<img class=characters id="choosenChar${counter}" src="${images[counter]}">`

}
function goLeft(){
    if(counter <= 0){
        counter = 3;
    }
    else{
        counter--;
    }

    document.getElementById("characterBox").innerHTML = `<img class=characters id="choosenChar${counter}" src="${images[counter]}">`

}
function switchToGame(){
    value = counter;
    levelCount++;

    if(firstTimePlaying){
        selectedCharacter = players[counter];
    }
    

    playerImage = `<img id="spriteImg" src="${players[counter]}">`;
    document.getElementById("player").innerHTML = playerImage;
    
    document.getElementById("storyTelling").style.display = "none";
    document.getElementById("gameBody").style.display = "block";
    document.getElementById("level").innerHTML = `<p>${levelCount}</p>`

    if (profileImageSrc) {
        document.getElementById("level1-profilimg").src = profileImageSrc;
    }
    else{
        document.getElementById("level1-profilimg").src = "img/profil-placeholder.png";
    }
    document.querySelector(".username").innerHTML = username;

    setTimeout(() => writeText(0), 2000);
}

function openScroll(){
    document.getElementById("container-scroll").innerHTML = 
        `<img id="scroll-opened" src="img/scroll-opened.png" alt="scroll-opened">
        <div class="text-container">
            <p class="typewriter delay-1">Welcome, Explorer...</p>
            <p class="typewriter delay-2">You have gone where few dare to go </p>
            <p class="typewriter delay-3">—the cursed depths of an ancient pyramid,</p>
            <p class="typewriter delay-4">where forgotten secrets whisper in the dark.</p>
            <p class="typewriter delay-5">But beware... your curiosity has stirred the ancient sands, </p>
            <p class="typewriter delay-6">awakening a curse long forgotten.</p>
            <p class="typewriter delay-7">Run. Solve the riddles.</p>
            <p class="typewriter delay-8">This is your final expedition. Make it count.</p>
        </div>`;

    setTimeout(readyButton,20000);
}
function readyButton(){
    document.getElementById("ready").innerHTML = "ready";
}

/* END */
function switchToLeavingRoom(){
    document.getElementById("storyTelling").style.display = "none";
    document.getElementById("gameBody").style.display = "none";
    document.getElementById("door-leave-body").style.display = "block";
    openScrollEnd();
}
function openScrollEnd() {
    document.getElementById("container-end-scroll").innerHTML = 
        `<img id="scroll-opened" src="img/scroll-opened.png" alt="scroll-opened">
        <div class="text-container">
            <p class="typewriter delay-1">Congratulations, Explorer</p>
            <p class="typewriter delay-2">You have solved every riddle,</p>
            <p class="typewriter delay-3">outwitted every trap, and avoided every foe.</p>
            <p class="typewriter delay-4">The ancient curse that haunted these halls</p>
            <p class="typewriter delay-5">has finally been broken by your cunning and courage.</p>
            <p class="typewriter delay-6">The secrets of the pyramid are yours,</p>
            <p class="typewriter delay-7">and its dark legacy shall trouble the world no more.</p>
            <p class="typewriter delay-8">You are free. The legend lives on — in you.</p>
        </div>`;
}

function leaveButton(){
    document.getElementById("container-end-scroll").style.display = "none";
    document.getElementById("done").style.display = "none";
    document.getElementById("leaveText").style.display = "block";
}

function switchToEndPage() {

    let score = PLAYER.coins + levelCount * 10;
    saveToLeaderBoard(username, score);
    
    document.getElementById("lastPage").style.display = "block";
    document.getElementById("door-leave-body").style.display = "none";
}

function backToStart() {
    location.reload();
}

function tryAgain() {
    firstTimePlaying = false;
    document.getElementById("lastPage").style.display = "none";
    document.getElementById("game-over").style.display = "none";
    document.getElementById("gameBody").style.display = "block";

    resetGameState();

    //set colliders display none
    const colliders = document.querySelectorAll('.collider-lvl5, .collider-lvl2, .collider-lvl3, .collider-lvl4');
    colliders.forEach(collider => {
        collider.style.display = "none";
    });

    const collidersLvl1 = document.querySelectorAll('.collider');
    collidersLvl1.forEach(collider => {
        collider.style.display = "block";
    });
    
    levelCount = 0;
    document.getElementById("level").innerHTML = `<p>${levelCount}</p>`;

    document.getElementById("gameBoard").style.backgroundImage = "url('img/game-board-level1.png')";
    document.getElementById("random-enemy2").style.display = "none";
    document.getElementById("random-enemy").style.display = "none";

    document.getElementById("buddy").style.display = "none";
    document.getElementById("enemy").innerHTML = `<img src="img/enemy-skeleton.png" id="enemy-skeleton" alt="enemy-skeleton">`
    document.getElementById("random-enemy2").innerHTML = `<img id="random-enemy2-img" src="img/enemy3-lvl3.png" alt="enemy3-lvl3">`
    document.getElementById("random-enemy").innerHTML = `<img id="random-enemy-img" src="img/enemy-random.png" alt="enemy-random">`

    document.getElementById("planks-lake-box").style.display = "none";

    const items = document.querySelectorAll('.lvl5-items');
    items.forEach(collider => {
        collider.style.display = "none";
    });

    const img = new Image();
    img.src = selectedCharacter;
    img.onload = function() {
        document.getElementById("player").innerHTML = `<img id="spriteImg" src="${selectedCharacter}">`;
        gameEnded = false;
        switchToGame();
    };
    img.onerror = function() {
        console.error("Failed to load player image:", selectedCharacter);
    };
       
}

function resetGameState() {
    LIFES.lifesCount = 3;
    LIFES.life1.style.opacity = "1";
    LIFES.life2.style.opacity = "1";
    LIFES.life3.style.opacity = "1";

    PLAYER.triggeredCollider16 = false;
    PLAYER.triggeredScarab = false;
    PLAYER.triggeredBench = false;
    PLAYER.triggeredVase = false;


    /*reset all enemys*/ 
    ENEMY.currentFrame = 0;
    ENEMY.totalFrames = 8; 
    ENEMY.frameWidth = 1.5; 

    ENEMY.sprite = document.getElementById('enemy-skeleton');
    ENEMY.box.style.transform = 'scaleX(1)'; 
    ENEMY.box.style.opacity = '1';
    ENEMY.sprite.style.right = '0px';
    ENEMY.spriteImgNumber = 0;
    ENEMY.yOffset = 0;
    ENEMY.direction = 'down';
    ENEMY.currentFrame = 0;
    ENEMY.box.style.left = '500px';
    ENEMY.box.style.top = '400px';

    ENEMY3.box.style.transform = 'scaleX(1)';
    ENEMY3.spriteImgNumber = 0;
    ENEMY3.direction = 'down';
    ENEMY3.yOffset = 0;
    ENEMY3.targetX = 0;
    ENEMY3.targetY = 0;
    document.getElementById("random-enemy2-img").style.right = '0px';

    ENEMY2.box.style.transform = 'scaleX(1)';
    ENEMY2.spriteImgNumber = 0;
    ENEMY2.direction = 'down';
    ENEMY2.yOffset = 0;
    ENEMY2.targetX = 0;
    ENEMY2.targetY = 0;
    document.getElementById("random-enemy-img").style.right = '0px';
    
    document.getElementById("enemy-skeleton").style.right = '0px';
    document.getElementById("enemy-skeleton").style.top = '0px';

    document.getElementById("collider16").style.display = "block";

    ENEMY.speed = 0.8;
    ENEMY2.speed = 1.2;
    ENEMY3.speed = 0.8;

    document.getElementById("text-container-level1").style.top = "30vh"
    
    PLAYER.coins = 0;
    document.getElementById("coins-box").innerHTML = `<p>${PLAYER.coins} coins</p>`;
    
    timeLeft = 150;
    collectedKey = false;
    collectedKeyLvl5 = false;
    gameEnded = false;
    hintsOpen = false;
    mysteryOpen = false;
    
    document.getElementById("key-statistics").style.display = "none";
    document.getElementById("door-lvl5").style.display = "none";
    document.getElementById("key-door-lvl5").style.display = "none";
    
    PLAYER.box.style.left = '700px';
    PLAYER.box.style.top = '600px';

    playerImage = `<img id="spriteImg" src="${selectedCharacter}">`;
    document.getElementById("player").innerHTML = playerImage;

}

/* LEADERBOARD */
// Leaderboard-Funktionen

function toLeaderboard(){
    hintsOpen = true;
    gameEnded = true;
    document.getElementById("leaderboard-body").style.display = "block";
    document.getElementById("lastPage").style.display = "none";
    document.getElementById("game-over").style.display = "none";
    showLeaderboard();
}

function showLeaderboard() {
    document.getElementById("leaderboard").style.display = "block";
    displayLeaderBoard();
}

function hideLeaderboard() {
    document.getElementById("leaderboard").style.display = "none";
    backToStart()
}

function saveToLeaderBoard(name, score) {
     console.log(`Saving: ${name} - ${score}`);
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || []; 
    leaderboard.push({ name: name, score: score }); 
    leaderboard.sort((a, b) => b.score - a.score);
    if (leaderboard.length > 10) leaderboard = leaderboard.slice(0, 10); 
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard)); 
    displayLeaderBoard();
}

function displayLeaderBoard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let list = document.getElementById("leaderboardList");
    list.innerHTML = "";

    if (leaderboard.length === 0) {
        list.innerHTML = "<li>No entries yet</li>";
        return;
    }

    leaderboard.forEach((entry, index) => {
        let li = document.createElement("li");
        li.style.backgroundColor = index % 2 === 0 ? "rgba(86, 47, 20, 0.3)" : "rgba(172, 137, 112, 0.3)";
        li.style.borderRadius = "5px";
        li.innerHTML = `<span id="leaderboard-number">${index + 1}.</span> ${entry.name} - <span id="leaderboard-score" >${entry.score} points</span>`;
        list.appendChild(li);
    });
    
}
