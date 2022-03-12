// Space to show de coins => 
const showCoinsPlayerOne = document.querySelector('.showCoinsPlayerOne')
const showCoinsPlayerTwo = document.querySelector('.showCoinsPlayerTwo')
const showCoinsPlayerThree = document.querySelector('.showCoinsPlayerThree')
// <=
const popupWrapper = document.querySelector('#popupWrapper')// PopUp
const allCards = document.querySelectorAll('.cards')//space to display the cards
const player1 = document.querySelectorAll('.player1')//Playr 1 Table 
const player2 = document.querySelectorAll('.player2')//Playr 2 Table 
const player3 = document.querySelectorAll('.player3')//Playr 3 Table 
const dealer1 = document.querySelectorAll('.dealer1')//Dealer Table 
const movesOn = document.querySelectorAll('.movesOn')//Action Player 1 Buttons
const movesTwo = document.querySelectorAll('.movesTwo')//Action Player 2 Buttons
const movesThree = document.querySelectorAll('.movesThree')//Action Player 3 Buttons
const allCoinsOne = document.querySelectorAll('.allCoinsOne')//Buttons to selectamount Player 1 
const allCoinsTwo = document.querySelectorAll('.allCoinsTwo')//Buttons to selectamount Player 2 
const allCoinsThree = document.querySelectorAll('.allCoinsThree')//Buttons to selectamount Player 1

// ---------Controle-Varieble----------------------------
let turne = `Play1`;
let control = '';
let whileControl = false
// --Player Class Constructor ------------------------------------------
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.coins = 1000;
        this.cardImage = ``;
        this.indToBoard = 0;
        this.score = 0;
        this.betValue = 0;
    }
    addindToBoard(){ 
        this.indToBoard += 1 
    };
    addCard(card){
        this.hand.push(card)
     };
    clearHand(){
        this.hand = []
        this.cardImage = ``
        this.indToBoard = 0
        this.score = 0
        this.betValue = 0
    };
    getHandScore(){
        this.score = this.hand.reduce((acc, card) => acc + card, 0)
        // control.log(`this.score${this.score}`)
        // return this.hand.reduce((acc, card) => acc + card, 0)
    };
    coninsDeduct(coin){
        this.coins = this.coins - coin
    };
    addBet(coins){
        this.betValue = this.betValue + coins
    }
    addEarnes(times){
        const total = this.betValue * times + this.betValue
        this.coins = this.coins + total
    }
}
// --------------------------------------------
const play1 = new Player('Player 1')//Creating Player 1
    showCoinsPlayerOne.innerHTML = play1.coins;//Money to start 
const play2 = new Player('Player 2')//Creating Player 2
    showCoinsPlayerTwo.innerHTML = play2.coins;//Money to start
const play3 = new Player('Player 3')//Creating Player 3
    showCoinsPlayerThree.innerHTML = play3.coins;//Money to start
const dealer = new Player('Dealer')//Creating Dealer
// -------Object for API------------------------
const cardObj = {
    deckId: '',
    cardImage: '',
    cardSuit: '',
    cardValue: 0,
}
// --------embaralhar as cartas --------------------------
function shuffleDraw(event){
    // event.preventDefault()
    if(play1.betValue === 0){
        popUp(`You need select an amount of coins`)
    }else{
        buttonBat1.disabled = true
        if(event.target.id === `buttonBat1`){
            for(let i = 0; i <= 7; i++){
                apiCards(`draw`);
            }
        }else if(event.target.id === `buttonHit1`){apiCards('buttonHit1')}
         else if(event.target.id === `buttonStay1`){apiCards('buttonStay1')}
    }
}
// ------------API para Embaralhar/ dar as cartas/ -------------------------------------
function apiCards(eve){
    let url;
    if (eve === `shuffle` || control !== `stop`) {
        url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=4`
        control = `stop`;
    } else if (eve === `draw` || eve === 'buttonHit1' || 
               eve === 'buttonStay1' || eve === 'returToDealerTurne'){
        url = `https://deckofcardsapi.com/api/deck/${cardObj.deckId}/draw/?count=1`
    }
    fetch(url).then(res => { return res.json() })
        .then(res => {
            if(eve === `shuffle`){
                return cardObj.deckId = res.deck_id
            }else if(eve === `draw`|| eve === 'buttonHit1'||eve === 'buttonStay1'|| eve === 'returToDealerTurne') {
                cardObj.cardImage = res.cards[0].image;
                cardObj.cardSuit = res.cards[0].suit;
                if(buttonBat1.disabled = true === "JACK" || res.cards[0].value === "QUEEN" || res.cards[0].value === "KING") {
                    cardObj.cardValue = 10;
                }else if(res.cards[0].value === "ACE"){
                    cardObj.cardValue = 11;
                }else{
                    cardObj.cardValue = parseInt(res.cards[0].value)
                };
                if(eve === `draw`){firstRound(cardObj)}
                else if(eve === 'buttonHit1'){hitPlay1(cardObj)}
                else if(eve === 'buttonStay1'){stayPlay1(cardObj)}
                else if(eve === 'returToDealerTurne'){return cardObj}
            }    
        })
        .catch(err => { console.log("something went wrong...", err) });
    }
