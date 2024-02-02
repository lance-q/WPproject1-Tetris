//100*200
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const preview = document.getElementById("preview");
const ctx_preview = preview.getContext("2d");

var score = document.getElementById('score');
var TIMER = document.getElementById('timer');
var time = 0;
var sco = 0;
var bonus = -1;
var FPS = 100;
var isStart = 0;
var isPause = 0;
var gameInterval;
var delay = 50;
var photogram = 0;
var nextBlock;

//type(angle=0)
//1 ****    2 **    3 **   4 **
//            **      *       *
//                    *       *
//
//5 **      6 **    7  *
//   **      **       ***

//create 2-d board
var row = 20;
var col = 10;
var board = [];
var board_color = [];
//board initialization is moved into function"initialize" to reset the game

//shape
var Shape =
    [
        [],//type0 has no shape
        [[-1, 0], [0, 0], [1, 0], [2, 0]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[-1, 0], [0, 0], [1, 0], [1, -1]],
        [[-1, -1], [-1, 0], [0, 0], [1, 0]],
        [[-1, 1], [0, 1], [0, 0], [1, 0]],
        [[-1, -1], [0, -1], [0, 0], [1, 0]],
        [[-1, 0], [0, 0], [0, -1], [1, 0]]
    ];

//color
var Color =
    [
        "#000000",
        "#FFADAD",
        "#FFD6A5",
        "#FDFFB6",
        "#CAFFBF",
        "#9BF6FF",
        "#A0C4FF",
        "#FFC6FF"
    ]

//class
var data = [[], [], [], []];
var obj_falling = function () {
    this.x = 4;
    this.y = -1;
    this.type = Math.floor(Math.random() * 7) + 1;
    data = Shape[this.type];
    //this.color=Color[this.type];

    this.fall = function () {
        if (photogram >= delay) { photogram = 0; this.y++; }
    }

    this.draw = function () {
        let location = translate(this.x, this.y, data);
        for (let i = 0; i < 4; i++) {
            drawSquare(location[i][0] * 30, location[i][1] * 30, this.type);
        }
    }
}

function translate(x, y, local)//2-dimensional directly transport(?)
{
    var global = [[], [], [], []];
    for (let i = 0; i < 4; i++) {
        //global[i] = [];
        global[i][0] = local[i][0] + x;
        global[i][1] = local[i][1] + y;
    }

    return global;
}

function checkCol(block, local) {
    var global = translate(block.x, block.y, local);
    var flag = 1, i = 0;
    do {
        var sx = global[i][0], sy = global[i][1];
        if (board[sx][sy] == 1) {
            flag = 0;
        }
        else if (sx > col || sx < 0) {
            flag = 0;
        }
        i++;
    } while (flag == 1 && i < 4)
    return flag;
}


//clear line
function clearline(i) {
    for (let j = 0; j < 10; j++) {
        board[j][i] = 0;
    }
    for (let j = i; j > 0; j--) {
        for (let k = 0; k < 10; k++) {
            board[k][j] = board[k][j - 1];
        }
    }
}

function checkline() {
    for (let i = 0; i < 20; i++) {
        let fullLine = true;
        for (let j = 0; j < 10; j++) {
            if (board[j][i] == 0) {
                fullLine = false;
                break;
            }
        }
        if (fullLine) {
            clearline(i);
            bonus++;
        }
    }
}

//draw a single square
function drawSquare(x, y, colorType) {
    ctx.beginPath();
    ctx.fillStyle = Color[colorType];
    ctx.fillRect(x + 2, y + 2, 26, 26);
    ctx.stroke();
}

function drawSquare_preview(x, y, colorType) {
    ctx_preview.beginPath();
    ctx_preview.fillStyle = Color[colorType];
    ctx_preview.fillRect(x + 2, y + 2, 26, 26);
    ctx_preview.stroke();
}

function drawMap() {
    ctx.beginPath();
    for (let i = 0; i <= 300; i += 30) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.stroke();
    }

    for (let i = 0; i <= 600; i += 30) {
        ctx.moveTo(0, i);
        ctx.lineTo(300, i);
        ctx.stroke();
    }
}

function drawBoard() {
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            if (board[i][j] != 0) {
                drawSquare(i * 30, j * 30, board_color[i][j]);
            }
        }
    }
}

function drawNext() {
    let Shape_preview =
    [
        [],//type0 has no shape
        [[-1, 0], [0, 0], [1, 0], [2, 0]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[-1, 0], [0, 0], [1, 0], [1, -1]],
        [[-1, -1], [-1, 0], [0, 0], [1, 0]],
        [[-1, 1], [0, 1], [0, 0], [1, 0]],
        [[-1, -1], [0, -1], [0, 0], [1, 0]],
        [[-1, 0], [0, 0], [0, -1], [1, 0]]
    ];
    
    let tmp = translate(1, 1, Shape_preview[nextBlock]);

    for (let i = 0; i < 4; i++) {
        drawSquare_preview(tmp[i][0] * 30, tmp[i][1] * 30, nextBlock);
    }
}

