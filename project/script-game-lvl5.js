/***********************************
 * LEVEL 5
 * **********************************/
function switchToLevelFive(){
    hintsOpen = false;

    //switch to right board
    document.getElementById("storyTelling").style.display = "none";
   
    document.getElementById("quiz-lvl4").style.display = "none";
    document.getElementById("gameBody").style.display = "block";

    //change enemy
    document.getElementById("enemy-skeleton").src = "img/enemy1-lvl4.png";
    document.getElementById("enemy").style.width = "2.75vw";

    document.getElementById("random-enemy2-img").src = "img/enemy2-lvl4.png";
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

    /*just for now*/
    playerImage = `<img id="spriteImg" src="${players[counter]}">`;
    document.getElementById("player").innerHTML = playerImage;

    resetLevel();
}