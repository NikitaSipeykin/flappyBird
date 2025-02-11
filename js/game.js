var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

var gap = 90;
var score = 0;

//bird position
var xPos = 10;
var yPos = 150;
var grav = 1.5;

//audio files
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

//when any button where pressed
document.addEventListener("keydown", moveUp);
function moveUp(){
  yPos -= 30;
  fly.play();
}

//blocks creating
var pipe = [];

pipe[0] = {
  x : cvs.width,
  y : 0
}

function draw(){
  ctx.drawImage(bg, 0, 0);

  for(var i = 0; i < pipe.length; i++){
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
  
  pipe[i].x--;

  if(pipe[i].x == 125){
    pipe.push({
      x : cvs.width,
      y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
    })
  }

  //check to impact
  if(xPos + bird.width >= pipe[i].x
    && xPos <= pipe[i].x + pipeUp.width
    && (yPos <= pipe[i].y + pipeUp.height
      || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
      || yPos + bird.height >= cvs.height - fg.height){
        location.reload(); //page reload
      }

      if(pipe[i].x == 5){
        score++;
        score_audio.play();
      }
    }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Score: " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

pipeBottom.onload = draw;