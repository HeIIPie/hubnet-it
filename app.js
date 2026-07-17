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
let progress = 0;
let board = [];
let selectedTileIndex = null;
let isBoardLocked = false;
let isQuestionPending = false;

// Механика щитов и комбо
let quizTimer = null;
let quizTimeLeft = 15;
let shields = 3;
let combo = 0;
let matchCombo = 0;
let bestMatchCombo = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let startTime = null;
let elapsedTime = 0;

// Таймеры для уменьшения зарядки
let drainTimer = null;
let isDrainPaused = false;

// Очки и таймер
let score = 0;
let timerInterval = null;
let seconds = 0;

// Фразы для поражения
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
    console.log('🚀 Инициализация приложения...');
    
    initTelegram();
    
    const userName = getUserName();
    const greeting = document.getElementById('user-greeting');
    if (greeting && userName) {
        greeting.textContent = userName;
    }

    // Кнопка «Компьютерные сети»
    const btnNetworks = document.getElementById('btn-computer-networks');
    if (btnNetworks) {
        btnNetworks.addEventListener('click', () => {
            renderLessonsList(selectLesson);
            showScreen('lessons-screen');
        });
    }

    // Назад из списка уроков
    const btnLessonsBack = document.getElementById('btn-lessons-back');
    if (btnLessonsBack) {
        btnLessonsBack.addEventListener('click', () => {
            clearInterval(drainTimer);
            showScreen('main-app');
        });
    }

    // Назад из лекции
    const btnLectureBack = document.getElementById('btn-lecture-back');
    if (btnLectureBack) {
        btnLectureBack.addEventListener('click', () => {
            showScreen('lessons-screen');
        });
    }

    // Кнопка «Начать практику»
    const btnStartPractice = document.getElementById('btn-start-practice');
    if (btnStartPractice) {
        btnStartPractice.addEventListener('click', () => {
            startPractice();
        });
    }

    // Кнопка «Выход» из игры
    const btnBack = document.getElementById('btn-back');
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            clearInterval(drainTimer);
            clearInterval(quizTimer);
            stopTimer();
            showScreen('lessons-screen');
        });
    }

    // Кнопка «Смешать»
    const btnShuffle = document.getElementById('btn-shuffle');
    if (btnShuffle) {
        btnShuffle.addEventListener('click', () => {
            if (!isBoardLocked) {
                board = generateValidBoard();
                renderBoard();
            }
        });
    }

    // ===== КНОПКА "МОЙ ПРОФИЛЬ" =====
    const btnProfile = document.getElementById('btn-profile');
    if (btnProfile) {
        btnProfile.addEventListener('click', () => {
            console.log('👤 Открываем профиль');
            showScreen('profile-screen');
            updateProfileData();
        });
    }

    // ===== КНОПКА "НАЗАД" ИЗ ПРОФИЛЯ =====
    const btnProfileBack = document.getElementById('btn-profile-back');
    if (btnProfileBack) {
        btnProfileBack.addEventListener('click', () => {
            showScreen('main-app');
        });
    }

    // ===== КНОПКА СБРОСА =====
    const btnReset = document.getElementById('btn-reset');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (confirm('⚠️ Сбросить весь прогресс? Это удалит все сохранённые данные.')) {
                localStorage.clear();
                alert('✅ Прогресс сброшен! Обнови страницу.');
                location.reload();
            }
        });
    }

    showScreen('main-app');
    console.log('✅ Инициализация завершена');

    // Запускаем экран загрузки
    startLoadingScreen();
});

// ============================================================
// 4. ЛОГИКА ВЫБОРА УРОКА
// ============================================================

function selectLesson(lesson) {
    currentLesson = lesson;
    currentQuestionIndex = 0;
    progress = 0;
    
    const titleEl = document.getElementById('lecture-title');
    const textEl = document.getElementById('lecture-text');
    
    if (titleEl) titleEl.textContent = lesson.title;
    if (textEl) textEl.innerHTML = lesson.lecture;
    
    showScreen('lecture-screen');
}

// ============================================================
// 5. ЗАПУСК ИГРЫ (ПОЛНЫЙ СБРОС)
// ============================================================

