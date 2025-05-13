/***********************************
 * LEVEL 4
 * **********************************/
function switchToLevelFour(){
    hintsOpen = false;
    mysteryOpen = false;

    //switch to right board
    document.getElementById("storyTelling").style.display = "none";
   
    document.getElementById("quiz-lvl3").style.display = "none";
    document.getElementById("gameBody").style.display = "block";

    //change enemy
    document.getElementById("enemy-skeleton").src = "img/enemy1-lvl4.png";
    document.getElementById("enemy").style.width = "2.75vw";

    document.getElementById("random-enemy").style.display = "none";
    document.getElementById("random-enemy2-img").src = "img/enemy2-lvl4.png";
    document.getElementById("random-enemy2").style.display = "block";
    document.getElementById("random-enemy2").style.opacity = "1";
    document.getElementById("random-enemy2-img").style.display = "block";
   

    //change background
    document.getElementById("gameBoard").style.backgroundImage = "url('img/game-board-level4.png')";

    //set colliders display none
    const colliders = document.querySelectorAll('.collider, .collider-lvl2, .collider-lvl3');
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

    document.getElementById("lake").style.display = "block";

    resetLevel();
    writeText(10);
}
/*fremdcode */
function startSymbolPuzzle(){
    document.getElementById("transparent-box").style.display = "block";
    
    const canvas = document.getElementById("symbolCanvas");
    const ctx = canvas.getContext("2d");

    const correctSymbol = "Eye";

    const symbols = [
        { name: "Anch", x: 275, y: 100, imgSrc: "img/anch-lvl4.png", floatOffset: 0 },
        { name: "Skarabäus", x: 425, y: 80, imgSrc: "img/skarabäus-lvl4.png", floatOffset: 0 },
        { name: "Eye", x: 575, y: 120, imgSrc: "img/eye-lvl4.png", floatOffset: 0 },
        { name: "Papyrus", x: 725, y: 90, imgSrc: "img/papyrus-lvl4.png", floatOffset: 0 },
        { name: "Temple", x: 825, y: 130, imgSrc: "img/temple-lvl4.png", floatOffset: 0 },
    ];


    const images = {};
    let imagesLoaded = 0;

    symbols.forEach(sym => {
        const img = new Image();
        img.src = sym.imgSrc;
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === symbols.length) {
                startAnimation();
            }
        };
        images[sym.name] = img;
    });

    let floatAngle = 0;
    function startAnimation(){
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
    
    writeText(11);

    canvas.addEventListener("click", handleClick);

    function handleClick(e) {
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
                canvas.removeEventListener("click", handleClick);
                    canvas.style.display = "none";
                    document.getElementById("text-container-level1").style.display = "none";
                    document.getElementById("transparent-box").style.display = "none";
                    document.getElementById("textboxLake").style.display = "block";

                if (sym.name === correctSymbol) {
                    hintsOpen = false;
                    document.getElementById("textboxLake").innerHTML = `<p>As it seems, you may continue your expedition...</p>`
                    document.getElementById("lake").style.display = "none";
                    setTimeout(() => document.getElementById("textboxLake").style.display = "none", 3000);
                    setTimeout(() => gameLoop(), 3000);
                } else {
                    document.getElementById("textboxLake").innerHTML = `<p>Oh no... You've chosen the wrong symbol!</p>`
                    gameEnded = true;
                    setTimeout(() => gameOver(), 3000);
                }
            }
        }
    }
    canvas.style.display = "block";
}
function showItemsSpecialBox(){
    document.getElementById("transparent-box").style.display = "block";
    document.getElementById("itemSpecialBox").style.display = "block";


    writeText(12);

    document.getElementById("img1").onclick = () => {
        document.getElementById("text-container-level1").style.display = "none";
        document.getElementById("selectItemSpecialbox").style.display = "block";
        document.getElementById("itemSpecialBox").innerHTML = `<img class="clicked-img-specialBox" src="img/tatort-map-lvl4.png">`;
    };

    document.getElementById("img2").onclick = () => {
        document.getElementById("text-container-level1").style.display = "none";
        document.getElementById("selectItemSpecialbox").style.display = "block";
        document.getElementById("itemSpecialBox").innerHTML = `<img class="clicked-img-specialBox" src="img/open-scroll-lvl4.png"> `;
    };

    document.getElementById("img3").onclick = () => {
        document.getElementById("text-container-level1").style.display = "none";
        document.getElementById("selectItemSpecialbox").style.display = "block";
        document.getElementById("itemSpecialBox").innerHTML = `<img class="clicked-img-specialBox" id="zeiger-lvl4" src="img/zeiger-lvl4.png">`;
    };
}
function continueSpecialBox(){
    document.getElementById("selectItemSpecialbox").style.display = "none";
    document.getElementById("transparent-box").style.display = "none";
    document.getElementById("itemSpecialBox").style.display = "none";
    document.getElementById("special-box").style.display = "none";
    document.getElementById("tatort").style.display = "block";

    hintsOpen = false;
    gameLoop();
}

