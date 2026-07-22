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
    renderModuleLessons,
    getUnlockedLessons, 
    unlockLesson,
    initTelegram,
    getUserName
} from './js/ui.js';

import { loadModule } from './js/modules/moduleManager.js';
import { detective } from './js/games/detective.js';

// ============================================================
// 2. СОСТОЯНИЕ ИГРЫ (STATE)
// ============================================================

let currentLesson = null;
let currentModuleData = null;
let currentModuleId = null;
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

// Состояние детектива
let detectiveState = {
    currentCase: null,
    quickQuestionIndex: 0,
    caseQuestionIndex: 0,
    phase: 'quick',
    quickAnswers: [],
    caseAnswers: [],
    caseStarted: false
};

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

    // ===== КНОПКИ МОДУЛЕЙ =====
    const btnNetworks = document.getElementById('btn-module-networks');
    if (btnNetworks) {
        btnNetworks.addEventListener('click', async () => {
            console.log('🌐 Открываем модуль: Сети');
            await openModule('networks');
        });
    }

    const btnSecurity = document.getElementById('btn-module-security');
    if (btnSecurity) {
        btnSecurity.addEventListener('click', async () => {
            console.log('🛡️ Открываем модуль: Кибербезопасность');
            await openModule('security');
        });
    }

    const btnQA = document.getElementById('btn-module-qa');
    if (btnQA) {
        btnQA.addEventListener('click', async () => {
            console.log('🧪 Открываем модуль: QA тестирование');
            await openModule('qa');
        });
    }

    const btnPython = document.getElementById('btn-module-python');
    if (btnPython) {
        btnPython.addEventListener('click', async () => {
            console.log('🐍 Открываем модуль: Python основы');
            await openModule('python');
        });
    }

    const btnAutoTests = document.getElementById('btn-module-auto-tests');
    if (btnAutoTests) {
        btnAutoTests.addEventListener('click', async () => {
            console.log('🤖 Открываем модуль: Автотесты основы');
            await openModule('auto_tests');
        });
    }

    const btnSQL = document.getElementById('btn-module-sql');
    if (btnSQL) {
        btnSQL.addEventListener('click', async () => {
            console.log('🗄️ Открываем модуль: Базы данных (SQL)');
            await openModule('sql');
        });
    }

    const btnDevOps = document.getElementById('btn-module-devops');
    if (btnDevOps) {
        btnDevOps.addEventListener('click', async () => {
            console.log('⚙️ Открываем модуль: DevOps');
            await openModule('devops');
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

    // ===== КНОПКИ УРОКОВ =====
    const btnLessonsBack = document.getElementById('btn-lessons-back');
    if (btnLessonsBack) {
        btnLessonsBack.addEventListener('click', () => {
            clearInterval(drainTimer);
            showScreen('main-app');
        });
    }

    const btnLectureBack = document.getElementById('btn-lecture-back');
    if (btnLectureBack) {
        btnLectureBack.addEventListener('click', () => {
            showScreen('lessons-screen');
        });
    }

    const btnStartPractice = document.getElementById('btn-start-practice');
    if (btnStartPractice) {
        btnStartPractice.addEventListener('click', () => {
            console.log('🔘 Нажата кнопка "Начать практику"');
            console.log('📦 currentModuleData:', currentModuleData);
            console.log('🎮 game:', currentModuleData?.game);
            startPractice();
        });
    }

    const btnBack = document.getElementById('btn-back');
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            clearInterval(drainTimer);
            clearInterval(quizTimer);
            stopTimer();
            resetDetectiveState();
            showScreen('lessons-screen');
        });
    }

    const btnShuffle = document.getElementById('btn-shuffle');
    if (btnShuffle) {
        btnShuffle.addEventListener('click', () => {
            if (!isBoardLocked && !isDetectiveMode()) {
                board = generateValidBoard();
                renderBoard();
            }
        });
    }

    showScreen('main-app');
    console.log('✅ Инициализация завершена');

    startLoadingScreen();
});

// ============================================================
// 4. ОТКРЫТИЕ МОДУЛЯ
// ============================================================

async function openModule(moduleId) {
    console.log(`📦 Загружаем модуль: ${moduleId}`);
    
    const moduleData = await loadModule(moduleId);
    if (!moduleData) {
        alert(`❌ Ошибка загрузки модуля "${moduleId}"`);
        console.error(`❌ Модуль ${moduleId} не загружен`);
        return;
    }
    
    currentModuleId = moduleId;
    currentModuleData = moduleData;
    
    console.log(`✅ Модуль "${moduleData.title}" загружен, уроков: ${moduleData.lessons.length}`);
    console.log(`🎮 Тип игры: ${moduleData.game || 'match3'}`);
    
    renderModuleLessons(moduleData, selectLesson);
    showScreen('lessons-screen');
}

