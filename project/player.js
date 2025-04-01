/***********************************
 * PLAYER
 ***********************************/
let PLAYER = {
    box: document.getElementById('player'),
    spriteImg: document.getElementById('spriteImg'),
    spriteImgNumber: 0, 
    spriteDirection: 1,
    score: 0
}


/** move player */
/** 
 * @param {number} dx 
 * @param {number} dy 
 * @param {number} dr 
 */
let colliders = document.querySelectorAll(".collider");
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
    if (PLAYER.spriteImgNumber < 5) { 
        PLAYER.spriteImgNumber++;
        let x = parseFloat(PLAYER.spriteImg.style.right);
        x += 42.0; 
        PLAYER.spriteImg.style.right = x + "px";
    } else { 
        PLAYER.spriteImg.style.right = "0px";
        PLAYER.spriteImgNumber = 0;
    }
}