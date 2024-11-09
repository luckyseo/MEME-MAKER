const canvas = document.querySelector("canvas");
const ctx= canvas.getContext("2d");

const lineWidth=document.getElementById("line-width")
const color = document.getElementById("color")
const colorOptions=Array.from(document.getElementsByClassName("color-option"))
const modeBtn = document.getElementById("mode-btn");
const resetBtn = document.getElementById("reset-btn");
const eraseBtn = document.getElementById("eraser-btn");
const fileInput=document.getElementById("file")

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

ctx.lineWidth=lineWidth.value;

let isPainting = false;
let isFilling= false;

function startPainting(event){
    isPainting= true;
}
function cancelPainting(event){
    //ctx.beginPath(); or it can be placed here
    isPainting=false;
}

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY); //else
}


canvas.addEventListener("mousemove", onMove)
canvas.addEventListener("mousedown",startPainting)
canvas.addEventListener("mouseup",cancelPainting)
document.addEventListener("mouseup",cancelPainting)
//canvas.addEventListener("mouseleave",cancelPainting)

function onLineWidthChange(event){
    ctx.lineWidth=event.target.value;
}
lineWidth.addEventListener("change",onLineWidthChange);

function onColorChange(event){
    ctx.strokeStyle=event.target.value;
    ctx.fillStyle= event.target.value;
}
color.addEventListener("change",onColorChange);

//flat UI colors - website for color palette
function onColorClick(event){
    const colorValue=event.target.dataset.color;
    ctx.strokeStyle=colorValue;
    ctx.fillStyle= colorValue;
    color.value= colorValue;
}
colorOptions.forEach(color => color.addEventListener("click", onColorClick));

//Fill Background
function onModeClick(event){
    if(isFilling){
        isFilling=false;
        modeBtn.innerText="Fill";
    }else{
        isFilling =true;
        modeBtn.innerText="Draw";
    }
}
modeBtn.addEventListener("click",onModeClick)


function onCanvasClick(event){
    if(isFilling){
        ctx.fillRect(0,0, CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}
canvas.addEventListener("click",onCanvasClick)

//RESET
function onResetClick(event){
        ctx.fillStyle="white";
        ctx.fillRect(0,0, CANVAS_WIDTH,CANVAS_HEIGHT);
 
}
resetBtn.addEventListener("click",onResetClick)

//ERASE
function onEraserClick(event){
    ctx.strokeStyle="white";
    isFilling=false;
    modeBtn.innerText="Fill";
}
eraseBtn.addEventListener("click",onEraserClick);
//IMG
function onFileChange(event){
    const file = event.target.files[0]
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0,0 ,CANVAS_WIDTH, CANVAS_HEIGHT)
        fileInput.value = null;
    };
}
fileInput.addEventListener("change",onFileChange)

//TEXT