function startPractice() {
    progress = 0;
    shields = 3;
    combo = 0;
    matchCombo = 0;
    bestMatchCombo = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    currentQuestionIndex = 0;
    startTime = Date.now();
    elapsedTime = 0;
    isDrainPaused = false;
    isBoardLocked = false;
    selectedTileIndex = null;
    score = 0;
    seconds = 0;
    isQuestionPending = false;
    
    resetQuestionsIndicators();
    
    const modal = document.getElementById('quiz-modal');
    if (modal) modal.classList.add('hidden');
    
    board = generateValidBoard();
    renderBoard();
    
    updateShieldsDisplay();
    updateComboDisplay();
    updateProgressBar();
    updateScoreDisplay();
    updateQuestionsIndicators();
    startTimer();
    showScreen('game-screen');
    
    startDrainTimer(2);
    
    console.log('✅ startPractice: все переменные сброшены, currentQuestionIndex =', currentQuestionIndex);
}

// ============================================================
// 6. ТАЙМЕР УМЕНЬШЕНИЯ ЗАРЯДКИ
// ============================================================

function startDrainTimer(rate) {
    clearInterval(drainTimer);
    drainTimer = setInterval(() => {
        if (isDrainPaused) return;
        progress = Math.max(0, progress - rate);
        updateProgressBar();
    }, 1000);
}

function stopDrainTimer() {
    clearInterval(drainTimer);
}

function pauseDrain() {
    isDrainPaused = true;
}

function resumeDrain() {
    isDrainPaused = false;
}

// ============================================================
// 7. ОЧКИ И ТАЙМЕР
// ============================================================