// ============================================================
// 5. ЛОГИКА ВЫБОРА УРОКА
// ============================================================

function selectLesson(lesson) {
    currentQuestionIndex = 0;
    progress = 0;
    
    const testContainer = document.getElementById('simple-test-container');
    if (testContainer) {
        testContainer.innerHTML = '';
        testContainer.style.display = 'none';
    }
    
    currentLesson = lesson;
    
    console.log(`📖 Выбран урок: ${lesson.id} - ${lesson.title}`);
    
    const titleEl = document.getElementById('lecture-title');
    const textEl = document.getElementById('lecture-text');
    const practiceBtn = document.getElementById('btn-start-practice');
    
    if (titleEl) titleEl.textContent = lesson.title;
    if (textEl) textEl.innerHTML = lesson.lecture;
    
    if (currentModuleId === 'security' && lesson.id === 'security_16') {
        if (practiceBtn) practiceBtn.style.display = 'none';
    } else {
        if (practiceBtn) practiceBtn.style.display = 'block';
    }
    
    showScreen('lecture-screen');
}

// ============================================================
// 6. ЗАПУСК ПРАКТИКИ
// ============================================================

function startPractice() {
    console.log('🎯 startPractice вызвана!');
    console.log('📦 currentModuleData:', currentModuleData);
    console.log('🎮 game:', currentModuleData?.game);
    console.log('📖 currentLesson:', currentLesson);
    
    if (currentLesson && currentLesson.id === 'security_1') {
        console.log('📝 Урок 1 — запускаем тест');
        startSimpleTest();
        return;
    }
    
    if (currentModuleData && currentModuleData.game === 'detective') {
        console.log('🕵️ Запускаем Кибердетектив!');
        startDetectiveGame();
        return;
    }
    
    console.log('🎮 Запускаем Match-3');
    startMatch3Game();
}

// ============================================================
// 7. MATCH-3 ИГРА
// ============================================================

function startMatch3Game() {
    const gameHeader = document.querySelector('.game-header');
    if (gameHeader) {
        const logo = gameHeader.querySelector('.game-logo');
        if (logo) {
            logo.innerHTML = 'HUB<span class="game-logo-highlight">NET</span>';
        }
    }
    
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
    
    hideDetectiveUI();
    
    if (currentLesson && currentLesson.questions) {
        const shuffledQuestions = shuffleArray(currentLesson.questions);
        currentLesson.shuffledQuestions = shuffledQuestions;
        
        currentLesson.shuffledQuestions.forEach(question => {
            const correctAnswer = question.answers[question.correct];
            const shuffledAnswers = shuffleArray(question.answers);
            question.shuffledAnswers = shuffledAnswers;
            question.shuffledCorrect = shuffledAnswers.indexOf(correctAnswer);
        });
    }
    
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
    
    console.log('✅ startMatch3Game: все переменные сброшены');
}

// ============================================================
// 8. ПРОСТОЙ ТЕСТ (ДЛЯ УРОКА 1)
// ============================================================

function startSimpleTest() {
    console.log('📝 Запускаем простой тест!');
    
    if (currentLesson && currentLesson.questions) {
        const shuffledQuestions = shuffleArray(currentLesson.questions);
        currentLesson.shuffledQuestions = shuffledQuestions;
        
        currentLesson.shuffledQuestions.forEach(question => {
            const correctAnswer = question.answers[question.correct];
            const shuffledAnswers = shuffleArray(question.answers);
            question.shuffledAnswers = shuffledAnswers;
            question.shuffledCorrect = shuffledAnswers.indexOf(correctAnswer);
        });
    }
    
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    score = 0;
    startTime = Date.now();
    
    const topBar = document.querySelector('.game-top-bar');
    const middleSection = document.querySelector('.game-middle-section');
    const progressContainer = document.querySelector('.progress-container');
    const board = document.getElementById('game-board');
    const shuffleBtn = document.getElementById('btn-shuffle');
    const comboFrame = document.getElementById('combo-frame');
    const scoreDisplay = document.getElementById('score-display');
    const timerDisplay = document.getElementById('timer-display');
    const shieldsDisplay = document.getElementById('shields-display');
    
    if (topBar) topBar.style.display = 'none';
    if (middleSection) middleSection.style.display = 'none';
    if (progressContainer) progressContainer.style.display = 'none';
    if (board) board.style.display = 'none';
    if (shuffleBtn) shuffleBtn.style.display = 'none';
    if (comboFrame) comboFrame.style.display = 'none';
    if (scoreDisplay) scoreDisplay.style.display = 'none';
    if (timerDisplay) timerDisplay.style.display = 'none';
    if (shieldsDisplay) shieldsDisplay.style.display = 'none';
    
    const gameHeader = document.querySelector('.game-header');
    if (gameHeader) {
        const logo = gameHeader.querySelector('.game-logo');
        if (logo) logo.textContent = '📝 Проверка знаний';
    }
    
    showTestQuestion();
    showScreen('game-screen');
}

