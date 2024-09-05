let gameContainer = document.querySelector(".game_container")
let scorecontainer = document.querySelector(".score_container")
let foodX,foodY;

let headX=12,headY=12;
let velocityX=0,velocityY=0;

let snakebody = [];
let score=0;


function generateFood(){
    foodX = Math.floor(Math.random()*25) +1;
    foodY = Math.floor(Math.random()*25) +1;
    for(let i=0;i<snakebody.length;i++){
        if(snakebody[i][1] == foodY && snakebody[i][0] == foodX){
            generateFood();
            
        }
    }
    
}
function gameover(){
    headX=12;
    headY=12;
    generateFood();
    velocityX=0;
    velocityY=0;
    snakebody = [];
    score=0;
    scorecontainer.innerHTML = "Score :" + score;
    alert("Game Over");
}

function renderGame(){
    console.log("Rendered "); 
    let updatedGame = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`

    if(foodX==headX && foodY==headY){
        snakebody.push([foodX,foodY]);
        generateFood();
        score+=10;
        scorecontainer.innerHTML = "Score :" + score;
    }

    snakebody.pop();
    headX += velocityX;
    headY += velocityY;
    snakebody.unshift([headX,headY]);
    if(headX==0 ||headY==0 || headX==26 ||headY==26){
        gameover();
    }
    for(let i=1;i<snakebody.length;i++){
        if(snakebody[0][0] == snakebody[i][0] && snakebody[0][1] == snakebody[i][1]){
            gameover();
        }
    }

    for(let i=0;i<snakebody.length;i++){
        updatedGame += `<div class="snake" style="grid-area: ${snakebody[i][1]}/${snakebody[i][0]};"></div>`
    }

    gameContainer.innerHTML = updatedGame;
}
generateFood();
setInterval(renderGame,200);

document.addEventListener("keydown",function(e){
    console.log(e.key);
    let key = e.key;
    if(key=="ArrowUp"  && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }
    else if(key=="ArrowDown" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }
    else if(key=="ArrowLeft" && velocityX!=1){
        velocityY=0;
        velocityX=-1;
    }
    else if(key=="ArrowRight" && velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }

});