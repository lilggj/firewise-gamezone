
// Game data
const questions = [
  {
    id: 1,
    question: "Что нужно делать, если ты увидел дым или огонь?",
    options: [
      { id: "a", text: "Спрятаться под кровать или в шкаф", isCorrect: false },
      { id: "b", text: "Быстро покинуть помещение", isCorrect: true },
      { id: "c", text: "Открыть окна, чтобы проветрить комнату", isCorrect: false }
    ],
    explanation: "Если ты видишь дым или огонь, нужно сразу выйти из помещения. Не прячься и не пытайся проветрить - это опасно!"
  },
  {
    id: 2,
    question: "Что делать, если в школе объявили пожарную тревогу?",
    options: [
      { id: "a", text: "Собрать все свои вещи и потом выйти", isCorrect: false },
      { id: "b", text: "Выйти из здания вместе с учителем и одноклассниками", isCorrect: true },
      { id: "c", text: "Позвонить родителям и ждать их", isCorrect: false }
    ],
    explanation: "При пожарной тревоге в школе нужно сразу выйти с учителем и классом. Не теряй время на сбор вещей!"
  },
  {
    id: 3,
    question: "Если твоя одежда загорелась, что нужно делать?",
    options: [
      { id: "a", text: "Бежать за помощью", isCorrect: false },
      { id: "b", text: "Снять горящую одежду", isCorrect: false },
      { id: "c", text: "Остановиться, упасть на пол и кататься, чтобы потушить огонь", isCorrect: true }
    ],
    explanation: "Если загорелась одежда - остановись, упади и катайся по полу. Это поможет потушить огонь!"
  },
  {
    id: 4,
    question: "Что делать, если ты один в торговом центре и начался пожар?",
    options: [
      { id: "a", text: "Найти охранника или продавца и сказать о пожаре", isCorrect: true },
      { id: "b", text: "Спрятаться в примерочной", isCorrect: false },
      { id: "c", text: "Продолжать ходить по магазинам", isCorrect: false }
    ],
    explanation: "В торговом центре при пожаре нужно найти взрослого работника (охранника или продавца) и сообщить о пожаре."
  },
  {
    id: 5,
    question: "Какой номер телефона нужно набрать, чтобы вызвать пожарных?",
    options: [
      { id: "a", text: "112 или 01", isCorrect: true },
      { id: "b", text: "911", isCorrect: false },
      { id: "c", text: "102", isCorrect: false }
    ],
    explanation: "В России номер пожарной службы - 01, а единый номер экстренных служб - 112."
  }
];

// Game state
let playerName = '';
let currentQuestionIndex = 0;
let diamonds = 0;

// DOM Elements
const registrationScreen = document.getElementById('registration-screen');
const gameScreen = document.getElementById('game-screen');
const completionScreen = document.getElementById('completion-screen');
const registrationForm = document.getElementById('registration-form');
const nameInput = document.getElementById('name');
const playerNameElement = document.getElementById('player-name');
const diamondsCountElement = document.getElementById('diamonds-count');
const progressElement = document.getElementById('progress');
const questionTitleElement = document.getElementById('question-title');
const questionNumberElement = document.getElementById('question-number');
const optionsContainer = document.getElementById('options-container');
const explanationElement = document.getElementById('explanation');
const explanationTextElement = document.getElementById('explanation-text');
const completionNameElement = document.getElementById('completion-name');
const completionDiamondsElement = document.getElementById('completion-diamonds');
const playAgainButton = document.getElementById('play-again');

// Event Listeners
registrationForm.addEventListener('submit', handleStartGame);
playAgainButton.addEventListener('click', resetGame);

// Game Functions
function handleStartGame(event) {
  event.preventDefault();
  
  playerName = nameInput.value.trim();
  
  if (!playerName) {
    alert('Пожалуйста, введи своё имя');
    return;
  }
  
  // Update UI with player name
  playerNameElement.textContent = playerName;
  diamondsCountElement.textContent = diamonds;
  
  // Hide registration screen, show game screen
  registrationScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  
  // Start the game with the first question
  loadQuestion(0);
}

function loadQuestion(index) {
  // Update the progress bar
  const progressPercentage = (index / questions.length) * 100;
  progressElement.style.width = `${progressPercentage}%`;
  
  const question = questions[index];
  
  // Update question title and number
  questionTitleElement.textContent = question.question;
  questionNumberElement.textContent = `Вопрос ${index + 1} из ${questions.length}`;
  
  // Clear previous options
  optionsContainer.innerHTML = '';
  
  // Hide explanation
  explanationElement.classList.add('hidden');
  
  // Add options
  question.options.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('option');
    optionElement.dataset.id = option.id;
    optionElement.dataset.correct = option.isCorrect;
    optionElement.textContent = option.text;
    
    // Don't add click event here - we'll use event delegation instead
    optionsContainer.appendChild(optionElement);
  });
}

function handleAnswer(isCorrect) {
  // Disable all options
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.classList.add('disabled');
    
    if (option.dataset.correct === 'true') {
      option.classList.add('correct');
    }
    else if (option.dataset.correct === 'false' && option.classList.contains('selected')) {
      option.classList.add('incorrect');
    }
  });
  
  // Award diamonds for correct answers
  if (isCorrect) {
    diamonds += 1;
    diamondsCountElement.textContent = diamonds;
  }
  
  // Show explanation
  explanationTextElement.textContent = questions[currentQuestionIndex].explanation;
  explanationElement.classList.remove('hidden');
  
  // Move to next question after a delay
  setTimeout(() => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
      loadQuestion(currentQuestionIndex);
    } else {
      completeGame();
    }
  }, 2000);
}

function completeGame() {
  // Update completion screen
  completionNameElement.textContent = playerName;
  completionDiamondsElement.textContent = diamonds;
  
  // Hide game screen, show completion screen
  gameScreen.classList.add('hidden');
  completionScreen.classList.remove('hidden');
}

function resetGame() {
  // Reset game state
  currentQuestionIndex = 0;
  diamonds = 0;
  
  // Clear form
  nameInput.value = '';
  
  // Show registration screen
  completionScreen.classList.add('hidden');
  registrationScreen.classList.remove('hidden');
}

// Event delegation for option selection
optionsContainer.addEventListener('click', function(event) {
  const optionElement = event.target.closest('.option');
  
  if (optionElement && !optionElement.classList.contains('disabled')) {
    // Mark option as selected
    optionElement.classList.add('selected');
    
    // Handle the answer
    const isCorrect = optionElement.dataset.correct === 'true';
    handleAnswer(isCorrect);
  }
});
