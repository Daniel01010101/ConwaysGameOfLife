let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
window.onload = function() {
    initialise();
};

let running;
let grid;
let canvasDimension = 500;
let cellDimensions = 10;
let cellsPerLine = canvasDimension/cellDimensions;
let numberOfGridCells = cellsPerLine*cellsPerLine;

function initialise(){
    grid = createGrid(numberOfGridCells);
    setGridStartTemplate(grid);
    console.log("OnLoad");
}

function start(){
    running = setInterval(function(){populateGrid();}, 300);
    console.log("Started");
} 

function stop(){
    clearInterval(running);
    console.log("Stopped");
}

function populateGrid(){
    if(grid != null){
        grid.forEach(cell => {
            drawCell(cell);
        });
        console.log("Populate");
    }
    else{
        console.log("Bad Grid");
    }
}

function createGrid(numberOfGridCells){
    let grid = new Array(numberOfGridCells);
    let x = 0;
    let y = 0;
    //let cellLiveState = false;

    for (var i = 0; i < grid.length; i++) {
        grid[i] = new Array(3);
        grid[i][0] = x;
        grid[i][1] = y;
        grid[i][2] = false;

        x += cellDimensions;

        if(x == canvasDimension){
            x = 0;
            y += cellDimensions;           
        }
    }

    return grid;
}

function drawCell(cell){
    if(cell[2]){   
        ctx.beginPath();
        ctx.rect(cell[0],cell[1],cellDimensions,cellDimensions);
        ctx.fill();
    }
}

function clearGrid(){
    ctx.clearRect(0, 0, c.width, c.height); 
}

function setGridStartTemplate(grid){
    grid[1225][2] = true;
    grid[1274][2] = true;
    grid[1275][2] = true;
    grid[1276][2] = true;
    grid[1375][2] = true;
}

// function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
// }

// function drawGridOutline(){
//     let c = document.getElementById("myCanvas");
//     let ctx = c.getContext("2d");

//     ctx.fillStyle="#FF0000";
//     ctx.fillRect(0,20,150,100);
// }

// function drawRandomLines() {
//     let c = document.getElementById("myCanvas");
//     let ctx = c.getContext("2d");
    
//     for(let i =1; i < 10; i++){
        
//         ctx.beginPath();
//         ctx.moveTo(getRandomInt(canvasDimension), getRandomInt(canvasDimension));
//         ctx.lineTo(getRandomInt(canvasDimension), getRandomInt(canvasDimension));
//         ctx.stroke();
//     }
//     ctx.closePath();
// }

// function setIntervalX(callback, delay, repetitions) {
//     var x = 0;
//     running = setInterval(function () {

//        callback();

//        if (++x === repetitions) {
//            clearInterval(running);
//        }
//     }, delay);
// }