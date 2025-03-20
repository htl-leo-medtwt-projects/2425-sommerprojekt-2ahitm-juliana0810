let infoOpen = false;
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
                <img id="profil-placeholder" src="img/profil-placeholder.png" alt="profil-placeholder">
                <p>click to upload profil picture</p>
            </div>
            <p id="next">next</p>
        </div>`
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
}

