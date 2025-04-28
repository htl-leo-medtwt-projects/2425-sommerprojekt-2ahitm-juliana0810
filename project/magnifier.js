class Magnifier {
    constructor(game, image, options = {}) {
        this.game = game;
        this.image = image;
        this.zoomLevel = options.zoomLevel || 2;
        this.radius = options.radius || 100;
        this.active = false;
        
        this.magnifierCanvas = document.createElement('canvas');
        this.magnifierCanvas.width = this.radius * 2;
        this.magnifierCanvas.height = this.radius * 2;
        this.magnifierCtx = this.magnifierCanvas.getContext('2d');
       
        this.x = 0;
        this.y = 0;
    }
    
    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    }
    
    toggle() {
        this.active = !this.active;
    }
    
    draw() {
        if (!this.active) return;
        
        const ctx = this.game.ctx;
   
        this.magnifierCtx.save();
        this.magnifierCtx.beginPath();
        this.magnifierCtx.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2);
        this.magnifierCtx.closePath();
        this.magnifierCtx.clip();
        
        this.magnifierCtx.drawImage(
            this.image,
            this.x - this.radius / this.zoomLevel, 
            this.y - this.radius / this.zoomLevel,
            (this.radius * 2) / this.zoomLevel,
            (this.radius * 2) / this.zoomLevel,
            0, 0,
            this.radius * 2,
            this.radius * 2
        );
        
        this.magnifierCtx.restore();
        
        ctx.drawImage(
            this.magnifierCanvas,
            this.x - this.radius,
            this.y - this.radius
        );
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}
