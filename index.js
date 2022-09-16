//Canvas'ın boyutunu ayarlayan kısım

header_height = document.querySelector("header").offsetHeight;
konteyner_height = document.querySelector(".konteyner").offsetHeight;
headerH1_width = document.querySelector("header h1").offsetWidth;

canvas = document.querySelector("#canvas");

emptyHeight = window.innerHeight - (header_height + (2*konteyner_height));
canvasSize = emptyHeight*0.95;
if (canvasSize>window.innerWidth) {canvasSize= window.innerWidth*0.9;}

canvas.style = `height:${canvasSize}px; width:${canvasSize}px;`;

//Canvas'ın subDiv'lerini çiziyoruz

drawGrid(10)

//
mouseDown=false;
canvas.addEventListener("mousedown",function(){mouseDown=true;})
document.querySelector("body").addEventListener("mouseup",function(){mouseDown=false;})
subDiv = document.querySelectorAll(".subDiv");
subDiv.forEach(div => {
    div.addEventListener("mouseover",action.bind(this,div));
    div.addEventListener("mousedown",action.bind(this,div,1));
});

function drawGrid(size){
    canvasArray = [];
    blockSize = canvasSize/size;
    for (let i=1;i<1+(size*size);i++){
        canvasArray[i] = document.createElement("div")
        canvasArray[i].classList.add("subDiv");
        canvasArray[i].style = `width:${blockSize}px; height:${blockSize}px;`;
        canvas.append(canvasArray[i]);
        if (i%size==0 && i != 0){canvas.append(document.createElement("BR"));}
    }
}

function paintDiv(div, color){
    div.style.backgroundColor = `${color}`
}

function action(div){
    if (mouseDown==true || arguments[1] == 1){
    paintDiv(div,"black");
    }
}