function updateScoreDisplay() {
    const scoreEl = document.getElementById('score-display');
    if (scoreEl) scoreEl.textContent = `🏆 ${score} очков`;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        const timerEl = document.getElementById('timer-display');
        if (timerEl) timerEl.textContent = `⏱️ ${mins}:${secs}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

// ============================================================
// 8. ИНДИКАТОРЫ ВОПРОСОВ
// ============================================================

function updateQuestionsIndicators() {
    const indicators = document.querySelectorAll('.q-indicator');
    indicators.forEach((el, index) => {
        el.classList.remove('current');
        if (index === currentQuestionIndex && 
            !el.classList.contains('answered-correct') && 
            !el.classList.contains('answered-wrong')) {
            el.classList.add('current');
        }
    });
}

function markQuestionResult(index, isCorrect) {
    const indicators = document.querySelectorAll('.q-indicator');
    if (indicators[index]) {
        indicators[index].classList.remove('current');
        if (isCorrect) {
            indicators[index].textContent = '✅';
            indicators[index].style.color = '#22c55e';
            indicators[index].classList.add('answered-correct');
        } else {
            indicators[index].textContent = '❌';
            indicators[index].style.color = '#ef4444';
            indicators[index].classList.add('answered-wrong');
        }
        updateQuestionsIndicators();
    }
}

function resetQuestionsIndicators() {
    const indicators = document.querySelectorAll('.q-indicator');
    indicators.forEach(el => {
        el.textContent = '❓';
        el.style.color = '#ffffff';
        el.classList.remove('answered-correct', 'answered-wrong', 'current');
    });
}

// ============================================================
// 9. РЕНДЕРИНГ И ЛОГИКА ИГРОВОГО ПОЛЯ
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
                matchCombo = 0;
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
    matchCombo++;
    
    if (matchCombo > bestMatchCombo) {
        bestMatchCombo = matchCombo;
    }
    
    if (matchCombo > 1) {
        showComboMessage(`🔥 Комбо x${matchCombo}!`);
        updateComboDisplay();
        const boardEl = document.getElementById('game-board');
        if (boardEl) {
            boardEl.classList.add('combo-active');
            setTimeout(() => boardEl.classList.remove('combo-active'), 500);
        }
    }
    
    const tileElements = document.querySelectorAll('.tile');
    matches.forEach((idx, i) => {
        if (tileElements[idx]) {
            if (matchCombo > 1) {
                tileElements[idx].classList.add('match-combo');
            } else {
                tileElements[idx].classList.add('match');
            }
            tileElements[idx].style.animationDelay = `${i * 0.05}s`;
        }
    });

    await delay(400);

    const points = matches.length * 10 * Math.min(matchCombo, 5);
    score += points;
    updateScoreDisplay();

    progress = Math.min(100, progress + matches.length * 5);
    updateProgressBar();

    // ===== ЕСЛИ ДОСТИГЛИ 100% — СТАВИМ ФЛАГ =====
    if (progress >= 100) {
        progress = 100;
        updateProgressBar();
        isQuestionPending = true;
        console.log('⚡ Зарядка 100%! Вопрос ждёт окончания комбо...');
    }
    // ===========================================

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
        matchCombo = 0;
        isBoardLocked = false;
        renderBoard();
        updateComboDisplay();

        // === ЕСЛИ ВОПРОС ЖДАЛ — ПОКАЗЫВАЕМ ===
        if (isQuestionPending) {
            isQuestionPending = false;
            console.log('✅ Комбо закончились! Показываем вопрос...');
            if (currentLesson && currentQuestionIndex < currentLesson.questions.length) {
                triggerQuizQuestion();
            } else {
                showWinScreen();
            }
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
        progressText.textContent = `Концентрация: ${Math.round(progress)}%`;
    }
}

// ============================================================
// 10. ОТОБРАЖЕНИЕ БАТАРЕЙ И КОМБО
// ============================================================

function updateShieldsDisplay() {
    const shieldContainer = document.getElementById('shields-display');
    if (!shieldContainer) return;
    
    let display = '';
    for (let i = 0; i < 3; i++) {
        if (i < shields) {
            display += '🔋 ';
        } else {
            display += '🪫 ';
        }
    }
    shieldContainer.textContent = display.trim();
}

function updateComboDisplay() {
    const comboDisplay = document.getElementById('combo-display');
    const comboFrame = document.getElementById('combo-frame');
    
    if (!comboDisplay) return;
    
    if (bestMatchCombo > 0) {
        comboDisplay.textContent = `🔥 Лучшее комбо: x${bestMatchCombo}`;
        comboDisplay.style.color = '#39ff14';
        if (comboFrame) comboFrame.classList.add('active');
    } else {
        comboDisplay.textContent = '🔥 Комбо: 0';
        comboDisplay.style.color = '#64748b';
        if (comboFrame) comboFrame.classList.remove('active');
    }
}

// ============================================================
// 11. КВИЗ
// ============================================================

function triggerQuizQuestion() {
    console.log('🔥 triggerQuizQuestion ВЫЗВАН!');
    
    if (!currentLesson) {
        console.error('❌ currentLesson = null!');
        showWinScreen();
        return;
    }
    
    if (!currentLesson.questions || currentLesson.questions.length === 0) {
        console.error('❌ Нет вопросов в уроке!');
        showWinScreen();
        return;
    }
    
    if (currentQuestionIndex >= currentLesson.questions.length) {
        console.log('✅ Все вопросы пройдены! Победа!');
        showWinScreen();
        return;
    }
    
    console.log('🔍 Показываем вопрос...');
    
    isBoardLocked = true;
    renderBoard();

    const questions = currentLesson.questions;
    const questionData = questions[currentQuestionIndex];
    
    if (!questionData) {
        console.error('❌ Вопрос не найден по индексу:', currentQuestionIndex);
        showWinScreen();
        return;
    }
    
    const oldModal = document.getElementById('quiz-modal');
    if (oldModal) oldModal.classList.add('hidden');
    
    let modal = document.getElementById('quiz-modal');
    let questionEl = document.getElementById('quiz-question');
    let answersContainer = document.getElementById('quiz-answers');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    if (!modal || !questionEl || !answersContainer) {
        console.warn('⚠️ Элементы модалки не найдены! Создаём заново...');
        const gameScreen = document.getElementById('game-screen');
        if (gameScreen) {
            const oldModalEl = document.getElementById('quiz-modal');
            if (oldModalEl) oldModalEl.remove();
            
            const newModal = document.createElement('div');
            newModal.id = 'quiz-modal';
            newModal.className = 'quiz-modal hidden';
            newModal.innerHTML = `
                <div class="quiz-content">
                    <div class="quiz-header">
                        <span class="quiz-badge">Проверка знаний</span>
                    </div>
                    <h3 id="quiz-question">Загрузка вопроса...</h3>
                    <div id="quiz-answers" class="quiz-answers">
                        <!-- Кнопки ответов сгенерируются динамически -->
                    </div>
                </div>
            `;
            gameScreen.appendChild(newModal);
            
            modal = document.getElementById('quiz-modal');
            questionEl = document.getElementById('quiz-question');
            answersContainer = document.getElementById('quiz-answers');
            
            if (!modal || !questionEl || !answersContainer) {
                console.error('❌ Не удалось создать элементы модалки!');
                return;
            }
        } else {
            console.error('❌ game-screen не найден!');
            return;
        }
    }

    if (progressBar) {
        progressBar.classList.add('timer-mode');
        progressBar.style.width = `${progress}%`;
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
    updateQuestionsIndicators();

    clearInterval(quizTimer);
    quizTimer = setInterval(() => {
        quizTimeLeft--;
        progress = Math.max(0, progress - 4);
        updateProgressBar();
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        if (progressText) {
            progressText.textContent = `Время на ответ: ${quizTimeLeft} сек`;
        }

        if (quizTimeLeft <= 0) {
            clearInterval(quizTimer);
            handleTimeOut(questionData.correct);
        }
    }, 1000);
    
    console.log('✅ Модалка открыта!');
}

function handleAnswerClick(selectedIdx, correctIdx, clickedBtn) {
    clearInterval(quizTimer);
    
    const buttons = document.querySelectorAll('.btn-answer');
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIdx === correctIdx) {
        clickedBtn.classList.add('correct');
        combo++;
        correctAnswers++;
        markQuestionResult(currentQuestionIndex, true);
        
        score += 100;
        updateScoreDisplay();
        
        if (combo >= 3) {
            const comboMessages = ['🔥 Отлично! Комбо x3!', '🔥🔥 Мощь! Комбо x4!', '🔥🔥🔥 НЕОСТАНОВИМ!'];
            const msg = comboMessages[Math.min(combo - 3, comboMessages.length - 1)];
            showComboMessage(msg);
        }
        
        setTimeout(() => {
            closeQuizUI();
            currentQuestionIndex++;
            
            resumeDrain();
            startDrainTimer(2);
            
            updateShieldsDisplay();
            updateComboDisplay();
            updateQuestionsIndicators();
            
            if (currentQuestionIndex < currentLesson.questions.length) {
                isBoardLocked = false;
                renderBoard();
            } else {
                showWinScreen();
            }
        }, 1200);
        
    } else {
        clickedBtn.classList.add('wrong');
        buttons[correctIdx].classList.add('correct');
        shields--;
        wrongAnswers++;
        combo = 0;
        markQuestionResult(currentQuestionIndex, false);
        
        const shieldMsg = shields === 2 
            ? '❌ Атака прошла! Осталось батарей: ' + shields 
            : '⚠️ Ещё одна батарея разряжена! Осталось: ' + shields;
        showFloatingMessage(shieldMsg, 'warning');
        
        progress = 0;
        updateProgressBar();
        updateShieldsDisplay();
        updateComboDisplay();
        
        setTimeout(() => {
            closeQuizUI();
            
            if (shields <= 0) {
                clearInterval(quizTimer);
                showLossScreen();
                return;
            }
            
            currentQuestionIndex++;
            
            resumeDrain();
            startDrainTimer(2);
            
            board = generateValidBoard();
            isBoardLocked = false;
            renderBoard();
            updateQuestionsIndicators();
            
            if (currentQuestionIndex >= currentLesson.questions.length) {
                showWinScreen();
            }
            
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
        progress = 0;
        updateProgressBar();
        updateShieldsDisplay();
        updateComboDisplay();
        
        if (shields <= 0) {
            clearInterval(quizTimer);
            showLossScreen();
            return;
        }
        
        showFloatingMessage(`⏰ Время вышло! Осталось батарей: ${shields}`, 'warning');
        
        resumeDrain();
        startDrainTimer(2);
        
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
    container.appendChild(msg);
    
    setTimeout(() => {
        msg.remove();
    }, 1000);
}

function showFloatingMessage(text, type = 'info') {
    const container = document.getElementById('game-screen');
    if (!container) return;
    
    const oldMsg = container.querySelector('.floating-message');
    if (oldMsg) oldMsg.remove();
    
    const msg = document.createElement('div');
    msg.className = `floating-message ${type}`;
    msg.textContent = text;
    msg.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.85);
        color: ${type === 'warning' ? '#fbbf24' : '#39ff14'};
        padding: 12px 24px;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 60;
        border: 1px solid ${type === 'warning' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(57, 255, 20, 0.3)'};
        backdrop-filter: blur(4px);
        animation: floatMessage 1.5s ease forwards;
        pointer-events: none;
        text-align: center;
        max-width: 80%;
    `;
    container.appendChild(msg);
    
    setTimeout(() => {
        msg.remove();
    }, 1500);
}

