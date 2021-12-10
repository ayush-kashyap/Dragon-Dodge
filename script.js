let osCounter = 0;
var playStatus = false;
var gameOverStatus = false;
var score = 0;
var highScore=0;
var disDragonX , disDragonY , disObstacleX, disObstacleXAfter, disObstacleY;
var clashInterval;
var scoreStatus=0;
const man = document.querySelector(".man");
const obstacle = document.querySelector('.obstacle');
const startGamePage = document.querySelector(".startgame");
const ground = document.querySelector(".ground");
const road = document.querySelectorAll(".road");
const cloud = document.querySelectorAll(".cloud");
const pause = document.querySelector(".pauseScreen");
const scoreBoard = document.querySelector(".score");
const highScoreBoard = document.querySelector(".highscore");
const scoreText = document.querySelector(".scoreText");
const highScoreText = document.querySelector(".highScoreText");
const gamescreen = document.querySelector('.gamescreentext');
const textedit = document.querySelector('.textedit');
function manSlide(){
    man.src="images/slide.png";
        man.style.height="90px";
        setTimeout(() => {
            man.src="images/run.gif";
            man.style.height="150px";
        }, 1000);
}
function manJump(){
    man.classList.add("jump");
        man.src="images/jump.png";
        man.style.height="130px";
        setTimeout(() => {
            man.style.height="150px";
            man.src="images/run.gif";
            man.classList.remove("jump");
        }, 1000);
}
function playGame(){
    let highs = document.cookie.split('=');
    setTimeout(() => {
        clashInterval = setInterval(checkClash, 1);
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
    highScoreText.style.display="block";
    setInterval(() =>{highScoreBoard.innerHTML = highScore;}, 5000)
    highScore = highs[1];
    setInterval(() => {
        if(score > highScore){
            highScore = score;
        }
        if(gameOverStatus){
            gameOver();
        }
        if(scoreStatus == 1){
            score++;
            osCounter++;
        }
        if(scoreStatus == 5){
            score+=5;
        }
        setTimeout(() => {
            gameOverStatus = false;
            scoreStatus= 0;
        }, 200);
    }, 200);
}
function pauseGame(){
    playStatus = false;
    ground.style.transform="translateX(2000px)";
    cloud[0].style.animationName="null";
    cloud[1].style.animationName="null";   
    pause.style.display="flex";
    scoreText.style.display="none";
    highScoreText.style.display="none";
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
    highScoreText.style.display="none";
    for(let i=0; i < road.length; i++){
        road[i].style.animationName="null";
    }
    setTimeout(() => {
        score=0;
        osCounter=0;
    }, 2000);
    gamescreen.innerHTML = "Game Over";
    textedit.innerHTML = "replay";
    var date = new Date();
    date.setMonth(date.getMonth()+5);
    var expires = "; expires=" + date.toGMTString();
    document.cookie = "Highscore = " + highScore + expires + "; path=/";
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
    highScoreText.style.display="none";
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
    if(disDragonX <= 5){
        if(disDragonY >= 1){
            gameOverStatus = true;
        }else{
            scoreStatus=5;
        }
    }
    if(disObstacleX <= 10){
        if(disObstacleY <=1){
            gameOverStatus = true;
        }else{
            scoreStatus=1;
        }
    }
    if(disObstacleXAfter <= 20 && disObstacleY <=1){
        gameOverStatus = true;
    }
    scoreBoard.innerHTML = score;
}

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
    if(e.keyCode==73){
        gameOver();
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
