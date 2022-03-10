let dealCards = document.querySelector('#dealCards')
let drawCards = document.querySelector('#drawCards')

const player1= document.querySelectorAll('.player1')
const player2= document.querySelectorAll('.player2')
const player3= document.querySelectorAll('.player3')
const dealer1 = document.querySelectorAll('.dealer1')
const movesOn = document.querySelectorAll('.movesOn')
// console.log(movesOn)
drawCards.addEventListener('click',shuffleDraw)
movesOn[0].addEventListener('click',shuffleDraw)

// --------------------------------------------

class Player{
    constructor(name, dealerFirstCard){
      this.name = name;
      this.hand = [];
      this.dealerFirstCard = dealerFirstCard;
    }
    getHand(){
      return this.hand
    }
    addCard(card){
      this.hand.push(card)
    }
    clearHand(){
      this.hand = []
    }
    getHandScore(){
      return this.hand.reduce((acc, card) => acc + card.value, 0)
    }
    newCard(){
      getCard(this)
    }
  }



const player1CardsRound = [];
const player2CardsRound = [];
const player3CardsRound = [];
const dealerCardsRound  = [];
const cardObj = {  
    deckId: '',      
    cardImage : '', 
    cardSuit : '',
    cardValue : 0,
}
// ------------------------------------------
const dealerFirstCard = {    
    cardImage : '', 
    cardSuit : '',
    cardValue : 0,
}

let control = '';
// ----------------------------------
function shuffleDraw(event){
    event.preventDefault()
    console.log(event)
    // console.log(event.target.id)
    if(cardObj.deckId===``){apiCards('shuffle')}
    else if(event.target.id === `drawCards`){
        for(let i = 0; i <= 7 ; i++){
            apiCards(`draw`, i);
        }
    }
    // else if(event.target.id){
    //     console.log(event.target.id)
    // }
}
// -------------------------------------------------
function apiCards (eve) {
    let url;
    if(eve === `shuffle`){
        // console.log(`aqui shuffle`)
        url= `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2`
    }else if(eve === `draw`){
        url= `https://deckofcardsapi.com/api/deck/${cardObj.deckId}/draw/?count=1`
    }
    fetch(url)
    .then(res => {return res.json();})
    .then(res => {        
        if (eve === `shuffle`){
            return cardObj.deckId = res.deck_id
        }else if(eve ===`draw`){
            console.log(res.cards)
            cardObj.cardImage = res.cards[0].image;
            cardObj.cardSuit = res.cards[0].suit;
            if(res.cards[0].value === "JACK"||res.cards[0].value === "QUEEN"||res.cards[0].value === "KING"){
                cardObj.cardValue = 10
            }else if(res.cards[0].value === "ACE"){
                cardObj.cardValue = 11                
            }else{
                cardObj.cardValue = parseInt(res.cards[0].value)            
            }
            cardObj.cardImgBack = res.cards[0].images.svg;
            firstRound(cardObj)
        }    
    })
    .catch(err => {console.log("something went wrong...", err);});   
}
// -----------------------------------------------------------
let turne = `play1`;
let ind = 0;
let blackJack1 = 0 
let blackJack2 = 0 
let blackJack3 = 0 
let blackJack4 = 0 
function firstRound(card){ 
    // console.log(turne)   
    if(turne === `play1` ){
        player1[ind].style.visibility = 'visible';
        player1[ind].setAttribute('src', card.cardImage);
        player1CardsRound.push(card.cardValue)
        blackJack1 = blackJack1 + card.cardValue
        checkBlack(blackJack1,turne)
        console.log(card.cardValue)
        turne = `play2`
    }else if(turne === `play2`){
        player2[ind].style.visibility = 'visible'; 
        player2[ind].setAttribute('src', card.cardImage)
        player2CardsRound.push(card.cardValue)
        blackJack2 = blackJack2 + card.cardValue
        checkBlack(blackJack2,turne)
        turne = `play3`
    }else if(turne === `play3`){
        player3[ind].style.visibility = 'visible'; 
        player3[ind].setAttribute('src', card.cardImage);
        blackJack3 = blackJack3 + card.cardValue
        player3CardsRound.push(card.cardValue)
        checkBlack(blackJack3,turne)
        turne = `Dealer`;          
    }else if(turne === `Dealer`){
        if(ind !== 1){
            dealer1[ind].style.visibility = 'visible'; 
            dealer1[ind].setAttribute('src', card.cardImage);
            dealerCardsRound.push(card.cardValue)
            blackJack1 = blackJack1 + card.cardValue            
        }else{
            dealer1[ind].style.visibility = 'visible'; 
            dealer1[ind].setAttribute('src', './backCard.jpeg');
            dealerFirstCard.cardImage = card.cardImage
            player1CardsRound.push(card.cardValue)
            blackJack4 = blackJack4 + card.cardValue
            checkBlack(blackJack4,turne)
            secondRound()
        }
        checkBlack(blackJack4,turne)
        turne = `play1`;
        ind += 1;
    }       
}
// ------------------------------------------------------------
function checkBlack(black, player){
    if(black === 21){
        popUp(`${player} BlackJack`)
    }
}
// ----------------------------------------------------------------
// function secondRound(card){
//     if(res.cards[0].value === "JACK"||res.cards[0].value === "QUEEN"||res.cards[0].value === "KING"){}
// } 
// ----pop Up -------------------------------
function popUp (msg){
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    closePopup.addEventListener('click', () => {
        popupWrapper.style.display = 'none';
    })
};