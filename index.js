const getCards = document.getElementById("get-cards")
const drawCards = document.getElementById("draw-cards")
const computerCard = document.getElementById("computer-card")
const playerCard = document.getElementById("player-card")
const cardsRemaining = document.getElementById("cards-remaining")
const cardContainer = document.getElementById("card-container")
const announcement = document.getElementById("announcement")

let deckId = ""
let computerScore = 0
let playerScore = 0

getCards.addEventListener("click", ()=> {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle")
  .then(res => res.json())
  .then(data =>{
    deckId = data.deck_id 
    cardsRemaining.textContent += data.remaining
  
  })
})


drawCards.addEventListener("click", ()=> {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
  .then(res => res.json())
  .then(data => {
  
      cardContainer.children[0].innerHTML  = `<img src=${data.cards[0].image}>`
      cardContainer.children[1].innerHTML  = `<img src=${data.cards[1].image}>`
      cardsRemaining.textContent = ""
      cardsRemaining.textContent += data.remaining
      let winnerText = whostheWinner(data.cards[0].value, data.cards[1].value)
      announcement.textContent = winnerText

  
      if(data.remaining === 0) {
        drawCards.disabled= true;
        drawCards.style.background = "grey"
        drawCards.style.opacity = .5
      }
  })
})



function whostheWinner(cardOne, cardTwo) {
  let result = ""
  const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]

  const cardOneValue = valueOptions.indexOf(cardOne)
  const cardTwoValue = valueOptions.indexOf(cardTwo)
  
  if(cardOneValue > cardTwoValue) {
    computerScore += 1
    return "Computer is the winner!"
   
  } else if (cardOneValue < cardTwoValue) {
    playerScore += 1
    return  "You are the winner!"
  } else {
    return  "It's a War!"
  }
} 