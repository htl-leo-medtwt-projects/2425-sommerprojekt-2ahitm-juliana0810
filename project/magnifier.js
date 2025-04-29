/*********** Fremdcode ************/

class Magnifier {
    constructor(imageElement, options = {}) {
        this.imageElement = imageElement;
        this.zoomLevel = options.zoomLevel || 3;
        this.radius = options.radius || 150;
        this.active = false;
        
        this.createMagnifierElement();
        this.setupEventListeners();
    }
    
    createMagnifierElement() {
        this.magnifier = document.createElement('div');
        this.magnifier.className = 'game-magnifier';
        this.magnifier.style.width = `${this.radius * 2}px`;
        this.magnifier.style.height = `${this.radius * 2}px`;
        this.magnifier.style.borderRadius = '50%';
        this.magnifier.style.pointerEvents = 'none';
        
        document.body.appendChild(this.magnifier);
    }
    
    setupEventListeners() {
        this.imageElement.addEventListener('mousemove', (e) => {
            if (this.active) {
                this.updatePosition(e.clientX, e.clientY);
            }
        });
        
        this.imageElement.addEventListener('touchmove', (e) => {
            if (this.active && e.touches.length > 0) {
                e.preventDefault();
                const touch = e.touches[0];
                this.updatePosition(touch.clientX, touch.clientY);
            }
        });
    }
    
    updatePosition(x, y) {
        const imgRect = this.imageElement.getBoundingClientRect();
        const relX = x - imgRect.left;
        const relY = y - imgRect.top;
    
        this.magnifier.style.left = `${x}px`;
        this.magnifier.style.top = `${y}px`;
    
        const bgPosX = -(relX * this.zoomLevel - this.radius);
        const bgPosY = -(relY * this.zoomLevel - this.radius);
    
        this.magnifier.style.backgroundImage = `url('${this.imageElement.src}')`;
        this.magnifier.style.backgroundSize = `${imgRect.width * this.zoomLevel}px ${imgRect.height * this.zoomLevel}px`;
        this.magnifier.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
    }
    
    toggle() {
        this.active = !this.active;
        this.magnifier.style.display = this.active ? 'block' : 'none';
        return this.active;
    }
}