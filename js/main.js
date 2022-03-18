// Space to show de coins => 
const $playerOne = $('#playerOne')//space to display the cards
const showCoinsPlayerOne = document.querySelector('.showCoinsPlayerOne')
const showCoinsPlayerTwo = document.querySelector('.showCoinsPlayerTwo')
const showCoinsPlayerThree = document.querySelector('.showCoinsPlayerThree')
// <=
const popupWrapper = document.querySelector('#popupWrapper')// PopUp
const $allCards = $('.cards')//space to display the cards
const $player1 = $('.player1')//Playr 1 Table 
const $coins1 = $('.coins1')//
const $split = $('.split')//
const $cardsSplit = $('.cardsSplit')//
const $cardsSplit1 = $('.cardsSplit1')//
const $split1 = $('.split1')// 
const $split2 = $('.split2')// 
const movesSplit = document.querySelectorAll('.movesSplit')// 
const $cardsSplit2 = $('.cardsSplit2')//butao Split  
const $buttonPlayer1 = $('.buttonPlayer1')//butao Split  
const player2 = document.querySelectorAll('.player2')//Playr 2 Table 
const player3 = document.querySelectorAll('.player3')//Playr 3 Table 
const dealer1 = document.querySelectorAll('.dealer1')//Dealer Table 
const movesOn = document.querySelectorAll('.movesOn')//Action Player 1 Buttons
const movesTwo = document.querySelectorAll('.movesTwo')//Action Player 2 Buttons
const movesThree = document.querySelectorAll('.movesThree')//Action Player 3 Buttons
const allCoinsOne = document.querySelectorAll('.allCoinsOne')//Buttons to selectamount Player 1 
const allCoinsTwo = document.querySelectorAll('.allCoinsTwo')//Buttons to selectamount Player 2 
const allCoinsThree = document.querySelectorAll('.allCoinsThree')//Buttons to selectamount Player 1
const playerTwo = document.querySelector('#playerTwo')//
const playerTree = document.querySelector('#playerTree')//

// ---------Controle-Varieble----------------------------
let turne = `Play1`;
let control = '';
let splitPlay1;
let splitCont = 1;
