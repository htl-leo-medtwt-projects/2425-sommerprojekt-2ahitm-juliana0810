/***********************************
 * LEVEL 3
 * **********************************/
function switchToLevelFour(){
    hintsOpen = false;
    //switch to right board
    document.getElementById("storyTelling").style.display = "none";
   
    document.getElementById("quiz-lvl3").style.display = "none";
    document.getElementById("gameBody").style.display = "block";

    //change enemy
    document.getElementById("enemy-skeleton").src = "img/enemy1-lvl4.png";
    document.getElementById("enemy").style.width = "2.75vw";

    document.getElementById("random-enemy-img").src = "img/enemy2-lvl4.png";
    document.getElementById("random-enemy").style.display = "block";
    document.getElementById("random-enemy").style.width = "8vw";
    document.getElementById("random-enemy").style.height = "5vw";
    document.getElementById("random-enemy-img").style.height = "60vh";
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

    ENEMY.speed = 0.6;

    document.getElementById("enemy-skeleton").style.right = '0px';
    document.getElementById("random-enemy-img").style.right = '0px';
    document.getElementById("random-enemy2-img").style.right = '0px';

    /*just for now*/
    playerImage = `<img id="spriteImg" src="${players[counter]}">`;
    document.getElementById("player").innerHTML = playerImage;

    resetLevel();
}