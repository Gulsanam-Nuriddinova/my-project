let shuffledImages = images.sort(() => Math.random() - 0.5);
let gameBoard = document.getElementById('gameBoard');
let selectedCards = [];
let matchedCards = 0;

function createCards() {
    gameBoard.innerHTML = '';
    shuffledImages.forEach((image, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        let cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        let cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        let cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.textContent = image;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (selectedCards.length < 2 && !this.classList.contains('matched') && !this.classList.contains('flip')) {
        this.classList.add('flip');
        selectedCards.push(this);

        if (selectedCards.length === 2) {
            setTimeout(checkMatch, 700);
        }
    }
}

function startTimer() {
    const timerDisplay = document.getElementById("timerDisplay");
    timerDisplay.innerText = `Time: ${timeLeft} s`;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time: ${timeLeft} s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(false);
        }
    }, 1000);
}

function endGame(isWin) {
    clearInterval(timer);

    const resultDisplay = document.getElementById("resultDisplay");
    resultDisplay.innerText = isWin ? "You Win 🥳!" : "You Lose 😕!";
    resultDisplay.style.display = "block";

    const adBox = document.getElementById("adBox");
    adBox.style.display = "block";

    let countdown = 4;
    const countdownInterval = setInterval(() => {
        if (countdown > 0) {
            countdown--;
        } else {
            clearInterval(countdownInterval);
            adBox.style.display = "none"; 
            resetGame(); 
        }
    }, 1000);

    setTimeout(() => {
        resultDisplay.style.display = "none";
    }, 4000);
}

function checkMatch() {
    if (selectedCards[0].dataset.image === selectedCards[1].dataset.image) {
        selectedCards.forEach(card => card.classList.add('matched'));
        matchedCards += 2;

        if (matchedCards === images.length) {
            endGame(true);
        }
    } else {
        selectedCards.forEach(card => card.classList.remove('flip'));
    }
    selectedCards = [];
}

createCards();
startTimer();

document.getElementById("closeAdButton").addEventListener("click", () => {
    const adBox = document.getElementById("adBox");
    adBox.style.display = "none"; 
});