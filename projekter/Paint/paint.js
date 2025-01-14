const canvas = document.getElementById("drawing-board");
const tools = document.getElementById("tool-box");
const pen = document.getElementById("pencil");
const eraser = document.getElementById("eraser");
const canvasDownload = document.getElementById("save");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let background = document.getElementById("background-Selector");
let color = document.getElementById("color-Selector");
let lineWidth = document.getElementById("width-Selector");
let isDrawing = false;

function startPosition(e) {
    isDrawing = true;
    // Get the canvas's bounding rectangle 
    //Gets the size and position of the canvas relative to the viewport
    const rect = canvas.getBoundingClientRect();
    // Calculate scaling factors to account for any CSS scaling
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    // Calculate the mouse position relative to the canvas, accounting for scaling
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    // Start a new path and move to the current position
    ctx.beginPath();
    ctx.moveTo(x, y);
    //Calls function draw(e)
    draw(e);
}

function endPosition() {
    //Sets isDrawing to false
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    // If not currently drawing, exit the function
    if (!isDrawing) return;
    
    // Get the canvas's bounding rectangle
    //Gets the size and position of the canvas relative to the viewport
    const rect = canvas.getBoundingClientRect();
    // Calculate scaling factors to account for any CSS scaling
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Calculate the mouse position relative to the canvas, accounting for scaling
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    // Set drawing properties
    ctx.strokeStyle = color.value;  // Set line color
    ctx.lineWidth = lineWidth.value;  // Set line width
    ctx.lineCap = 'round';  // Set line end style to round
    
    // Draw a line to the current mouse position
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Start a new path and move to the current position
    ctx.beginPath();
    ctx.moveTo(x, y);
}

//Eventlisteners waits for a event and then calls a function 
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseout", endPosition);
background.addEventListener("change", e => {
    document.getElementById("drawing-board").style.backgroundColor = background.value;
})

function activatePen() {
    //Set the compositing operation to "source-over", 
    //this makes new drawings go on top of the old drawing
    ctx.globalCompositeOperation = "source-over";
    //Sets the stroke style to the color-selectors value
    ctx.strokeStyle = color.value;
    //Makes the pen button be the only active
    eraser.classList.remove("active");
    pen.classList.add("active");
}

function activateEraser() {
    //Sets the compositing operation to "destination-out, 
    //this makes it erases the existing content where the new shapes are drawn"
    ctx.globalCompositeOperation = "destination-out";
    //Sets the strokeStyle to transparrent
    ctx.strokeStyle = "rgba(0, 0, 0, 0)";
    //Makes the eraser button be the only active
    pen.classList.remove("active");
    eraser.classList.add("active");
}

function clearBoard() {

    //Clears the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Sets the background back to white
    document.getElementById("drawing-board").style.backgroundColor = "rgb(255, 238, 238)";
    background.value = "#FFFFFF";
}

function saveCanvasAsImage() {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    //Draw background
    tempCtx.fillStyle = canvas.style.backgroundColor || 'white';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    //Draw canvas content
    tempCtx.drawImage(canvas, 0, 0);

    //Downloads the canvas
    const link = document.createElement('a');
    link.download = 'canvas-drawing.png';
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
}

canvasDownload.addEventListener('click', saveCanvasAsImage);