function showTestQuestion() {
    if (!currentLesson || !currentLesson.questions) {
        console.error('❌ Нет вопросов в уроке!');
        finishSimpleTest();
        return;
    }
    
    const questions = currentLesson.shuffledQuestions || currentLesson.questions;
    
    if (currentQuestionIndex >= questions.length) {
        finishSimpleTest();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    const total = questions.length;
    const current = currentQuestionIndex + 1;
    
    const answers = question.shuffledAnswers || question.answers;
    const correctIdx = question.shuffledCorrect !== undefined 
        ? question.shuffledCorrect 
        : question.correct;
    
    let container = document.getElementById('simple-test-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'simple-test-container';
        container.className = 'simple-test-container';
        document.getElementById('game-screen').appendChild(container);
    }
    container.style.display = 'block';
    
    container.innerHTML = `
        <div class="simple-test">
            <div class="test-header">
                <span class="test-progress">Вопрос ${current} из ${total}</span>
                <span class="test-score">✅ ${correctAnswers} | ❌ ${wrongAnswers}</span>
            </div>
            <div class="test-question">${question.question}</div>
            <div class="test-options">
                ${answers.map((answer, idx) => `
                    <button class="test-option" data-index="${idx}" onclick="window.handleTestAnswer(${idx}, ${correctIdx}, this)">
                        ${String.fromCharCode(65 + idx)}. ${answer}
                    </button>
                `).join('')}
            </div>
            <div class="test-feedback" id="test-feedback"></div>
        </div>
    `;
}

window.handleTestAnswer = function(selected, correct, btn) {
    const buttons = document.querySelectorAll('.test-option');
    buttons.forEach(b => b.disabled = true);
    
    const feedback = document.getElementById('test-feedback');
    
    if (selected === correct) {
        btn.classList.add('correct');
        correctAnswers++;
        feedback.innerHTML = `<div class="feedback-correct">✅ Правильно! +20 XP</div>`;
        score += 20;
    } else {
        btn.classList.add('wrong');
        buttons[correct].classList.add('correct');
        wrongAnswers++;
        feedback.innerHTML = `<div class="feedback-wrong">❌ Неправильно. Правильный ответ: ${String.fromCharCode(65 + correct)}</div>`;
    }
    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentLesson.questions.length) {
            showTestQuestion();
        } else {
            finishSimpleTest();
        }
    }, 1500);
};

function finishSimpleTest() {
    const completedLesson = currentLesson;
    
    const total = completedLesson.questions.length;
    const passed = correctAnswers >= total * 0.6;
    
    const container = document.getElementById('simple-test-container');
    if (!container) return;
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const timeStr = `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`;
    
    container.innerHTML = `
        <div class="test-complete">
            <div class="complete-icon">${passed ? '🎉' : '📖'}</div>
            <h3>${passed ? 'Тест пройден!' : 'Стоит повторить'}</h3>
            <div class="test-stats">
                <div class="stat-row">
                    <span>✅ Правильно:</span>
                    <span>${correctAnswers}/${total}</span>
                </div>
                <div class="stat-row">
                    <span>❌ Неправильно:</span>
                    <span>${wrongAnswers}</span>
                </div>
                <div class="stat-row">
                    <span>⏱️ Время:</span>
                    <span>${timeStr}</span>
                </div>
                <div class="stat-row total">
                    <span>🏆 Очки:</span>
                    <span>${score}</span>
                </div>
            </div>
            <div class="complete-buttons">
                <button class="btn-complete" onclick="window.goToMenu()">🏠 В меню</button>
                <button class="btn-complete secondary" onclick="window.goToMenu()">📚 К урокам</button>
            </div>
        </div>
    `;
    
    const xp = correctAnswers * 50;
    localStorage.setItem('hubnet_xp', xp);
    
    if (currentModuleData && completedLesson) {
        const currentIdx = currentModuleData.lessons.findIndex(l => l.id === completedLesson.id);
        if (currentIdx !== -1 && currentIdx + 1 < currentModuleData.lessons.length) {
            const nextLessonId = currentModuleData.lessons[currentIdx + 1].id;
            unlockLesson(nextLessonId);
            console.log(`🔓 Урок ${nextLessonId} разблокирован!`);
        }
    }
    
    stopTimer();
}

// ============================================================
// 9. ДЕТЕКТИВ
// ============================================================

function isDetectiveMode() {
    return currentModuleData && currentModuleData.game === 'detective';
}

function resetDetectiveState() {
    detectiveState = {
        currentCase: null,
        quickQuestionIndex: 0,
        caseQuestionIndex: 0,
        phase: 'quick',
        quickAnswers: [],
        caseAnswers: [],
        caseStarted: false
    };
}

