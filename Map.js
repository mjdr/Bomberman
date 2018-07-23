class Map {
    constructor(width, height, blockSize) {
        this.width = width;
        this.height = height;
        this.blockSize = blockSize;
        
        this.bombs = [];
        this.explotions = [];
        
        this.tiles = [...Array(width * height).keys()]
            .map((k) => new MapTile(k % width, Math.floor(k / width), blockSize));
    }
    
    update(dt){
        this.bombs.forEach((b) => b.update(dt));
        this.bombs = this.bombs.filter((b) => !b.isExploded);
        this.explotions.forEach((e) => e.update(dt));
        this.explotions = this.explotions.filter((e) => !e.isDone);
    }
    
    render(ctx, camera) {
        this.tiles.forEach((t) => t.render(ctx, camera));
        this.bombs.forEach((b) => b.render(ctx, camera));
        this.explotions.forEach((e) => e.render(ctx, camera));
    }
    
    isAllowToExplode(i, j){
        if(i < 0 || j < 0) return false;
        if(i >= this.width || j >= this.height) return false;
        let tile = this.tiles[j * this.width + i];
        return tile.type != 0;
    }
    isAllowToStand(i, j){
        if(!this.canPlaceABomb(i ,j)) return false;
        return this.isAllowToExplode(i,j);
    }
    canPlaceABomb(i ,j){
        return this.bombs.filter((b) => b.i == i && b.j == j).length == 0;
    }
    placeABomb(i, j, time){
        this.bombs.push(new Bomb(this, i, j, time, this.blockSize));
    }
    placeExplotion(i, j, time){
        this.explotions.push(new Explotion(i, j, time, this.blockSize));
    }
    
}