// ============================================================
// 12. ЭКРАН ПОБЕДЫ
// ============================================================

function showWinScreen() {
    stopDrainTimer();
    clearInterval(quizTimer);
    resumeDrain();
    stopTimer();
    
    const currentIdx = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIdx !== -1 && currentIdx + 1 < lessons.length) {
        const nextLessonId = lessons[currentIdx + 1].id;
        unlockLesson(nextLessonId);
        console.log(`🔓 Урок ${nextLessonId} разблокирован!`);
        renderLessonsList(selectLesson);
    }
    
    const xp = correctAnswers * 50;
    localStorage.setItem('hubnet_xp', xp);
    
    const modal = document.getElementById('quiz-modal');
    if (modal) modal.classList.add('hidden');
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const secondsEl = elapsed % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(secondsEl).padStart(2, '0')}`;
    
    let resultText = '';
    let resultSubtext = '';
    const scoreResult = correctAnswers;
    const total = currentLesson.questions.length;
    
    if (scoreResult === total) {
        resultText = '🌟 ИДЕАЛЬНО! 5/5';
        resultSubtext = 'Ты настоящий сетевик! Угроза нейтрализована полностью!';
    } else if (scoreResult >= 4) {
        resultText = '🔥 ОТЛИЧНО! 4/5';
        resultSubtext = 'Отличная работа! Ты понял основное, но есть нюансы.';
    } else if (scoreResult >= 3) {
        resultText = '💪 ХОРОШО! 3/5';
        resultSubtext = 'Основа тебе понятна, стоит перечитать лекцию.';
    } else {
        resultText = '📖 НЕПЛОХО! ' + scoreResult + '/5';
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
                <span>🔥 Лучшее комбо: x${bestMatchCombo}</span>
                <span>⏱️ ${timeStr}</span>
                <span>🔋 Батарей: ${shields}/3</span>
                <span>🏆 Очки: ${score}</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                <button onclick="window.restartLesson()" class="btn-answer" style="text-align: center; background: rgba(57, 255, 20, 0.2); border-color: #39ff14;">🔄 Пройти заново</button>
                <button onclick="window.nextLesson()" class="btn-answer" style="text-align: center; background: rgba(59, 130, 246, 0.2); border-color: #3b82f6;">➡️ Следующий урок</button>
                <button onclick="window.goToMenu()" class="btn-answer" style="text-align: center;">🏠 В меню</button>
            </div>
        `;
        modal.classList.remove('hidden');
    }
}

