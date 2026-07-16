// ============================================================
// 1. ИМПОРТЫ
// ============================================================

import { lessons } from './data/lessons.js';

// ============================================================
// 2. ПЕРЕМЕННЫЕ
// ============================================================

let userData = {
    id: null,
    name: 'Друг'
};

// ============================================================
// 3. TELEGRAM WEB APP
// ============================================================

/**
 * Инициализация Telegram Web App
 */
export function initTelegram() {
    if (window.Telegram && window.Telegram.WebApp) {
        const webApp = window.Telegram.WebApp;
        webApp.ready();
        
        if (webApp.initDataUnsafe && webApp.initDataUnsafe.user) {
            const user = webApp.initDataUnsafe.user;
            userData.id = user.id;
            userData.name = user.first_name || 'Друг';
        }
        
        // Получаем параметры из URL
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('user_id');
        const userName = urlParams.get('name');
        
        if (userId) userData.id = userId;
        if (userName) userData.name = userName;
        
        console.log('✅ Telegram Web App инициализирован:', userData);
    } else {
        console.log('⚠️ Запуск вне Telegram (режим разработки)');
    }
}

/**
 * Получить имя пользователя
 */
export function getUserName() {
    return userData.name;
}

/**
 * Получить ID пользователя
 */
export function getUserId() {
    return userData.id;
}

// ============================================================
// 4. РАБОТА С ПРОГРЕССОМ (localStorage)
// ============================================================

/**
 * Загружает список разблокированных уроков из памяти браузера.
 * Если данных нет — по умолчанию открыт только первый урок.
 */
export function getUnlockedLessons() {
    const saved = localStorage.getItem('unlocked_lessons');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error("Ошибка чтения прогресса:", e);
        }
    }
    // По умолчанию открыт только самый первый урок
    return [lessons[0]?.id || 'networks_1']; 
}

/**
 * Сохраняет разблокированный урок в память браузера (localStorage)
 */
export function unlockLesson(lessonId) {
    let unlocked = getUnlockedLessons();
    if (!unlocked.includes(lessonId)) {
        unlocked.push(lessonId);
        localStorage.setItem('unlocked_lessons', JSON.stringify(unlocked));
        console.log(`🔓 Урок ${lessonId} разблокирован!`);
    }
}

/**
 * Сохраняет прогресс пользователя
 */
export function saveProgress(progressData) {
    try {
        const key = `hubnet_progress_${userData.id || 'dev'}`;
        localStorage.setItem(key, JSON.stringify(progressData));
    } catch (e) {
        console.error('Ошибка сохранения прогресса:', e);
    }
}

/**
 * Загружает прогресс пользователя
 */
export function loadProgress() {
    try {
        const key = `hubnet_progress_${userData.id || 'dev'}`;
        const saved = localStorage.getItem(key);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('Ошибка загрузки прогресса:', e);
    }
    return null;
}

// ============================================================
// 5. УПРАВЛЕНИЕ ЭКРАНАМИ (ИСПРАВЛЕНО)
// ============================================================

/**
 * Менеджер экранов: показывает один нужный экран и гарантированно скрывает все остальные
 */
export function showScreen(screenId) {
    const screens = ['main-app', 'lessons-screen', 'lecture-screen', 'game-screen', 'profile-screen'];
    
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id === screenId) {
                el.classList.remove('hidden');
                if (id === 'main-app') {
                    el.style.display = 'flex';
                }
            } else {
                el.classList.add('hidden');
                if (id === 'main-app') {
                    el.style.display = 'none';
                }
            }
        }
    });
}

// ============================================================
// 6. ОТРИСОВКА УРОКОВ
// ============================================================

/**
 * Динамически отрисовывает карточки уроков на экране выбора уроков
 */
export function renderLessonsList(onSelectLesson) {
    const listContainer = document.getElementById('lessons-list');
    if (!listContainer) {
        console.error('❌ Контейнер lessons-list не найден!');
        return;
    }
    
    listContainer.innerHTML = '';
    const unlocked = getUnlockedLessons();
    
    lessons.forEach((lesson, index) => {
        const isLocked = index > 0 && !unlocked.includes(lesson.id);
        
        const card = document.createElement('div');
        card.className = `lesson-card ${isLocked ? 'locked' : ''}`;
        
        card.innerHTML = `
            <div class="lesson-card-info">
                <h3>${lesson.title}</h3>
                <p>${isLocked ? '🔒 Пройдите предыдущий урок для открытия' : '📖 Теория + Практика 🎮'}</p>
            </div>
            <div class="lesson-status-icon">
                ${isLocked ? '🔒' : '👉'}
            </div>
        `;
        
        if (!isLocked) {
            card.addEventListener('click', () => {
                onSelectLesson(lesson);
            });
        }
        
        listContainer.appendChild(card);
    });
    
    console.log(`✅ Отрисовано ${lessons.length} уроков`);
}