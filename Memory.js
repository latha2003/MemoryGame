const colors = ['green', 'red', 'yellow', 'blue'];
const pattern = [];
let playerPattern = [];
let round = 1;
let gameStarted = false;
let strictMode = false;
let showingPattern = false;

const startButton = document.querySelector('.start-btn');
const message = document.querySelector('.message');

startButton.addEventListener('click', () => {
  if (!gameStarted) {
    startButton.textContent = 'Restart';
    gameStarted = true;
    showingPattern = true; // Set showingPattern to true
    message.textContent = 'Watch the pattern';
    generatePattern();
    playPatternAndSelectColors();
  } else {
    resetGame();
  }
});

document.querySelectorAll('.btn').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    if (gameStarted && !showingPattern) { // Check if not showing the pattern
      const color = colors[index];
      playerPattern.push(color);
      animateButton(btn);
      checkPattern();
    }
  });
});

function generatePattern() {
  const maxDisplayColors = 4; // Set the maximum number of colors to display
  pattern.length = 0; // Clear the existing pattern

  for (let i = 0; i < maxDisplayColors; i++) {
    const randomColor = colors[Math.floor(Math.random() * 4)];
    pattern.push(randomColor);
  }
}

function playPatternAndSelectColors() {
  let i = 0;
  const interval = setInterval(() => {
    const color = pattern[i];
    animateButton(document.querySelector(`.${color}`));
    i++;
    if (i >= pattern.length) {
      clearInterval(interval);
      playerPattern = [];
      showingPattern = false; // Set showingPattern to false
      message.textContent = 'Select colors'; // Display "Select colors" message
    }
  }, 1000);
}

function animateButton(btn) {
  btn.classList.add('active');
  setTimeout(() => {
    btn.classList.remove('active');
  }, 500);
}

function checkPattern() {
  if (playerPattern.length === pattern.length) {
    if (playerPattern.join('') === pattern.join('')) {
      round++;
      message.textContent = 'Watch the pattern';
      setTimeout(() => {
        generatePattern();
        playPatternAndSelectColors();
      }, 1500);
    } else {
      message.textContent = 'Wrong! Try again.';
      if (strictMode) {
        resetGame();
      } else {
        setTimeout(() => {
          playPatternAndSelectColors();
          playerPattern = [];
        }, 1500);
      }
    }
  } else if (playerPattern[playerPattern.length - 1] !== pattern[playerPattern.length - 1]) {
    message.textContent = 'Wrong! Try again.';
    if (strictMode) {
      resetGame();
    } else {
      setTimeout(() => {
        playPatternAndSelectColors();
        playerPattern = [];
      }, 1500);
    }
  }
}

function resetGame() {
  round = 1;
  pattern.length = 0;
  playerPattern.length = 0;
  gameStarted = false;
  strictMode = false;
  startButton.textContent = 'Start';
  message.textContent = '';
}
