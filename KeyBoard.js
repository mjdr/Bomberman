class KeyBoard {
    constructor(){
        this.keys = {};
        window.onkeyup = this.keyUp.bind(this);
        window.onkeydown = this.keyDown.bind(this);
    }
    keyUp(e){
        this.keys[e.keyCode] = false;
    }
    keyDown(e){
        this.keys[e.keyCode] = true;
    }
    isKeyDown(code){
        return this.keys[code] ? true : false;
    }
}
