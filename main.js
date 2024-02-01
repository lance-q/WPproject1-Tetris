//100*200
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const delay = 5;
var photogram = 0;

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
for (var i = 0; i < col; i++) {
    board[i] = [];
    for (var j = 0; j < row; j++) {
        board[i][j] = 0;
    }
}

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
        [[-1, 0], [0, 0], [0, 1], [1, 0]]
    ];

//class
var data = [[], [], [], []];
var obj_falling = function () {
    this.x = 4;
    this.y = -1;
    this.type = Math.floor(Math.random() * 7) + 1;
    data = Shape[this.type];
    //this.color=Color[this.type];

    this.fall = function () {
        if (photogram == delay) { photogram = 0; this.y++; }
    }

    this.draw = function () {
        let location = translate(this.x, this.y, data);
        for (let i = 0; i < 4; i++) {
            drawSquare(location[i][0] * 10, location[i][1] * 10);
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

function checkCol(block,local) {
    var global=translate(block.x,block.y,local);
    var flag = 1, i = 0;
    do {
        var sx = global[i][0], sy = global[i][1];
        if (board[sx][sy] == 1) {
            flag = 0;
        }
        else if(sx > col || sx < 0)
        {
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
            board[k][j] = board[k][j-1];
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
        }
    }
}

//draw 小函数
//单个格子
function drawSquare(x, y) {
    ctx.beginPath();
    ctx.fillRect(x + 1, y + 1, 8, 8);
    ctx.stroke();
}
function drawMap() {
    ctx.beginPath();
    for (let i = 0; i <= 100; i += 10) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 200);
        ctx.stroke();
    }

    for (let i = 0; i <= 200; i += 10) {
        ctx.moveTo(0, i);
        ctx.lineTo(100, i);
        ctx.stroke();
    }
}

function drawBoard() {
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            if (board[i][j] != 0) {
                drawSquare(i * 10, j * 10);
            }
        }
    }
}

function drawAll(block) {
    ctx.clearRect(0, 0, 300, 600); // Clear the canvas
    drawMap();
    drawBoard();
    //draw (falling) object
    block.draw();
}

function resetblock(block) {
    let colFlag = false;

    for (let i = 0; i < 4; i++) {
        if ((board[data[i][0] + block.x][data[i][1] + block.y + 1] == 1) || data[i][1] + block.y + 1 == row) {
            colFlag = true;
        }
    }

    if (colFlag) {
        for (let i = 0; i < 4; i++) {
            board[data[i][0] + block.x][data[i][1] + block.y] = 1;
        }
        // delete block;
        block.x = 4;
        block.y = -1;
        block.type = Math.floor(Math.random() * 7) + 1;
        data = Shape[block.type];
    }
}

function initialize() {
    //create a block
    block = new obj_falling();
    console.log(block);

    //listen to the keyboard
    //rotate
    document.addEventListener("keydown", function(key){
        if (key.keyCode == 38)
        {
            var tmp = [[], [], [], []];
            for (let i = 0; i < 4; i++) {
                tmp[i][0] = data[i][1];
                tmp[i][1] = -data[i][0];
            }

            if (checkCol(block,tmp) == 1) {
                for (let i = 0; i < 4; i++) {
                    data[i][0] = tmp[i][0];
                    data[i][1] = tmp[i][1];
                }
            }
        }
    });

    //move
    document.addEventListener("keydown", function(key){
        switch (key.keyCode)
        {
            case 37:
                var tmp = [[], [], [], []];
                for (let i = 0; i < 4; i++) {
                    tmp[i][0] = data[i][0] - 1;
                    tmp[i][1] = data[i][1];
                }
                
                if (checkCol(block,tmp) == 1) { block.x -= 1; } break;
            case 39:
                var tmp = [[], [], [], []];
                for (let i = 0; i < 4; i++) {
                    tmp[i][0] = data[i][0] + 1;
                    tmp[i][1] = data[i][1];
                }

                if (checkCol(block,tmp) == 1) { block.x += 1; } break;
        }
    }
);

    drawAll(block);

    setInterval(function () { main(block); }, 100);

}

function main(block) {
    drawAll(block);
    
    //if a block falls to the bottom, create a new one
    resetblock(block);
    
    block.fall();
    photogram++;
}

