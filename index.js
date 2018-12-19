//Load the images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "assets/bird.png";
bg.src = "assets/bg.png";
fg.src = "assets/fg.png";
pipeNorth.src = "assets/pipeNorth.png";
pipeSouth.src = "assets/pipeSouth.png";
//Variables
var cvs;
var ctx;
var gap = 95;
var constant;

var bX = 10;
var bY = 150;

var gravity = 2;

var score = 0;
//Pipe
var pipe = [];

pipe[0] = {
    x : 288,
    y : 0
};
//Audio
var fly = new Audio();
var scoresnd = new Audio();

fly.src = "assets/fly.mp3";
scoresnd.src = "assets/score.mp3";
//Button press
document.addEventListener("keydown",moveUp);
function moveUp(){
    bY -= 45;
    fly.play();
}

//Drawing the images
function draw(){
    cvs = document.getElementById("canvas");
    ctx = cvs.getContext("2d");
    ctx.drawImage(bg,0,0);
    for(let i = 0; i < pipe.length; i++){
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
        pipe[i].x--;
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }
        //Collision
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload()
        }
        if(pipe[i].x == 5){
            score++;
            scoresnd.play();
        }
    }
    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
}

draw()