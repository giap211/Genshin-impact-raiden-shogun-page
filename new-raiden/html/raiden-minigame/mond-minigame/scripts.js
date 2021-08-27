const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBorad = false;
let firstCard, secondCard;


function flipCard() {
    if (lockBorad) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

    } else {
        // second click
        secondCard = this;

        checkForMatch();
    }
}


function checkForMatch() {

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();

    // // do cards match?
    // if () {
    //     // it's a match!
    //     disableCards();
    // } else {
    //     // not a match
    //     unflipCards();
    // }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard); 
    
    resetBoard();
}

function unflipCards(){
    lockBorad = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    },1000);
}

function resetBoard() {
    [hasFlippedCard, lockBorad] = [false, false];
    [firstCard, secondCard] = [null, null];
}


(function shuffle() {
    cards.forEach(card=> {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