function drawAll(block) {
    ctx.clearRect(0, 0, 300, 600); // Clear the canvas
    ctx_preview.clearRect(0, 0, 120, 120);
    drawMap();
    drawBoard();
    drawNext();
    //draw (falling) object
    block.draw();
}

function resetblock(block) {
    let colFlag = false;

    for (let i = 0; i < 4; i++) {
        if (photogram >= 4 && ((board[data[i][0] + block.x][data[i][1] + block.y + 1] == 1) || data[i][1] + block.y + 1 == row)) {
            colFlag = true;
        }
    }

    if (colFlag) {
        for (let i = 0; i < 4; i++) {
            board[data[i][0] + block.x][data[i][1] + block.y] = 1;
            board_color[data[i][0] + block.x][data[i][1] + block.y] = block.type;
        }

        // delete block;
        block.x = 4;
        block.y = -1;
        block.type = nextBlock;
        data = Shape[block.type];

        nextBlock = Math.floor(Math.random() * 7) + 1;
    }
}

function fail() {
    for (let i = 0; i < col; i++) {
        if (board[i][0] == 1) {
            alert("GAME OVER");
            restart();
        }
    }
}

function restart() {
    block = new obj_falling();
    time = 0;
    sco = 0;

    for (let i = 0; i < col; i++) {
        board[i] = [];
        for (let j = 0; j < row; j++) {
            board[i][j] = 0;
        }
    }
}

function startGame() {
    if (isStart == 0) { isStart = 1; initialize(); }
}

function initialize() {
    //create a block
    block = new obj_falling();
    nextBlock = Math.floor(Math.random() * 7) + 1;

    for (let i = 0; i < col; i++) {
        board[i] = [];
        board_color[i] = [];
        for (let j = 0; j < row; j++) {
            board[i][j] = 0;
        }
    }

    gameInterval = setInterval(function () { main(block); }, 1000 / FPS);

    //listen to the keyboard
    //rotate
    document.addEventListener("keydown", function (key) {
        if (key.keyCode == 38) {
            var tmp = [[], [], [], []];
            for (let i = 0; i < 4; i++) {
                tmp[i][0] = data[i][1];
                tmp[i][1] = -data[i][0];
            }

            if (checkCol(block, tmp) == 1) {
                for (let i = 0; i < 4; i++) {
                    data[i][0] = tmp[i][0];
                    data[i][1] = tmp[i][1];
                }
            }
        }
    });

    //move
    document.addEventListener("keydown", function (key) {
        switch (key.keyCode) {
            case 37:
                var tmp = [[], [], [], []];
                for (let i = 0; i < 4; i++) {
                    tmp[i][0] = data[i][0] - 1;
                    tmp[i][1] = data[i][1];
                }

                if (checkCol(block, tmp) == 1) { block.x -= 1; } break;
            case 39:
                var tmp = [[], [], [], []];
                for (let i = 0; i < 4; i++) {
                    tmp[i][0] = data[i][0] + 1;
                    tmp[i][1] = data[i][1];
                }

                if (checkCol(block, tmp) == 1) { block.x += 1; } break;
        }
    });

    //speed up
    document.addEventListener("keydown", function (key) {
        if (key.keyCode == 40) {
            photogram = delay;
        }
    })

    //pause
    document.addEventListener("keydown", function (key) {
        if (key.keyCode == 32)//32 is space
        {
            if (isPause == 1) {
                isPause = 0;
                gameInterval = setInterval(function () { main(block); }, 1000 / FPS);
            }
            else {
                isPause = 1;
                clearInterval(gameInterval);
            }
        }
    });

    drawAll(block);

}

function main(block) {
    //delay = delay - Math.floor(sco / 10);
    //delay = 5 * Math.pow(0.8, Math.floor(sco / 50));
    drawAll(block);
    fail();
    checkline();

    if (bonus != -1) {
        sco = sco + 10 * Math.pow(3, bonus);
        bonus = -1;
    }
    score.innerHTML = sco;
    TIMER.innerHTML = time.toFixed(2);
    time += 0.01;

    //if a block falls to the bottom, create a new one
    resetblock(block);
    block.fall();
    photogram++;
}


function askForNameAndGreet() {
    var name = prompt("Please Enter Your Name:");

    if (name === null || name.trim() === "") {
        alert("Hello!");
    } else {
        var greetingMessage = document.getElementById('greetingMessage');
        greetingMessage.textContent = "Hello! " + name + "! This is Tetris!";
    }
}
askForNameAndGreet();
