function giveCard(){
    //fetch logic would go here instead
    return new Card(3, 'H')
  }
  
  function getCard(player){
    player.addCard(giveCard())
    
  }
  
  
  class Player{
    constructor(name){
      this.name = name;
      this.hand = []
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
  
  const cardImages = {ah: '...'}
  
  class Card{
    constructor(value, suit) {
      this.value = value;
      this.suit = suit;
    }
  }