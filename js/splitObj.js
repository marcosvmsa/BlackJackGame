// ------- Split Object------------------------
class SplitObj {
    constructor(name) {
        this.splitCont = 1;
        this.indiceSplit = 1;
        this.splitHand = [];
        this.splitScore = 0;
    }
    addIndiceSplit() {
        this.indiceSplit += 1;
    };
    addSplitCard(value) {
        this.splitHand.push(value);
    };
    splitHandScore() {
        this.score = this.splitHand.reduce((acc, card) => acc + card, 0);
    }
    splitFindAce() {
        return this.splitHand.includes(11);
    }
    addSplitAceOne() {
        this.hand[this.splitHand.indexOf(11)] = 1;
    }
}