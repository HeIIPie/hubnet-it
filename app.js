import { lessons } from './js/data/lessons.js';
import { 
    getUnlockedLessons, 
    unlockLesson, 
    renderLessonsList, 
    showScreen 
} from './js/ui.js';
import { 
    generateValidBoard, 
    checkMatches, 
    areNeighbors, 
    BOARD_SIZE, 
    TILE_TYPES 
} from './js/game.js';

// --- ИГРОВЫЕ ПЕРЕМЕННЫЕ ---
let currentLesson = null;       // Текущий выбранный урок
let board = [];                 // Массив плиток на поле
let selectedIndex = null;       // Индекс первой выбранной плитки
let progress = 0;               // Шкала зарядки (0 - 100)
let combo = 0;                  // Комбо совпадений
let isAnimating = false;        // Флаг анимации
let isQuizActive = false;       // Идёт ли сейчас квиз
let currentQuestionIndex = 0;   // Индекс текущего вопроса в уроке
let timerInterval = null;       // Интервал для таймера квиза
let quizTimerValue = 100;       // Значение таймера квиза (100% - 0%)

// --- DOM ЭЛЕМЕНТЫ ---
const mainApp = document.getElementById('main-app');
const lessonsScreen = document.getElementById('lessons-screen');
const lectureScreen = document.getElementById('lecture-screen');
const gameScreen = document.getElementById('game-screen');

const gameBoard = document.getElementById('game-board');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const btnShuffle = document.getElementById('btn-shuffle');

const quizModal = document.getElementById('quiz-modal');
const quizQuestion = document.getElementById('quiz-question');
const quizAnswers = document.getElementById('quiz-answers');

// --- ИНИЦИАЛИЗАЦИЯ И НАВИГАЦИЯ ---

// Клик по кнопке "Компьютерные сети" в главном меню
document.getElementById('btn-computer-networks').addEventListener('click', () => {
    renderLessonsList(selectLesson);
    showScreen('lessons-screen');
});

// Клик назад из списка уроков в главное меню
document.getElementById('btn-lessons-back').addEventListener('click', () => {
    showScreen('main-app');
});

// Клик назад из лекции в список уроков
document.getElementById('btn-lecture-back').addEventListener('click', () => {
    renderLessonsList(selectLesson); // перерисовываем, если вдруг обновился прогресс
    showScreen('lessons-screen');
});

// Клик назад из игры (выход в меню)
document.getElementById('btn-back').addEventListener('click', () => {
    stopQuizTimer();
    
    // Чистим все хвосты и блокировки
    gameBoard.classList.remove('board-locked');
    progressBar.classList.remove('timer-mode');
    closeQuizUI();
    
    renderLessonsList(selectLesson);
    showScreen('lessons-screen');
});

// Выбор урока из списка
function selectLesson(lesson) {
    currentLesson = lesson;
    
    // Заполняем экран лекции
    document.getElementById('lecture-title').innerText = lesson.title;
    document.getElementById('lecture-text').innerHTML = lesson.theory;
    
    showScreen('lecture-screen');
}

// Старт практики после прочтения лекции
document.getElementById('btn-start-practice').addEventListener('click', () => {
    if (!currentLesson) return;
    showScreen('game-screen');
    startGame();
});

// --- ЛОГИКА ИГРЫ "ТРИ В РЯД" ---

function startGame() {
    progress = 0;
    currentQuestionIndex = 0;
    combo = 0;
    isAnimating = false;
    isQuizActive = false;
    selectedIndex = null;
    
    // Гарантированно чистим стили шкалы и игрового поля при старте
    progressBar.classList.remove('timer-mode');
    progressBar.style.width = '0%';
    gameBoard.classList.remove('board-locked');
    
    btnShuffle.disabled = false;
    updateProgressUI();
    closeQuizUI();
    
    // Создаем поле
    board = generateValidBoard();
    renderBoard();
}