// -----------------------------------------------------------
function firstRound(card){
    if (turne === `Play1`) {
        player1[play1.indToBoard].style.visibility = 'visible';
        player1[play1.indToBoard].setAttribute('src', card.cardImage);
        play1.addCard(card.cardValue)
        play1.getHandScore()
        checkBlack(play1.score, `Player 1`, `One`)
        play1.addindToBoard()
        turne = `Play2`
    } else if (turne === `Play2`) {
        player2[play2.indToBoard].style.visibility = 'visible';
        player2[play2.indToBoard].setAttribute('src', card.cardImage)
        play2.addCard(card.cardValue)
        play2.getHandScore()
        checkBlack(play2.score, `Player 2`, `One`)
        play2.addindToBoard()
        turne = `Play3`
    } else if (turne === `Play3`) {
        player3[play3.indToBoard].style.visibility = 'visible';
        player3[play3.indToBoard].setAttribute('src', card.cardImage);
        play3.getHandScore();
        checkBlack(play1.score, `Player 3`, `One`);
        play3.addindToBoard()
        turne = `Dealer`;
    } else if (turne === `Dealer`) {
        if (dealer.indToBoard === 1) {
            dealer1[dealer.indToBoard].style.visibility = 'visible';
            dealer1[dealer.indToBoard].setAttribute('src', card.cardImage);
            dealer.addCard(card.cardValue);
            dealer.getHandScore();
            dealer.addindToBoard()
            turneTheCard()
        } else {
            dealer1[dealer.indToBoard].style.visibility = 'visible';
            dealer1[dealer.indToBoard].setAttribute('src', './backCard.jpeg');
            dealer.cardImage = card.cardImage;
            dealer.addCard(card.cardValue);
            dealer.getHandScore();
            dealer.addindToBoard()
        }
        turne = `Play1`;
    }
}
// ------------------------------------------------------------
function checkBlack(black,player,round){
    if (round === `One`) {
        if (black === 21 && player !== `Dealer`) {
            play1.addEarnes(1.5) 
            showCoinsPlayerOne.innerHTML = play1.coins
            popUp(`${player} BlackJack`)
            if(player ===`Player 1`){
                setTimeout(() => restart(), 2000);
            }
        } 
    } else if(round === `Two`){
        if(black > 21){popUpBust(`Bust`)}
        else if(black === 21 && player === `Player 1`){
            dealerTurne()
        }
    }
}
// ----------------------------------------------------------------
function turneTheCard(){
    if (dealer.hand[1] === 11) {
        popUpInsirance(`would you like insurance`)
        if(dealer.score === 21){
            dealer1[0].setAttribute('src', dealer.cardImage);
            setTimeout(() => {restart()}, 2000);
        }else{
            movesOn.forEach(a => a.disabled = false)
            buttonBat1.disabled = true
        }
    } else {
        movesOn.forEach(a => a.disabled = false)
        buttonBat1.disabled = true
    }
}
// ----Button to Hit------------------------------------------------------------
function hitPlay1(card){
    player1[play1.indToBoard].style.visibility = 'visible';
    player1[play1.indToBoard].setAttribute('src', card.cardImage);
    play1.addCard(card.cardValue);
    play1.addindToBoard()
    play1.getHandScore();
    checkBlack(play1.score, `Player 1`, `Two`);
}
// ---button to stay -------------------------------------------------------------
function stayPlay1(){
    dealer1[0].setAttribute('src', dealer.cardImage)// deler mostra a carta
    dealer.getHandScore()// caucula o score
    dealerTurne()
}
// ----------------------------------------------------------------
function dealerTurne(){
    while (whileControl !== true) {
        if(dealer.score > 21){ 
            play1.addEarnes(1) 
            showCoinsPlayerOne.innerHTML = play1.coins
            popUpBust(`Dealer Bust`)
            whileControl = true
            break
        }
        else if(dealer.score > play1.score){
            popUpWin(`Dealer Win`)
            whileControl = true
            break
        }
        else if(dealer.score === play1.score){
            popUpWin(`Draw`)
            whileControl = true
            break
        }else{
            dealer1[dealer.indToBoard].style.visibility = 'visible';
            dealer1[dealer.indToBoard].setAttribute('src', cardObj.cardImage);
            dealer.addCard(cardObj.cardValue);
            dealer.getHandScore();
            dealer.addindToBoard()
            console.log(dealer.score)
            apiCards(`returToDealerTurne`)
        }
    }  
    
}
function dobuleDowPlay1(card){
    // player1[play1.indToBoard].style.visibility = 'visible';
    // player1[play1.indToBoard].setAttribute('src', card.cardImage);
    // play1.addCard(card.cardValue);
}
// ----pop Up -------------------------------
function popUp(msg){
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    closePopup.addEventListener('click', () => {
        popupWrapper.style.display = 'none';
    })
};
// ----pop Up -------------------------------
function popUpWin(msg){
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    closePopup.addEventListener('click', () => {
        popupWrapper.style.display = 'none';
        restart();
    })
};
// ----pop Up -- bust-----------------------------
function popUpBust(msg){
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    closePopup.addEventListener('click', () => {
        popupWrapper.style.display = 'none';
        // setTimeout(() => {dealer1[0].setAttribute('src', dealer.cardImage)}, 1000);
        restart()
    })
};
// ----pop Up - insurance ------------------------------
function popUpInsirance(msg){
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    setTimeout(()=>popupWrapper.style.display = 'none', 2000);
};
// ----Restart ------------------------------
function restart(){

    play1.clearHand()
    // =>this is not meant to be here - just for testing
    play2.clearHand()
    play3.clearHand()
    dealer.clearHand()
    whileControl = false
    // <=
    turne = `Play1`;
    //=> moving the control to "0" allows me to have a new key for a new shuffled deck
    control = '';
    apiCards(`shuffle`)
    allCards.forEach(e => {
        e.style.visibility = `hidden`
        e.setAttribute('src', '');
    })
    movesOn.forEach(e => e.disabled = true)
    buttonBat1.disabled = false
};
// -------------------------------------------------
allCoinsOne[0].addEventListener('click',()=>{
    play1.coninsDeduct(1);
    play1.addBet(1)
    showCoinsPlayerOne.innerHTML = play1.coins;
})
allCoinsOne[1].addEventListener('click',()=>{
    play1.coninsDeduct(5);
    play1.addBet(5)
    showCoinsPlayerOne.innerHTML = play1.coins;
})
allCoinsOne[2].addEventListener('click',()=>{
    play1.coninsDeduct(10);
    play1.addBet(10)
    showCoinsPlayerOne.innerHTML = play1.coins;
})

