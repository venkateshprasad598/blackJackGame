// BLACKJACK GAME

let blackjackGame = {
    "you": {
        "scoreSpan": "#your-blackjack-result",
        "div": "#your-box",
        "score": 0
    },

    "dealer": {
        "scoreSpan": "#dealer-blackjack-result",
        "div": "#dealer-box",
        "score": 0
    },

    "cards": ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],

    "cradsMap": { '2': 2, '3': 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "K": 10, "J": 10, "Q": 10, "A": [1, 11] },

    "wins": 0,

    "losses": 0,

    "draws": 0,

    "isStand": false,

    "turnsOver": false,

};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitsound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3')
const lossSound = new Audio('static/sounds/aww.mp3')


document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit)

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic)

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal)






// Main Function ************
function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        console.log(card);
        showCard(card, YOU)
        updateScore(card, YOU)
        showScore(YOU)
    }
}
// Main Function ************



//  CREATING AND APPENDING IMAGES 

function showCard(card, activePlayer) {

    if (activePlayer["score"] <= 21) {
        let cardImage = document.createElement('img')
        cardImage.src = `static/images/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage)
        hitsound.play()
    }
}


//  SELECTING RANDOM IMAGES
function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img')
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')

        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        // MAKING THINGS BACK TO ZERO
        YOU['score'] = 0;
        DEALER['score'] = 0;


        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';

        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').style.color = 'white';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = "black";

        blackjackGame['turnsOver'] = true;
    }
}


function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex]
}

// YOU : SCORE

function updateScore(card, activePlayer) {
    //  I f adding 11 keeps me below 21, add 11, Otherwise add 1..
    if (card === "A") {

        if (activePlayer["score"] + blackjackGame["cradsMap"][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cradsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cradsMap'][card][0];
        }

    } else {
        activePlayer['score'] += blackjackGame['cradsMap'][card]
    }


}



function showScore(activePlayer) {
    // BUST LOGIC
    if (activePlayer["score"] > 21) {
        document.querySelector(activePlayer["scoreSpan"]).textContent = 'Bust!';
        document.querySelector(activePlayer["scoreSpan"]).style.color = "red"
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


// OPPOSITE DEALER - STAND
async function dealerLogic() {
    blackjackGame['isStand'] = true;


    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard(); 
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
     
        blackjackGame['turnsOver'] = true;
        let winners = computeWinnner();
        showResult(winners);

}




// Compute winner and return who just won
// update the wins, draws and losses.

function computeWinnner() {
    let winner;


    if (YOU["score"] <= 21) {
        // condition : higher score than dealer or when dealer busts but you're 21 or under
        if (YOU["score"] > DEALER["score"] || (DEALER["score"] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;

        } else if (YOU["score"] < DEALER["score"]) {
            blackjackGame['losses']++;
            winner = DEALER;

        } else if (YOU["score"] === DEALER["score"]) {
            blackjackGame['draws']++;
        }

        // Condition when user busts but dealer doesn't
    } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;

        //condition when you and dealer busts
    } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
        blackjackGame['draws']++;
    }

    console.log(blackjackGame);
    return winner;
}



function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = "You Won";
            messageColor = "green";
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = "You Lost!"
            messageColor = "red"
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = "You drew!";
            messageColor = "black"
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}
