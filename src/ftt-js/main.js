// function getRandomItem(arr) {
//     return arr[Math.floor(Math.random() * arr.length)];
// }

// function getUniqueColors(count) {
//     const shuffled = [...colors].sort(() => Math.random() - 0.5);
//     return shuffled.slice(0, count);
// }

// function showGameOver() {
//     gameOverScreen.classList.remove('hidden');
// }

// function hideGameOver() {
//     gameOverScreen.classList.add('hidden');
//     generateNewRound();
// }

// generateNewRound();

const correctText = document.getElementById('correct-text');
const optionsContainer = document.getElementById('options-container');
const gameOverScreen = document.getElementById('game-over');

function generateNewRound() {
    const correctWord = getRandomItem(colors);
    correctText.textContent = correctWord;
    correctText.style.color = 'black';

    let choices = [correctWord];
    while (choices.length < colorsCount) {
        const rand = getRandomItem(colors);
        if (!choices.includes(rand)) {
            choices.push(rand);
        }
    }

    const shuffledTexts = choices.sort(() => Math.random() - 0.5);
    const uniqueColors = getUniqueColors(colorsCount);
    optionsContainer.innerHTML = '';

    shuffledTexts.forEach((word, i) => {
        const btn = document.createElement('button');
        btn.textContent = word;
        btn.className = 'color-btn';
        btn.style.color = uniqueColors[i].toLowerCase();
        btn.onclick = () => {
            if (word === correctWord) {
                generateNewRound();
            } else {
                showGameOver();
            }
        };
        optionsContainer.appendChild(btn);
    });
}

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getUniqueColors(count) {
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function showGameOver() {
    gameOverScreen.classList.remove('hidden');
}

function hideGameOver() {
    gameOverScreen.classList.add('hidden');
    generateNewRound();
}

// O'yinni boshlash
generateNewRound();
