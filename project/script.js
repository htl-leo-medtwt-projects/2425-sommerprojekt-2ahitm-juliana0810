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
            <p id="select" onclick="switchToLevelFive()">select</p>
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
function switchToEndPage(){
    document.getElementById("lastPage").style.display = "block";
    document.getElementById("door-leave-body").style.display = "none";
}

function backToStart() {
    location.reload();
}

function tryAgain() {
    firstTimePlaying = false;
    console.log("Selected character path:", selectedCharacter);
    document.getElementById("lastPage").style.display = "none";
    document.getElementById("game-over").style.display = "none";
    document.getElementById("gameBody").style.display = "block";
    
    resetGameState();
    resetLevel();
    
    levelCount = 1;
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
        startGame();
    };
    img.onerror = function() {
        console.error("Failed to load player image:", selectedCharacter);
    };
    
    gameEnded = false;
    switchToGame();
}

function resetGameState() {
    LIFES.lifesCount = 3;
    LIFES.life1.style.opacity = "1";
    LIFES.life2.style.opacity = "1";
    LIFES.life3.style.opacity = "1";
    
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