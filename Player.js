class Player {
    constructor(parent, i, j, size) {
        this.parent = parent;
        this.i = i;
        this.j = j;
        this.x = i * size;
        this.y = j * size;
        this.size = size;
        this.direction = 0;
        this.state = "idle";
        //animation
        this.timer = 0;
        this.newI = 0;
        this.newJ = 0;
        this.bombPlaceT = 0;
    }
    
    update(dt) {
        if(this.state == "idle")
            this.updateIDLE();
        else if(this.state == "move")
            this.updateMove(dt);
        else if(this.state == "place a bomb")
            this.updatePlaceABomb(dt);
        
        this.timer += dt;
        
    }
    
    tryMove(i, j) {
        this.timer = 0;
        
        if(!this.parent.map.isAllowToStand(i, j)) return;
        
        this.newI = i;
        this.newJ = j;
        this.state = "move";
    }
    updateIDLE() {
        if(keyBoard.isKeyDown(65)){ //a
            this.direction = 2;
            this.tryMove(this.i - 1, this.j);
        }
        else if(keyBoard.isKeyDown(68)){ //d
            this.direction = 0;
            this.tryMove(this.i + 1, this.j);
        }
        else if(keyBoard.isKeyDown(87)){ //w
            this.direction = 1;
            this.tryMove(this.i, this.j - 1);
        }
        else if(keyBoard.isKeyDown(83)){ //s
            this.direction = 3;
            this.tryMove(this.i, this.j + 1);
        }
        else if(keyBoard.isKeyDown(32)){ //space
            if(this.parent.map.canPlaceABomb(this.i, this.j)){
                this.timer = 0;
                this.state = "place a bomb";
            }
        }
    }
    updateMove(dt) {
        if(this.timer > 200) {
            this.state = "idle";
            
            this.i = this.newI;
            this.j = this.newJ;
            
            this.x = this.i * this.size;
            this.y = this.j * this.size;
            this.updateIDLE();
        }
        else {
            let x1 = this.i * this.size;
            let y1 = this.j * this.size;
            let x2 = this.newI * this.size;
            let y2 = this.newJ * this.size;
            let t = this.timer / 200;
            
            this.x = (1 - t) * x1 + t * x2;
            this.y = (1 - t) * y1 + t * y2;
        }
    }
    updatePlaceABomb(dt){
        if(!keyBoard.isKeyDown(32)){ //space
            this.timer = 0;
            this.state = "idle"
            return;
        }
        let plantTime = 500;
        
        if(this.timer > plantTime) {
            // add bomb object on map
            this.parent.map.placeABomb(this.i, this.j, 5000);
            this.state = "idle";
            this.timer = 0;
        }
        else {
            this.bombPlaceT = this.timer/plantTime;
        }
        
    }
    render(ctx, camera) {
        
        let sz = this.size;
        let sz2 = sz/2;
        
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(
            this.x + sz2 - camera.x, 
            this.y + sz2 - camera.y, 
            3*sz/8, 
            0, 6.28);
        ctx.fill();
        
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.arc(
            this.x + sz2 - camera.x, 
            this.y + sz2 - camera.y, 
            3*sz/8, 
            0, 6.28);
        ctx.stroke();
        
        if(this.state == "place a bomb") {
            
            ctx.beginPath();
            ctx.arc(
                this.x + sz2 - camera.x, 
                this.y + sz2 - camera.y, 
                3*sz/8 * this.bombPlaceT, 
                0, 6.28);
            ctx.stroke();   
        }
        
        let ang = 2 * Math.PI * this.direction / 4;
        ctx.beginPath();
        ctx.moveTo(this.x + sz2 - camera.x, this.y + sz2 - camera.y);
        ctx.lineTo(
            this.x + sz2 + Math.cos(ang) * sz2 - camera.x, 
            this.y + sz2 - Math.sin(ang) * sz2 - camera.y
        );
        ctx.stroke();
    }
    
    
}
