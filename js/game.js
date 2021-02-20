import dealCards from './dealCards.js';
const start = document.getElementById("game-start");
const endMessage = document.getElementById("end-message");
const playAgain = document.getElementById("play-again");
const board  = document.getElementById('game-board');
const test = document.getElementById('game-test');
const main = document.getElementById('game');
const bar = document.getElementById('game-bar');
const img = document.getElementById('game-img');

let cards = document.getElementsByClassName("card");
let covers = document.getElementsByClassName("cover");
let watch = document.createElement('h3');
let totalErrors = document.createElement('h3');

watch.className="stopwatch";
totalErrors.className="errors";

var chronometer;
let s = 0;
let m = 0;
let h = 0;
let errors = 0;

function activeClick(){
    for (let i = 0; i < covers.length; i++) {
        covers[i].style.pointerEvents = 'auto';
    }
}

function deactivateClick(){
    for (let i = 0; i < covers.length; i++) {
        covers[i].style.pointerEvents = 'none';
    }
}

function pairs (num1,num2,cover1,card1,cover2,card2){
    if(num1 === num2){
        return true;
    }
    else{
        errors++;
        totalErrors.innerText=`Errors : ${errors}`;
        card1.style.display='none';
        card2.style.display='none';
        cover1.style.display='block';
        cover2.style.display='block';
        return false;
    }
}

function game(memoryGame){
    let correct = 0;
    let attempts = [];
    let tempCovers = [];
    let tempCards = [];
    if(memoryGame.getLevel()==memoryGame.getLevelMax()){
        clearInterval(chronometer);
        bar.style.display = 'none';
        endMessage.style.display='inline-block';
        memoryGame.resetGame();
        memoryGame.nextLevel();
        errors = 0;
        totalErrors.innerText=``;
        s = 0;
        m = 0;
        h = 0;
        playAgain.onclick = () => {
            watch.innerText= `Time: 00:00:00`;
            chronometer = setInterval(stopwatch,1000);
            bar.style.display = 'flex'
            test.style.display='inline-block';
            endMessage.style.display='none';
            bar.appendChild(totalErrors);
            memoryGame.nextLevel();
            game(memoryGame);
        }
    }
    else{
        for (let index = 0; index < covers.length; index++) {
            covers[index].addEventListener('click',()=>{
                covers[index].style.display='none';
                cards[index].style.display='block';
                attempts.push(covers[index].getAttribute('data-index'));
                tempCovers.push(covers[index]);
                tempCards.push(cards[index]);
                if(attempts.length%2==0 && attempts.length!=0){
                    setTimeout(()=>{let arePairs = pairs(attempts[0],attempts[1],tempCovers[0],tempCards[0],tempCovers[1],tempCards[1]);
                        activeClick();
                        attempts=[];
                        tempCards=[];
                        tempCovers=[];
                        if(arePairs===true){
                            correct+=2
                            if(cards.length===correct){
                                memoryGame.nextLevel();
                                cards = document.getElementsByClassName("card");
                                covers = document.getElementsByClassName("cover");
                                game(memoryGame);
                            }
                        }
                    },1000);
                    deactivateClick();
                }
            });
        }
    }
}
function stopwatch(){
        let second;
        let minute;
        let hour;
        if(s>=59){
            m++;
            s=0;
        }
        s++;
        if(m>=59){
            h++;
            m=0;
        }
        if(s<10){
            second = '0'+s;
        }
        else{
            second = s;
        }
        if(m<10){
            minute = '0'+m;
        }
        else{
            minute = m;
        }
        if(h<10){
            hour = '0'+h;
        }
        else{
            hour = h;
        }
        watch.innerText= `Time: ${hour}:${minute}:${second}`;
        bar.appendChild(watch);
    }

function startGame(){
    test.style.display='none';
    const memoryGame = dealCards(board);
    start.onclick = ()=>{
        chronometer = setInterval(stopwatch,1000);
        bar.style.display = 'flex'
        bar.appendChild(totalErrors);
        start.style.display = 'none';
        img.style.display = 'none';
        test.style.display='inline-block';
        memoryGame.nextLevel();
        game(memoryGame);
    }
    test.onclick = () => {
        memoryGame.nextLevel();
        cards = document.getElementsByClassName("card");
        covers = document.getElementsByClassName("cover");
        game(memoryGame);
    }
}
startGame();