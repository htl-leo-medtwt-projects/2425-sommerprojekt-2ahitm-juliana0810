/***********************************
 * PLAYER
 ***********************************/
let PLAYER = {
    box: document.getElementById('player'),
    spriteImgNumber: 0, 
    spriteDirection: 1,
    coins: 0,
    triggeredCollider16: false,
    triggeredVase: false,
    triggeredBench:false,
}
let VALUES = [
    30.5,
    31,
    30,
    30.5,
]

let yValue = 0;

/** move player */
/** 
 * @param {number} dx 
 * @param {number} dy 
 * @param {number} dr 
 */
let colliders = document.querySelectorAll(".collider, .collider-lvl2");
function movePlayer(dx, dy, dr) {
    let originalX = parseFloat(PLAYER.box.style.left);
    let originalY = parseFloat(PLAYER.box.style.top);

    let newX = originalX + dx;
    let newY = originalY + dy;
    let collisionDetected = false;
    colliders.forEach(collider => {
        let colliderRect = collider.getBoundingClientRect();
        let playerRect = PLAYER.box.getBoundingClientRect();
        if(newX < colliderRect.right && newX + playerRect.width > colliderRect.left && newY < colliderRect.bottom && newY + playerRect.height > colliderRect.top) {
            collisionDetected = true;
        }
    })

    
    if(!collisionDetected){
        PLAYER.box.style.left = (originalX + dx) + 'px';
        PLAYER.box.style.top = (originalY + dy) + 'px';

        if (dr != 0 && dr != PLAYER.spriteDirection) {
            PLAYER.spriteDirection = dr;
            PLAYER.box.style.transform = `scaleX(${dr})`;
        }
    }
    
}


/** animate player */
function animatePlayer() {
    if (PLAYER.spriteImgNumber < 8) { 
        PLAYER.spriteImgNumber++;
        let x = parseFloat(document.getElementById("spriteImg").style.right);
        x += VALUES[value]; 
        document.getElementById("spriteImg").style.right = x + "px";
        document.getElementById("spriteImg").style.top = yValue + "px";
    } else { 
        document.getElementById("spriteImg").style.right = "0px";
        PLAYER.spriteImgNumber = 0;
    }
}