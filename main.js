//100*200
const canvas = document.getElementById("canvas");
const ctx = canvas.getContsxt("2d");

//type(angle=0)
//1 ****    2 **    3 **   4 **
//            **      *       *
//                    *       *
//
//5 **      6 **    7  *
//   **      **       ***
//

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
                if(x>0) {x-=10;} break;
            case 39:
                if(x<90) {x+=10;} break;
        }
    }

    this.fall = function()
    {
        y+=10;
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
        location=translate(x,y,data);
        for(i=0;i++;i<4)
        {
            drawSquare(data[i][0]*10,data[i][1]*10);
        }
    }
}

//keydown
document.addEventListener("keydown", obj_falling.rotate(key));

//collision detect
function checkCol(x,y,orig)
{   
    next=translate(x,y,orig);
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

//translate
function translate(x,y,orig)//2-dimensional directly use(?)
{
    var tmp=[];
    
    for(let i=0; i<4; i++)
        {
            tmp[i][0]=orig[i][0];
            tmp[i][1]=orig[i][1];
        }

    return tmp;
}

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
        ctx.moveto(i,0);
        ctx.lineto(i,200);
        ctx.stroke();   
    }

    for(let i=0; i<=200; i+=10)
        {
            ctx.moveto(0,i);
            ctx.lineto(100,i);
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

function iffail(){

}