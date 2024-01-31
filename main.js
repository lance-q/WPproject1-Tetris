//100*200
const canvas = document.getElementById("canvas");
const ctx = canvas.getContsxt("2d");

//type+shape
//1 ****    2 **    3 ***   4 ***
//            **        *     *
//                           
//5 **      6 **    7  *
//   **      **       ***

const delay=5;
var photogram=0;

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
            if(checkCol() == 1)
            {for(let i=0; i<4; i++)
                {
                    data[i][0]=tmp[i][0];
                    data[i][1]=tmp[i][1];
                }
            }
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

function checkCol(global)//return 0: cannot move
{
    for(let i=0; i<4; i++)
    {
        if(map[global[i][0]][global[i][1]] == 1)//There already exists a block
        {return 0;}
    }

    return 1;
}

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

function initialize()
{
    //create a block
    block=new obj_falling();

    //listen to the keyboard
    document.addEventListener("keydown", block.rotate(key));
    document.addEventListener("keydown", bolck.move(key));

    setInterval(function(){main();}, 100);
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
function main()
{
    drawAll();
    
    //if a block falls to the bottom, create a new one

    
    photogram++;
}

