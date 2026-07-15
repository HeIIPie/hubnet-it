import { lessons } from './data/lessons.js';

// Инициализируем прогресс пользователя (сохраняем в браузере)
export function getUnlockedLessons() {
    const saved = localStorage.getItem('unlocked_lessons');
    if (saved) {
        return JSON.parse(saved);
    }
    // По умолчанию открыт только самый первый урок
    return ['networks_1']; 
}

// Сохраняем новую разблокировку
export function unlockLesson(lessonId) {
    let unlocked = getUnlockedLessons();
    if (!unlocked.includes(lessonId)) {
        unlocked.push(lessonId);
        localStorage.setItem('unlocked_lessons', JSON.stringify(unlocked));
    }
}

// Отрисовка списка уроков на экране выбора уроков
export function renderLessonsList(onSelectLesson) {
    const listContainer = document.getElementById('lessons-list');
    listContainer.innerHTML = ''; // Очищаем старое
    
    const unlocked = getUnlockedLessons();
    
    lessons.forEach((lesson, index) => {
        const isLocked = index > 0 && !unlocked.includes(lesson.id);
        
        const card = document.createElement('div');
        card.className = `lesson-card ${isLocked ? 'locked' : ''}`;
        
        card.innerHTML = `
            <div class="lesson-card-info">
                <h3>${lesson.title}</h3>
                <p>${isLocked ? 'Пройдите предыдущий урок для открытия' : 'Теория + Практика'}</p>
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
}

// Функция показа конкретного экрана (и скрытия остальных)
export function showScreen(screenId) {
    const screens = ['main-app', 'lessons-screen', 'lecture-screen', 'game-screen'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id === screenId) {
                // Главное меню может использовать flex, остальные container - block/flex
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