// Отрисовка игрового поля
function renderBoard() {
    gameBoard.innerHTML = '';
    board.forEach((tile, index) => {
        const tileEl = document.createElement('div');
        tileEl.className = 'tile';
        tileEl.innerText = tile;
        tileEl.dataset.index = index;
        
        if (index === selectedIndex) {
            tileEl.classList.add('selected');
        }
        
        tileEl.addEventListener('click', () => handleTileClick(index));
        gameBoard.appendChild(tileEl);
    });
}

// Обработка клика по плитке
async function handleTileClick(index) {
    if (isAnimating || isQuizActive) return;

    if (selectedIndex === null) {
        selectedIndex = index;
        renderBoard();
    } else {
        const firstIndex = selectedIndex;
        selectedIndex = null;

        if (firstIndex === index) {
            renderBoard();
            return;
        }

        if (areNeighbors(firstIndex, index)) {
            isAnimating = true;
            // Пробуем поменять местами
            swapTiles(firstIndex, index);
            renderBoard();

            // Ждем завершения анимации перемещения
            await delay(150);

            const matches = checkMatches(board);
            if (matches.length > 0) {
                // Если совпадение есть — убираем плитки
                combo = 1;
                await processMatches(matches);
            } else {
                // Если совпадений нет — возвращаем плитки обратно
                swapTiles(firstIndex, index);
                renderBoard();
            }
            isAnimating = false;
        } else {
            // Если кликнули не на соседа — выбираем новую плитку
            selectedIndex = index;
            renderBoard();
        }
    }
}

// Меняет местами элементы в массиве
function swapTiles(i1, i2) {
    const temp = board[i1];
    board[i1] = board[i2];
    board[i2] = temp;
}

// Обработка и удаление совпавших плиток
async function processMatches(matches) {
    // 1. Начисляем прогресс
    const earnedProgress = matches.length * 2 * combo;
    progress = Math.min(100, progress + earnedProgress);
    updateProgressUI();

    // 2. Визуально подсвечиваем и удаляем
    const tileEls = gameBoard.querySelectorAll('.tile');
    matches.forEach(idx => {
        tileEls[idx].classList.add('match');
        board[idx] = ''; // Очищаем в массиве
    });

    await delay(200);

    // 3. Сдвигаем плитки сверху вниз
    applyGravity();
    renderBoard();
    await delay(150);

    // 4. Заполняем пустоты сверху новыми плитками
    fillEmptyTiles();
    renderBoard();
    await delay(150);

    // 5. Проверяем новые совпадения (каскад/комбо)
    const nextMatches = checkMatches(board);
    if (nextMatches.length > 0) {
        combo++;
        await processMatches(nextMatches);
    } else {
        // Если каскад закончился, проверяем, пора ли запускать квиз
        checkQuizTrigger();
    }
}

// Физика падения плиток вниз
function applyGravity() {
    for (let c = 0; c < BOARD_SIZE; c++) {
        let emptyRow = BOARD_SIZE - 1;
        for (let r = BOARD_SIZE - 1; r >= 0; r--) {
            const idx = r * BOARD_SIZE + c;
            if (board[idx] !== '') {
                if (emptyRow !== r) {
                    board[emptyRow * BOARD_SIZE + c] = board[idx];
                    board[idx] = '';
                }
                emptyRow--;
            }
        }
    }
}

// Заполнение пустых клеток новыми плитками
function fillEmptyTiles() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = TILE_TYPES[Math.floor(Math.random() * TILE_TYPES.length)];
        }
    }
}

// Обновление шкалы прогресса вверху экрана
function updateProgressUI() {
    if (isQuizActive) return; // во время квиза шкалой управляет таймер
    
    progressBar.style.width = `${progress}%`;
    progressText.innerText = `Вопрос: ${currentQuestionIndex}/5 | Зарядка: ${progress}%`;
}

// Кнопка принудительного перемешивания поля
btnShuffle.addEventListener('click', () => {
    if (isAnimating || isQuizActive) return;
    board = generateValidBoard();
    renderBoard();
});

// Вспомогательная задержка
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// --- ЛОГИКА ВИКТОРИНЫ (КВИЗ) ---

