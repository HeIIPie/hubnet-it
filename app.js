// ==================== ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ====================

let userData = {
    id: null,
    name: 'Денис',
    xp: 0,
    completedLessons: [],
    totalLessons: 4
};

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

function initUserData() {
    if (window.Telegram && window.Telegram.WebApp) {
        const webApp = window.Telegram.WebApp;
        webApp.ready();
        
        if (webApp.initDataUnsafe && webApp.initDataUnsafe.user) {
            const user = webApp.initDataUnsafe.user;
            userData.id = user.id;
            userData.name = user.first_name || 'Денис';
        }
        
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('user_id');
        const userName = urlParams.get('name');
        
        if (userId) userData.id = userId;
        if (userName) userData.name = userName;
        
        loadProgress();
        updateUI();
    } else {
        console.log('⚠️ Запуск вне Telegram (режим разработки)');
        loadProgress();
        updateUI();
    }
}

// ==================== РАБОТА С ДАННЫМИ ====================

function loadProgress() {
    try {
        const saved = localStorage.getItem(`hubnet_${userData.id || 'dev'}`);
        if (saved) {
            const data = JSON.parse(saved);
            userData.xp = data.xp || 0;
            userData.completedLessons = data.completedLessons || [];
            userData.name = data.name || userData.name;
        }
    } catch (e) {
        console.log('Не удалось загрузить прогресс');
    }
}

function saveProgress() {
    try {
        const data = {
            xp: userData.xp,
            completedLessons: userData.completedLessons,
            name: userData.name
        };
        localStorage.setItem(`hubnet_${userData.id || 'dev'}`, JSON.stringify(data));
    } catch (e) {
        console.log('Не удалось сохранить прогресс');
    }
}

function updateUI() {
    // Обновляем имя в профиле
    document.getElementById('user-name').textContent = userData.name;
    
    // Обновляем статистику
    const completed = userData.completedLessons.length;
    document.getElementById('user-lessons').textContent = `${completed} / ${userData.totalLessons}`;
    document.getElementById('user-xp').textContent = userData.xp;
    
    // Обновляем прогресс-бар
    const progress = Math.min((userData.xp / 200) * 100, 100);
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${Math.round(progress)}% до следующего уровня`;
    
    // Обновляем состояние уроков
    updateLessons();
    saveProgress();
}

function updateLessons() {
    const lessons = document.querySelectorAll('.lesson-card');
    lessons.forEach(card => {
        const lessonId = parseInt(card.dataset.lesson);
        const isUnlocked = card.dataset.unlocked === 'true';
        const isCompleted = userData.completedLessons.includes(lessonId);
        
        if (isCompleted) {
            card.classList.remove('locked');
            const btn = card.querySelector('.lesson-btn');
            if (btn) {
                btn.textContent = '✅ Пройдено';
                btn.style.opacity = '0.5';
                btn.disabled = true;
            }
        } else if (isUnlocked) {
            card.classList.remove('locked');
            const btn = card.querySelector('.lesson-btn');
            if (btn) {
                btn.textContent = 'Начать →';
                btn.disabled = false;
                btn.style.opacity = '1';
            }
        } else {
            card.classList.add('locked');
            const btn = card.querySelector('.lesson-btn');
            if (btn) {
                btn.textContent = '🔒 Заблокировано';
                btn.disabled = true;
                btn.style.opacity = '0.5';
            }
        }
    });
}

// ==================== НАВИГАЦИЯ ====================

function navigateTo(screenName) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    const target = document.getElementById(`${screenName}-screen`);
    if (target) target.classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.screen === screenName);
    });
    
    const titles = {
        'main': 'Hubnet IT',
        'networks': 'Раздел: Сети',
        'profile': 'Мой Профиль'
    };
    document.getElementById('header-title').textContent = titles[screenName] || 'Hubnet IT';
}

// ==================== ОБРАБОТЧИКИ ====================

document.addEventListener('DOMContentLoaded', function() {
    // Навигация по нижнему меню
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            navigateTo(btn.dataset.screen);
        });
    });
    
    // Кнопка "Мой Профиль" на главной
    document.getElementById('btn-profile').addEventListener('click', () => {
        navigateTo('profile');
    });
    
    // Карточки направлений на главной
    document.querySelectorAll('.course-card[data-screen]').forEach(card => {
        card.addEventListener('click', () => {
            navigateTo(card.dataset.screen);
        });
    });
    
    // Кнопки уроков
    document.querySelectorAll('.lesson-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.lesson-card');
            const lessonId = parseInt(card.dataset.lesson);
            
            if (card.classList.contains('locked')) {
                alert('🔒 Этот урок заблокирован!');
                return;
            }
            
            if (userData.completedLessons.includes(lessonId)) {
                alert('✅ Ты уже прошёл этот урок!');
                return;
            }
            
            openLesson(lessonId);
        });
    });
});

// ==================== УРОКИ ====================

function openLesson(lessonId) {
    const lessonsContent = {
        1: {
            title: '📚 Что такое IP-адрес?',
            content: `
                <p><strong>IP-адрес</strong> — это уникальный идентификатор устройства в сети.</p>
                <p>Пример: <code>192.168.1.1</code></p>
                <p>IP-адрес состоит из 4 чисел, разделённых точками.</p>
                <p>Каждое число — от 0 до 255.</p>
                <br>
                <p>🎯 <strong>Зачем нужен IP-адрес?</strong></p>
                <ul>
                    <li>Чтобы устройства могли находить друг друга в сети</li>
                    <li>Как почтовый адрес для данных</li>
                </ul>
            `
        },
        2: {
            title: '🌐 Что такое DNS?',
            content: `
                <p><strong>DNS (Domain Name System)</strong> — это как телефонная книга интернета.</p>
                <p>Он превращает доменные имена (например, google.com) в IP-адреса.</p>
                <br>
                <p>🎯 <strong>Как это работает:</strong></p>
                <ul>
                    <li>Ты вводишь сайт → DNS находит его IP → браузер загружает страницу</li>
                </ul>
            `
        }
    };
    
    const lesson = lessonsContent[lessonId];
    if (!lesson) {
        alert('Урок не найден!');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'lesson-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeLesson()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeLesson()">✕</button>
            <h2>${lesson.title}</h2>
            <div class="modal-body">${lesson.content}</div>
            <button class="modal-complete" onclick="completeLesson(${lessonId})">
                ✅ Получить +50 XP
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeLesson() {
    const modal = document.querySelector('.lesson-modal');
    if (modal) modal.remove();
}

function completeLesson(lessonId) {
    if (userData.completedLessons.includes(lessonId)) {
        alert('✅ Ты уже прошел этот урок!');
        closeLesson();
        return;
    }
    
    userData.completedLessons.push(lessonId);
    userData.xp += 50;
    saveProgress();
    updateUI();
    closeLesson();
    
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.sendData(JSON.stringify({
            action: 'complete_lesson',
            lesson_id: lessonId,
            user_id: userData.id,
            xp: userData.xp
        }));
    }
    
    alert('🎉 Урок пройден! +50 XP!');
}

// ==================== ЗАПУСК ====================

initUserData();