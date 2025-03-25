let infoOpen = false;
let profileImageSrc = ""; 
let username = "";

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
                <img class="arrows-character" src="img/arrow-left.png">
                <div id="characterBox"></div>
                <img class="arrows-character" src="img/arrow-right.png">
            </div>
            <p id="select" onclick="switchToGame()">select</p>
        </div>`
    }
    
}
function switchToGame(){
    document.getElementById("storyTelling").style.display = "none";
    document.getElementById("gameBody").style.display = "block";

    if (profileImageSrc) {
        document.getElementById("level1-profilimg").src = profileImageSrc;
    }
    else{
        document.getElementById("level1-profilimg").src = "img/profil-placeholder.png";
    }
    document.querySelector(".username").innerHTML = username;
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
            <p class="typewriter delay-7">The walls tremble, the air thickens, </p>
            <p class="typewriter delay-8">and the sands hunger for your fate.</p>
            <p class="typewriter delay-9">Run. Solve the riddles.</p>
            <p class="typewriter delay-10">Escape before the last grain of time slips away.</p>
            <p class="typewriter delay-11">This is your final expedition.</p>
            <p class="typewriter delay-12">Make it count.</p>
        </div>`;

    setTimeout(readyButton,32000);
}
function readyButton(){
    document.getElementById("ready").innerHTML = "ready";
}