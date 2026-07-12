// ============ ОТКРЫТИЕ УРОКА ============

function openLesson(lessonId) {
    // Контент уроков
    const lessonsContent = {
        1: {
            title: "Что такое IP-адрес?",
            content: `
                <h2>🌐 Что такое IP-адрес?</h2>
                <p><strong>IP-адрес</strong> — это уникальный идентификатор устройства в сети.</p>
                <p>Пример: <code>192.168.1.1</code></p>
                <p>IP-адрес состоит из 4 чисел, разделённых точками. Каждое число — от 0 до 255.</p>
                <h3>📌 Зачем нужен IP-адрес?</h3>
                <ul>
                    <li>Чтобы устройства могли находить друг друга в сети</li>
                    <li>Как почтовый адрес для данных</li>
                </ul>
            `
        },
        2: {
            title: "DNS-серверы",
            content: `
                <h2>🌐 Что такое DNS?</h2>
                <p><strong>DNS (Domain Name System)</strong> — это как телефонная книга интернета.</p>
                <p>Он превращает доменные имена (например, google.com) в IP-адреса.</p>
                <h3>📌 Как это работает:</h3>
                <ul>
                    <li>Ты вводишь сайт → DNS находит его IP → браузер загружает страницу</li>
                </ul>
            `
        },
        3: {
            title: "Протоколы TCP/IP",
            content: `
                <h2>📦 Что такое TCP/IP?</h2>
                <p><strong>TCP/IP</strong> — это набор правил, по которым устройства общаются в интернете.</p>
                <p>TCP — разбивает данные на пакеты и проверяет их доставку.</p>
                <p>IP — отвечает за адресацию и маршрутизацию.</p>
            `
        },
        4: {
            title: "Сетевая безопасность",
            content: `
                <h2>🔐 Сетевая безопасность</h2>
                <p>Защита данных в сети — это важно!</p>
                <ul>
                    <li>Используй сложные пароли</li>
                    <li>Обновляй программы</li>
                    <li>Не переходи по подозрительным ссылкам</li>
                </ul>
            `
        }
    };
    
    const lesson = lessonsContent[lessonId];
    if (!lesson) {
        alert('Урок не найден!');
        return;
    }
    
    // Показываем содержимое урока
    const container = document.createElement('div');
    container.className = 'lesson-content-modal';
    container.innerHTML = `
        <div class="modal-overlay" onclick="closeLesson()"></div>
        <div class="modal-content">
            <button class="close-btn" onclick="closeLesson()">✕</button>
            ${lesson.content}
            <button class="complete-lesson-btn" onclick="completeLesson(${lessonId})">
                ✅ Завершить урок и получить +50 XP
            </button>
        </div>
    `;
    
    document.body.appendChild(container);
}

function closeLesson() {
    const modal = document.querySelector('.lesson-content-modal');
    if (modal) modal.remove();
}