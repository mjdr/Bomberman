let width;
let height;
let canvas;
let context;
let keyBoard;

let playState;
let currentState;


function init(){
    console.log("Global init");
    
    keyBoard = new KeyBoard();
    playState = new PlayState();
    
    
    currentState = playState;
    
    canvasInit();
    currentState.init();
    
    setInterval(tick, 1000/60);
}

function tick(){
   currentState.update(1000/60);
   clearCanvas();
   currentState.render(context);
}

function canvasInit(){
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    
    canvas.height = height = 350;
    canvas.width = width = 16/9*height;
    
    canvas.style.border = "1px solid black";
    
    document.body.appendChild(canvas);
}
function clearCanvas(){
    context.fillStyle = "white";
    context.fillRect(0,0,width, height);
}



document.addEventListener("DOMContentLoaded", init);

