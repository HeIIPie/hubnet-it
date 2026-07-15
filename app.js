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

// Параметры таймера для вопросов
let quizTimer = null;
let quizTimeLeft = 15;

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
    progress = 0;
    updateProgressBar();
    board = generateValidBoard();
    renderBoard();
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
// 7. КВИЗ (ВИКТОРИНА)
// ============================================================

function triggerQuizQuestion() {
    isBoardLocked = true;
    renderBoard();

    const questions = currentLesson.questions;
    
    if (currentQuestionIndex >= questions.length) {
        finishLesson();
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
        clickedBtn.classList.add('correct');
        setTimeout(() => {
            closeQuizUI();
            currentQuestionIndex++;
            progress = 0;
            updateProgressBar();
            
            if (currentQuestionIndex < currentLesson.questions.length) {
                isBoardLocked = false;
                renderBoard();
            } else {
                finishLesson();
            }
        }, 1500);
    } else {
        clickedBtn.classList.add('wrong');
        buttons[correctIdx].classList.add('correct');
        
        setTimeout(() => {
            closeQuizUI();
            alert('❌ Неверно! Попробуйте зарядить батарею заново.');
            progress = 0;
            updateProgressBar();
            board = generateValidBoard();
            isBoardLocked = false;
            renderBoard();
        }, 2000);
    }
}

function handleTimeOut(correctIdx) {
    const buttons = document.querySelectorAll('.btn-answer');
    buttons.forEach(btn => btn.disabled = true);
    buttons[correctIdx].classList.add('correct');

    setTimeout(() => {
        closeQuizUI();
        alert('⏰ Время вышло! Попробуйте зарядить батарею заново.');
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

// ============================================================
// 8. ЗАВЕРШЕНИЕ УРОКА
// ============================================================

function finishLesson() {
    clearInterval(quizTimer);
    closeQuizUI();

    alert(`🎉 Поздравляем! Вы полностью изучили урок: "${currentLesson.title}"!`);
    
    const currentIdx = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIdx !== -1 && currentIdx + 1 < lessons.length) {
        const nextLessonId = lessons[currentIdx + 1].id;
        unlockLesson(nextLessonId);
    }

    showScreen('lessons-screen');
}

// ============================================================
// 9. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}