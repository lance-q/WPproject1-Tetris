//100*200
const canvas = document.getElementById("canvas");
const ctx = canvas.getContsxt("2d");
const delay=5;
var photogram=0;

//type(angle=0)
//1 ****    2 **    3 **   4 **
//            **      *       *
//                    *       *
//
//5 **      6 **    7  *
//   **      **       ***

//2-d board
var row = 20;
var col = 10;
var board = [];
for (var i = 0; i < row; i++) {
  board[i] = [];
  for (var j = 0; j < col; j++) {
    board[i][j] = 0;
  }
}

//shape
var Shape = 
[
    [],//type0 has no shape
    [[-1,0],[0,0],[1,0],[2,0]],
    [[0,0],[0,1],[1,0],[1,1]],
    [[-1,0],[0,0],[1,0],[1,-1]],
    [[-1,-1],[-1,0],[0,0],[1,0]],
    [[-1,1],[0,1],[0,0],[1,0]],
    [[-1,-1],[0,-1],[0,0],[1,0]],
    [[-1,0],[0,0],[0,1],[1,0]]
];

//class
var data=[[], [], [], []];
var obj_falling = function()
{
    this.x=3;
    this.y=0;
    this.type=Math.floor(Math.random()*7)+1;
    this.shape=Shape[this.type];
    //this.color=Color[this.type];

    this.move = function(key)
    {
        switch(key.keyCode)
        {
            case 37:
                if(this.x>0) {this.x-=10;} break;
            case 39:
                if(this.x<90) {this.x+=10;} break;
        }
    }

    this.fall = function()
    {
        if(photogram == delay)
        {photogram=0; this.y++;}
    }

    this.rotate = function(key)
    {
        if(key.keyCode == 38)
        {
            var tmp=[[], [], [], []];
            for(let i=0; i<4; i++)
            {
                tmp[i][0]=data[i][1];
                tmp[i][1]=-data[i][0];
            }
            if(checkCol(tmp) == 1)
            {for(let i=0; i<4; i++)
                {
                    data[i][0]=tmp[i][0];
                    data[i][1]=tmp[i][1];
                }
            }
        }
    }

    this.draw = function()
    {
        location=translate(this.x,this.y,data);
        for(i=0;i<4;i++)
        {
            drawSquare(location[i][0]*10,location[i][1]*10);
        }
    }
}

function translate(x,y,local)//2-dimensional directly transport(?)
{
    var global=[];
    
    for(let i=0; i<4; i++)
        {
            global[i][0]=local[i][0]+x;
            global[i][1]=local[i][1]+y;
        }

    return global;
}

function checkCol(local)
{   
    var next=translate(x,y,local);
    var flag=1,i=0;
    do{
        var sx=next[i][0],sy=next[i][1];
        if(board[sx][sy]==1)
        {
            flag=0;
        }
        i++;

    }while(flag==1 && i<4)
    return flag
}

//keydown
document.addEventListener("keydown", obj_falling.rotate);

//clear line
function clearline(i) {
    for (let j = 0; j < 10; j++) {
        board[i][j] = 0;
    }
    for (let j = i; j > 0; j--) {
        for (let k = 0; k < 10; k++) {
            board[j][k] = board[j - 1][k];
        }
    }
}
function checkline() {
    for (let i = 0; i < 20; i++) {
        let fullLine = true;
        for (let j = 0; j < 10; j++) {
            if (board[i][j] == 0) {
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
function drawSquare(x,y)
{
    ctx.beginPath();
    ctx.fillRect(x+1,y+1,8,8);
    ctx.stroke();
}
function drawMap()
{
    ctx.beginPath();
    for(let i=0; i<=100; i+=10)
    {
        ctx.moveTo(i,0);
        ctx.lineTo(i,200);
        ctx.stroke();   
    }

    for(let i=0; i<=200; i+=10)
        {
            ctx.moveTo(0,i);
            ctx.lineTo(100,i);
            ctx.stroke();
        }
}
function drawBoard()
{
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
          if(board[i][j] != 0){
            drawSquare(j*10,i*10);
          }
        }
      }    
}

function drawAll(){
    ctx.clearRect(0, 0, 100, 200); // Clear the canvas
    drawMap();
    drawBoard();
    //draw (falling) object
    obj_falling. draw(); 
}

function resetblock(){
    let colFlag = false;
    for(let i=0;i<4;i++){
        if(board[data[i][0]+y+1][data[i][1]+x] == 1){
            colFlag = true;
        }
    }
    if(colFlag){
        for(let i=0;i<4;i++){
            board[data[i][0]+y][data[i][1]+x] = 1;
        }
        delete block;
        block=new obj_falling();
    }
}

function initialize()
{
    //create a block
    block=new obj_falling();

    //listen to the keyboard
    document.addEventListener("keydown", block.rotate);
    document.addEventListener("keydown", bolck.move);

    setInterval(function(){main();}, 100);
}

function main()
{
    drawAll();
    
    //if a block falls to the bottom, create a new one

    
    photogram++;
}