// Проверяем, набралось ли 100% для вызова вопроса
function checkQuizTrigger() {
    if (progress >= 100 && currentQuestionIndex < 5) {
        startQuizRound();
    }
}

// Запуск фазы ответа на вопрос
function startQuizRound() {
    isQuizActive = true;
    btnShuffle.disabled = true;
    
    // Блокируем игровое поле и делаем его тусклым
    gameBoard.classList.add('board-locked');

    // Переводим шкалу прогресса в красный режим таймера
    progressBar.classList.add('timer-mode');

    // Получаем текущий вопрос из базы урока
    const questionData = currentLesson.questions[currentQuestionIndex];
    quizQuestion.innerText = questionData.q;
    
    // Рендерим варианты ответов
    quizAnswers.innerHTML = '';
    questionData.a.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-answer';
        btn.innerText = ans;
        btn.addEventListener('click', () => handleAnswerClick(idx));
        quizAnswers.appendChild(btn);
    });

    // Показываем окно вопроса
    quizModal.classList.remove('hidden');

    // Запускаем таймер на 15 секунд
    startQuizTimer();
}

// Таймер на ответ
function startQuizTimer() {
    stopQuizTimer();
    
    quizTimerValue = 100;
    progressBar.style.width = '100%';
    
    const timeLimit = 15000; // 15 секунд
    const intervalTime = 100; // обновляем каждые 0.1 сек
    const step = (intervalTime / timeLimit) * 100;

    timerInterval = setInterval(() => {
        quizTimerValue -= step;
        progressBar.style.width = `${Math.max(0, quizTimerValue)}%`;

        if (quizTimerValue <= 0) {
            stopQuizTimer();
            // Время вышло = неверный ответ
            handleAnswerResult(false);
        }
    }, intervalTime);
}

function stopQuizTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Обработка клика по варианту ответа
function handleAnswerClick(index) {
    stopQuizTimer();
    const isCorrect = index === currentLesson.questions[currentQuestionIndex].correct;
    handleAnswerResult(isCorrect);
}

// Результат ответа (правильно / неправильно)
function handleAnswerResult(isCorrect) {
    const buttons = quizAnswers.querySelectorAll('.btn-answer');
    const correctIdx = currentLesson.questions[currentQuestionIndex].correct;

    // Подсвечиваем кнопки зеленым/красным
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIdx) {
            btn.classList.add('correct');
        } else if (!isCorrect) {
            btn.classList.add('wrong');
        }
    });

    setTimeout(() => {
        closeQuizUI();
        
        if (isCorrect) {
            currentQuestionIndex++;
            progress = 0; // Сбрасываем шкалу для накопления на следующий вопрос
            
            // Проверяем, пройден ли весь урок (все 5 вопросов)
            if (currentQuestionIndex >= 5) {
                handleLessonVictory();
                return;
            }
        } else {
            // При ошибке штрафуем шкалу прогресса на 40% и даём копить заново на тот же вопрос
            progress = Math.max(0, progress - 40);
        }

        // Возвращаем игру в обычное русло
        isQuizActive = false;
        btnShuffle.disabled = false;
        gameBoard.classList.remove('board-locked');
        progressBar.classList.remove('timer-mode');
        updateProgressUI();
        
        // На случай если после штрафа всё ещё осталось 100%
        checkQuizTrigger();

    }, 1500); // Показываем результат подсвеченных кнопок 1.5 секунды
}

// Действие при успешном прохождении всего урока
function handleLessonVictory() {
    alert(`🏆 Поздравляем! Лекция "${currentLesson.title}" успешно усвоена на 100%!`);
    
    // Разблокируем СЛЕДУЮЩИЙ урок
    const currentLessonIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentLessonIndex !== -1 && currentLessonIndex < lessons.length - 1) {
        const nextLessonId = lessons[currentLessonIndex + 1].id;
        unlockLesson(nextLessonId);
    }

    // Возвращаемся на экран выбора уроков
    renderLessonsList(selectLesson);
    showScreen('lessons-screen');
}

// Закрытие UI-модалки вопроса
function closeQuizUI() {
    quizModal.classList.add('hidden');
}