// ============================================================
// 13. ЭКРАН ПОРАЖЕНИЯ
// ============================================================

function showLossScreen() {
    stopDrainTimer();
    clearInterval(quizTimer);
    resumeDrain();
    stopTimer();
    
    const modal = document.getElementById('quiz-modal');
    if (modal) modal.classList.add('hidden');
    
    const randomPhrase = lossPhrases[Math.floor(Math.random() * lossPhrases.length)];
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const secondsEl = elapsed % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(secondsEl).padStart(2, '0')}`;
    
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
                <span>🔥 Лучшее комбо: x${bestMatchCombo}</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                <button onclick="window.restartLesson()" class="btn-answer" style="text-align: center; background: rgba(239, 68, 68, 0.2); border-color: #ef4444;">🔄 Пройти заново</button>
                <button onclick="window.goToMenu()" class="btn-answer" style="text-align: center;">🏠 В меню</button>
            </div>
        `;
        modal.classList.remove('hidden');
    }
}

// ============================================================
// 14. ЭКСПОРТ ФУНКЦИЙ В ГЛОБАЛЬНУЮ ОБЛАСТЬ
// ============================================================

window.restartLesson = function() {
    closeQuizUI();
    stopDrainTimer();
    clearInterval(quizTimer);
    resumeDrain();
    stopTimer();
    startPractice();
};

