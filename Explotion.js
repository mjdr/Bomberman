class Explotion{
    constructor(i, j, time, size){
        this.i = i;
        this.j = j;
        this.time = time;
        this.size = size;
        this.isDone = false;
    }
    update(dt){
        
        if(this.time < 0)
            this.isDone = true;
        
        
        this.time -= dt;
    }
    render(ctx, camera){
        ctx.fillStyle = "yellow";
        
        ctx.fillRect(
            this.i * this.size - camera.x, 
            this.j * this.size - camera.y, 
            this.size, 
            this.size
        );
        
    }
}
