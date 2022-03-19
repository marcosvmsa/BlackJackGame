// --------------------------------------------
const play1 = new Player('Player 1');//Creating Player 1
play1.coins = 1000;
showCoinsPlayerOne.innerHTML = play1.coins;//Money to start 
const play2 = new Player('Player 2');//Creating Player 2
showCoinsPlayerTwo.innerHTML = play2.coins;//Money to start
const play3 = new Player('Player 3');//Creating Player 3
showCoinsPlayerThree.innerHTML = play3.coins;//Money to start
const dealer = new Player('Dealer');//Creating Dealer
// -------Object for API------------------------
// -------This object is fed with the deck of cards that comes from an API------------------------
const cardObj = {
    deckId: '',
    cardImage: '',
    cardSuit: '',
    cardValue: 0,
}
// --------Prevent the start of the game with no bets placed--------------------------
function shuffleDraw(event) {
    event.preventDefault()
    if (play1.betValue === 0) {
        popUpNoBet(`You need select an amount of coins`);
    } else {
        buttonBat1.disabled = true;
        allCoinsOne.forEach(a => a.disabled = true);
        if (event.target.id === `buttonBat1`) {
            for (let i = 0; i <= 7; i++) {
                apiCards(`draw`);
            }
        } else if (event.target.id === `buttonHit1`) { apiCards('buttonHit1') }
        else if (event.target.id === `buttonStay1`) { apiCards('buttonStay1') }
        else if (event.target.id === `buttonDuble1`) { apiCards('buttonDuble1') }
        else if (event.target.id === `splitHit`) { apiCards('splitHit') }
    }
}
// ------------API shuffle the cards/ deal the cards/ feed the object -------------------------------------
function apiCards(eve) {
    let url;
    if (eve === `shuffle` || control !== `stop`) {
        url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=4`
        control = `stop`;
    } else if (eve === `draw` || eve === 'buttonHit1' ||
        eve === 'buttonStay1' || eve === 'returToDealerTurne' ||
        eve === 'buttonDuble1' || eve === "splitHit") {
        url = `https://deckofcardsapi.com/api/deck/${cardObj.deckId}/draw/?count=1`
    }
    fetch(url).then(res => { return res.json() })
        .then(res => {
            if (eve === `shuffle`) {
                return cardObj.deckId = res.deck_id
            } else if (eve === `draw` || eve === 'buttonHit1' || eve === 'buttonStay1' ||
                eve === 'returToDealerTurne' || eve === 'buttonDuble1' || eve === "splitHit") {
                cardObj.cardImage = res.cards[0].image;
                cardObj.cardSuit = res.cards[0].suit;
                if (res.cards[0].value === "JACK" || res.cards[0].value === "QUEEN" || res.cards[0].value === "KING") {
                    cardObj.cardValue = 10;
                } else if (res.cards[0].value === "ACE") {
                    cardObj.cardValue = 11;
                    cardObj.contAce = `yes`
                } else {
                    cardObj.cardValue = parseInt(res.cards[0].value)
                };
                if (eve === `draw`) { firstRound(cardObj) }
                else if (eve === 'buttonHit1') { hitPlay1(cardObj) }
                else if (eve === 'buttonStay1') { stayPlay1(cardObj) }
                else if (eve === 'returToDealerTurne') { dealerTurne(cardObj) }
                else if (eve === 'buttonDuble1') { dobuleDow(cardObj) }
                else if (eve === 'splitHit') { hitSplit1(cardObj) }
            }
        })
        .catch(err => { console.log("something went wrong...", err) });
}
// ---------First round / deal the cards and check for BlackJack--------------------------------------------------
function firstRound(card) {
    if (turne === `Play1`) {
        $player1[play1.indToBoard].style.visibility = 'visible';
        $player1[play1.indToBoard].setAttribute('src', card.cardImage);
        play1.addCard(card.cardValue);
        play1.getHandScore();
        checkBlack(play1.score, play1.name, `One`);
        play1.addindToBoard();
        turne = `Play2`;
    } else if (turne === `Play2`) {
        player2[play2.indToBoard].style.visibility = 'visible';
        player2[play2.indToBoard].setAttribute('src', card.cardImage);
        play2.addCard(card.cardValue);
        play2.getHandScore();
        // checkBlack(play2.score, play2.name, `One`);
        play2.addindToBoard();
        turne = `Play3`;
    } else if (turne === `Play3`) {
        player3[play3.indToBoard].style.visibility = 'visible';
        player3[play3.indToBoard].setAttribute('src', card.cardImage);
        play3.addCard(card.cardValue);
        play3.getHandScore();
        // checkBlack(play1.score, play3.name, `One`);
        play3.addindToBoard();
        turne = `Dealer`;
    } else if (turne === `Dealer`) {
        if (dealer.indToBoard === 1) {
            dealer1[dealer.indToBoard].style.visibility = 'visible';
            dealer1[dealer.indToBoard].setAttribute('src', card.cardImage);
            dealer.addCard(card.cardValue);
            dealer.getHandScore();
            if (dealer.findAce() && dealer.score > 21) {
                dealer.addAceOne();
                dealer.getHandScore();
            }
            dealer.addindToBoard();
            turneTheCard(`firstRound`);
        } else {
            dealer1[dealer.indToBoard].style.visibility = 'visible';
            dealer1[dealer.indToBoard].setAttribute('src', './backCard.jpeg');
            dealer.cardImage = card.cardImage;
            dealer.addCard(card.cardValue);
            dealer.contAce = card.contAce;
            dealer.getHandScore();
            dealer.addindToBoard();
        }
        turne = `Play1`;
    }
}
// ---------------------BlackJack test/ Check the round and show the winner--------------------------------------
function checkBlack(black, player, round) {
    if(round === `One`) {
        if (black === 21 && player !== `Dealer`) {
            popUp(`${player} BlackJack`);
            turneTheCard();
            apiCards('returToDealerTurne');     
        }
    } else if (round === `Two`) {
        if (black > 21) { popUpBust(`${play1.name} Bust`) }
    } else if (round === `dealerTurne`) {
        if (dealer.score >= 17) {
            if (dealer.score > 21) {
                if (play1.score > 21) {
                    popUpWin(`Tie`);
                } else {                   
                    play1.addEarnes(1);
                    showCoinsPlayerOne.innerHTML = play1.coins
                    popUpWin(` Dealer Bust  /
                               ${play1.name} Wins`);
                }
            } else if (dealer.score === 21 && dealer.score !== play1.score
                || dealer.score > play1.score) {
                popUpWin('Dealer Wins');
            } else if (dealer.score === play1.score) {
                play1.coins += play1.betValue;
                showCoinsPlayerOne.innerHTML = play1.coins;
                popUpWin(`Tie`);
            } else if (dealer.score < play1.score) {                
                play1.addEarnes(1);
                showCoinsPlayerOne.innerHTML = play1.coins;
                popUpWin(`${play1.name} Wins`);
            }
        }
    }    
}
// ------------check For sure if dealer has Ace as the first card / release buttons for play---------------------
function turneTheCard(time) {
    if (time === `firstRound`) {
        if (dealer.hand[1] === 11) {
            popUpInsirance(`would you like insurance`);
            if (dealer.score === 21) {
                dealer1[0].setAttribute('src', dealer.cardImage);
                setTimeout(() => { restart() }, 4000);
            } else {
                movesOn.forEach(a => a.disabled = false);
                buttonBat1.disabled = true;
                buttonSplit1.disabled = true;
            }
        } else {
            movesOn.forEach(a => a.disabled = false);
            buttonBat1.disabled = true;
            buttonSplit1.disabled = true;
        }
    } else {
        dealer1[0].setAttribute('src', dealer.cardImage);
        movesOn.forEach(a => a.disabled = true);
        buttonBat1.disabled = true;
    }
}
// ----Button to Hit------------------------------------------------------------
function hitPlay1(card) {
    $player1[play1.indToBoard].style.visibility = 'visible';
    $player1[play1.indToBoard].setAttribute('src', card.cardImage);
    play1.addCard(card.cardValue);
    play1.getHandScore();
    if (play1.findAce() && play1.score > 21) {
        play1.addAceOne();
        play1.getHandScore();
    }
    play1.addindToBoard();
    checkBlack(play1.score, play1.name, `Two`);
    buttonDuble1.disabled = true;
}
// ---Button to stay -------------------------------------------------------------
function stayPlay1(obj) {
    turneTheCard();
    dealer.getHandScore();
    dealerTurne(obj);
}
// --------Button-Dobule Dow-------------------------------------------------------
function dobuleDow(card) {
    play1.coninsDeduct(play1.betValue);
    showCoinsPlayerOne.innerHTML = play1.coins;
    play1.betValue += play1.betValue;
    play1.addBet(play1.betValue);
    $player1[play1.indToBoard].style.visibility = 'visible';
    $player1[play1.indToBoard].setAttribute('src', card.cardImage);
    play1.addCard(card.cardValue);
    play1.getHandScore();
    if (play1.findAce() && play1.score > 21) {
        play1.addAceOne();
        play1.getHandScore();
    }
    play1.addindToBoard();
    checkBlack(play1.score, play1.name, `Two`);
    turneTheCard();
    dealer.getHandScore();
    apiCards('returToDealerTurne');
}
// ----Button Split-----(still not working)-------------------------------------------------------
let atrA;
function screenHit() {
    let atr = (a) => a = $player1[0].getAttribute(src)
    atrA = atr;

    splitPlay1 = new SplitObj(play1.name);
    $coins1[0].style.opacity = 0.1;
    $coins1[0].style.pointerEvents = "none";
    $split[0].style.visibility = 'visible';

    $cardsSplit1[0].style.visibility = 'visible';
    // $cardsSplit1[0].setAttribute('src', $player1[0].attributes.src);
    $cardsSplit1[0].setAttribute('src', atr);

    $cardsSplit2[0].style.visibility = 'visible';
    $cardsSplit2[0].setAttribute('src', $player1[1].attributes.src);
    $split2[0].style.opacity = 0.3;

    splitPlay1.addSplitCard(play1.hand[1]);
    play1.hand.pop();
    play1.indToBoard = 1;

    return splitPlay1;
}
// ----Button Hit Split 1-----(still not working)-------------------------------------------------------
function hitSplit1(card) {
    if (splitCont === 1) {
        $player1[play1.indToBoard].style.visibility = 'visible';
        $player1[play1.indToBoard].setAttribute('src', card.cardImage);
        play1.addCard(card.cardValue);
        play1.getHandScore();
        if (play1.findAce() && play1.score > 21) {
            play1.addAceOne();
            play1.getHandScore();
        }
        play1.addindToBoard();
        checkBlack(play1.score, play1.name, `Three`);
    } else if (splitCont = 2) {
        $player1[splitPlay1.indiceSplit].style.visibility = 'visible';
        $player1[splitPlay1.indiceSplit].setAttribute('src', card.cardImage);
        splitPlay1.addSplitCard(card.cardValue);
        splitPlay1.getHandScore();
        if (splitPlay1.splitFindAce() && splitPlay1.splitScore > 21) {
            splitPlay1.addSplitAceOne();
            splitPlay1.getHandScore();
        }
        splitPlay1.addindToBoard();
        checkBlack(splitPlay1.score, play1.name, `Three`);
    }
}
// ----Button Hit Split 1------(still not working)------------------------------------------------------
function staySplit1() {
    if (splitCont === 1) {
        $split2[0].style.opacity = '';
        $split1[0].style.opacity = 0.1;
        splitCont = 2;
    }
    else if (splitCont === 2) {
        $split1[0].style.opacity = '';
        $split2[0].style.opacity = '';
        $movesSplit[0].style.pointerEvents = "none";
        dealerTurne();
    }
}
// ------Dealer play---------------------------------------------------------
function dealerTurne(card) {
    if (dealer.score < 17) {
        dealer1[dealer.indToBoard].style.visibility = 'visible';
        dealer1[dealer.indToBoard].setAttribute('src', card.cardImage);
        dealer.addCard(card.cardValue);
        dealer.getHandScore();
        if (dealer.hand.includes(11) && dealer.score > 21) {
            dealer.addAceOne();
            dealer.getHandScore();
        }
        dealer.addindToBoard();
        apiCards('returToDealerTurne');
    }
    checkBlack(dealer.score, dealer.name, `dealerTurne`);
}
// ----popUp -------------------------------
function popUp(msg) {
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    closePopup.addEventListener('click', () => {
        popupWrapper.style.display = 'none';
    })
};
// ----popUp No Bet--betting information-----------------------------
function popUpNoBet(msg) {
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    closePopup.addEventListener('click', () => {
        popupWrapper.style.display = 'none';
    })
};
// ----popUp - lose or win------------------------------
function popUpWin(msg) {
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    closePopup.addEventListener('click', () => {
        popupWrapper.style.display = 'none';
        restart();
    })
};
// ----pop Up -- bust-----------------------------
function popUpBust(msg) {
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    closePopup.addEventListener('click', () => {
        popupWrapper.style.display = 'none';
        restart();
    })
};
// ----popUp -- Split Bust------still not woking-----------------------
function popUpSplitBust(msg) {
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    closePopup.addEventListener('click', () => {
        popupWrapper.style.display = 'none';
        $split1[0].style.opacity = 0.1;
    })
};
// ----pop Up - insurance ------------------------------
function popUpInsirance(msg) {
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    setTimeout(() => popupWrapper.style.display = 'none', 2000);
};
// ---- Restart --- clear and initialize the fields---------------------------
function restart() {
    play1.clearHand();
    play2.clearHand();
    play3.clearHand();
    dealer.clearHand(); 
    turne = `Play1`;
    //=> moving the control to "0" allows me to have a new key for a new shuffled deck
    control = '';
    apiCards(`shuffle`)
    $allCards.each(e => {
        $allCards[e].style.visibility = `hidden`
        $allCards[e].setAttribute('src', '');
    })
    movesOn.forEach(e => e.disabled = true);
    buttonBat1.disabled = false;
    allCoinsOne.forEach(a => a.disabled = false);
};
// ------All bet buttons-------------------------------------------
allCoinsOne[0].addEventListener('click', () => {
    play1.coninsDeduct(1);
    play1.addBet(1);
    showCoinsPlayerOne.innerHTML = play1.coins;
})
allCoinsOne[1].addEventListener('click', () => {
    play1.coninsDeduct(5);
    play1.addBet(5);
    showCoinsPlayerOne.innerHTML = play1.coins;
})
allCoinsOne[2].addEventListener('click', () => {
    play1.coninsDeduct(10);
    play1.addBet(10);
    showCoinsPlayerOne.innerHTML = play1.coins;
})

