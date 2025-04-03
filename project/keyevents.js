/***********************************
 * EVENT EVENTS
 ***********************************/
let KEY_EVENTS = {
    leftArrow: false,
    rightArrow: false,
    upArrow: false,
    downArrow: false,
    shift: false,
}

document.onkeydown = keyListenerDown;
document.onkeyup = keyListenerUp;

function keyListenerDown(e) {
    if (e.key === "ArrowLeft") { // Left arrow
        KEY_EVENTS.leftArrow = true;
        yValue = -90;
    }
    if (e.key === "ArrowUp") { // Up arrow
        KEY_EVENTS.upArrow = true;
        yValue = 0;
    }
    if (e.key === "ArrowRight") { // Right arrow
        KEY_EVENTS.rightArrow = true;
        yValue = -90;
    }
    if (e.key === "ArrowDown") { // Down arrow
        KEY_EVENTS.downArrow = true;
        yValue = -60;
    }
}
function keyListenerUp(e) {
    if (e.key === "ArrowLeft") { // Left arrow
        KEY_EVENTS.leftArrow = false;
    }
    if (e.key === "ArrowUp") { // Up arrow
        KEY_EVENTS.upArrow = false;
    }
    if (e.key === "ArrowRight") { // Right arrow
        KEY_EVENTS.rightArrow = false;
    }
    if (e.key === "ArrowDown") { // Down arrow
        KEY_EVENTS.downArrow = false;
    }
}