//100*200
const canvas = document.getElementById("canvas");
const ctx = canvas.getContsxt("2d");

//keydown
document.addEventListener("keydown", obj_falling.rotate(key));

//type(angle=0)
//1 ****    2 **    3 **   4 **
//            **      *       *
//                    *       *
//5 **      6 **    7  *
//   **      **       ***

//class
class obj_falling
{
    constructor()
    {
        this.type=Math.floor(Math.random()*7)+1;
        this.shape=Shape[this.type];
        this.angle=0;
        //this.color=Color[this.type];
        this.x=40;
        this.y=0;
    }

    move(key)
    {
        switch(key.keyCode)
        {
            case 37:
                if(x>0) {x-=10;} break;
            case 39:
                if(x<90) {x+=10;} break;
        }
    }

    fall()
    {
        y+=10;
    }

    rotate(key)
    {
        if(key.keyCode == 38)
        {
            angle+=90;//clockwise
            if(angle == 360) {angle=0;}
        }
    }

    draw()
    {
        for(i=0;i<4;i++)
        {

        }
    }
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
    draw();
}


function ifcolli(){
    if(){

    }
}

function iffail(){

}