window.goToMenu = function() {
    closeQuizUI();
    stopDrainTimer();
    clearInterval(quizTimer);
    resumeDrain();
    stopTimer();
    showScreen('main-app');
};

window.nextLesson = function() {
    closeQuizUI();
    stopDrainTimer();
    clearInterval(quizTimer);
    resumeDrain();
    stopTimer();
    
    const currentIdx = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIdx !== -1 && currentIdx + 1 < lessons.length) {
        const nextLesson = lessons[currentIdx + 1];
        selectLesson(nextLesson);
    } else {
        alert('🎉 Ты прошёл все уроки! Возвращаемся в меню.');
        showScreen('main-app');
    }
};

// ============================================================
// 15. ОБНОВЛЕНИЕ ДАННЫХ ПРОФИЛЯ
// ============================================================

function updateProfileData() {
    try {
        const userName = getUserName() || 'Denic';
        
        const nameEl = document.getElementById('profile-name');
        const usernameEl = document.getElementById('profile-username');
        if (nameEl) nameEl.textContent = userName;
        if (usernameEl) usernameEl.textContent = `@${userName}_HubNet`;
        
        const xp = parseInt(localStorage.getItem('hubnet_xp')) || 0;
        const totalXp = xp;
        
        const currentEl = document.getElementById('profile-xp-current');
        const totalEl = document.getElementById('profile-total-xp');
        const barEl = document.getElementById('profile-xp-bar');
        const nextEl = document.getElementById('profile-xp-next');
        
        if (currentEl) currentEl.textContent = xp;
        if (totalEl) totalEl.textContent = totalXp;
        
        const nextLevelXp = 800;
        const progressPercent = Math.min((xp / nextLevelXp) * 100, 100);
        if (barEl) barEl.style.width = `${progressPercent}%`;
        if (nextEl) nextEl.textContent = `${nextLevelXp} XP`;
        
        console.log('✅ Данные профиля обновлены');
    } catch (e) {
        console.warn('⚠️ Ошибка при обновлении профиля:', e);
    }
}

// ============================================================
// 16. ЭКРАН ЗАГРУЗКИ (LINUX STYLE)
// ============================================================

const bootMessages = [
    { text: '[    0.000000] Linux version 6.8.0-hubnet (root@hubnet-build) (gcc-13.2.0) #1 SMP PREEMPT_DYNAMIC', type: '' },
    { text: '[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-hubnet root=UUID=hubnet-it ro quiet', type: '' },
    { text: '[    0.000000] KERNEL: HubNet IT v1.0.3 loaded successfully', type: 'highlight' },
    { text: '[    0.000000] CPU: x86_64, 4 cores, 8 threads', type: '' },
    { text: '[    0.000000] Memory: 4096MB available, 3072MB free', type: '' },
    { text: '[    0.000000] PCI: Initializing PCIe devices', type: '' },
    { text: '[    0.000000] ACPI: Advanced Configuration and Power Interface v6.5', type: '' },
    { text: '[    0.842133] NET: Registered protocol family 2', type: '' },
    { text: '[    0.842201] IP: Initializing TCP/IP stack', type: 'highlight' },
    { text: '[    0.842301] TCP: Hash tables configured (established 16384 bind 8192)', type: '' },
    { text: '[    0.842401] UDP: Loaded successfully', type: 'ok' },
    { text: '[    0.842501] ICMP: Protocol ready', type: '' },
    { text: '[    0.842601] NET: Registered protocol family 1', type: '' },
    { text: '[    1.124567] eth0: Link is up, 1000Mbps full-duplex', type: 'ok' },
    { text: '[    1.124678] eth0: MAC address 00:1a:2b:3c:4d:5e', type: '' },
    { text: '[    1.124789] IPv6: ADDRCONF(NETDEV_CHANGE): eth0: link becomes ready', type: '' },
    { text: '[    1.124890] NET: Registered protocol family 10', type: '' },
    { text: '[    1.124901] IPv6: ADDRCONF(NETDEV_CHANGE): lo: link becomes ready', type: '' },
    { text: '[    1.456234] DNS: Resolver initialized, 8.8.8.8, 1.1.1.1', type: 'ok' },
    { text: '[    1.456345] DHCP: Client started, requesting lease...', type: '' },
    { text: '[    1.456456] DHCP: Lease obtained (192.168.1.100/24, gateway 192.168.1.1)', type: 'ok' },
    { text: '[    1.456567] NTP: Synchronized with time.google.com', type: '' },
    { text: '[    1.456678] DNS: Resolver cache initialized', type: '' },
    { text: '[    1.789012] Firewall: nftables initialized', type: '' },
    { text: '[    1.789123] Firewall: Rules loaded (incoming: drop, outgoing: allow)', type: 'warn' },
    { text: '[    1.789234] SELinux: Disabled (permissive mode)', type: '' },
    { text: '[    1.789345] AppArmor: Profiles loaded: 2', type: '' },
    { text: '[    1.789456] Security: Kernel hardening enabled', type: '' },
    { text: '[    2.123456] PostgreSQL: Starting service (v16.2)...', type: '' },
    { text: '[    2.123567] PostgreSQL: Database "hubnet_courses" initialized', type: 'ok' },
    { text: '[    2.123678] Redis: Service ready, 10 connections available', type: '' },
    { text: '[    2.123789] Nginx: Web server started on port 443', type: '' },
    { text: '[    2.123890] Nginx: SSL certificate loaded', type: '' },
    { text: '[    2.456789] HubNet API: Endpoints registered (v1, v2)', type: '' },
    { text: '[    2.456890] HubNet API: JWT authentication enabled', type: '' },
    { text: '[    2.456901] WebSocket: Connection established, wss://hubnet.it', type: '' },
    { text: '[    2.457012] Static: Assets loaded from /var/www/hubnet', type: '' },
    { text: '[    2.457123] Cache: Redis cache warming up...', type: '' },
    { text: '[    2.789123] HubNet IT: All services ready', type: 'highlight' },
    { text: '[    2.789234] System: Boot completed in 2.79s', type: 'ok' },
    { text: '[    2.789345] Welcome to HubNet IT Academy!', type: 'highlight' },
    { text: '[    2.789456] Press START to begin your journey...', type: '' },
];

