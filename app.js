// ============================================================
// 1. ИМПОРТЫ
// ============================================================

import { 
    BOARD_SIZE, 
    TILE_TYPES, 
    generateValidBoard, 
    checkMatches, 
    areNeighbors 
} from './js/game.js';

import { 
    showScreen, 
    renderLessonsList, 
    getUnlockedLessons, 
    unlockLesson,
    initTelegram,
    getUserName
} from './js/ui.js';

import { lessons } from './js/data/lessons.js';

// ============================================================
// 2. СОСТОЯНИЕ ИГРЫ (STATE)
// ============================================================

let currentLesson = null;
let currentQuestionIndex = 0;
let progress = 0; // Процент зарядки от 0 до 100
let board = [];
let selectedTileIndex = null;
let isBoardLocked = false;

// НОВЫЕ ПЕРЕМЕННЫЕ ДЛЯ МЕХАНИКИ ЩИТОВ
let quizTimer = null;
let quizTimeLeft = 15;
let shields = 3;
let combo = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let startTime = null;
let elapsedTime = 0;

// ФРАЗЫ ДЛЯ ПОРАЖЕНИЯ
const lossPhrases = [
    "💥 Сеть подверглась DDoS-атаке. Щиты не выдержали.",
    "🔥 Брандмауэр пробит. Злоумышленник проник в сеть.",
    "⚡ Критическая ошибка маршрутизации. Сеть недоступна.",
    "🕵️ Фишинговая атака прошла успешно. Доступ потерян.",
    "📡 Потеря связи с DNS-сервером. Узлы не отвечают.",
    "🧨 Вредоносный пакет проник в ядро сети. Система пала.",
    "🔌 Сетевой экран отключён. Трафик перехвачен.",
    "🌩️ Уязвимость в протоколе TCP/IP использована. Сеть скомпрометирована.",
    "💀 Сервер перегружен. Все соединения разорваны.",
    "🏴‍☠️ Несанкционированный доступ подтверждён. Сеть под контролем атакующего."
];

// ============================================================
// 3. ИНИЦИАЛИЗАЦИЯ
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем Telegram Web App
    initTelegram();
    
    // Обновляем приветствие с именем пользователя
    const userName = getUserName();
    const subtitle = document.querySelector('.main-subtitle');
    if (subtitle && userName) {
        subtitle.textContent = `Привет, ${userName}! Изучай технологии, играя в "Три в ряд"!`;
    }

    // 1. Кнопка «Компьютерные сети» в главном меню
    const btnNetworks = document.getElementById('btn-computer-networks');
    if (btnNetworks) {
        btnNetworks.addEventListener('click', () => {
            renderLessonsList(selectLesson);
            showScreen('lessons-screen');
        });
    }

    // 2. Назад из списка уроков в главное меню
    const btnLessonsBack = document.getElementById('btn-lessons-back');
    if (btnLessonsBack) {
        btnLessonsBack.addEventListener('click', () => {
            showScreen('main-app');
        });
    }

    // 3. Назад из лекции в список уроков
    const btnLectureBack = document.getElementById('btn-lecture-back');
    if (btnLectureBack) {
        btnLectureBack.addEventListener('click', () => {
            showScreen('lessons-screen');
        });
    }

    // 4. Кнопка «Начать практику» на экране лекции
    const btnStartPractice = document.getElementById('btn-start-practice');
    if (btnStartPractice) {
        btnStartPractice.addEventListener('click', () => {
            startPractice();
        });
    }

    // 5. Кнопка «Выход» из игры в список уроков
    const btnBack = document.getElementById('btn-back');
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            clearInterval(quizTimer);
            showScreen('lessons-screen');
        });
    }

    // 6. Кнопка «Смешать» на игровом поле
    const btnShuffle = document.getElementById('btn-shuffle');
    if (btnShuffle) {
        btnShuffle.addEventListener('click', () => {
            if (!isBoardLocked) {
                board = generateValidBoard();
                renderBoard();
            }
        });
    }

    // Принудительно показываем главный экран при старте
    showScreen('main-app');
});