function startDetectiveGame() {
    console.log('🕵️ startDetectiveGame вызвана!');
    console.log('📖 currentLesson:', currentLesson);
    
    if (currentLesson && currentLesson.id === 'security_1') {
        console.log('⚠️ Урок 1 не должен запускать детектив!');
        showFloatingMessage('❌ Ошибка: неверный урок', 'warning');
        setTimeout(() => showScreen('lessons-screen'), 1500);
        return;
    }
    
    if (!currentLesson) {
        console.error('❌ currentLesson = null!');
        showFloatingMessage('❌ Ошибка: урок не выбран', 'warning');
        setTimeout(() => showScreen('lessons-screen'), 1500);
        return;
    }
    
    resetDetectiveState();
    
    console.log(`🔍 Ищем кейс для lessonId: ${currentLesson.id}`);
    const caseData = detective.cases.find(c => c.lessonId === currentLesson.id);
    
    console.log('📋 Найден кейс:', caseData);
    
    if (!caseData) {
        showFloatingMessage('🔍 Для этого урока нет расследования', 'warning');
        setTimeout(() => {
            showScreen('lessons-screen');
        }, 1500);
        return;
    }
    
    detectiveState.currentCase = caseData;
    detectiveState.caseStarted = true;
    
    console.log(`✅ Запускаем кейс: ${caseData.title}`);
    
    if (caseData.quickQuestions) {
        caseData.shuffledQuickQuestions = shuffleArray(caseData.quickQuestions);
    }
    if (caseData.caseQuestions) {
        caseData.shuffledCaseQuestions = shuffleArray(caseData.caseQuestions);
    }
    
    const board = document.getElementById('game-board');
    const shuffleBtn = document.getElementById('btn-shuffle');
    const progressContainer = document.querySelector('.progress-container');
    const gameMiddle = document.querySelector('.game-middle-section');
    const gameTopBar = document.querySelector('.game-top-bar');
    const gameHeader = document.querySelector('.game-header');
    
    if (board) board.style.display = 'none';
    if (shuffleBtn) shuffleBtn.style.display = 'none';
    if (progressContainer) progressContainer.style.display = 'none';
    if (gameMiddle) gameMiddle.style.display = 'none';
    if (gameTopBar) gameTopBar.style.display = 'none';
    if (gameHeader) {
        const logo = gameHeader.querySelector('.game-logo');
        if (logo) logo.textContent = '🕵️ Кибердетектив';
    }
    
    showDetectiveUI(caseData);
    showScreen('game-screen');
}

function showDetectiveUI(caseData) {
    const testContainer = document.getElementById('simple-test-container');
    if (testContainer) {
        testContainer.innerHTML = '';
        testContainer.style.display = 'none';
    }
    
    let container = document.getElementById('detective-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'detective-container';
        container.className = 'detective-container';
        document.getElementById('game-screen').appendChild(container);
    }
    
    container.innerHTML = renderDetectiveCase(caseData);
    container.style.display = 'block';
    
    const quickQuestions = caseData.shuffledQuickQuestions || caseData.quickQuestions;
    const caseQuestions = caseData.shuffledCaseQuestions || caseData.caseQuestions;
    
    if (quickQuestions && quickQuestions.length > 0) {
        detectiveState.phase = 'quick';
        detectiveState.quickQuestionIndex = 0;
        showQuickQuestion(caseData, 0, quickQuestions);
    } else if (caseQuestions && caseQuestions.length > 0) {
        detectiveState.phase = 'case';
        detectiveState.caseQuestionIndex = 0;
        showCaseQuestion(caseData, 0, caseQuestions);
    }
}

function hideDetectiveUI() {
    const container = document.getElementById('detective-container');
    if (container) {
        container.style.display = 'none';
    }
    
    const board = document.getElementById('game-board');
    const shuffleBtn = document.getElementById('btn-shuffle');
    const progressContainer = document.querySelector('.progress-container');
    const gameMiddle = document.querySelector('.game-middle-section');
    const gameTopBar = document.querySelector('.game-top-bar');
    const gameHeader = document.querySelector('.game-header');
    
    if (board) board.style.display = 'grid';
    if (shuffleBtn) shuffleBtn.style.display = 'block';
    if (progressContainer) progressContainer.style.display = 'block';
    if (gameMiddle) gameMiddle.style.display = 'flex';
    if (gameTopBar) gameTopBar.style.display = 'flex';
    if (gameHeader) {
        const logo = gameHeader.querySelector('.game-logo');
        if (logo) {
            logo.innerHTML = 'HUB<span class="game-logo-highlight">NET</span>';
        }
    }
}

