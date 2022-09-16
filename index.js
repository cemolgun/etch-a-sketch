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

howManyDivs = 24;
drawGrid(howManyDivs);

// Mouse ilk click ve basılı tutup sürükleme için birkaç ayar + event listener

mouseDown=false;
canvas.addEventListener("mousedown",function(){mouseDown=true;})
document.querySelector("body").addEventListener("mouseup",function(){mouseDown=false;})

listenEvents();

//Değişkenler
color = "#000";
colorHolder = "#000";
rainbowMode = false;
eraseMode = false;

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

function listenEvents(){
    subDiv = document.querySelectorAll(".subDiv");
    subDiv.forEach(div => {
        div.addEventListener("mouseover",paint.bind(this,div));
        div.addEventListener("mousedown",paint.bind(this,div,1)); //ekstra argüman kullanmadan çözemedim :/
        //Burayı github'dan aldım mouseover efektini touch için kullandığını iddia ediyor    
        //this.gameGrid is a parent element for the checkboxes
        div.addEventListener("touchmove", function(e, div) {
            // get the touch element
            var touch = e.touches[0];

            // get the DOM element
            var checkbox = document.elementFromPoint(touch.clientX, touch.clientY);

            // make sure an element was found - some areas on the page may have no elements
            if (checkbox) {
                // interact with the DOM element
                paint(div,1);
            }
        });
    });
}
function paint(div){
    if (mouseDown==true || arguments[1] == 1){
        if (eraseMode == true){
            div.style.backgroundColor = `#fff`;
            return;
        }
        if (rainbowMode==true){
            div.style.backgroundColor = `${rainbow()}`;
            return;
        }
        div.style.backgroundColor = `${color}`;
    }
}

sktch = document.getElementById("bSketch");
erase = document.getElementById("bErase");

function sketchButton(){
    eraseMode=false;
    color=colorHolder;
    erase.disabled=false;
    sktch.disabled=true;
}
function eraseButton(){
    eraseMode=true;
    erase.disabled=true;
    sktch.disabled=false;
}
function cleanButton(){
    canvasArray.forEach(div => {
        div.style.backgroundColor="#fff";        
    });
}

function setCanvas(){

    if (howManyDivs==Number(document.querySelector("input").value)) return;

    howManyDivs=Number(document.querySelector("input").value);
    if (howManyDivs>100) {
        howManyDivs=100;
        document.querySelector("input").value = 100;
    }
    canvasArray.forEach(element => {
        element.remove();
    });
    drawGrid(howManyDivs);
    listenEvents();
}

function setColor(){
    document.querySelector(".popup").style.display="block";
}
function rainbow(){
    rainbowMode=true;
    document.querySelector(".popup").style.display="none";

    r=String(Math.floor(Math.random()*255));
    g=String(Math.floor(Math.random()*255));
    b=String(Math.floor(Math.random()*255));

    return "rgb("+r+","+g+","+b+")";
}
function solid(mode){
    rainbowMode=false;
    document.querySelector(".popup").style.display="none";
    switch (mode){
        case 2:
            color="#f00";
            break;
        case 3:
            color="#0f0";
            break;
        case 4:
            color="#00f";
            break;
        case 5:
            color="#ff0";
            break;
        default:
            color="#000";
            break;
    }
}