// ============================================================
// 4. ЛОГИКА ВЫБОРА УРОКА
// ============================================================

function selectLesson(lesson) {
    currentLesson = lesson;
    currentQuestionIndex = 0;
    progress = 0;
    
    // Заполняем экран лекции данными
    const titleEl = document.getElementById('lecture-title');
    const textEl = document.getElementById('lecture-text');
    
    if (titleEl) titleEl.textContent = lesson.title;
    if (textEl) textEl.innerHTML = lesson.lecture;
    
    showScreen('lecture-screen');
}

// ============================================================
// 5. ЗАПУСК ИГРЫ "ТРИ В РЯД"
// ============================================================

function startPractice() {
    // Сбрасываем все переменные
    progress = 0;
    shields = 3;
    combo = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    currentQuestionIndex = 0;
    startTime = Date.now();
    elapsedTime = 0;
    
    board = generateValidBoard();
    renderBoard();
    updateShieldsDisplay();
    updateComboDisplay();
    updateProgressBar();
    showScreen('game-screen');
}

// ============================================================
// 6. РЕНДЕРИНГ И ЛОГИКА ИГРОВОГО ПОЛЯ
// ============================================================

function renderBoard() {
    const boardContainer = document.getElementById('game-board');
    if (!boardContainer) return;
    
    boardContainer.innerHTML = '';

    if (isBoardLocked) {
        boardContainer.classList.add('board-locked');
    } else {
        boardContainer.classList.remove('board-locked');
    }

    board.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.className = 'tile';
        tileElement.textContent = tile || '⬛';
        tileElement.dataset.index = index;

        if (selectedTileIndex === index) {
            tileElement.classList.add('selected');
        }

        tileElement.addEventListener('click', () => handleTileClick(index));
        boardContainer.appendChild(tileElement);
    });
}

async function handleTileClick(index) {
    if (isBoardLocked) return;

    if (selectedTileIndex === null) {
        selectedTileIndex = index;
        renderBoard();
    } else {
        const firstIndex = selectedTileIndex;
        selectedTileIndex = null;

        if (areNeighbors(firstIndex, index)) {
            isBoardLocked = true;
            renderBoard();

            swapTiles(firstIndex, index);
            renderBoard();

            const matches = checkMatches(board);

            if (matches.length > 0) {
                await processMatches(matches);
            } else {
                await delay(200);
                swapTiles(firstIndex, index);
                isBoardLocked = false;
                renderBoard();
            }
        } else {
            selectedTileIndex = index;
            renderBoard();
        }
    }
}

function swapTiles(idx1, idx2) {
    const temp = board[idx1];
    board[idx1] = board[idx2];
    board[idx2] = temp;
}

async function processMatches(matches) {
    const tileElements = document.querySelectorAll('.tile');
    matches.forEach(idx => {
        if (tileElements[idx]) {
            tileElements[idx].classList.add('match');
        }
    });

    await delay(250);

    progress = Math.min(100, progress + matches.length * 5);
    updateProgressBar();

    matches.forEach(idx => {
        board[idx] = null;
    });

    dropTiles();
    renderBoard();
    
    await delay(300);

    const nextMatches = checkMatches(board);
    if (nextMatches.length > 0) {
        await processMatches(nextMatches);
    } else {
        isBoardLocked = false;
        renderBoard();

        if (progress >= 100) {
            triggerQuizQuestion();
        }
    }
}

