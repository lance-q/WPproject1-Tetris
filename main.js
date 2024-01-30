//100*200
const canvas = document.getElementById("canvas");
const ctx = canvas.getContsxt("2d");

//type(angle=0)
//1 ****    2 **    3 **   4 **
//            **      *       *
//                    *       *
//5 **      6 **    7  *
//   **      **       ***


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
        
    }
}

document.addEventListener("keydown", obj_falling.rotate(key));




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
