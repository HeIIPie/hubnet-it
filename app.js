// ==========================================
// 1. ИНИЦИАЛИЗАЦИЯ TELEGRAM WEBAPP
// ==========================================
if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.setHeaderColor('#000000'); 
    tg.setBackgroundColor('#03060f'); 
    tg.expand(); 
}

// Элементы интерфейса
const terminalScreen = document.getElementById('terminal-screen');
const mainApp = document.getElementById('main-app');
const logLines = document.querySelectorAll('.log-line');
const logsContainer = document.getElementById('logs-container');
const appLogo = document.getElementById('app-logo');

// Резервный логотип при ошибке загрузки had-banner.png
function handleLogoError(imgElement) {
    const parent = imgElement.parentElement;
    const placeholder = document.createElement('div');
    placeholder.className = 'logo-placeholder';
    placeholder.innerText = 'HubNet IT\nAcademy';
    parent.replaceChild(placeholder, imgElement);
}
if(appLogo) {
    appLogo.onerror = () => handleLogoError(appLogo);
}

// Запуск анимации терминала
window.addEventListener('DOMContentLoaded', () => {
    startTerminalAnimation();
});

function startTerminalAnimation() {
    logLines.forEach((line) => {
        const delay = parseInt(line.getAttribute('data-delay'));
        setTimeout(() => {
            line.style.display = 'block';
            if (logsContainer) logsContainer.scrollTop = logsContainer.scrollHeight;
        }, delay);
    });

    setTimeout(() => {
        if(terminalScreen) {
            terminalScreen.style.opacity = '0';
            setTimeout(() => terminalScreen.style.display = 'none', 500);
        }
        if(mainApp) mainApp.classList.add('active');
    }, 4200);
}

// Заглушки кликов для обычных кнопок
document.getElementById('btn-profile').addEventListener('click', () => {
    alert('Открываем профиль пользователя...');
});
document.querySelectorAll('.menu-item').forEach(item => {
    if(item.getAttribute('data-target') !== 'networks') {
        item.addEventListener('click', () => {
            alert(`Раздел: ${item.querySelector('.menu-item-title').innerText}`);
        });
    }
});


// ==========================================
// 2. ДВИЖОК ИГРЫ "ТРИ В РЯД + ИНТЕРАКТИВНЫЙ КВИЗ"
// ==========================================

// Тематические вопросы по SMTP / POP3 / IMAP (всего 5 штук)
const questions = [
    {
        q: "Какой порт по умолчанию используется для незащищенного соединения SMTP?",
        a: ["25", "110", "143"],
        correct: 0
    },
    {
        q: "Какой порт используется шифрованным протоколом POP3S (SSL/TLS)?",
        a: ["465", "993", "995"],
        correct: 2
    },
    {
        q: "Какой протокол синхронизирует почту между сервером и несколькими устройствами?",
        a: ["SMTP", "IMAP", "POP3"],
        correct: 1
    },
    {
        q: "Какую команду отправляет клиент SMTP для приветствия сервера?",
        a: ["HELO/EHLO", "MAIL FROM", "RCPT TO"],
        correct: 0
    },
    {
        q: "Безопасный порт IMAPS по умолчанию?",
        a: ["587", "993", "143"],
        correct: 1
    }
];

const icons = ['🌐', '🛡️', '🧪', '🐍', '🎮', '💻', '⚡'];
const boardSize = 6; // Сетка 6х6
let board = [];
let progress = 0; // Накопление шкалы (0 - 100)
let combo = 0;
let selectedIndex = null;
let isAnimating = false; // Блокирует ходы во время анимации обрушения фишек
let isQuizActive = false; // Блокирует доску во время вопроса

let currentQuestionIndex = 0; // Индекс текущего вопроса (0-4)
let timerInterval = null; // Для тающей шкалы-таймера
let timeLeft = 100; // Процент оставшегося времени на вопрос

// Элементы игры
const gameScreen = document.getElementById('game-screen');
const gameBoard = document.getElementById('game-board');
const comboAlert = document.getElementById('combo-alert');
const progressBar = document.getElementById('progress-bar');
const gameTip = document.getElementById('game-tip');

const statusPanel = document.getElementById('status-panel');
const marquee = document.getElementById('marquee');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const answersGrid = document.getElementById('answers-grid');

// Вход в игру "Компьютерные сети"
document.querySelector('[data-target="networks"]').addEventListener('click', () => {
    mainApp.style.display = 'none';
    gameScreen.classList.remove('hidden');
    startGame();
});