function dropTiles() {
    for (let c = 0; c < BOARD_SIZE; c++) {
        let writeIdx = BOARD_SIZE - 1;
        for (let r = BOARD_SIZE - 1; r >= 0; r--) {
            const readIdx = r * BOARD_SIZE + c;
            if (board[readIdx] !== null) {
                board[writeIdx * BOARD_SIZE + c] = board[readIdx];
                if (writeIdx !== r) {
                    board[readIdx] = null;
                }
                writeIdx--;
            }
        }
        
        for (let r = writeIdx; r >= 0; r--) {
            const idx = r * BOARD_SIZE + c;
            board[idx] = TILE_TYPES[Math.floor(Math.random() * TILE_TYPES.length)];
        }
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    if (progressBar) {
        progressBar.classList.remove('timer-mode');
        progressBar.style.width = `${progress}%`;
    }
    if (progressText) {
        progressText.textContent = `Зарядка: ${progress}%`;
    }
}

// ============================================================
// 7. ОТОБРАЖЕНИЕ ЩИТОВ И КОМБО
// ============================================================

function updateShieldsDisplay() {
    const shieldContainer = document.getElementById('shields-display');
    if (!shieldContainer) return;
    
    let display = '';
    for (let i = 0; i < 3; i++) {
        if (i < shields) {
            display += '🛡️ ';
        } else {
            display += '⬜ ';
        }
    }
    shieldContainer.textContent = display.trim();
}

function updateComboDisplay() {
    const comboDisplay = document.getElementById('combo-display');
    if (!comboDisplay) return;
    
    if (combo > 0) {
        comboDisplay.textContent = `🔥 Комбо: ${combo}`;
        comboDisplay.style.color = '#39ff14';
    } else {
        comboDisplay.textContent = '🔥 Комбо: 0';
        comboDisplay.style.color = '#64748b';
    }
}

// ============================================================
// 8. КВИЗ (ВИКТОРИНА) — ОБНОВЛЕННАЯ ВЕРСИЯ
// ============================================================

function triggerQuizQuestion() {
    isBoardLocked = true;
    renderBoard();

    const questions = currentLesson.questions;
    
    if (currentQuestionIndex >= questions.length) {
        showWinScreen();
        return;
    }

    const questionData = questions[currentQuestionIndex];
    const modal = document.getElementById('quiz-modal');
    const questionEl = document.getElementById('quiz-question');
    const answersContainer = document.getElementById('quiz-answers');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    if (!modal || !questionEl || !answersContainer) return;

    if (progressBar) {
        progressBar.classList.add('timer-mode');
        progressBar.style.width = '100%';
    }
    quizTimeLeft = 15;
    if (progressText) {
        progressText.textContent = `Время на ответ: ${quizTimeLeft} сек`;
    }

    questionEl.textContent = questionData.question;
    answersContainer.innerHTML = '';

    questionData.answers.forEach((answer, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-answer';
        btn.textContent = answer;
        btn.addEventListener('click', () => handleAnswerClick(idx, questionData.correct, btn));
        answersContainer.appendChild(btn);
    });

    modal.classList.remove('hidden');

    clearInterval(quizTimer);
    quizTimer = setInterval(() => {
        quizTimeLeft--;
        if (progressBar) {
            progressBar.style.width = `${(quizTimeLeft / 15) * 100}%`;
        }
        if (progressText) {
            progressText.textContent = `Время на ответ: ${quizTimeLeft} сек`;
        }

        if (quizTimeLeft <= 0) {
            clearInterval(quizTimer);
            handleTimeOut(questionData.correct);
        }
    }, 1000);
}

function handleAnswerClick(selectedIdx, correctIdx, clickedBtn) {
    clearInterval(quizTimer);
    
    const buttons = document.querySelectorAll('.btn-answer');
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIdx === correctIdx) {
        // ✅ ПРАВИЛЬНЫЙ ОТВЕТ
        clickedBtn.classList.add('correct');
        combo++;
        correctAnswers++;
        
        // Сообщение о комбо
        if (combo >= 3) {
            const comboMessages = ['🔥 Отлично! Комбо x3!', '🔥🔥 Мощь! Комбо x4!', '🔥🔥🔥 НЕОСТАНОВИМ!'];
            const msg = comboMessages[Math.min(combo - 3, comboMessages.length - 1)];
            showComboMessage(msg);
        }
        
        setTimeout(() => {
            closeQuizUI();
            currentQuestionIndex++;
            progress = 0;
            updateProgressBar();
            updateShieldsDisplay();
            updateComboDisplay();
            
            if (currentQuestionIndex < currentLesson.questions.length) {
                isBoardLocked = false;
                renderBoard();
            } else {
                showWinScreen();
            }
        }, 1200);
        
    } else {
        // ❌ НЕПРАВИЛЬНЫЙ ОТВЕТ
        clickedBtn.classList.add('wrong');
        buttons[correctIdx].classList.add('correct');
        shields--;
        wrongAnswers++;
        combo = 0;
        
        updateShieldsDisplay();
        updateComboDisplay();
        
        setTimeout(() => {
            closeQuizUI();
            
            if (shields <= 0) {
                showLossScreen();
                return;
            }
            
            const shieldMsg = shields === 2 
                ? '❌ Атака прошла! Осталось щитов: ' + shields 
                : '⚠️ Ещё один щит пал! Осталось: ' + shields;
            alert(shieldMsg);
            
            progress = 0;
            updateProgressBar();
            board = generateValidBoard();
            isBoardLocked = false;
            renderBoard();
            
        }, 1500);
    }
}

