let osCounter = 0;
var playStatus = false;
var gameOverStatus = false;
var score = 0;
var disDragonX , disDragonY , disObstacleX, disObstacleXAfter, disObstacleY;
var clashInterval;
const man = document.querySelector(".man");
const obstacle = document.querySelector('.obstacle');
const startGamePage = document.querySelector(".startgame");
const ground = document.querySelector(".ground");
const road = document.querySelectorAll(".road");
const cloud = document.querySelectorAll(".cloud");
const pause = document.querySelector(".pauseScreen");
const scoreBoard = document.querySelector(".score");
const scoreText = document.querySelector(".scoreText");
const gamescreen = document.querySelector('.gamescreentext');
const textedit = document.querySelector('.textedit');
function manSlide(){
    man.src="images/slide.png";
        man.style.height="90px";
        if(disDragonX <= 200){
            setTimeout(() => {
                score += 5;
            }, 1000);
        }
        setTimeout(() => {
            man.src="images/run.gif";
            man.style.height="150px";
        }, 1000);
}
function manJump(){
    man.classList.add("jump");
        man.src="images/jump.png";
        man.style.height="130px";
        if(disObstacleX <= 200){
            osCounter++;
            setTimeout(() => {
                score++;
            }, 1000);
        }
        setTimeout(() => {
            man.style.height="150px";
            man.src="images/run.gif";
            man.classList.remove("jump");
        }, 1000);
}
function playGame(){
    setTimeout(() => {
        clashInterval = setInterval(checkClash, 10);
    }, 1500);
    playStatus = true;
    man.src="images/run.gif";
    man.style.height="150px";
    man.style.left="40%";
    ground.style.transform="translateX(0px) skew(-45deg)";
    cloud[0].style.animationName="anime2";
    cloud[1].style.animationName="anime2";   
    pause.style.display="none";
    for(let i=0; i < road.length; i++){
        road[i].style.animationName="anime";
    }
    startGamePage.style.display="none";
    scoreText.style.display="block";
}
function pauseGame(){
    playStatus = false;
    ground.style.transform="translateX(2000px)";
    cloud[0].style.animationName="null";
    cloud[1].style.animationName="null";   
    pause.style.display="flex";
    scoreText.style.display="none";
    gamescreen.innerHTML = "Game Paused";
    textedit.innerHTML = "resume";
    for(let i=0; i < road.length ; i++){
        road[i].style.animationName="null";
    }
    clearInterval(clashInterval);
}
function gameOver(){
    playStatus = false;
    ground.style.transform="translateX(2000px)";
    cloud[0].style.animationName="null";
    cloud[1].style.animationName="null";  
    pause.style.display="flex";
    man.style.left="10px";
    scoreText.style.display="none";
    for(let i=0; i < road.length; i++){
        road[i].style.animationName="null";
    }
    score=0;
    osCounter=0;
    gamescreen.innerHTML = "Game Over";
    textedit.innerHTML = "replay";
    clearInterval(clashInterval);
}
function restartGame(){
    playStatus = false;
    man.src="images/stand.png";
    man.style.height="350px";
    man.style.left="10px";
    ground.style.transform="translateX(2000px)";
    cloud[0].style.animationName="null";
    cloud[1].style.animationName="null";   
    for(let i=0; i < road.length; i++){
        road[i].style.animationName="null";
    }
    man.style.transition="none";
    startGamePage.style.display="flex";
    scoreText.style.display="none";
    score=0;
    clearInterval(clashInterval);
}
function checkClash(){
    var mX = parseInt(window.getComputedStyle(man, null).getPropertyValue('left'));
    var dX = parseInt(window.getComputedStyle(document.querySelector('.drag'), null).getPropertyValue('left'));
    var oX = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    var mY = parseInt(window.getComputedStyle(man, null).getPropertyValue('height'));
    var mJumpY = parseInt(window.getComputedStyle(man, null).getPropertyValue('bottom'));
    var dY= parseInt(window.getComputedStyle(document.querySelector('.drag'), null).getPropertyValue('bottom'));
    disDragonX = Math.abs((mX+73) - dX);
    disDragonY = (mY+50) - dY;
    disObstacleX = Math.abs((mX+147) - (oX-80));
    disObstacleXAfter = Math.abs((oX-80) - mX);
    disObstacleY = (mJumpY+ 50) - (175);
    if(disDragonX <= 1 && disDragonY >= 1 ){
        gameOverStatus = true;
    }else if(disObstacleX <= 10 && disObstacleY <=1){
        gameOverStatus = true;
    }else if(disObstacleXAfter <= 20 && disObstacleY <=1){
        gameOverStatus = true;
    }
    scoreBoard.innerHTML = score;
}
setInterval(() => {
    if(gameOverStatus){
        gameOver();
    }
    setTimeout(() => {
        gameOverStatus = false;
    }, 1000);
}, 100);
document.onkeydown = function (e){
        console.log(e.keyCode);
    if(e.keyCode == 40 && playStatus){
        manSlide();
    }
    if(e.keyCode == 38 && playStatus){
        manJump();
    }
    if(e.keyCode == 32){
        if(playStatus){
            pauseGame();
        }
        else{
            playGame();
        }
    }
    if(e.keyCode==27){
        restartGame();
    }
    if(e.keyCode==74){
        osCounter++
    }
    if (osCounter == 5) {
        
        document.querySelector(".drag").classList.add("dragon");
        document.querySelector(".dragon").src="images/dragon-img.png";
        setTimeout(() => {
            document.querySelector(".dragon").src=" ";
            document.querySelector(".drag").classList.remove("dragon");
            osCounter = 0;
        }, 4100);
    }
}
