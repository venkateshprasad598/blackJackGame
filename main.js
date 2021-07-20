// BLACKJACK GAME

let blackjackGame = {
    "you" : {
        "scoreSpan" : "#your-blackjack-result",
        "div" : "#your-box",
        "score" : 0
    },

    "dealer" : {
        "scoreSpan" : "#dealer-blackjack-result",
        "div" : "#dealer-box",
        "score" : 0
    },

    "cards": ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],

}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']



let hitButton = document.querySelector('#blackjack-hit-button')
hitButton.addEventListener('click', blackjackHit)

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal)




const hitsound = new Audio('/static/sounds/swish.m4a')

function blackjackHit() {
    let card = randomCard();
    console.log(card);
    showCard(DEALER)
} 

function showCard(activePlayer){
    let cardImage = document.createElement('img')
    cardImage.src = '/static/images/A.png'
    document.querySelector(activePlayer['div']).appendChild(cardImage)
    hitsound.play()
}

function blackjackDeal(){
let yourImages = document.querySelector('#your-box').querySelectorAll('img')
let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')

for (let i = 0; i < yourImages.length; i++){
    yourImages[i].remove();
}

for (let i = 0; i < dealerImages.length; i++){
    dealerImages[i].remove();
}
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex]
}