allCoinsTwo[0].addEventListener('click', () => {
    play2.coninsDeduct(1);
    play2.addBet(1);
    showCoinsPlayerTwo.innerHTML = play2.coins;

})
allCoinsTwo[1].addEventListener('click', () => {
    play2.coninsDeduct(5);
    play2.addBet(5);
    showCoinsPlayerTwo.innerHTML = play2.coins;
})
allCoinsTwo[2].addEventListener('click', () => {
    play2.coninsDeduct(10);
    play2.addBet(10);
    showCoinsPlayerTwo.innerHTML = play2.coins;
})

allCoinsThree[0].addEventListener('click', () => {
    play3.coninsDeduct(1);
    play3.addBet(1);
    showCoinsPlayerThree.innerHTML = play3.coins;

})
allCoinsThree[1].addEventListener('click', () => {
    play3.coninsDeduct(5);
    play3.addBet(5);
    showCoinsPlayerThree.innerHTML = play3.coins;
})
allCoinsThree[2].addEventListener('click', () => {
    play3.coninsDeduct(10);
    play3.addBet(10);
    showCoinsPlayerThree.innerHTML = play3.coins;
})
// -------------giving actions to the buttons-----------------------------------
movesOn[0].addEventListener('click', shuffleDraw)
movesOn[1].addEventListener('click', shuffleDraw)
movesOn[2].addEventListener('click', shuffleDraw)
movesOn[3].addEventListener('click', screenHit)
movesOn[4].addEventListener('click', shuffleDraw)
movesSplit.forEach(e => e.addEventListener('click', shuffleDraw))

// calling api to shuffle game start
apiCards(`shuffle`)