function renderDetectiveCase(caseData) {
    const quickQuestions = caseData.shuffledQuickQuestions || caseData.quickQuestions;
    const caseQuestions = caseData.shuffledCaseQuestions || caseData.caseQuestions;
    const totalQuick = quickQuestions ? quickQuestions.length : 0;
    const totalCase = caseQuestions ? caseQuestions.length : 0;
    const total = totalQuick + totalCase;
    
    return `
        <div class="detective-content">
            <div class="detective-header">
                <span class="detective-icon">${caseData.icon || '🕵️'}</span>
                <h2>${caseData.title}</h2>
                <span class="detective-difficulty ${caseData.difficulty}">
                    ${caseData.difficulty === 'easy' ? '🟢 Лёгкий' : '🟡 Средний'}
                </span>
            </div>
            <div class="detective-description">
                ${caseData.description}
            </div>
            <div class="detective-evidence">
                <h4>📋 Улики:</h4>
                ${caseData.evidence.map(ev => `
                    <div class="evidence-block">
                        <div class="evidence-label">${ev.label}</div>
                        <div class="evidence-data">${ev.data.map(line => `<div class="log-line">${line}</div>`).join('')}</div>
                    </div>
                `).join('')}
            </div>
            <div class="detective-questions" id="detective-questions">
                <!-- Вопросы загружаются динамически -->
            </div>
            <div class="detective-progress">
                <span id="detective-progress-text">Вопрос 1 из ${total}</span>
            </div>
        </div>
    `;
}

function showQuickQuestion(caseData, index, shuffledQuestions) {
    const container = document.getElementById('detective-questions');
    if (!container) return;
    
    const questions = shuffledQuestions || caseData.quickQuestions;
    if (!questions || index >= questions.length) {
        const caseQuestions = caseData.shuffledCaseQuestions || caseData.caseQuestions;
        if (caseQuestions && caseQuestions.length > 0) {
            detectiveState.phase = 'case';
            detectiveState.caseQuestionIndex = 0;
            showCaseQuestion(caseData, 0, caseQuestions);
        } else {
            completeDetectiveCase(caseData);
        }
        return;
    }
    
    const question = questions[index];
    const total = questions.length + (caseData.caseQuestions ? caseData.caseQuestions.length : 0);
    const current = index + 1;
    
    const shuffledOptions = shuffleArray(question.options);
    const correctAnswer = question.options[question.correct];
    const shuffledCorrect = shuffledOptions.indexOf(correctAnswer);
    
    container.innerHTML = `
        <div class="question-block quick-question">
            <div class="question-number">❓ Вопрос ${current} из ${total}</div>
            <div class="question-text">${question.question}</div>
            <div class="question-options">
                ${shuffledOptions.map((opt, i) => `
                    <button class="option-btn" data-index="${i}" onclick="window.handleQuickAnswer(${i}, ${shuffledCorrect}, this, ${index}, '${question.explanation || ''}')">
                        ${String.fromCharCode(65 + i)}. ${opt}
                    </button>
                `).join('')}
            </div>
            <div class="question-hint">💡 ${question.hint || 'Подумай внимательно'}</div>
            <div class="question-feedback" id="quick-feedback"></div>
        </div>
    `;
    
    updateDetectiveProgress(current, total);
}

function showCaseQuestion(caseData, index, shuffledQuestions) {
    const container = document.getElementById('detective-questions');
    if (!container) return;
    
    const questions = shuffledQuestions || caseData.caseQuestions;
    if (!questions || index >= questions.length) {
        completeDetectiveCase(caseData);
        return;
    }
    
    const question = questions[index];
    const totalQuick = caseData.quickQuestions ? caseData.quickQuestions.length : 0;
    const total = totalQuick + questions.length;
    const current = totalQuick + index + 1;
    
    const shuffledOptions = shuffleArray(question.options);
    
    const selectedAnswers = detectiveState.caseAnswers[index] || [];
    
    container.innerHTML = `
        <div class="question-block case-question">
            <div class="question-number">📋 Вопрос ${current} из ${total} (сбор улик)</div>
            <div class="question-text">${question.question}</div>
            <div class="question-options case-options">
                ${shuffledOptions.map((opt, i) => {
                    const checked = selectedAnswers.includes(opt.id) ? 'checked' : '';
                    return `
                        <label class="case-option-label">
                            <input type="checkbox" class="case-checkbox" data-id="${opt.id}" ${checked} onchange="window.toggleCaseAnswer(${index}, '${opt.id}', this)">
                            ${opt.text}
                        </label>
                    `;
                }).join('')}
            </div>
            <div class="question-hint">💡 ${question.hint || 'Выбери все подходящие варианты'}</div>
            <button class="btn-next-case" onclick="window.submitCaseAnswers(${index})">📤 Отправить ответы</button>
            <div class="question-feedback" id="case-feedback-${index}"></div>
        </div>
    `;
    
    updateDetectiveProgress(current, total);
}