function handleTimeOut(correctIdx) {
    const buttons = document.querySelectorAll('.btn-answer');
    buttons.forEach(btn => btn.disabled = true);
    buttons[correctIdx].classList.add('correct');

    setTimeout(() => {
        closeQuizUI();
        shields--;
        combo = 0;
        updateShieldsDisplay();
        updateComboDisplay();
        
        if (shields <= 0) {
            showLossScreen();
            return;
        }
        
        alert(`⏰ Время вышло! Осталось щитов: ${shields}`);
        progress = 0;
        updateProgressBar();
        board = generateValidBoard();
        isBoardLocked = false;
        renderBoard();
    }, 2000);
}

function closeQuizUI() {
    const modal = document.getElementById('quiz-modal');
    if (modal) modal.classList.add('hidden');
}

function showComboMessage(text) {
    const container = document.getElementById('game-screen');
    if (!container) return;
    
    const msg = document.createElement('div');
    msg.className = 'combo-message';
    msg.textContent = text;
    msg.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        font-weight: 700;
        color: #39ff14;
        text-shadow: 0 0 30px rgba(57, 255, 20, 0.8);
        z-index: 50;
        animation: comboPop 0.8s ease forwards;
        pointer-events: none;
    `;
    container.appendChild(msg);
    
    setTimeout(() => {
        msg.remove();
    }, 1000);
}

// ============================================================
// 9. ЭКРАН ПОБЕДЫ
// ============================================================

function showWinScreen() {
    const modal = document.getElementById('quiz-modal');
    if (modal) modal.classList.add('hidden');
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    let resultText = '';
    let resultSubtext = '';
    const score = correctAnswers;
    const total = currentLesson.questions.length;
    
    if (score === total) {
        resultText = '🌟 ИДЕАЛЬНО! 5/5';
        resultSubtext = 'Ты настоящий сетевик! Угроза нейтрализована полностью!';
    } else if (score >= 4) {
        resultText = '🔥 ОТЛИЧНО! 4/5';
        resultSubtext = 'Отличная работа! Ты понял основное, но есть нюансы.';
    } else if (score >= 3) {
        resultText = '💪 ХОРОШО! 3/5';
        resultSubtext = 'Основа тебе понятна, стоит перечитать лекцию.';
    } else {
        resultText = '📖 НЕПЛОХО! ' + score + '/5';
        resultSubtext = 'Рекомендуем перечитать лекцию и попробовать заново.';
    }
    
    const modalContent = document.querySelector('.quiz-content');
    if (modalContent) {
        modalContent.innerHTML = `
            <div class="quiz-header">
                <span class="quiz-badge">🎉 Урок пройден!</span>
            </div>
            <h3 style="font-size: 2rem; color: #39ff14;">${resultText}</h3>
            <p style="color: #94a3b8; margin: 10px 0;">${resultSubtext}</p>
            <div style="display: flex; justify-content: space-around; padding: 10px 0; font-size: 0.9rem; color: #cbd5e1;">
                <span>🔥 Комбо: ${combo}</span>
                <span>⏱️ ${timeStr}</span>
                <span>🛡️ Щитов: ${shields}/3</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                <button onclick="restartLesson()" class="btn-answer" style="text-align: center; background: rgba(57, 255, 20, 0.2); border-color: #39ff14;">🔄 Пройти заново</button>
                <button onclick="nextLesson()" class="btn-answer" style="text-align: center; background: rgba(59, 130, 246, 0.2); border-color: #3b82f6;">➡️ Следующий урок</button>
                <button onclick="goToMenu()" class="btn-answer" style="text-align: center;">🏠 В меню</button>
            </div>
        `;
        modal.classList.remove('hidden');
    }
}

// ============================================================
// 10. ЭКРАН ПОРАЖЕНИЯ
// ============================================================

function showLossScreen() {
    const modal = document.getElementById('quiz-modal');
    if (modal) modal.classList.add('hidden');
    
    const randomPhrase = lossPhrases[Math.floor(Math.random() * lossPhrases.length)];
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const modalContent = document.querySelector('.quiz-content');
    if (modalContent) {
        modalContent.innerHTML = `
            <div class="quiz-header">
                <span class="quiz-badge" style="border-color: #ef4444; color: #ef4444;">💀 СЕТЬ ПАЛА</span>
            </div>
            <h3 style="font-size: 1.3rem; color: #f87171;">${randomPhrase}</h3>
            <p style="color: #94a3b8; margin: 10px 0;">Атака оказалась слишком мощной. Попробуй ещё раз!</p>
            <div style="display: flex; justify-content: space-around; padding: 10px 0; font-size: 0.9rem; color: #cbd5e1;">
                <span>📊 Результат: ${correctAnswers}/5</span>
                <span>⏱️ ${timeStr}</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                <button onclick="restartLesson()" class="btn-answer" style="text-align: center; background: rgba(239, 68, 68, 0.2); border-color: #ef4444;">🔄 Пройти заново</button>
                <button onclick="goToMenu()" class="btn-answer" style="text-align: center;">🏠 В меню</button>
            </div>
        `;
        modal.classList.remove('hidden');
    }
}

// ============================================================
// 11. ФУНКЦИИ ДЛЯ КНОПОК
// ============================================================

function restartLesson() {
    closeQuizUI();
    startPractice();
}

function nextLesson() {
    closeQuizUI();
    const currentIdx = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIdx !== -1 && currentIdx + 1 < lessons.length) {
        const nextLessonId = lessons[currentIdx + 1].id;
        unlockLesson(nextLessonId);
        const nextLesson = lessons[currentIdx + 1];
        selectLesson(nextLesson);
    } else {
        alert('🎉 Ты прошёл все уроки! Возвращаемся в меню.');
        showScreen('main-app');
    }
}

function goToMenu() {
    closeQuizUI();
    showScreen('main-app');
}

// ============================================================
// 12. ЭКСПОРТ ФУНКЦИЙ В ГЛОБАЛЬНУЮ ОБЛАСТЬ (ДЛЯ onclick)
// ============================================================

window.restartLesson = function() {
    closeQuizUI();
    startPractice();
};

window.goToMenu = function() {
    closeQuizUI();
    showScreen('main-app');
};

window.nextLesson = function() {
    closeQuizUI();
    const currentIdx = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIdx !== -1 && currentIdx + 1 < lessons.length) {
        const nextLessonId = lessons[currentIdx + 1].id;
        unlockLesson(nextLessonId);
        const nextLesson = lessons[currentIdx + 1];
        selectLesson(nextLesson);
    } else {
        alert('🎉 Ты прошёл все уроки! Возвращаемся в меню.');
        showScreen('main-app');
    }
};
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}