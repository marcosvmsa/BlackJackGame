const showCoinsPlayerOne = document.querySelector('.showCoinsPlayerOne')
const showCoinsPlayerTwo = document.querySelector('.showCoinsPlayerTwo')
const showCoinsPlayerThree = document.querySelector('.showCoinsPlayerThree')
const popupWrapper = document.querySelector('#popupWrapper')

const allCards = document.querySelectorAll('.cards')
const player1 = document.querySelectorAll('.player1')
const player2 = document.querySelectorAll('.player2')
const player3 = document.querySelectorAll('.player3')
const dealer1 = document.querySelectorAll('.dealer1')
const movesOn = document.querySelectorAll('.movesOn')
const movesTwo = document.querySelectorAll('.movesTwo')
const movesThree = document.querySelectorAll('.movesThree')
const allCoinsOne = document.querySelectorAll('.allCoinsOne')
const allCoinsTwo = document.querySelectorAll('.allCoinsTwo')
const allCoinsThree = document.querySelectorAll('.allCoinsThree')


movesOn[0].addEventListener('click', shuffleDraw)
movesOn[1].addEventListener('click', stayPlay1)
movesOn[4].addEventListener('click', shuffleDraw)

// --------------------------------------------
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.coins = 1000;
        this.cardImage = ``;
        this.indToBoard = 0;
        this.score = 0;
    }
    addindToBoard() { this.indToBoard += 1 };
    addCard(card) { this.hand.push(card) };
    clearHand() {
        this.hand = []
        this.cardImage = ``
        this.indToBoard = 0
        this.score = 0
    };
    getHandScore() {
        return this.score = this.hand.reduce((acc, card) => acc + card, 0)
        // return this.hand.reduce((acc, card) => acc + card, 0)
    };
    coninsDeduct(coin) {
        return this.coins = this.coins - coin
    };
}
// --------------------------------------------
const play1 = new Player('Player 1')
showCoinsPlayerOne.innerHTML = play1.coins;
const play2 = new Player('Player 2')
showCoinsPlayerTwo.innerHTML = play2.coins;
const play3 = new Player('Player 3')
showCoinsPlayerThree.innerHTML = play3.coins;
const dealer = new Player('Dealer')
// ---------------------------------------------
const cardObj = {
    deckId: '',
    cardImage: '',
    cardSuit: '',
    cardValue: 0,
}
// ------------------------------------------
let turne = `Play1`;
let control = '';
// --------embaralhar as cartas --------------------------
function shuffleDraw(event) {
    event.preventDefault()
    buttonBat1.disabled = true
    if (event.target.id === `buttonBat1`) {
        for (let i = 0; i <= 7; i++) {
            apiCards(`draw`);
        }
    } else if (event.target.id === `buttonHit1`) { apiCards('buttonHit1') }
}
// ------------API para Embaralhar/ dar as cartas/ -------------------------------------
function apiCards(eve) {
    let url;
    if (eve === `shuffle` || control !== `stop`) {
        url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2`
        control = `stop`;
    } else if (eve === `draw` || eve === 'buttonHit1') {
        url = `https://deckofcardsapi.com/api/deck/${cardObj.deckId}/draw/?count=1`
    }
    fetch(url).then(res => { return res.json() })
        .then(res => {
            if (eve === `shuffle`) {
                return cardObj.deckId = res.deck_id
            } else if (eve === `draw`) {
                cardObj.cardImage = res.cards[0].image;
                cardObj.cardSuit = res.cards[0].suit;
                if (buttonBat1.disabled = true === "JACK" || res.cards[0].value === "QUEEN" || res.cards[0].value === "KING") {
                    cardObj.cardValue = 10;
                } else if (res.cards[0].value === "ACE") { cardObj.cardValue = 11; }
                else { cardObj.cardValue = parseInt(res.cards[0].value) };
                firstRound(cardObj);
            } else if (eve === 'buttonHit1') {
                cardObj.cardImage = res.cards[0].image;
                cardObj.cardSuit = res.cards[0].suit;
                if (res.cards[0].value === "JACK" || res.cards[0].value === "QUEEN" || res.cards[0].value === "KING") {
                    cardObj.cardValue = 10;
                } else if (res.cards[0].value === "ACE") { cardObj.cardValue = 11; }
                else { cardObj.cardValue = parseInt(res.cards[0].value) };
                hitPlay1(cardObj);
            } else if (eve === 'dealerTurne') {
                cardObj.cardImage = res.cards[0].image;
                cardObj.cardSuit = res.cards[0].suit;
                if (res.cards[0].value === "JACK" || res.cards[0].value === "QUEEN" || res.cards[0].value === "KING") {
                    cardObj.cardValue = 10;
                } else if (res.cards[0].value === "ACE") { cardObj.cardValue = 11; }
                else {cardObj.cardValue = parseInt(res.cards[0].value) };
                stayPlay1(cardObj)
            };
        })
        .catch(err => { console.log("something went wrong...", err) });
}
// -----------------------------------------------------------
function firstRound(card) {
    if (turne === `Play1`) {
        player1[play1.indToBoard].style.visibility = 'visible';
        player1[play1.indToBoard].setAttribute('src', card.cardImage);
        play1.addCard(card.cardValue)
        play1.getHandScore()
        checkBlack(play1.score, `Player 1`, 1)
        play1.addindToBoard()
        turne = `Play2`
    } else if (turne === `Play2`) {
        player2[play2.indToBoard].style.visibility = 'visible';
        player2[play2.indToBoard].setAttribute('src', card.cardImage)
        play2.addCard(card.cardValue)
        play2.getHandScore()
        checkBlack(play2.score, `Player 2`, 1)
        play2.addindToBoard()
        turne = `Play3`
    } else if (turne === `Play3`) {
        player3[play3.indToBoard].style.visibility = 'visible';
        player3[play3.indToBoard].setAttribute('src', card.cardImage);
        play3.getHandScore();
        checkBlack(play1.score, `Player 3`, 1);
        play3.addindToBoard()
        turne = `Dealer`;
    } else if (turne === `Dealer`) {
        if (dealer.indToBoard === 1) {
            dealer1[dealer.indToBoard].style.visibility = 'visible';
            dealer1[dealer.indToBoard].setAttribute('src', card.cardImage);
            dealer.addCard(card.cardValue);
            dealer.addindToBoard()
            turneTheCard()
        } else {
            dealer1[dealer.indToBoard].style.visibility = 'visible';
            dealer1[dealer.indToBoard].setAttribute('src', './backCard.jpeg');
            dealer.cardImage = card.cardImage;
            dealer.addindToBoard()
        }
        turne = `Play1`;
    }
}
// ------------------------------------------------------------
function checkBlack(black, player, round) {
    if (round === 1) {
        if (black === 21 && player !== `Dealer`) {
            popUp(`${player} BlackJack`)
        } else if (player === `Dealer`) {
            if (black === 21) {
                return true
            }
        }
        // else{
        // popUp();
        // restart();}
    } else if (round === 2) {
        if (black > 21) { popUpBust(`Bust`) }
    }
}
// ----------------------------------------------------------------
function turneTheCard() {
    if (dealer.hand[1] === 11) {
        popUpInsirance(`would you like insurance`)
        dealer.getHandScore();
        if (checkBlack(dealer.score, `Dealer`, 1)) {
            dealer1[0].setAttribute('src', dealer.cardImage);
            // fim de jogo 
        } else {
            movesOn.forEach(a => a.disabled = false)
            buttonBat1.disabled = true
        }
    } else {
        movesOn.forEach(a => a.disabled = false)
        buttonBat1.disabled = true
    }
}
// ----Button to Hit------------------------------------------------------------
function hitPlay1(card) {
    player1[play1.indToBoard].style.visibility = 'visible';
    player1[play1.indToBoard].setAttribute('src', card.cardImage);
    play1.addCard(card.cardValue);
    play1.addindToBoard()
    play1.getHandScore();
    checkBlack(play1.score, `Player 1`, 2);
}
// ---button to stay -------------------------------------------------------------
function stayPlay1(card) {
    // deler mostra a carta
    dealer1[0].setAttribute('src', dealer.cardImage)
    // caucula o score 
    dealer.getHandScore();

    while (dealer.score <= play1.score || dealer.score < 21) {
        apiCards(`dealerTurne`)
        dealer1[dealer.indToBoard].style.visibility = 'visible';
        dealer1[dealer.indToBoard].setAttribute('src', card.cardImage);
        dealer.addCard(card.cardValue);
        dealer.getHandScore();
        dealer.addindToBoard()
    }
}
// ----------------------------------------------------------------
function dobuleDowPlay1(card) {
    // player1[play1.indToBoard].style.visibility = 'visible';
    // player1[play1.indToBoard].setAttribute('src', card.cardImage);
    // play1.addCard(card.cardValue);
}
// ----pop Up -------------------------------
function popUp(msg) {
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    closePopup.addEventListener('click', () => {
        popupWrapper.style.display = 'none';
    })
};
// ----pop Up -- bust-----------------------------
function popUpBust(msg) {
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    closePopup.addEventListener('click', () => {
        popupWrapper.style.display = 'none';
        setTimeout(() => { dealer1[0].setAttribute('src', dealer.cardImage) }, 1000);
        restart()
    })
};
// ----pop Up - insurance ------------------------------
function popUpInsirance(msg) {
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    setTimeout(() => {
        popupWrapper.style.display = 'none';
    }, 100);
};
// ----Restart ------------------------------
function restart() {

    play1.clearHand()
    // =>this is not meant to be here - just for testing
    play2.clearHand()
    play3.clearHand()
    dealer.clearHand()
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
allCoinsOne[0].addEventListener('click', () => {
    play1.coninsDeduct(1);
    showCoinsPlayerOne.innerHTML = play1.coins;
})
allCoinsOne[1].addEventListener('click', () => {
    play1.coninsDeduct(5);
    showCoinsPlayerOne.innerHTML = play1.coins;
})
allCoinsOne[2].addEventListener('click', () => {
    play1.coninsDeduct(10);
    showCoinsPlayerOne.innerHTML = play1.coins;
})

allCoinsTwo[0].addEventListener('click', () => {
    play2.coninsDeduct(1);
    showCoinsPlayerTwo.innerHTML = play2.coins;

})
allCoinsTwo[1].addEventListener('click', () => {
    play2.coninsDeduct(5);
    showCoinsPlayerTwo.innerHTML = play2.coins;
})
allCoinsTwo[2].addEventListener('click', () => {
    play2.coninsDeduct(10);
    showCoinsPlayerTwo.innerHTML = play2.coins;
})

allCoinsThree[0].addEventListener('click', () => {
    play3.coninsDeduct(1);
    showCoinsPlayerThree.innerHTML = play3.coins;

})
allCoinsThree[1].addEventListener('click', () => {
    play3.coninsDeduct(5);
    showCoinsPlayerThree.innerHTML = play3.coins;
})
allCoinsThree[2].addEventListener('click', () => {
    play3.coninsDeduct(10);
    showCoinsPlayerThree.innerHTML = play3.coins;
})
// chamando a API para embaralhar comeco do jogo
apiCards(`shuffle`)