// Глобальные функции для детектива
window.handleQuickAnswer = function(selected, correct, btn, index, explanation) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b => b.disabled = true);
    
    const feedback = document.getElementById('quick-feedback');
    
    if (selected === correct) {
        btn.classList.add('correct');
        detectiveState.quickAnswers.push({ index, correct: true });
        feedback.innerHTML = `
            <div class="feedback-correct">✅ Правильно! ${explanation || '+20 XP'}</div>
        `;
        score += 20;
        updateScoreDisplay();
    } else {
        btn.classList.add('wrong');
        buttons[correct].classList.add('correct');
        detectiveState.quickAnswers.push({ index, correct: false });
        feedback.innerHTML = `
            <div class="feedback-wrong">❌ Неправильно. Правильный ответ: ${String.fromCharCode(65 + correct)}</div>
        `;
    }
    
    setTimeout(() => {
        const caseData = detectiveState.currentCase;
        if (!caseData) return;
        
        const nextIndex = index + 1;
        const quickQuestions = caseData.shuffledQuickQuestions || caseData.quickQuestions;
        const caseQuestions = caseData.shuffledCaseQuestions || caseData.caseQuestions;
        
        if (nextIndex < quickQuestions.length) {
            showQuickQuestion(caseData, nextIndex, quickQuestions);
        } else if (caseQuestions && caseQuestions.length > 0) {
            detectiveState.phase = 'case';
            detectiveState.caseQuestionIndex = 0;
            showCaseQuestion(caseData, 0, caseQuestions);
        } else {
            completeDetectiveCase(caseData);
        }
    }, 1500);
};

window.toggleCaseAnswer = function(questionIndex, optionId, checkbox) {
    if (!detectiveState.caseAnswers[questionIndex]) {
        detectiveState.caseAnswers[questionIndex] = [];
    }
    
    const answers = detectiveState.caseAnswers[questionIndex];
    const idx = answers.indexOf(optionId);
    
    if (checkbox.checked) {
        if (idx === -1) answers.push(optionId);
    } else {
        if (idx !== -1) answers.splice(idx, 1);
    }
};

window.submitCaseAnswers = function(index) {
    const caseData = detectiveState.currentCase;
    if (!caseData) return;
    
    const caseQuestions = caseData.shuffledCaseQuestions || caseData.caseQuestions;
    const question = caseQuestions[index];
    const selected = detectiveState.caseAnswers[index] || [];
    
    let correctCount = 0;
    let totalCorrect = 0;
    let hasError = false;
    let wrongSelected = [];
    let missingCorrect = [];
    
    question.options.forEach(opt => {
        const isSelected = selected.includes(opt.id);
        const isCorrect = opt.correct;
        
        if (isCorrect) totalCorrect++;
        if (isSelected && isCorrect) correctCount++;
        if (isSelected && !isCorrect) {
            hasError = true;
            wrongSelected.push(opt.text);
        }
        if (!isSelected && isCorrect) {
            hasError = true;
            missingCorrect.push(opt.text);
        }
    });
    
    const feedback = document.getElementById(`case-feedback-${index}`);
    if (!feedback) return;
    
    document.querySelectorAll('.case-checkbox').forEach(cb => cb.disabled = true);
    document.querySelector('.btn-next-case').disabled = true;
    
    if (!hasError && correctCount === totalCorrect) {
        feedback.innerHTML = `
            <div class="feedback-correct">✅ Отлично! Все улики собраны верно! +30 XP</div>
        `;
        score += 30;
        updateScoreDisplay();
        detectiveState.caseAnswers[index] = { correct: true };
        
        setTimeout(() => {
            const nextIndex = index + 1;
            if (nextIndex < caseQuestions.length) {
                showCaseQuestion(caseData, nextIndex, caseQuestions);
            } else {
                completeDetectiveCase(caseData);
            }
        }, 1500);
    } else {
        let errorText = '';
        if (wrongSelected.length > 0) {
            errorText += `<div class="wrong-answer-detail">❌ Лишние: ${wrongSelected.join(', ')}</div>`;
        }
        if (missingCorrect.length > 0) {
            errorText += `<div class="wrong-answer-detail">⚠️ Не выбрано: ${missingCorrect.join(', ')}</div>`;
        }
        
        feedback.innerHTML = `
            <div class="feedback-wrong">
                ❌ Есть ошибки в выборе улик:
                ${errorText}
                <div style="margin-top: 8px; color: #94a3b8; font-size: 0.8rem;">💡 Подсказка: выбери только правильные варианты</div>
            </div>
        `;
        
        setTimeout(() => {
            document.querySelectorAll('.case-checkbox').forEach(cb => cb.disabled = false);
            document.querySelector('.btn-next-case').disabled = false;
        }, 2000);
    }
};

