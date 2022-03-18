// --Player Class Constructor ------------------------------------------
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.coins = 0;
        this.cardImage = ``;
        this.indToBoard = 0;
        this.score = 0;
        this.betValue = 0;
    }
    addindToBoard() {
        this.indToBoard += 1
    };

    addCard(card) {
        this.hand.push(card)
    };

    clearHand() {
        this.hand = [];
        this.cardImage = ``;
        this.indToBoard = 0;
        this.score = 0;
        this.betValue = 0;
        this.coins = this.coins
    };
    getHandScore() {
        this.score = this.hand.reduce((acc, card) => acc + card, 0)
    };

    coninsDeduct(coin) {
        this.coins = this.coins - coin
    };
    addBet(coins) {
        this.betValue = coins
        console.log(this.betValue)
    }
    
    addEarnes(times) {
        // const total = this.betValue * times 
        this.betValue = this.betValue * times 
        this.coins += this.betValue
    }

    findAce() {
        return this.hand.includes(11)
    }
    addAceOne() {
        this.hand[this.hand.indexOf(11)] = 1
    }
}