/***********************************
 * LEVEL 4
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

    document.getElementById("random-enemy").style.display = "none";
    document.getElementById("random-enemy2-img").src = "img/enemy2-lvl4.png";
    document.getElementById("random-enemy2").style.display = "block";
    document.getElementById("random-enemy2").style.opacity = "1";
    document.getElementById("random-enemy2-img").style.display = "block";
   

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
                    document.getElementById("textboxLake").innerHTML = `<p>Oh no... You chosen the wrong symbol!</p>`
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
    document.getElementById("transparent-box").style.display = "block";
    document.getElementById("handscan-wrapper").style.display = "block";
}
function startHandScan() {
    const scanner = document.getElementById("scanner-line");
    const result = document.getElementById("scan-result");
  
    scanner.style.display = "block";
  
    scanner.classList.remove("scanned"); 
    void scanner.offsetWidth; 
    scanner.classList.add("scanned");
  
    setTimeout(() => {
      scanner.style.display = "none";
      result.style.display = "block";
      result.innerHTML = "<p>Zugriff gewährt – willkommen zurück, Archäologe!</p>";
    }, 2000); 
  }
  
function startSliderPuzzle(){
    interact('.tile').draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrict({
            restriction: '#slider-puzzle',
            endOnly: true
          })
        ],
        listeners: {
          move (event) {
            const tile = event.target;
            const empty = document.querySelector('.tile.empty');
            
            const tileRect = tile.getBoundingClientRect();
            const emptyRect = empty.getBoundingClientRect();
      
            const dx = Math.abs(tileRect.left - emptyRect.left);
            const dy = Math.abs(tileRect.top - emptyRect.top);
      
            // Nur benachbarte Tiles verschieben
            if ((dx === 105 && dy === 0) || (dy === 105 && dx === 0)) {
              // Tausche Positionen im DOM
              const parent = tile.parentNode;
              parent.insertBefore(tile, empty);
              parent.insertBefore(empty, tile.nextSibling);
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
      alert("Puzzle gelöst!");
    
    }
}