// Выход из игры
document.getElementById('btn-back').addEventListener('click', () => {
    clearInterval(timerInterval);
    gameScreen.classList.add('hidden');
    mainApp.style.display = 'flex';
});

function startGame() {
    progress = 0;
    currentQuestionIndex = 0;
    combo = 0;
    isAnimating = false;
    isQuizActive = false;
    selectedIndex = null;
    clearInterval(timerInterval);
    
    updateProgressUI();
    closeQuizUI();
    createValidBoard();
}

// Создаем игровое поле без готовых совпадений на старте
function createValidBoard() {
    do {
        board = [];
        for (let i = 0; i < boardSize * boardSize; i++) {
            const randIcon = icons[Math.floor(Math.random() * icons.length)];
            board.push(randIcon);
        }
    } while (hasMatches().length > 0);

    renderBoard();
}

function renderBoard() {
    gameBoard.innerHTML = '';
    board.forEach((icon, index) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.innerText = icon;
        tile.setAttribute('data-index', index);
        tile.addEventListener('click', () => onTileClick(index));
        gameBoard.appendChild(tile);
    });
}

// Клик по фишке
function onTileClick(index) {
    if (isAnimating || isQuizActive) return; // Игнорируем клики, если идет расчет поля или открыт вопрос

    if (selectedIndex === null) {
        selectedIndex = index;
        gameBoard.children[index].classList.add('selected');
    } else {
        const firstIdx = selectedIndex;
        const secondIdx = index;
        gameBoard.children[firstIdx].classList.remove('selected');
        selectedIndex = null;

        if (isAdjacent(firstIdx, secondIdx)) {
            swapAndCheck(firstIdx, secondIdx);
        }
    }
}

function isAdjacent(idx1, idx2) {
    const r1 = Math.floor(idx1 / boardSize);
    const c1 = idx1 % boardSize;
    const r2 = Math.floor(idx2 / boardSize);
    const c2 = idx2 % boardSize;
    return (Math.abs(r1 - r2) + Math.abs(c1 - c2)) === 1;
}

function swapAndCheck(idx1, idx2) {
    isAnimating = true;
    swap(idx1, idx2);
    renderBoard();

    const matchedIndices = hasMatches();

    if (matchedIndices.length > 0) {
        combo = 1;
        processMatches(matchedIndices);
    } else {
        setTimeout(() => {
            swap(idx1, idx2);
            renderBoard();
            isAnimating = false;
        }, 300);
    }
}

function swap(i, j) {
    const temp = board[i];
    board[i] = board[j];
    board[j] = temp;
}

function hasMatches() {
    let matchSet = new Set();
    // Горизонтали
    for (let r = 0; r < boardSize; r++) {
        let matchLen = 1;
        for (let c = 0; c < boardSize; c++) {
            const idx = r * boardSize + c;
            const nextIdx = idx + 1;
            if (c < boardSize - 1 && board[idx] === board[nextIdx]) {
                matchLen++;
            } else {
                if (matchLen >= 3) {
                    for (let i = 0; i < matchLen; i++) matchSet.add(idx - i);
                }
                matchLen = 1;
            }
        }
    }
    // Вертикали
    for (let c = 0; c < boardSize; c++) {
        let matchLen = 1;
        for (let r = 0; r < boardSize; r++) {
            const idx = r * boardSize + c;
            const nextIdx = (r + 1) * boardSize + c;
            if (r < boardSize - 1 && board[idx] === board[nextIdx]) {
                matchLen++;
            } else {
                if (matchLen >= 3) {
                    for (let i = 0; i < matchLen; i++) matchSet.add(idx - (i * boardSize));
                }
                matchLen = 1;
            }
        }
    }
    return Array.from(matchSet);
}

function processMatches(matchedIndices) {
    // Каждая исчезнувшая плитка дает +5% к прогрессу. Комбо дает множитель!
    const progressGained = matchedIndices.length * 4 * combo;
    progress = Math.min(100, progress + progressGained);
    updateProgressUI();

    if (combo > 1) {
        comboAlert.innerText = `COMBO X${combo}! (+${progressGained}%)`;
    } else {
        comboAlert.innerText = `+${progressGained}%`;
    }

    matchedIndices.forEach(idx => {
        gameBoard.children[idx].classList.add('pop');
    });

    setTimeout(() => {
        matchedIndices.forEach(idx => { board[idx] = null; });
        dropTiles();
        renderBoard();

        setTimeout(() => {
            const nextMatches = hasMatches();
            if (nextMatches.length > 0) {
                combo++;
                processMatches(nextMatches);
            } else {
                comboAlert.innerText = '';
                isAnimating = false;
                
                // Проверяем: если шкала достигла 100%, запускаем Квиз!
                if (progress >= 100) {
                    launchQuiz();
                }
            }
        }, 350);

    }, 300);
}

