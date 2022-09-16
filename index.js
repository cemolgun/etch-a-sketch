header_height = document.querySelector("header").offsetHeight;
konteyner_height = document.querySelector(".konteyner").offsetHeight;
headerH1_width = document.querySelector("header h1").offsetWidth;

canvas = document.querySelector("#canvas");

emptyHeight = window.innerHeight - (header_height + (2*konteyner_height));
canvasSize = emptyHeight*0.95;
if (canvasSize>window.innerWidth) {canvasSize= window.innerWidth*0.9;}

canvas.style = `height:${canvasSize}px; width:${canvasSize}px;`;