function showMysteriousSpace(){
    document.getElementById("text-container-level1").style.top = "30vh";
    writeText(13);
}
function startHandScan() {
    const scanner = document.getElementById("scanner-line");
  
    scanner.style.display = "block";
  
    scanner.classList.remove("scanned"); 
    void scanner.offsetWidth; 
    scanner.classList.add("scanned");
  
    setTimeout(() => {
      scanner.style.display = "none";
      document.getElementById("scan-button").style.display = "none";
      document.getElementById("identify-text").style.display = "block";
      document.getElementById("close-handscan").style.display = "block";
      document.getElementById("handprint").src = "img/other-explorer-singleImg.png";
      document.getElementById("handprint").style.width = "35vw";
      document.getElementById("handprint").style.marginTop = "3em";
    }, 2000); 
  }
  
function closeHandScan(){
    document.getElementById("identify-text").style.display = "none";
    document.getElementById("close-handscan").style.display = "none";
    document.getElementById("transparent-box").style.display = "none";
    document.getElementById("handscan-wrapper").style.display = "none";
    document.getElementById("tatort").style.display = "none";


    document.getElementById("footprints").style.display = "block";
    document.getElementById("footprints-img").style.display = "block";

    hintsOpen = false;
    gameLoop();
}

function showFootPrints(){
    document.getElementById("transparent-box").style.display = "block";
    document.getElementById("medicine-box").style.display = "block";
    document.getElementById("text-container-level1").style.top = "65vh";
    writeText(14);
}

/* medicine */
let selectedMedicine = null;

function setupMedicineSelection() {
    const medicineContainer = document.getElementById("medicine-img-container");

    medicineContainer.addEventListener("click", function (e) {
        if (e.target.tagName.toLowerCase() === "img") {
            const images = medicineContainer.querySelectorAll("img");
            images.forEach(img => {
                img.style.border = "none";
                img.style.borderRadius = "0";
            });
            e.target.style.border = "2px solid rgb(231, 226, 224)";
            e.target.style.borderRadius = "1em";

            selectedMedicine = e.target.id;
        }
    });
}


function selectedAnswerMedicine() {
    document.getElementById("medicine-box").style.height = "20vh";
    document.getElementById("footprints").style.display = "none";
    if (!selectedMedicine) {
        alert("Please select a medicine first!");
        return;
    }
    if (selectedMedicine === "bandage") {
        document.getElementById("medicine-box").innerHTML =
            `<p class="medicine-result">Yes you saved him! You gained a new buddy!</p>
             <p onclick="closeMedicine()" class="close-medicine">close</p>`;
    } else {
        document.getElementById("medicine-box").innerHTML =
            `<p class="medicine-result">No that was the wrong medicine! It's to late...</p>
            <p onclick="closeMedicine()" class="close-medicine">close</p>`;
        removeLife();
    }
}
function closeMedicine(){
    document.getElementById("transparent-box").style.display = "none";
    document.getElementById("medicine-box").style.display = "none";

    document.getElementById("text-container-level1").style.top = "30vh";
    writeText(15);
}

/****************** MYSTERY FOUR - JS LIBRARY **************/

function switchToMystery4() {
    mysteryOpen = true;
    document.getElementById("storyTelling").style.display = "none";
    document.getElementById("gameBody").style.display = "none";
    document.getElementById("quiz-lvl4").style.display = "block";
    document.getElementById("slider-puzzle").style.display = "grid";

    initializeSliderPuzzle(); 
    setTimeout(() => startSliderPuzzle(), 500); 
}

function initializeSliderPuzzle() {
    const puzzle = document.getElementById('slider-puzzle');
    puzzle.innerHTML = '';

    let numbers;

    do {
        numbers = [...Array(8).keys()].map(n => n + 1); 
        shuffleArray(numbers);
    } while (!isSolvable(numbers));

    numbers.push(null); 

    numbers.forEach((num, index) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.position = index;

        if (num === null) {
            tile.classList.add('empty');
            tile.textContent = '';
        } else {
            tile.textContent = num;
        }

        puzzle.appendChild(tile);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function isSolvable(array) {
    let inversions = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] > array[j]) inversions++;
        }
    }
    return inversions % 2 === 0;
}

function startSliderPuzzle() {
    interact('.tile').draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrict({
                restriction: '#slider-puzzle',
                endOnly: true
            })
        ],
        listeners: {
            move(event) {
                const tile = event.target;
                const empty = document.querySelector('.tile.empty');

                const tileRect = tile.getBoundingClientRect();
                const emptyRect = empty.getBoundingClientRect();

                const dx = Math.abs(tileRect.left - emptyRect.left);
                const dy = Math.abs(tileRect.top - emptyRect.top);

                if ((dx === 105 && dy === 0) || (dy === 105 && dx === 0)) {
                    const temp = tile.textContent;
                    tile.textContent = '';
                    empty.textContent = temp;

                    tile.classList.add('empty');
                    empty.classList.remove('empty');
                }
            }
        }
    });
}

function checkIfPuzzleSolved() {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const correct = tiles.every((tile, index) => {
        const num = parseInt(tile.textContent);
        return tile.classList.contains("empty") || num === index + 1;
    });
    if (correct) {
        document.getElementById("quiz-lvl4").innerHTML += 
            `<div id="result-puzzle">You solved the puzzle. Good luck on your last challenge...</div>`
            setTimeout(() => switchToLevelFive(), 3000);
    }
    else{
         document.getElementById("quiz-lvl4").innerHTML += 
            `<div id="result-puzzle">The puzzle is not solved. I think your expedition is over...</div>`
        gameEnded = true;
        setTimeout(() => gameOver(), 3000);
    }
}
