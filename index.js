//Canvas'ın boyutunu ayarlayan kısım

header_height = document.querySelector("header").offsetHeight;
konteyner_height = document.querySelector(".konteyner").offsetHeight;
headerH1_width = document.querySelector("header h1").offsetWidth;

canvasDiv = document.querySelector("#canvas");

emptyHeight = window.innerHeight - (header_height + (2*konteyner_height));
canvasSize = emptyHeight*0.95;
if (canvasSize>window.innerWidth) {canvasSize= window.innerWidth*0.9;}

canvasDiv.style = `height:${canvasSize}px; width:${canvasSize}px;`;

//Canvas'ın subDiv'lerini çiziyoruz

howManyDivs = 24;
drawGrid(howManyDivs);

// Mouse ilk click ve basılı tutup sürükleme için birkaç ayar + event listener

isClicking = false;
document.body.addEventListener("mouseup",function(){isClicking=false;})
canvasDiv.addEventListener("mousedown",function(){isClicking=true;})
canvasDiv.addEventListener("touchmove", e =>{
    e.preventDefault();  //Zoom, büyütme vs engelliyor.
    x = e.targetTouches[0].pageX;
    y = e.targetTouches[0].pageY;
    touchElement = document.elementFromPoint(x, y);
    if (canvasDiv.contains(touchElement)){
        paint(touchElement);
    }

});
updateEventListener();

//Değişkenler
color = "#000";
colorHolder = "#000";
rainbowMode = false;
eraseMode = false;

max_div = Math.floor(canvasDiv.offsetWidth/6); //min 6px

function drawGrid(size){
    canvasArray = [];
    blockSize = canvasSize/size;
    for (let i=1;i<1+(size*size);i++){
        canvasArray[i] = document.createElement("div")
        canvasArray[i].classList.add("subDiv");
        canvasArray[i].style = `width:${blockSize}px; height:${blockSize}px;`;
        canvasArray[i].style.backgroundColor="#ffffff";
        canvasDiv.append(canvasArray[i]);
        if (i%size==0 && i != 0){canvasDiv.append(document.createElement("BR"));}
    }
}

function updateEventListener(){
    subDiv = document.querySelectorAll(".subDiv");
    subDiv.forEach(div => {
    
        div.addEventListener("click",paint.bind(this,div));
        div.addEventListener('pointerover', (event) => {
            // Call the appropriate pointer type handler
            switch (event.pointerType) {
              case 'mouse':
                if (isClicking == true) paint(div);
                break;
              case 'pen':
                paint(div);
                break;
              case 'touch':
                paint(div);
                break;
              default:
                console.log(`pointerType ${event.pointerType} is not supported`);
            }
          }, false);

    });
}
function paint(div){
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
    if (howManyDivs>max_div) {
        howManyDivs=max_div;
        document.querySelector("input").value = max_div;
    }
    canvasArray.forEach(element => {
        element.remove();
    });
    drawGrid(howManyDivs);
    updateEventListener();
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

function saveImage(){

    //if(document.body.contains(document.querySelector("canvas"))){img.prepend()};

    imageMultiplier=Number(window.prompt("1 square = ... pixels: "));
    if (imageMultiplier == NaN){
        saveImage();
        return;12
    }

    const img = document.createElement("canvas");
    const ctx = img.getContext("2d");

    img.height=howManyDivs*imageMultiplier;
    img.width=howManyDivs*imageMultiplier;

    x=0;
    y=0;

    for(let i=0; i<howManyDivs*howManyDivs;i++){

        fillColor=canvasArray[i+1].style.backgroundColor;
        x = i%howManyDivs;
        if(i!=0 && x==0){y++};

        ctx.fillStyle=fillColor;
        ctx.fillRect(x*imageMultiplier,y*imageMultiplier,1*imageMultiplier,1*imageMultiplier);

    }
    document.querySelector("#imgDiv").append(img);
    document.querySelector("#imgDiv").append(document.createElement("BR"));
    downloadButton = document.createElement("button")
    downloadButton.onclick = function(){download(img)};
    downloadButton.textContent="DOWNLOAD";
    document.querySelector("#imgDiv").append(downloadButton);
    document.querySelector("#imgDiv").append(document.createElement("BR"));
}
function download(img){
    const imageLink = document.createElement("a");
    imageLink.download="drawing.png";
    imageLink.href = img.toDataURL("image/png",1);
    imageLink.click();
}