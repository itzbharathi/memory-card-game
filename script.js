const gameBoard = document.querySelector('.game-board');
const scoreDisplay = document.getElementById('score');

const icons = [
    '🐶', '🐱', '🐦', '🐝', '🍎', '🥕', '🐠', '🐙',  // Theme: Animals, Birds, Insects, Fruits, Veggies, Sea Creatures
    '🐶', '🐱', '🐦', '🐝', '🍎', '🥕', '🐠', '🐙'
];

let shuffledIcons = icons.sort(() => 0.5 - Math.random());
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

// Create cards
shuffledIcons.forEach(icon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.innerHTML = '<span class="card-content">?</span>';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
});

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.innerHTML = `<span class="card-content">${this.dataset.icon}</span>`;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    lockBoard = true;
    if (firstCard.dataset.icon === secondCard.dataset.icon) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        updateScore();
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.innerHTML = '<span class="card-content">?</span>';
            secondCard.innerHTML = '<span class="card-content">?</span>';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

function updateScore() {
    score += 10;
    scoreDisplay.textContent = score;
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}
