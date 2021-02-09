'use strict';

const game  = document.getElementById('game');
const start = document.getElementById('game-start');
const board  = document.getElementById('game-board');

let icon_list = [
"url('../assets/icon-card/christmas_icons-01.svg')",
"url('../assets/icon-card/christmas_icons-02.svg')",
"url('../assets/icon-card/christmas_icons-03.svg')",
"url('../assets/icon-card/christmas_icons-04.svg')",
"url('../assets/icon-card/christmas_icons-05.svg')",
"url('../assets/icon-card/christmas_icons-06.svg')",
"url('../assets/icon-card/christmas_icons-07.svg')",
"url('../assets/icon-card/christmas_icons-08.svg')",
"url('../assets/icon-card/christmas_icons-09.svg')",
"url('../assets/icon-card/christmas_icons-10.svg')",
"url('../assets/icon-card/christmas_icons-11.svg')",
"url('../assets/icon-card/christmas_icons-12.svg')",
];

start.onclick = () => {
    let level = 1;
    let levelmax = 12;
    start.style.display = 'none';
    displayCards(board,level,levelmax);
    test.style.display = "inline-block";
}
function createCard(){
    const card = document.createElement('div');
    card.setAttribute('id','card');
    return card
}
function cardBackground(totalcards){
    let count = 0;
    return function assignBackground(card){
        card.className="card";
        let i = totalcards/2;
        i--;
        card.style.backgroundImage = icon_list[i];
        count++;
        if(count%2==0){
            totalcards-=2;
        }
    }
}
function randomNumber(level){
    let randomNum = [];
    for (let index = 0; index < level; index++) {
        let num = Math.random()*(1+level-2)+1;
        num = num.toFixed(0);
        if (!randomNum.includes(num)){
            randomNum.push(num);
        }
        else{
            index--;
        }
    }
    return randomNum;
}
function dealCards(card,level){
    let randomNum = randomNumber(level);
    card.style.order = randomNum.pop();
}
function clearBoard(level){
    if(level>1){
        for (let index = 0; index < ((level*2)-2); index++) {
            const card =  document.getElementById('card');
            card.remove();
        }
    }
}
function displayCards (board,level,levelmax){
    if(level>levelmax){
        clearBoard(level);
        test.style.display = "none";
        start.style.display= "inline-block";
    }
    else{
        clearBoard(level);
        let totalcards = level*2
        let styleCards = cardBackground(totalcards);
        for (let index = 0; index < totalcards; index++) {
        let card = createCard();
        styleCards(card);
        dealCards(card,level)
        board.appendChild(card);
    }
    }
}