function completeDetectiveCase(caseData) {
    detectiveState.phase = 'complete';
    
    const container = document.getElementById('detective-questions');
    if (!container) return;
    
    const quickQuestions = caseData.shuffledQuickQuestions || caseData.quickQuestions;
    const caseQuestions = caseData.shuffledCaseQuestions || caseData.caseQuestions;
    const totalQuick = quickQuestions ? quickQuestions.length : 0;
    const totalCase = caseQuestions ? caseQuestions.length : 0;
    const total = totalQuick + totalCase;
    
    const quickCorrect = detectiveState.quickAnswers.filter(a => a.correct).length;
    const caseCorrect = detectiveState.caseAnswers.filter(a => a && a.correct).length;
    const totalCorrect = quickCorrect + caseCorrect;
    
    const xpEarned = caseData.xpBonus || 50;
    const totalEarned = score + xpEarned;
    
    container.innerHTML = `
        <div class="case-complete">
            <div class="complete-icon">🎉</div>
            <h3>Расследование завершено!</h3>
            <div class="complete-stats">
                <div class="stat-row">
                    <span>📊 Быстрые вопросы:</span>
                    <span>${quickCorrect}/${totalQuick}</span>
                </div>
                <div class="stat-row">
                    <span>📋 Сбор улик:</span>
                    <span>${caseCorrect}/${totalCase}</span>
                </div>
                <div class="stat-row">
                    <span>⭐ Всего XP:</span>
                    <span>+${xpEarned}</span>
                </div>
                <div class="stat-row total">
                    <span>🏆 Итого XP:</span>
                    <span>${totalEarned}</span>
                </div>
            </div>
            <div class="complete-buttons">
                <button class="btn-complete" onclick="window.goToMenu()">🏠 В меню</button>
                <button class="btn-complete secondary" onclick="window.nextLesson()">➡️ Следующий урок</button>
            </div>
        </div>
    `;
    
    localStorage.setItem('hubnet_xp', totalEarned);
    
    if (currentModuleData && currentLesson) {
        const currentIdx = currentModuleData.lessons.findIndex(l => l.id === currentLesson.id);
        if (currentIdx !== -1 && currentIdx + 1 < currentModuleData.lessons.length) {
            const nextLessonId = currentModuleData.lessons[currentIdx + 1].id;
            unlockLesson(nextLessonId);
            console.log(`🔓 Урок ${nextLessonId} разблокирован!`);
        }
    }
    
    updateDetectiveProgress(total, total);
    stopTimer();
}

function updateDetectiveProgress(current, total) {
    const el = document.getElementById('detective-progress-text');
    if (el) {
        el.textContent = `Вопрос ${Math.min(current, total)} из ${total}`;
    }
}

