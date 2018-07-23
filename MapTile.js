class MapTile {
    constructor(x, y, tileSize){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.type = Math.floor(Math.random()*4);
        
    }
    
    
    render(ctx, camera) {
        let ts = this.tileSize;
        
        switch(this.type){
            case 0: ctx.fillStyle = "red"; break;
            case 1: ctx.fillStyle = "green"; break;
            case 2: ctx.fillStyle = "blue"; break;
            case 3: ctx.fillStyle = "magenta"; break;
            default: ctx.fillStyle = "white"; break;
        }
        
        ctx.fillRect(
            this.x * ts - camera.x, 
            this.y * ts - camera.y, 
            ts,ts
				);
        
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.rect(
            this.x * ts - camera.x, 
            this.y * ts - camera.y, 
            ts,ts

				);
        ctx.stroke();
    }
}
