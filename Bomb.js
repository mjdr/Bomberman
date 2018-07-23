class Bomb {
    constructor(parent, i, j, time, size){
        this.parent = parent;
        this.i = i;
        this.j = j;
        this.totalTime = time;
        this.time = time;
        this.size = size;
        this.isExploded = false;
        this.power = 10;
    }
    
    update(dt){
        
        if(this.isExploded) return;
        
        this.time -= dt;
        if(this.time < 0){
            this.isExploded = true;
            
            for(let i = 0;i < this.power;i++)
                if(!this.parent.isAllowToExplode(this.i - i, this.j))
                    break;
                else
                    this.parent.placeExplotion(
                            this.i - i, this.j, 3000);
            
            for(let i = 1;i < this.power;i++)
                if(!this.parent.isAllowToExplode(this.i + i, this.j))
                    break;
                else
                    this.parent.placeExplotion(
                            this.i + i, this.j, 3000);
            
            for(let i = 1;i < this.power;i++)
                if(!this.parent.isAllowToExplode(this.i, this.j - i))
                    break;
                else
                    this.parent.placeExplotion(
                            this.i, this.j - i, 3000);
            
            for(let i = 1;i < this.power;i++)
                if(!this.parent.isAllowToExplode(this.i, this.j + i))
                    break;
                else
                    this.parent.placeExplotion(
                            this.i, this.j + i, 3000);
            
            
                
            
        }
    }
    
    render(ctx, camera){
        if(this.isExploded) return;
        let sz = this.size;
        let sz2 = sz/2;
        
        ctx.fillStyle = "brown";
        ctx.beginPath();
        ctx.arc(
            this.i * sz + sz2 - camera.x, 
            this.j * sz + sz2 - camera.y, 
            3*sz/8, 
            0, 6.28);
        ctx.fill();
        
        
        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        ctx.arc(
            this.i * sz + sz2 - camera.x, 
            this.j * sz + sz2 - camera.y, 
            3*sz/8, 
            0, 6.28);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(
            this.i * sz + sz2 - camera.x, 
            this.j * sz + sz2 - camera.y, 
            3*sz/8 * this.time/this.totalTime, 
            0, 6.28);
        ctx.stroke();
        
    }
    
    
}
