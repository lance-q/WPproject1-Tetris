var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//二维数组
var rows = 10;
var cols = 10;
var board = [];
for (var i = 0; i < rows; i++) {
  board[i] = [];
  for (var j = 0; j < cols; j++) {
    board[i][j] = 0;
  }
}
//console.log(matrix);


function draw(){
    ctx.clearRect(0, 0, 300, 150); // Clear the canvas
    //draw grid

    // 定义棋盘格子的大小和颜色
    var gridSize = 50;
    var lightColor = '#f0d9b5';
    var darkColor = '#b58863';
  
    // 绘制棋盘格子的函数
    function drawChessboard() {
      for (var row = 0; row < canvas.height / gridSize; row++) {
        for (var col = 0; col < canvas.width / gridSize; col++) {
          if ((row + col) % 2 === 0) {
            ctx.fillStyle = lightColor;
          } else {
            ctx.fillStyle = darkColor;
          }
          ctx.fillRect(col * gridSize, row * gridSize, gridSize, gridSize);
        }
      }
    }
  
    // 初始绘制
    drawChessboard();
  
    //draw board
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
          if(board[i][j] != 0){
            //fill
          }
        }
      }
    //draw (falling) object
    //draw();
}

function ifcolli(){
if(){

}
}

function iffail(){

}