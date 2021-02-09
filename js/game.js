'use strict'
import dealCards from './dealCards.js';
const start = document.getElementById("game-start");
const board  = document.getElementById('game-board');
const test = document.getElementById('game-test');
let cards = document.getElementsByClassName("card");
let covers = document.getElementsByClassName("cover");


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
        alert("Juego Completado!")
        memoryGame.resetGame();
        start.style.display = 'inline-block';
        test.style.display='none';
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

function startGame(){
    test.style.display='none';
    const memoryGame = dealCards(board);
    start.onclick = () => {
        start.style.display = 'none';
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