const statusMessages = [
    '⏳ Loading kernel...',
    '⏳ Initializing hardware...',
    '⏳ Setting up network stack...',
    '⏳ Configuring DNS and DHCP...',
    '⏳ Setting up firewall...',
    '⏳ Starting services...',
    '⏳ Loading application assets...',
    '✅ System ready!'
];

function startLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const logsContainer = document.getElementById('loading-logs');
    const progressText = document.getElementById('loading-progress-text');
    const statusText = document.getElementById('loading-status');
    
    if (!loadingScreen) return;

    let lineIndex = 0;
    let statusIndex = 0;
    const totalLines = bootMessages.length;
    const intervalTime = Math.floor(5000 / totalLines);

    function addLogLine() {
        if (lineIndex >= totalLines) {
            clearInterval(lineInterval);
            
            if (progressText) progressText.textContent = '100%';
            if (statusText) {
                statusText.textContent = '✅ System ready!';
                statusText.style.color = '#22c55e';
                statusText.style.animation = 'none';
            }
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 600);
            
            return;
        }

        const msg = bootMessages[lineIndex];
        const line = document.createElement('div');
        line.className = 'log-line';
        
        let colorClass = '';
        if (msg.type === 'highlight') colorClass = 'highlight';
        else if (msg.type === 'warn') colorClass = 'warn';
        else if (msg.type === 'ok') colorClass = 'ok';
        else if (msg.type === 'err') colorClass = 'err';
        
        if (colorClass) {
            line.innerHTML = `<span class="${colorClass}">${msg.text}</span>`;
        } else {
            line.textContent = msg.text;
        }
        
        logsContainer.appendChild(line);
        logsContainer.scrollTop = logsContainer.scrollHeight;
        
        lineIndex++;
        
        const progress = Math.min(Math.round((lineIndex / totalLines) * 100), 100);
        if (progressText) {
            progressText.textContent = progress + '%';
        }
        
        const newStatusIndex = Math.min(Math.floor(progress / 14), statusMessages.length - 1);
        if (newStatusIndex !== statusIndex && statusText) {
            statusIndex = newStatusIndex;
            statusText.textContent = statusMessages[statusIndex];
        }
    }

    const lineInterval = setInterval(addLogLine, intervalTime);
}

// ============================================================
// 17. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}