// ============================================================
// 10. ТАЙМЕР УМЕНЬШЕНИЯ ЗАРЯДКИ
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
// 11. ОЧКИ И ТАЙМЕР
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
// 12. ИНДИКАТОРЫ ВОПРОСОВ
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
// 13. РЕНДЕРИНГ И ЛОГИКА ИГРОВОГО ПОЛЯ
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
        if (boardEl && matchCombo >= 3) {
            boardEl.classList.add('combo-active');
            setTimeout(() => boardEl.classList.remove('combo-active'), 400);
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
            tileElements[idx].style.animationDelay = `${i * 0.03}s`;
        }
    });

    await delay(250);

    const points = matches.length * 10 * Math.min(matchCombo, 5);
    score += points;
    updateScoreDisplay();

    progress = Math.min(100, progress + matches.length * 5);
    updateProgressBar();

    if (progress >= 100) {
        progress = 100;
        updateProgressBar();
        isQuestionPending = true;
        console.log('⚡ Зарядка 100%! Вопрос ждёт окончания комбо...');
    }

    matches.forEach(idx => {
        board[idx] = null;
    });

    dropTiles();
    renderBoard();
    
    await delay(200);

    const nextMatches = checkMatches(board);
    if (nextMatches.length > 0) {
        await processMatches(nextMatches);
    } else {
        matchCombo = 0;
        isBoardLocked = false;
        renderBoard();
        updateComboDisplay();

        if (isQuestionPending) {
            isQuestionPending = false;
            console.log('✅ Комбо закончились! Показываем вопрос...');
            if (currentLesson && currentQuestionIndex < currentLesson.questions.length) {
                triggerQuizQuestion();
            } else {
                if (currentModuleId === 'security') {
                    console.log('🛡️ ИБ — пропускаем winScreen');
                } else {
                    showWinScreen();
                }
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
// 14. ОТОБРАЖЕНИЕ БАТАРЕЙ И КОМБО
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
        comboDisplay.className = 'combo-display active';
        if (comboFrame) comboFrame.classList.add('active');
    } else {
        comboDisplay.textContent = '🔥 Лучшее комбо: x0';
        comboDisplay.className = 'combo-display';
        if (comboFrame) comboFrame.classList.remove('active');
    }
}

// ============================================================
// 15. КВИЗ
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

    const questions = currentLesson.shuffledQuestions || currentLesson.questions;
    const questionData = questions[currentQuestionIndex];
    
    if (!questionData) {
        console.error('❌ Вопрос не найден по индексу:', currentQuestionIndex);
        showWinScreen();
        return;
    }
    
    const answers = questionData.shuffledAnswers || questionData.answers;
    const correctIdx = questionData.shuffledCorrect !== undefined 
        ? questionData.shuffledCorrect 
        : questionData.correct;
    
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

    answers.forEach((answer, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-answer';
        btn.textContent = answer;
        btn.addEventListener('click', () => handleAnswerClick(idx, correctIdx, btn));
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
            handleTimeOut(correctIdx);
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
// 16. ЭКРАН ПОБЕДЫ
// ============================================================

function showWinScreen() {
    if (currentModuleId === 'security') {
        console.log('🛡️ ИБ — winScreen ОТКЛЮЧЕНА');
        if (currentModuleData && currentLesson) {
            const currentIdx = currentModuleData.lessons.findIndex(l => l.id === currentLesson.id);
            if (currentIdx !== -1 && currentIdx + 1 < currentModuleData.lessons.length) {
                const nextLessonId = currentModuleData.lessons[currentIdx + 1].id;
                unlockLesson(nextLessonId);
                console.log(`🔓 Урок ${nextLessonId} разблокирован!`);
            }
        }
        const modal = document.getElementById('quiz-modal');
        if (modal) modal.classList.add('hidden');
        
        setTimeout(() => {
            showScreen('lessons-screen');
        }, 300);
        return;
    }
    
    stopDrainTimer();
    clearInterval(quizTimer);
    resumeDrain();
    stopTimer();
    
    if (currentModuleData && currentLesson) {
        const currentIdx = currentModuleData.lessons.findIndex(l => l.id === currentLesson.id);
        if (currentIdx !== -1 && currentIdx + 1 < currentModuleData.lessons.length) {
            const nextLessonId = currentModuleData.lessons[currentIdx + 1].id;
            unlockLesson(nextLessonId);
            console.log(`🔓 Урок ${nextLessonId} разблокирован!`);
        }
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
// 17. ЭКРАН ПОРАЖЕНИЯ
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
// 18. ЭКСПОРТ ФУНКЦИЙ В ГЛОБАЛЬНУЮ ОБЛАСТЬ
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
    resetDetectiveState();
    showScreen('main-app');
};

window.nextLesson = function() {
    closeQuizUI();
    stopDrainTimer();
    clearInterval(quizTimer);
    resumeDrain();
    stopTimer();
    resetDetectiveState();
    
    if (currentModuleData && currentLesson) {
        const currentIdx = currentModuleData.lessons.findIndex(l => l.id === currentLesson.id);
        if (currentIdx !== -1 && currentIdx + 1 < currentModuleData.lessons.length) {
            const nextLesson = currentModuleData.lessons[currentIdx + 1];
            selectLesson(nextLesson);
            return;
        }
    }
    
    alert('🎉 Ты прошёл все уроки! Возвращаемся в меню.');
    showScreen('main-app');
};

// ============================================================
// 19. ОБНОВЛЕНИЕ ДАННЫХ ПРОФИЛЯ
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
// 20. ЭКРАН ЗАГРУЗКИ (LINUX STYLE)
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
    const statusText = document.getElementById('loading-status');
    
    if (!loadingScreen) return;

    let lineIndex = 0;
    let statusIndex = 0;
    const totalLines = bootMessages.length;
    const intervalTime = Math.floor(3000 / totalLines);

    function addLogLine() {
        if (lineIndex >= totalLines) {
            clearInterval(lineInterval);
            
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
        
        const newStatusIndex = Math.min(Math.floor((lineIndex / totalLines) * 14), statusMessages.length - 1);
        if (newStatusIndex !== statusIndex && statusText) {
            statusIndex = newStatusIndex;
            statusText.textContent = statusMessages[statusIndex];
        }
    }

    const lineInterval = setInterval(addLogLine, intervalTime);
}

// ============================================================
// 21. ПЕРЕМЕШИВАНИЕ МАССИВА
// ============================================================

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ============================================================
// 22. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================
// 23. ЭКСПОРТ В ГЛОБАЛЬНУЮ ОБЛАСТЬ (ДЛЯ ОТЛАДКИ)
// ============================================================

window.detective = detective;
window.currentLesson = currentLesson;
window.currentModuleData = currentModuleData;