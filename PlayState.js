class PlayState {
    
    constructor() {
        this.blockSize = 32;
        
        this.camera = new Camera(0, 0);
        this.map = new Map(30,12, this.blockSize);
        this.player = new Player(this, 0, 0, this.blockSize);
        
    }
    init(){
    }
    update(dt){
        this.map.update(dt);
        this.player.update(dt);
        this.camera.x = this.player.x + this.blockSize/2 - width/2;
        this.camera.y = this.player.y + this.blockSize/2 - height/2;
        
        
        let maxX = this.map.width * this.blockSize - width;
        let maxY = this.map.height * this.blockSize - height;
        
				
        this.camera.x = Math.max(0, this.camera.x);
        this.camera.y = Math.max(0, this.camera.y);
        this.camera.x = Math.min(this.camera.x, maxX);
        this.camera.y = Math.min(this.camera.y, maxY);
        
    }
    render(ctx) {
        this.map.render(ctx, this.camera);
        this.player.render(ctx, this.camera);
    }
}
