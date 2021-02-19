'use strict';

let icon_list = [
"url('../Memory/assets/icon-card/christmas_icons-01.svg')",
"url('../Memory/assets/icon-card/christmas_icons-02.svg')",
"url('../Memory/assets/icon-card/christmas_icons-03.svg')",
"url('../Memory/assets/icon-card/christmas_icons-04.svg')",
"url('../Memory/assets/icon-card/christmas_icons-05.svg')",
"url('../Memory/assets/icon-card/christmas_icons-06.svg')",
"url('../Memory/assets/icon-card/christmas_icons-07.svg')",
"url('../Memory/assets/icon-card/christmas_icons-08.svg')",
"url('../Memory/assets/icon-card/christmas_icons-09.svg')",
"url('../Memory/assets/icon-card/christmas_icons-10.svg')",
"url('../Memory/assets/icon-card/christmas_icons-11.svg')",
"url('../Memory/assets/icon-card/christmas_icons-12.svg')",
];

function createCard(){
    const card = document.createElement('div');
    card.setAttribute('id','card');
    return card
}
function cardBackground(totalcards){
    let count = 0;
    return function assignBackground(card){
        card.className='card';
        let i = totalcards/2;
        i--;
        card.style.backgroundImage = icon_list[i];
        count++;
        if(count%2==0){
            totalcards-=2;
        }
    }
}
function createCover(index){
    const cover = document.createElement('div');
    cover.className='cover'
    cover.setAttribute('id','cover');
    if(index%2==0){
        cover.setAttribute('data-index',index);
    }
    else{
        cover.setAttribute('data-index',index-1);
    }
    return cover;
}
function randomNumber(level){
    let randomOrder = [];
    for (let index = 0; index < level; index++) {
        let num = Math.random()*(1+level-2)+1;
        num = num.toFixed(0);
        if (!randomOrder.includes(num)){
            randomOrder.push(num);
        }
        else{
            index--;
        }
    }
    return randomOrder;
}
function dealCards(card,cover,level){
    let randomOrder = randomNumber(level);
    let orderCard = [...randomOrder];
    let orderCover = [...randomOrder];
    card.style.order = orderCard.pop();
    cover.style.order = orderCover.pop();
    card.style.display="none";
}
function clearBoard(level){
    const test_card =  document.getElementById('card');
    if(level>1 && test_card!=null){
        for (let index = 0; index < ((level*2)-2); index++) {
            const card =  document.getElementById('card');
            const cover =  document.getElementById('cover');
            card.remove();
            cover.remove();
        }
    }
}
function displayCards (board,level = 1,levelmax = 12){
    return {
        nextLevel: function() {
            if(level>levelmax){
                clearBoard(level);
            }
            else{
                clearBoard(level);
                let totalcards = level*2
                let styleCards = cardBackground(totalcards);
                for (let index = 0; index < totalcards; index++) {
                const card = createCard();
                styleCards(card);
                const cover = createCover(index);
                dealCards(card,cover,level)
                board.appendChild(card);
                board.appendChild(cover);
            }
            level++;
            }
        },
        getLevel: function(){
            return level;
        },
        getLevelMax:function(){
            return levelmax;
        },
        resetGame:function(){
            clearBoard(level);
            level = 0;
        }
    }
}

export default displayCards;