allCoinsTwo[0].addEventListener('click',()=>{
    play2.coninsDeduct(1);
    play2.addBet(1)
    showCoinsPlayerTwo.innerHTML = play2.coins;

})
allCoinsTwo[1].addEventListener('click',()=>{
    play2.coninsDeduct(5);
    play2.addBet(5)
    showCoinsPlayerTwo.innerHTML = play2.coins;
})
allCoinsTwo[2].addEventListener('click',()=>{
    play2.coninsDeduct(10);
    play2.addBet(10)
    showCoinsPlayerTwo.innerHTML = play2.coins;
})

allCoinsThree[0].addEventListener('click',()=>{
    play3.coninsDeduct(1);
    play3.addBet(1)
    showCoinsPlayerThree.innerHTML = play3.coins;

})
allCoinsThree[1].addEventListener('click',()=>{
    play3.coninsDeduct(5);
    play3.addBet(5)
    showCoinsPlayerThree.innerHTML = play3.coins;
})
allCoinsThree[2].addEventListener('click',()=>{
    play3.coninsDeduct(10);
    play3.addBet(10)
    showCoinsPlayerThree.innerHTML = play3.coins;
})
// ------------------------------------------------
movesOn[0].addEventListener('click', shuffleDraw)
movesOn[1].addEventListener('click', shuffleDraw)
movesOn[4].addEventListener('click', shuffleDraw)
// chamando a API para embaralhar comeco do jogo
apiCards(`shuffle`)