function dropTiles() {
    for (let c = 0; c < boardSize; c++) {
        let columnTiles = [];
        for (let r = 0; r < boardSize; r++) {
            const idx = r * boardSize + c;
            if (board[idx] !== null) columnTiles.push(board[idx]);
        }
        const missingCount = boardSize - columnTiles.length;
        const newTiles = [];
        for (let i = 0; i < missingCount; i++) {
            newTiles.push(icons[Math.floor(Math.random() * icons.length)]);
        }
        const finalColumn = [...newTiles, ...columnTiles];
        for (let r = 0; r < boardSize; r++) {
            board[r * boardSize + c] = finalColumn[r];
        }
    }
}

// Обновление шкалы
function updateProgressUI() {
    progressBar.style.width = `${progress}%`;
    gameTip.innerText = `Вопрос: ${currentQuestionIndex + 1}/5 | Зарядка: ${Math.floor(progress)}%`;
}

// ==========================================
// 3. ИНТЕРАКТИВНЫЙ КВИЗ (ОБРАБОТКА ФАЗЫ ВОПРОСА)
// ==========================================

function launchQuiz() {
    isQuizActive = true;
    gameBoard.classList.add('board-locked'); // Визуально глушим игровое поле
    
    // Переключаем интерфейс верхней панели
    marquee.classList.add('hidden');
    quizContainer.classList.remove('hidden');

    // Берем текущий вопрос
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.q;

    // Генерируем кнопки ответов
    answersGrid.innerHTML = '';
    currentQuestion.a.forEach((ansText, index) => {
        const btn = document.createElement('button');
        btn.className = 'ans-btn';
        btn.innerText = ansText;
        btn.onclick = () => selectAnswer(index);
        answersGrid.appendChild(btn);
    });

    // Настраиваем шкалу как тающий таймер
    progressBar.classList.add('timer-mode');
    timeLeft = 100;
    progressBar.style.width = '100%';
    gameTip.innerText = `ВНИМАНИЕ: СИСТЕМА ЗАПРАШИВАЕТ ОТВЕТ!`;

    // Запускаем таймер: 10 секунд на размышление (минус 10% каждую секунду)
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft -= 10; // Шкала упадет до нуля за 10 секунд
        progressBar.style.width = `${timeLeft}%`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            onQuizTimeout();
        }
    }, 1000);
}

// Игрок выбрал вариант ответа
function selectAnswer(selectedIndex) {
    clearInterval(timerInterval);
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correct) {
        // ПРАВИЛЬНЫЙ ОТВЕТ!
        alert("✔️ Верно! Доступ разрешен.");
        currentQuestionIndex++;
        progress = 0; // Сбрасываем шкалу для зарядки к следующему вопросу
        
        if (currentQuestionIndex >= questions.length) {
            // ИГРА ПОЛНОСТЬЮ ПРОЙДЕНА
            setTimeout(() => {
                alert("🏆 Поздравляем! Ты успешно ответил на все 5 вопросов по протоколам сетей! Возвращаемся в меню.");
                gameScreen.classList.add('hidden');
                mainApp.style.display = 'flex';
            }, 600);
        } else {
            // Переход к следующему витку игры
            resumeMainGameplay();
        }
    } else {
        // НЕПРАВИЛЬНЫЙ ОТВЕТ
        alert("❌ Ошибка! Неверный порт или протокол.");
        penalizePlayer();
    }
}

// Время вышло
function onQuizTimeout() {
    alert("⏰ Время вышло! Сессия заблокирована.");
    penalizePlayer();
}

// Штраф за ошибку или таймаут
function penalizePlayer() {
    // Отбрасываем шкалу прогресса на 40%, чтобы игроку пришлось набрать еще немного фишек для повторной попытки
    progress = 40; 
    resumeMainGameplay();
}

// Возврат к стандартной игре "Три в ряд"
function resumeMainGameplay() {
    isQuizActive = false;
    gameBoard.classList.remove('board-locked');
    
    // Снимаем красный режим таймера со шкалы
    progressBar.classList.remove('timer-mode');
    
    closeQuizUI();
    updateProgressUI();
}

function closeQuizUI() {
    quizContainer.classList.add('hidden');
    marquee.classList.remove('hidden');
}
