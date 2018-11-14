
window.onload = function () {
    initialise();
};

let c;
let ctx;
let running;
let grid;
let isInitialTick = true;
let canvasDimension = 500;
let cellDimensions = 10;
let cellsPerRow = canvasDimension / cellDimensions;
let numberOfGridCells = cellsPerRow * cellsPerRow;

function initialise() {
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    grid = createGrid(numberOfGridCells);
    setGridStartTemplate(grid);
    
    console.log("OnLoad");
}

function start() {

    if (isInitialTick) {
        initialise();
        
        console.log("InitTickInit");        
    }
    
    //running = setInterval(function(){populateGrid();}, 300);
    console.log("Started");
    populateGrid();
    isInitialTick = false;
}

function stop() {
    clearInterval(running);
    console.log("Stopped");
}

function clearGrid() {
    if(grid != null){
        ctx.clearRect(0, 0, c.width, c.height);
    }

    grid = null;     
    c = null;
    ctx = null;
    isInitialTick = true;

    console.log("Cleared");
}

function populateGrid() {
    if (grid != null) {

        // if (!isInitialTick) { // refactor check temp solution
        //     grid.forEach(cell => {
        //         determineFuture(cell);
        //         console.log("SecondTick");
        //     });
        // }
        
        if (!isInitialTick) { // refactor check temp solution
            determineFuture(grid[1225]);
            determineFuture(grid[1274]);
            determineFuture(grid[1275]);
            determineFuture(grid[1276]);
            determineFuture(grid[1375]);
            //grid[1225][2] = true;

            //console.log(grid[1375][2]);
            
            console.log("SecondTick");
        }
        //isInitialTick = false;

        //clearGrid();

        grid.forEach(cell => {
            drawCell(cell);
        });
        console.log(grid[1275][2]);
        console.log("Populate");
    } else {
        console.log("Bad Grid");
    }
}

function createGrid(numberOfGridCells) {
    let grid = new Array(numberOfGridCells);
    let x = 0;
    let y = 0;

    for (var i = 0; i < grid.length; i++) {
        grid[i] = new Array(4);
        grid[i][0] = x;
        grid[i][1] = y;
        grid[i][2] = false;
        assignCellCenterCoordinates(grid[i]);

        x += cellDimensions;

        if (x == canvasDimension) {
            x = 0;
            y += cellDimensions;
        }
    }

    return grid;
}

function drawCell(cell) {
    if (cell[2]) {
        ctx.rect(cell[0], cell[1], cellDimensions, cellDimensions);
        ctx.fill();
    }
}

function determineFuture(cell) {

    let neighbourImageData = getNeighbourImageData(cell);

    let numberOfAliveNeighbors = getNumberOfAliveNeighbors(neighbourImageData);

    console.log(neighbourImageData);
    console.log(numberOfAliveNeighbors);

    if (numberOfAliveNeighbors == 3) {
        cell[2] = true;
    } else if (numberOfAliveNeighbors < 3) {
        cell[2] = false;
    } else if (numberOfAliveNeighbors > 3) {
        cell[2] = false;
    }
}

function getNumberOfAliveNeighbors(imgDataArray) {
    let numberOfAliveNeighbors = 0;

    imgDataArray.forEach(data => {
        if (data[3] > 0) { // update to check rgb values
            numberOfAliveNeighbors++
        }
    });

    return numberOfAliveNeighbors;
}

function getNeighbourImageData(cell){
    let neighbourImageData = new Array();

    neighbourImageData.push(ctx.getImageData(cell[3][0], cell[3][1] + cellDimensions, 1, 1).data); // north neighbour
    neighbourImageData.push(ctx.getImageData(cell[3][0], cell[3][1] - cellDimensions, 1, 1).data); // south neighbour
    neighbourImageData.push(ctx.getImageData(cell[3][0] - cellDimensions, cell[3][1], 1, 1).data); // west neighbour
    neighbourImageData.push(ctx.getImageData(cell[3][0] + cellDimensions, cell[3][1], 1, 1).data); // east neighbour

    neighbourImageData.push(ctx.getImageData(cell[3][0] - cellDimensions, cell[3][1] + cellDimensions, 1, 1).data); // north-west neighbour
    neighbourImageData.push(ctx.getImageData(cell[3][0] + cellDimensions, cell[3][1] + cellDimensions, 1, 1).data); // north-east neighbour
    neighbourImageData.push(ctx.getImageData(cell[3][0] - cellDimensions, cell[3][1] - cellDimensions, 1, 1).data); // south-west neighbour
    neighbourImageData.push(ctx.getImageData(cell[3][0] + cellDimensions, cell[3][1] - cellDimensions, 1, 1).data); // south-east neighbour

    return neighbourImageData;
}

function setGridStartTemplate(grid) {
    grid[1225][2] = true;
    grid[1274][2] = true;
    grid[1275][2] = false;
    grid[1276][2] = true;
    grid[1375][2] = true;
}

function assignCellCenterCoordinates(cell) {
    cell[3] = new Array(2);
    cell[3][0] = (cell[0] + (cellDimensions / 2)); // cellCenterCoordinates(x)
    cell[3][1] = (cell[1] + (cellDimensions / 2)); // cellCenterCoordinates(y)
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