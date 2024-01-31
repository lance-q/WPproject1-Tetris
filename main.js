//100*200
const canvas = document.getElementById("canvas");
const ctx = canvas.getContsxt("2d");

//type
//1 ****    2 **    3 **   4 **
//            **      *       *
//                    *       *
//5 **      6 **    7  *
//   **      **       ***

var data=[[], [], [], []];
var obj_falling = function()
{
    this.x=3;
    this.y=0;
    this.type=Math.floor(Math.random()*7)+1;
    this.shape=Shape[this.type];
    //this.color=Color[this.type];

    this.move(key)
    {
        switch(key.keyCode)
        {
            case 37:
                if(x>0) {x-=10;} break;
            case 39:
                if(x<90) {x+=10;} break;
        }
    }

    this.fall()
    {
        y+=10;
    }

    this.rotate(key)
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

    draw()
    {
        
    }
}

document.addEventListener("keydown", obj_falling.rotate(key));


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
