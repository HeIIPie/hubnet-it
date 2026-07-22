// ============================================================
// МОДУЛЬ 7: DEVOPS
// ============================================================

export const module = {
    id: 'devops',
    title: 'DevOps',
    icon: '⚙️',
    game: 'pipeline_defender', // игра будет добавлена позже
    totalLessons: 21,
    lessons: [
        // ============================================================
        // УРОК 1: Что такое DevOps?
        // ============================================================
        {
            id: 'devops_1',
            title: 'Что такое DevOps?',
            lecture: `
                <p>⚙️ <b>DevOps</b> — это не просто набор инструментов, а культура и философия работы.</p>

                <p>📌 <b>Что такое DevOps?</b><br>
                DevOps — это объединение разработки (Dev) и эксплуатации (Ops) для ускорения выпуска продуктов.</p>

                <p>📊 <b>Ключевые принципы:</b><br>
                • <b>Культура</b> — совместная ответственность<br>
                • <b>Автоматизация</b> — минимизация ручных операций<br>
                • <b>Измерение</b> — данные для принятия решений<br>
                • <b>Sharing</b> — обмен знаниями и опытом</p>

                <p>📌 <b>Три пути DevOps:</b><br>
                1. <b>Flow</b> — быстрая доставка кода<br>
                2. <b>Feedback</b> — быстрая обратная связь<br>
                3. <b>Continuous Learning</b> — постоянное улучшение</p>

                <p>🔧 <b>Инструменты DevOps:</b><br>
                • <b>CI/CD</b> — GitHub Actions, GitLab CI, Jenkins<br>
                • <b>Контейнеризация</b> — Docker, Kubernetes<br>
                • <b>IaC</b> — Terraform, Ansible<br>
                • <b>Мониторинг</b> — Prometheus, Grafana</p>
            `,
            questions: [
                {
                    question: 'Что такое DevOps?',
                    answers: [
                        'Культура и философия работы, объединяющая Dev и Ops',
                        'Только набор инструментов',
                        'Только процесс разработки',
                        'Только администрирование серверов'
                    ],
                    correct: 0
                },
                {
                    question: 'Что НЕ является принципом DevOps?',
                    answers: ['Автоматизация', 'Измерение', 'Изоляция команд', 'Sharing'],
                    correct: 2
                },
                {
                    question: 'Что такое "Три пути DevOps"?',
                    answers: [
                        'Flow, Feedback, Continuous Learning',
                        'Dev, Ops, Security',
                        'Plan, Code, Deploy',
                        'Build, Test, Release'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой инструмент НЕ относится к DevOps?',
                    answers: ['Docker', 'GitHub Actions', 'Microsoft Word', 'Terraform'],
                    correct: 2
                },
                {
                    question: 'Почему DevOps важен?',
                    answers: [
                        'Ускоряет выпуск продуктов и повышает качество',
                        'Только экономит деньги',
                        'Только упрощает работу разработчиков',
                        'Заменяет тестирование'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 2: Linux для DevOps — основы
        // ============================================================
        {
            id: 'devops_2',
            title: 'Linux для DevOps — основы',
            lecture: `
                <p>🐧 <b>Linux</b> — основа современной инфраструктуры.</p>

                <p>📌 <b>Файловая система Linux:</b><br>
                • <b>/</b> — корневая директория<br>
                • <b>/home</b> — домашние папки пользователей<br>
                • <b>/etc</b> — конфигурационные файлы<br>
                • <b>/var</b> — переменные данные (логи)<br>
                • <b>/tmp</b> — временные файлы</p>

                <p>📌 <b>Основные команды:</b><br>
                <code>
                ls -la          # список файлов<br>
                cd /home        # перейти в папку<br>
                pwd             # текущая папка<br>
                cp file1 file2  # копировать<br>
                mv file1 file2  # переместить/переименовать<br>
                rm file         # удалить файл<br>
                mkdir dir       # создать папку
                </code></p>

                <p>📌 <b>Права доступа:</b><br>
                <code>
                chmod 755 file  # rwxr-xr-x<br>
                chown user:group file  # сменить владельца
                </code></p>

                <p>📌 <b>Полезные команды:</b><br>
                <code>
                grep "error" log.txt  # поиск в файле<br>
                find / -name "*.log"   # поиск файлов<br>
                tail -f log.txt        # просмотр лога в реальном времени
                </code></p>
            `,
            questions: [
                {
                    question: 'Где в Linux хранятся конфигурационные файлы?',
                    answers: ['/etc', '/home', '/var', '/tmp'],
                    correct: 0
                },
                {
                    question: 'Какая команда показывает текущую директорию?',
                    answers: ['pwd', 'ls', 'cd', 'dir'],
                    correct: 0
                },
                {
                    question: 'Что делает команда grep?',
                    answers: [
                        'Ищет текст в файлах',
                        'Копирует файлы',
                        'Удаляет файлы',
                        'Создаёт папки'
                    ],
                    correct: 0
                },
                {
                    question: 'Как изменить права доступа к файлу?',
                    answers: ['chmod', 'chown', 'chgrp', 'chattr'],
                    correct: 0
                },
                {
                    question: 'Где в Linux хранятся логи?',
                    answers: ['/var/log', '/etc/log', '/home/log', '/tmp/log'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 3: Linux — управление процессами и сетью
        // ============================================================
        {
            id: 'devops_3',
            title: 'Linux — управление процессами и сетью',
            lecture: `
                <p>🔄 <b>Управление процессами</b> — контроль запущенных приложений.</p>

                <p>📌 <b>Команды для работы с процессами:</b><br>
                <code>
                ps aux           # список всех процессов<br>
                top              # мониторинг процессов в реальном времени<br>
                htop             # улучшенный top<br>
                kill PID         # завершить процесс по ID<br>
                kill -9 PID      # принудительно завершить<br>
                nohup command &  # запустить в фоне
                </code></p>

                <p>📌 <b>systemd — управление службами:</b><br>
                <code>
                systemctl start nginx   # запустить сервис<br>
                systemctl stop nginx    # остановить<br>
                systemctl restart nginx # перезапустить<br>
                systemctl status nginx  # статус<br>
                systemctl enable nginx  # автозапуск
                </code></p>

                <p>📌 <b>Сетевые команды:</b><br>
                <code>
                ip addr          # сетевые интерфейсы<br>
                ss -tulpn        # открытые порты<br>
                ping google.com  # проверка доступности<br>
                netstat -tulpn   # сетевые соединения
                </code></p>
            `,
            questions: [
                {
                    question: 'Какая команда показывает все запущенные процессы?',
                    answers: ['ps aux', 'ls', 'cd', 'pwd'],
                    correct: 0
                },
                {
                    question: 'Как завершить процесс по PID?',
                    answers: ['kill PID', 'stop PID', 'end PID', 'terminate PID'],
                    correct: 0
                },
                {
                    question: 'Как запустить сервис через systemd?',
                    answers: ['systemctl start', 'service start', 'systemd start', 'init start'],
                    correct: 0
                },
                {
                    question: 'Какая команда показывает открытые порты?',
                    answers: ['ss -tulpn', 'ps aux', 'ls -la', 'pwd'],
                    correct: 0
                },
                {
                    question: 'Что делает команда kill -9?',
                    answers: [
                        'Принудительно завершает процесс',
                        'Перезапускает процесс',
                        'Останавливает процесс',
                        'Запускает процесс'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 4: Git — система контроля версий
        // ============================================================
        {
            id: 'devops_4',
            title: 'Git — система контроля версий',
            lecture: `
                <p>📦 <b>Git</b> — самая популярная система контроля версий.</p>

                <p>📌 <b>Основы Git:</b><br>
                <code>
                git init               # создать репозиторий<br>
                git clone url          # склонировать репозиторий<br>
                git add file           # добавить файл в commit<br>
                git commit -m "msg"    # создать commit<br>
                git push               # отправить в удалённый репозиторий<br>
                git pull               # получить изменения
                </code></p>

                <p>📌 <b>Работа с ветками:</b><br>
                <code>
                git branch                    # список веток<br>
                git branch feature           # создать ветку<br>
                git checkout feature         # переключиться на ветку<br>
                git checkout -b feature      # создать и переключиться<br>
                git merge feature            # слить ветку<br>
                git rebase main              # перебазировать ветку
                </code></p>

                <p>📌 <b>Стратегии ветвления:</b><br>
                • <b>Git Flow</b> — классика, для крупных проектов<br>
                • <b>GitHub Flow</b> — простая, для веб-приложений<br>
                • <b>Trunk-based</b> — одна основная ветка</p>
            `,
            questions: [
                {
                    question: 'Как создать новый репозиторий Git?',
                    answers: ['git init', 'git new', 'git create', 'git start'],
                    correct: 0
                },
                {
                    question: 'Как создать новую ветку?',
                    answers: ['git branch feature', 'git checkout feature', 'git merge feature', 'git add feature'],
                    correct: 0
                },
                {
                    question: 'Что делает команда git push?',
                    answers: [
                        'Отправляет изменения в удалённый репозиторий',
                        'Получает изменения из удалённого репозитория',
                        'Создаёт новый коммит',
                        'Удаляет ветку'
                    ],
                    correct: 0
                },
                {
                    question: 'Какая стратегия ветвления считается классической?',
                    answers: ['Git Flow', 'GitHub Flow', 'Trunk-based', 'GitLab Flow'],
                    correct: 0
                },
                {
                    question: 'Как переключиться на другую ветку?',
                    answers: ['git checkout branch', 'git switch branch', 'git branch branch', 'git move branch'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 5: Скрипты и автоматизация
        // ============================================================
        {
            id: 'devops_5',
            title: 'Скрипты и автоматизация',
            lecture: `
                <p>🤖 <b>Автоматизация</b> — основа DevOps. Ручные операции — зло.</p>

                <p>📌 <b>Bash-скриптинг:</b><br>
                <code>
                #!/bin/bash<br>
                # Пример скрипта для деплоя<br>
                echo "Начинаю деплой..."<br>
                cd /var/www/app<br>
                git pull origin main<br>
                docker-compose down<br>
                docker-compose up -d --build<br>
                echo "Деплой завершён!"
                </code></p>

                <p>📌 <b>Переменные и условия в Bash:</b><br>
                <code>
                NAME="Bob"<br>
                echo "Hello $NAME"<br>
                <br>
                if [ "$USER" == "root" ]; then<br>
                &nbsp;&nbsp;&nbsp;&nbsp;echo "Вы root"<br>
                else<br>
                &nbsp;&nbsp;&nbsp;&nbsp;echo "Вы не root"<br>
                fi
                </code></p>

                <p>📌 <b>Циклы в Bash:</b><br>
                <code>
                for file in *.log; do<br>
                &nbsp;&nbsp;&nbsp;&nbsp;echo $file<br>
                done
                </code></p>

                <p>📌 <b>Python для автоматизации:</b><br>
                Python часто используется для сложных скриптов, работы с API, парсинга данных.</p>
            `,
            questions: [
                {
                    question: 'Какой язык чаще всего используется для автоматизации в DevOps?',
                    answers: ['Bash и Python', 'Только C++', 'Только Java', 'Только Go'],
                    correct: 0
                },
                {
                    question: 'Как объявить переменную в Bash?',
                    answers: ['NAME="value"', 'var NAME="value"', 'set NAME="value"', 'let NAME="value"'],
                    correct: 0
                },
                {
                    question: 'Как выполнить условие в Bash?',
                    answers: ['if [ условие ]; then ... fi', 'if (условие) { ... }', 'if условие then ...', 'if [ условие ] ...'],
                    correct: 0
                },
                {
                    question: 'Что такое "Shebang" в Bash?',
                    answers: [
                        '#!/bin/bash — указывает интерпретатор',
                        'Комментарий в коде',
                        'Переменная окружения',
                        'Команда для вывода'
                    ],
                    correct: 0
                },
                {
                    question: 'Почему автоматизация важна в DevOps?',
                    answers: [
                        'Уменьшает человеческие ошибки и ускоряет процессы',
                        'Только экономит время',
                        'Только упрощает работу',
                        'Не важна, главное — инструменты'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 6: Docker — основы
        // ============================================================
        {
            id: 'devops_6',
            title: 'Docker — основы контейнеризации',
            lecture: `
                <p>🐳 <b>Docker</b> — платформа для контейнеризации приложений.</p>

                <p>📌 <b>Основные понятия:</b><br>
                • <b>Образ (Image)</b> — шаблон для создания контейнера<br>
                • <b>Контейнер (Container)</b> — запущенный экземпляр образа<br>
                • <b>Dockerfile</b> — инструкция для сборки образа<br>
                • <b>Docker Hub</b> — реестр образов</p>

                <p>📌 <b>Dockerfile:</b><br>
                <code>
                FROM python:3.12-slim<br>
                WORKDIR /app<br>
                COPY requirements.txt .<br>
                RUN pip install -r requirements.txt<br>
                COPY . .<br>
                CMD ["python", "app.py"]
                </code></p>

                <p>📌 <b>Команды Docker:</b><br>
                <code>
                docker build -t myapp .           # собрать образ<br>
                docker run -p 8080:80 myapp      # запустить контейнер<br>
                docker ps                        # список контейнеров<br>
                docker stop container_id         # остановить контейнер<br>
                docker rm container_id           # удалить контейнер<br>
                docker images                    # список образов<br>
                docker rmi image_id              # удалить образ
                </code></p>
            `,
            questions: [
                {
                    question: 'Что такое Docker-образ?',
                    answers: [
                        'Шаблон для создания контейнера',
                        'Запущенный контейнер',
                        'Файл с конфигурацией',
                        'Инструмент для оркестрации'
                    ],
                    correct: 0
                },
                {
                    question: 'Какая команда собирает Docker-образ?',
                    answers: ['docker build', 'docker compose', 'docker run', 'docker create'],
                    correct: 0
                },
                {
                    question: 'Что такое Dockerfile?',
                    answers: [
                        'Файл с инструкциями для сборки образа',
                        'Файл с конфигурацией контейнера',
                        'Файл с логами',
                        'Файл с переменными окружения'
                    ],
                    correct: 0
                },
                {
                    question: 'Какая команда показывает список запущенных контейнеров?',
                    answers: ['docker ps', 'docker images', 'docker containers', 'docker list'],
                    correct: 0
                },
                {
                    question: 'Какой инструмент используется для хранения и обмена образами?',
                    answers: ['Docker Hub', 'GitHub', 'GitLab', 'Jira'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 7: Docker — сети и тома
        // ============================================================
        {
            id: 'devops_7',
            title: 'Docker — сети и тома',
            lecture: `
                <p>🔗 <b>Docker-сети</b> — позволяют контейнерам общаться друг с другом.</p>

                <p>📌 <b>Типы сетей:</b><br>
                • <b>bridge</b> — изолированная сеть для контейнеров<br>
                • <b>host</b> — контейнер использует сеть хоста<br>
                • <b>overlay</b> — для кластеров (Swarm/Kubernetes)</p>

                <p>📌 <b>Создание сети:</b><br>
                <code>
                docker network create my-network<br>
                docker run --network my-network --name app1 ...<br>
                docker run --network my-network --name app2 ...
                </code></p>

                <p>📌 <b>Тома (Volumes)</b> — для сохранения данных:</p>
                <p><code>
                docker volume create my-data<br>
                docker run -v my-data:/data myapp  # использовать том<br>
                docker run -v ./host:/container myapp  # привязать папку
                </code></p>
            `,
            questions: [
                {
                    question: 'Какой тип сети Docker используется по умолчанию?',
                    answers: ['bridge', 'host', 'overlay', 'none'],
                    correct: 0
                },
                {
                    question: 'Как создать Docker-сеть?',
                    answers: ['docker network create', 'docker create network', 'docker network new', 'docker network add'],
                    correct: 0
                },
                {
                    question: 'Для чего нужны Docker-тома?',
                    answers: [
                        'Для сохранения данных контейнеров',
                        'Для соединения контейнеров',
                        'Для изоляции контейнеров',
                        'Для ускорения работы'
                    ],
                    correct: 0
                },
                {
                    question: 'Как привязать локальную папку в контейнер?',
                    answers: ['-v ./host:/container', '--mount ./host:/container', '--volume ./host:/container', '--bind ./host:/container'],
                    correct: 0
                },
                {
                    question: 'Какой тип сети позволяет контейнерам видеть сеть хоста?',
                    answers: ['host', 'bridge', 'overlay', 'macvlan'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 8: Docker Compose
        // ============================================================
        {
            id: 'devops_8',
            title: 'Docker Compose',
            lecture: `
                <p>📦 <b>Docker Compose</b> — запуск нескольких контейнеров с одной командой.</p>

                <p>📌 <b>docker-compose.yml:</b><br>
                <code>
                version: '3.8'<br>
                services:<br>
                &nbsp;&nbsp;&nbsp;web:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build: .<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ports:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- "8080:8080"<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;depends_on:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- db<br>
                &nbsp;&nbsp;&nbsp;db:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image: postgres:15<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;environment:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTGRES_PASSWORD: secret
                </code></p>

                <p>📌 <b>Команды:</b><br>
                <code>
                docker-compose up        # запустить все сервисы<br>
                docker-compose up -d     # в фоновом режиме<br>
                docker-compose down      # остановить и удалить<br>
                docker-compose logs      # посмотреть логи<br>
                docker-compose ps        # статус сервисов
                </code></p>
            `,
            questions: [
                {
                    question: 'Для чего используется Docker Compose?',
                    answers: [
                        'Для запуска нескольких контейнеров вместе',
                        'Для запуска одного контейнера',
                        'Для управления кластером',
                        'Для мониторинга контейнеров'
                    ],
                    correct: 0
                },
                {
                    question: 'Как запустить сервисы с Docker Compose в фоне?',
                    answers: ['docker-compose up -d', 'docker-compose start', 'docker-compose run', 'docker-compose build'],
                    correct: 0
                },
                {
                    question: 'Как остановить контейнеры через Docker Compose?',
                    answers: ['docker-compose down', 'docker-compose stop', 'docker-compose kill', 'docker-compose rm'],
                    correct: 0
                },
                {
                    question: 'Какой файл используется для Docker Compose?',
                    answers: ['docker-compose.yml', 'dockerfile', 'docker.yaml', 'compose.yaml'],
                    correct: 0
                },
                {
                    question: 'Как посмотреть логи в Docker Compose?',
                    answers: ['docker-compose logs', 'docker-compose log', 'docker-compose view', 'docker-compose show'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 9: Введение в Kubernetes
        // ============================================================
        {
            id: 'devops_9',
            title: 'Введение в Kubernetes',
            lecture: `
                <p>☸️ <b>Kubernetes (K8s)</b> — система для оркестрации контейнеров.</p>

                <p>📌 <b>Архитектура:</b><br>
                • <b>Control Plane</b> — управляющий узел (API Server, Scheduler, Controller Manager)<br>
                • <b>Node</b> — рабочий узел с контейнерами<br>
                • <b>Pod</b> — группа контейнеров с общей сетью</p>

                <p>📌 <b>Основные объекты:</b><br>
                • <b>Pod</b> — минимальная единица<br>
                • <b>Service</b> — доступ к приложению<br>
                • <b>Deployment</b> — управление версиями</p>

                <p>📌 <b>Пример Deployment:</b><br>
                <code>
                apiVersion: apps/v1<br>
                kind: Deployment<br>
                metadata:<br>
                &nbsp;&nbsp;&nbsp;name: nginx-deployment<br>
                spec:<br>
                &nbsp;&nbsp;&nbsp;replicas: 3<br>
                &nbsp;&nbsp;&nbsp;selector:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;matchLabels:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app: nginx<br>
                &nbsp;&nbsp;&nbsp;template:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;labels:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app: nginx<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;spec:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;containers:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- name: nginx<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image: nginx:1.25<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ports:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- containerPort: 80
                </code></p>
            `,
            questions: [
                {
                    question: 'Для чего используется Kubernetes?',
                    answers: [
                        'Для оркестрации контейнеров',
                        'Для сборки Docker-образов',
                        'Для мониторинга серверов',
                        'Для управления базами данных'
                    ],
                    correct: 0
                },
                {
                    question: 'Что такое Pod в Kubernetes?',
                    answers: [
                        'Минимальная единица — группа контейнеров',
                        'Отдельный контейнер',
                        'Узел в кластере',
                        'Объект для доступа к приложению'
                    ],
                    correct: 0
                },
                {
                    question: 'Что делает Deployment в Kubernetes?',
                    answers: [
                        'Управляет версиями приложений и масштабированием',
                        'Обеспечивает доступ к приложению',
                        'Хранит секреты',
                        'Мониторит контейнеры'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой компонент управляет планированием подов?',
                    answers: ['Scheduler', 'API Server', 'Controller Manager', 'kubelet'],
                    correct: 0
                },
                {
                    question: 'Что такое Service в Kubernetes?',
                    answers: [
                        'Объект для доступа к приложению (сеть)',
                        'Минимальная единица в кластере',
                        'Управление версиями приложений',
                        'Хранение данных'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 10: Kubernetes — углублённо
        // ============================================================
        {
            id: 'devops_10',
            title: 'Kubernetes — углублённо',
            lecture: `
                <p>☸️ <b>Kubernetes — продвинутые объекты</b></p>

                <p>📌 <b>Ingress — маршрутизация внешнего трафика:</b><br>
                <code>
                apiVersion: networking.k8s.io/v1<br>
                kind: Ingress<br>
                metadata:<br>
                &nbsp;&nbsp;&nbsp;name: my-ingress<br>
                spec:<br>
                &nbsp;&nbsp;&nbsp;rules:<br>
                &nbsp;&nbsp;&nbsp;- host: myapp.example.com<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;http:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;paths:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- path: /<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pathType: Prefix<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;backend:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: my-service<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number: 80
                </code></p>

                <p>📌 <b>ConfigMap и Secrets — конфигурация:</b><br>
                <code>
                # ConfigMap<br>
                kubectl create configmap app-config --from-file=config.yaml<br>
                # Secret<br>
                kubectl create secret generic db-secret --from-literal=password=secret
                </code></p>

                <p>📌 <b>StatefulSet — для приложений с состоянием:</b><br>
                • Гарантирует уникальность каждого пода<br>
                • Стабильные имена (pod-0, pod-1)<br>
                • Для баз данных, очередей</p>
            `,
            questions: [
                {
                    question: 'Для чего используется Ingress в Kubernetes?',
                    answers: [
                        'Для маршрутизации внешнего трафика',
                        'Для хранения конфигурации',
                        'Для управления версиями',
                        'Для мониторинга'
                    ],
                    correct: 0
                },
                {
                    question: 'Что такое ConfigMap в Kubernetes?',
                    answers: [
                        'Хранит конфигурацию приложений',
                        'Хранит секретные данные',
                        'Управляет трафиком',
                        'Управляет версиями'
                    ],
                    correct: 0
                },
                {
                    question: 'Чем StatefulSet отличается от Deployment?',
                    answers: [
                        'StatefulSet — для приложений с состоянием',
                        'StatefulSet — для stateless приложений',
                        'Это одно и то же',
                        'StatefulSet быстрее'
                    ],
                    correct: 0
                },
                {
                    question: 'Как создать Secret в Kubernetes?',
                    answers: ['kubectl create secret', 'kubectl create configmap', 'kubectl create secret --from-literal', 'kubectl secret create'],
                    correct: 0
                },
                {
                    question: 'Для чего нужны Secrets?',
                    answers: [
                        'Для хранения конфиденциальных данных (пароли, токены)',
                        'Для хранения конфигурации',
                        'Для управления трафиком',
                        'Для мониторинга'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 11: Helm
        // ============================================================
        {
            id: 'devops_11',
            title: 'Helm — управление Kubernetes-приложениями',
            lecture: `
                <p>🎯 <b>Helm</b> — менеджер пакетов для Kubernetes.</p>

                <p>📌 <b>Что такое Helm?</b><br>
                • Упаковывает Kubernetes-ресурсы в чарты (charts)<br>
                • Управляет версиями приложений<br>
                • Использует шаблоны для конфигурации</p>

                <p>📌 <b>Основные команды:</b><br>
                <code>
                helm create my-chart       # создать чарт<br>
                helm install my-app ./my-chart  # установить<br>
                helm upgrade my-app ./my-chart # обновить<br>
                helm rollback my-app 1       # откатить<br>
                helm list                   # список установленных<br>
                helm repo add stable https://charts.helm.sh/stable
                </code></p>

                <p>📌 <b>Структура чарта:</b><br>
                <code>
                my-chart/<br>
                ├── Chart.yaml        # метаданные чарта<br>
                ├── values.yaml       # значения по умолчанию<br>
                ├── templates/        # шаблоны ресурсов<br>
                │   ├── deployment.yaml<br>
                │   ├── service.yaml<br>
                │   └── ingress.yaml<br>
                └── charts/           # зависимости
                </code></p>
            `,
            questions: [
                {
                    question: 'Что такое Helm в Kubernetes?',
                    answers: [
                        'Менеджер пакетов для Kubernetes',
                        'Инструмент для мониторинга',
                        'Система для логирования',
                        'Платформа для CI/CD'
                    ],
                    correct: 0
                },
                {
                    question: 'Как установить чарт с помощью Helm?',
                    answers: ['helm install', 'helm deploy', 'helm apply', 'helm create'],
                    correct: 0
                },
                {
                    question: 'Как обновить Helm-релиз?',
                    answers: ['helm upgrade', 'helm update', 'helm refresh', 'helm renew'],
                    correct: 0
                },
                {
                    question: 'Где в Helm-чарте хранятся значения по умолчанию?',
                    answers: ['values.yaml', 'Chart.yaml', 'config.yaml', 'defaults.yaml'],
                    correct: 0
                },
                {
                    question: 'Как откатить Helm-релиз?',
                    answers: ['helm rollback', 'helm revert', 'helm undo', 'helm back'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 12: Infrastructure as Code (Terraform)
        // ============================================================
        {
            id: 'devops_12',
            title: 'Infrastructure as Code (Terraform)',
            lecture: `
                <p>🏗️ <b>Terraform</b> — инструмент для управления инфраструктурой как кодом.</p>

                <p>📌 <b>Основные понятия:</b><br>
                • <b>Provider</b> — провайдер (AWS, GCP, Azure)<br>
                • <b>Resource</b> — ресурс (EC2, S3, VPC)<br>
                • <b>State</b> — состояние инфраструктуры</p>

                <p>📌 <b>Пример main.tf:</b><br>
                <code>
                provider "aws" {<br>
                &nbsp;&nbsp;&nbsp;region = "us-west-2"<br>
                }<br>
                <br>
                resource "aws_instance" "web" {<br>
                &nbsp;&nbsp;&nbsp;ami           = "ami-0c55b159cbfafe1f0"<br>
                &nbsp;&nbsp;&nbsp;instance_type = "t2.micro"<br>
                &nbsp;&nbsp;&nbsp;tags = {<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name = "web-server"<br>
                &nbsp;&nbsp;&nbsp;}<br>
                }
                </code></p>

                <p>📌 <b>Команды Terraform:</b><br>
                <code>
                terraform init      # инициализация<br>
                terraform plan      # план изменений<br>
                terraform apply     # применить<br>
                terraform destroy   # удалить инфраструктуру<br>
                terraform state     # управление состоянием
                </code></p>
            `,
            questions: [
                {
                    question: 'Для чего используется Terraform?',
                    answers: [
                        'Для управления инфраструктурой как кодом',
                        'Для управления контейнерами',
                        'Для управления версиями',
                        'Для мониторинга'
                    ],
                    correct: 0
                },
                {
                    question: 'Что такое Provider в Terraform?',
                    answers: [
                        'Провайдер облачных услуг (AWS, GCP)',
                        'Ресурс инфраструктуры',
                        'Состояние инфраструктуры',
                        'Плагин для Terraform'
                    ],
                    correct: 0
                },
                {
                    question: 'Какая команда показывает план изменений?',
                    answers: ['terraform plan', 'terraform apply', 'terraform init', 'terraform destroy'],
                    correct: 0
                },
                {
                    question: 'Что такое State в Terraform?',
                    answers: [
                        'Состояние инфраструктуры',
                        'Конфигурация провайдера',
                        'Ресурс инфраструктуры',
                        'План изменений'
                    ],
                    correct: 0
                },
                {
                    question: 'Как удалить инфраструктуру через Terraform?',
                    answers: ['terraform destroy', 'terraform delete', 'terraform remove', 'terraform clean'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 13: Управление конфигурацией (Ansible)
        // ============================================================
        {
            id: 'devops_13',
            title: 'Управление конфигурацией (Ansible)',
            lecture: `
                <p>⚙️ <b>Ansible</b> — инструмент для автоматизации настройки серверов.</p>

                <p>📌 <b>Основные понятия:</b><br>
                • <b>Control Node</b> — машина, где запускаются плейбуки<br>
                • <b>Managed Node</b> — сервер, который настраиваем<br>
                • <b>Playbook</b> — YAML-файл с задачами</p>

                <p>📌 <b>Пример playbook.yml:</b><br>
                <code>
                - name: Установка nginx<br>
                &nbsp;&nbsp;hosts: all<br>
                &nbsp;&nbsp;become: yes<br>
                &nbsp;&nbsp;tasks:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;- name: Установить nginx<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;apt:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: nginx<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state: present<br>
                &nbsp;&nbsp;&nbsp;&nbsp;- name: Запустить nginx<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;service:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: nginx<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;state: started
                </code></p>

                <p>📌 <b>Команды Ansible:</b><br>
                <code>
                ansible all -i inventory.ini -m ping  # проверка соединения<br>
                ansible-playbook -i inventory.ini playbook.yml  # запуск плейбука
                </code></p>
            `,
            questions: [
                {
                    question: 'Для чего используется Ansible?',
                    answers: [
                        'Для автоматизации настройки серверов',
                        'Для управления контейнерами',
                        'Для управления инфраструктурой как кодом',
                        'Для мониторинга'
                    ],
                    correct: 0
                },
                {
                    question: 'Что такое Playbook в Ansible?',
                    answers: [
                        'YAML-файл с задачами для настройки',
                        'Инвентарный файл',
                        'Модуль Ansible',
                        'Плагин Ansible'
                    ],
                    correct: 0
                },
                {
                    question: 'Как проверить соединение с узлами в Ansible?',
                    answers: ['ansible all -m ping', 'ansible ping', 'ansible check', 'ansible test'],
                    correct: 0
                },
                {
                    question: 'Какой язык используется для Ansible-плейбуков?',
                    answers: ['YAML', 'JSON', 'XML', 'TOML'],
                    correct: 0
                },
                {
                    question: 'Что означает "become: yes" в Ansible?',
                    answers: [
                        'Выполнять задачи с правами root',
                        'Стать другим пользователем',
                        'Создать нового пользователя',
                        'Переключиться на другой хост'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 14: CI/CD — основы
        // ============================================================
        {
            id: 'devops_14',
            title: 'CI/CD — основы',
            lecture: `
                <p>🔄 <b>CI/CD</b> — непрерывная интеграция и доставка.</p>

                <p>📌 <b>CI (Continuous Integration):</b><br>
                • Разработчики часто пушат код<br>
                • Автоматическая сборка и тестирование<br>
                • Быстрое обнаружение ошибок</p>

                <p>📌 <b>CD (Continuous Delivery/Deployment):</b><br>
                • <b>Continuous Delivery</b> — автоматическая доставка в тестовую среду<br>
                • <b>Continuous Deployment</b> — автоматический деплой в продакшен</p>

                <p>📌 <b>CI/CD пайплайн:</b><br>
                <code>
                1. Push кода<br>
                &nbsp;&nbsp;↓<br>
                2. Сборка (build)<br>
                &nbsp;&nbsp;↓<br>
                3. Тестирование (test)<br>
                &nbsp;&nbsp;↓<br>
                4. Сборка образа (docker build)<br>
                &nbsp;&nbsp;↓<br>
                5. Деплой (deploy)
                </code></p>

                <p>📌 <b>Преимущества CI/CD:</b><br>
                • Быстрая обратная связь<br>
                • Уменьшение ручных операций<br>
                • Высокое качество кода<br>
                • Быстрый выпуск фич</p>
            `,
            questions: [
                {
                    question: 'Что такое CI (Continuous Integration)?',
                    answers: [
                        'Автоматическая сборка и тестирование при каждом пуше',
                        'Автоматический деплой в продакшен',
                        'Ручное тестирование',
                        'Написание кода'
                    ],
                    correct: 0
                },
                {
                    question: 'Чем Continuous Delivery отличается от Continuous Deployment?',
                    answers: [
                        'Delivery — доставка в тестовую среду, Deployment — автоматический деплой в продакшен',
                        'Это одно и то же',
                        'Deployment — доставка в тестовую среду, Delivery — деплой в продакшен',
                        'Delivery — деплой, Deployment — тестирование'
                    ],
                    correct: 0
                },
                {
                    question: 'Что входит в CI/CD пайплайн?',
                    answers: [
                        'Сборка, тестирование, деплой',
                        'Только сборка',
                        'Только деплой',
                        'Только тестирование'
                    ],
                    correct: 0
                },
                {
                    question: 'Какое преимущество НЕ относится к CI/CD?',
                    answers: [
                        'Увеличение ручных операций',
                        'Быстрая обратная связь',
                        'Высокое качество кода',
                        'Быстрый выпуск фич'
                    ],
                    correct: 0
                },
                {
                    question: 'Что происходит на этапе "test" в CI/CD?',
                    answers: [
                        'Запускаются автотесты',
                        'Собирается приложение',
                        'Разворачивается приложение',
                        'Пишется код'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 15: Настройка CI/CD (GitHub Actions)
        // ============================================================
        {
            id: 'devops_15',
            title: 'Настройка CI/CD (GitHub Actions)',
            lecture: `
                <p>⚙️ <b>GitHub Actions</b> — CI/CD прямо в GitHub.</p>

                <p>📌 <b>Структура workflow:</b><br>
                <code>
                name: CI/CD Pipeline<br>
                <br>
                on:<br>
                &nbsp;&nbsp;push:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;branches: [ main ]<br>
                <br>
                jobs:<br>
                &nbsp;&nbsp;build:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;runs-on: ubuntu-latest<br>
                &nbsp;&nbsp;&nbsp;&nbsp;steps:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- uses: actions/checkout@v3<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- uses: actions/setup-python@v4<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;python-version: '3.12'<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- run: pip install -r requirements.txt<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- run: pytest
                </code></p>

                <p>📌 <b>События для запуска:</b><br>
                • <b>push</b> — при пуше<br>
                • <b>pull_request</b> — при создании PR<br>
                • <b>schedule</b> — по расписанию<br>
                • <b>workflow_dispatch</b> — вручную</p>

                <p>📌 <b>Секреты:</b><br>
                <code>
                # В настройках репозитория<br>
                DOCKER_USERNAME<br>
                DOCKER_PASSWORD<br>
                <br>
                # В workflow<br>
                - name: Login to Docker Hub<br>
                &nbsp;&nbsp;uses: docker/login-action@v2<br>
                &nbsp;&nbsp;with:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;username: \${'{'} secrets.DOCKER_USERNAME \${'}'}<br>
                &nbsp;&nbsp;&nbsp;&nbsp;password: \${'{'} secrets.DOCKER_PASSWORD \${'}'}
                </code></p>
            `,
            questions: [
                {
                    question: 'Какой инструмент используется для CI/CD в GitHub?',
                    answers: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'CircleCI'],
                    correct: 0
                },
                {
                    question: 'В каком файле описывается GitHub Actions workflow?',
                    answers: [
                        '.github/workflows/название.yml',
                        '.github/actions/название.yml',
                        '.github/config/название.yml',
                        '.github/название.yml'
                    ],
                    correct: 0
                },
                {
                    question: 'Как хранить секреты в GitHub Actions?',
                    answers: [
                        'В настройках репозитория (Settings → Secrets)',
                        'В самом workflow файле',
                        'В .env файле',
                        'В коде приложения'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой синтаксис для использования секрета в workflow?',
                    answers: ['${{ secrets.NAME }}', '${{ secret.NAME }}', '${{ env.NAME }}', '${{ vars.NAME }}'],
                    correct: 0
                },
                {
                    question: 'Какое событие запускает workflow при пуше в main?',
                    answers: ['on: push: branches: [ main ]', 'on: push: main', 'on: main push', 'on: push: branch: main'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 16: Мониторинг и Observability
        // ============================================================
        {
            id: 'devops_16',
            title: 'Мониторинг и Observability',
            lecture: `
                <p>📊 <b>Мониторинг</b> — наблюдение за состоянием системы.</p>

                <p>📌 <b>Три столпа Observability:</b><br>
                1. <b>Метрики</b> — числовые показатели (Prometheus)<br>
                2. <b>Логи</b> — текстовые записи событий (ELK/EFK)<br>
                3. <b>Трейсинг</b> — распределённая трассировка (Jaeger)</p>

                <p>📌 <b>Prometheus — сбор метрик:</b><br>
                <code>
                # prometheus.yml<br>
                scrape_configs:<br>
                &nbsp;&nbsp;- job_name: 'my-app'<br>
                &nbsp;&nbsp;&nbsp;&nbsp;static_configs:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- targets: ['localhost:8080']
                </code></p>

                <p>📌 <b>Grafana — визуализация:</b><br>
                • Дашборды для мониторинга<br>
                • Визуализация метрик из Prometheus<br>
                • Алерты</p>

                <p>📌 <b>SLI/SLO:</b><br>
                • <b>SLI</b> — Service Level Indicator (задержка, доступность)<br>
                • <b>SLO</b> — Service Level Objective (99.9% доступности)</p>
            `,
            questions: [
                {
                    question: 'Что такое Observability?',
                    answers: [
                        'Наблюдение за состоянием системы через метрики, логи и трейсинг',
                        'Только метрики',
                        'Только логи',
                        'Только трейсинг'
                    ],
                    correct: 0
                },
                {
                    question: 'Что собирает Prometheus?',
                    answers: ['Метрики', 'Логи', 'Трейсы', 'Всё перечисленное'],
                    correct: 0
                },
                {
                    question: 'Что используется для визуализации метрик?',
                    answers: ['Grafana', 'Prometheus', 'Elasticsearch', 'Jaeger'],
                    correct: 0
                },
                {
                    question: 'Что означает SLO?',
                    answers: [
                        'Service Level Objective — целевой уровень доступности/производительности',
                        'Service Level Indicator — показатель доступности',
                        'Service Level Agreement — соглашение с пользователем',
                        'Security Level Objective'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой инструмент используется для трейсинга?',
                    answers: ['Jaeger', 'Prometheus', 'Grafana', 'Elasticsearch'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 17: Логи и трейсинг
        // ============================================================
        {
            id: 'devops_17',
            title: 'Логи и трейсинг',
            lecture: `
                <p>📝 <b>Централизованное логирование</b> — сбор и анализ логов со всех сервисов.</p>

                <p>📌 <b>ELK / EFK стек:</b><br>
                • <b>Elasticsearch</b> — хранение и поиск<br>
                • <b>Logstash / Fluentd</b> — сбор и обработка<br>
                • <b>Kibana</b> — визуализация</p>

                <p>📌 <b>Структурированные логи:</b><br>
                <code>
                {"timestamp": "2024-07-22T14:30:00Z", "level": "ERROR", "service": "api", "message": "Connection timeout", "user_id": 123}
                </code></p>

                <p>📌 <b>Распределённый трейсинг:</b><br>
                • <b>Trace</b> — полный путь запроса через сервисы<br>
                • <b>Span</b> — одна операция в трейсе<br>
                • <b>OpenTelemetry</b> — стандарт для инструментации</p>

                <p>📌 <b>Пример с Jaeger:</b><br>
                • Запрос → API Gateway → Auth Service → User Service → DB<br>
                • Каждый сервис добавляет свой span<br>
                • Видно, где возникает задержка</p>
            `,
            questions: [
                {
                    question: 'Что входит в ELK стек?',
                    answers: [
                        'Elasticsearch, Logstash, Kibana',
                        'Elasticsearch, Loki, Grafana',
                        'Elasticsearch, Fluentd, Kibana',
                        'Elasticsearch, Logstash, Grafana'
                    ],
                    correct: 0
                },
                {
                    question: 'Что такое Trace в распределённом трейсинге?',
                    answers: [
                        'Полный путь запроса через все сервисы',
                        'Одна операция в запросе',
                        'Ошибка в запросе',
                        'Время выполнения запроса'
                    ],
                    correct: 0
                },
                {
                    question: 'Что такое Span в распределённом трейсинге?',
                    answers: [
                        'Одна операция в трейсе',
                        'Полный путь запроса',
                        'Ошибка в запросе',
                        'Время выполнения запроса'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой стандарт используется для инструментации трейсинга?',
                    answers: ['OpenTelemetry', 'OpenTracing', 'OpenMetrics', 'OpenCensus'],
                    correct: 0
                },
                {
                    question: 'Что такое структурированные логи?',
                    answers: [
                        'Логи в формате JSON с полями',
                        'Логи в виде текста',
                        'Логи в виде XML',
                        'Логи в виде CSV'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 18: GitOps
        // ============================================================
        {
            id: 'devops_18',
            title: 'GitOps',
            lecture: `
                <p>🔀 <b>GitOps</b> — управление инфраструктурой через Git.</p>

                <p>📌 <b>Принципы GitOps:</b><br>
                1. <b>Декларативность</b> — вся конфигурация описана в Git<br>
                2. <b>Единственный источник правды</b> — Git<br>
                3. <b>Автоматическое применение</b> — изменения применяются автоматически<br>
                4. <b>Наблюдаемость</b> — видно, что изменилось</p>

                <p>📌 <b>GitOps + ArgoCD:</b><br>
                <code>
                apiVersion: argoproj.io/v1alpha1<br>
                kind: Application<br>
                metadata:<br>
                &nbsp;&nbsp;&nbsp;name: my-app<br>
                spec:<br>
                &nbsp;&nbsp;&nbsp;source:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;repoURL: https://github.com/org/my-app<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path: kubernetes<br>
                &nbsp;&nbsp;&nbsp;destination:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;server: https://kubernetes.default.svc<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;namespace: production
                </code></p>

                <p>📌 <b>Преимущества GitOps:</b><br>
                • Полная история изменений<br>
                • Откат к любой версии<br>
                • Прозрачность<br>
                • Безопасность (всё через Git)</p>
            `,
            questions: [
                {
                    question: 'Что такое GitOps?',
                    answers: [
                        'Управление инфраструктурой через Git',
                        'Управление версиями кода',
                        'Инструмент для CI/CD',
                        'Система мониторинга'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой инструмент используется для GitOps с Kubernetes?',
                    answers: ['ArgoCD', 'Jenkins', 'GitHub Actions', 'GitLab CI'],
                    correct: 0
                },
                {
                    question: 'Что является единственным источником правды в GitOps?',
                    answers: ['Git', 'Kubernetes', 'CI/CD', 'Мониторинг'],
                    correct: 0
                },
                {
                    question: 'Какое преимущество НЕ относится к GitOps?',
                    answers: [
                        'Увеличение ручных операций',
                        'Полная история изменений',
                        'Откат к любой версии',
                        'Прозрачность'
                    ],
                    correct: 0
                },
                {
                    question: 'Как в GitOps описывается состояние приложения в Kubernetes?',
                    answers: [
                        'В виде манифестов в Git',
                        'В виде Dockerfile',
                        'В виде helm-чарта в Git',
                        'В виде конфигурации CI/CD'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 19: DevSecOps
        // ============================================================
        {
            id: 'devops_19',
            title: 'DevSecOps',
            lecture: `
                <p>🛡️ <b>DevSecOps</b> — безопасность как часть DevOps-процесса.</p>

                <p>📌 <b>Принципы DevSecOps:</b><br>
                • <b>Shift-Left</b> — безопасность на ранних этапах<br>
                • <b>Автоматизация</b> — сканирование в CI/CD<br>
                • <b>Культура</b> — безопасность — ответственность всех</p>

                <p>📌 <b>Инструменты безопасности:</b><br>
                • <b>SAST</b> — статический анализ кода (SonarQube)<br>
                • <b>DAST</b> — динамический анализ приложений (OWASP ZAP)<br>
                • <b>SCA</b> — анализ зависимостей (Dependabot)<br>
                • <b>Secret Scanning</b> — поиск секретов в коде (GitHub Secret Scanning)</p>

                <p>📌 <b>Безопасность в CI/CD:</b><br>
                <code>
                # В GitHub Actions<br>
                - name: Security Scan<br>
                &nbsp;&nbsp;uses: github/codeql-action/analyze@v2
                </code></p>
            `,
            questions: [
                {
                    question: 'Что такое DevSecOps?',
                    answers: [
                        'Интеграция безопасности в DevOps-процесс',
                        'Отдельная команда безопасности',
                        'Только инструменты безопасности',
                        'Только политики безопасности'
                    ],
                    correct: 0
                },
                {
                    question: 'Что означает Shift-Left в DevSecOps?',
                    answers: [
                        'Перенос безопасности на ранние этапы',
                        'Перенос безопасности в продакшен',
                        'Уменьшение количества проверок',
                        'Увеличение количества проверок'
                    ],
                    correct: 0
                },
                {
                    question: 'Что такое SAST?',
                    answers: [
                        'Статический анализ кода (без запуска)',
                        'Динамический анализ приложений',
                        'Анализ зависимостей',
                        'Сканирование контейнеров'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой инструмент используется для SCA (анализа зависимостей)?',
                    answers: ['Dependabot', 'SonarQube', 'OWASP ZAP', 'Trivy'],
                    correct: 0
                },
                {
                    question: 'Где в CI/CD лучше всего сканировать код на уязвимости?',
                    answers: [
                        'На этапе сборки (до деплоя)',
                        'После деплоя',
                        'В продакшене',
                        'Только вручную'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 20: Developer Experience (DevX)
        // ============================================================
        {
            id: 'devops_20',
            title: 'Developer Experience (DevX)',
            lecture: `
                <p>🧑‍💻 <b>Developer Experience (DevX)</b> — опыт разработчика в работе с инфраструктурой.</p>

                <p>📌 <b>Что такое DevX?</b><br>
                • Как легко разработчику запустить проект<br>
                • Как быстро он получает обратную связь<br>
                • Насколько удобны инструменты<br>
                • Насколько быстры CI/CD пайплайны</p>

                <p>📌 <b>Внутренние платформы (IDP):</b><br>
                • <b>Backstage</b> — портал для разработчиков (Spotify)<br>
                • <b>Humanitec</b> — платформа для разработчиков<br>
                • <b>Собственные решения</b> — внутренние порталы</p>

                <p>📌 <b>Метрики DevX:</b><br>
                • <b>Time to First Commit</b> — сколько времени до первого коммита<br>
                • <b>Time to Production</b> — сколько времени от коммита до продакшена<br>
                • <b>Feedback Loop</b> — как быстро приходит обратная связь</p>

                <p>📌 <b>Пример Backstage:</b><br>
                • Единый портал для всех сервисов<br>
                • Документация, API, CI/CD в одном месте<br>
                • Автоматическое создание репозиториев</p>
            `,
            questions: [
                {
                    question: 'Что такое Developer Experience (DevX)?',
                    answers: [
                        'Опыт разработчика при работе с инфраструктурой',
                        'Только скорость CI/CD',
                        'Только удобство IDE',
                        'Только документация'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой инструмент используется как портал для разработчиков?',
                    answers: ['Backstage', 'GitHub', 'Jenkins', 'Prometheus'],
                    correct: 0
                },
                {
                    question: 'Что такое IDP в контексте DevX?',
                    answers: [
                        'Internal Developer Platform — внутренняя платформа для разработчиков',
                        'Internet Data Provider',
                        'Integrated Development Platform',
                        'Internal Development Process'
                    ],
                    correct: 0
                },
                {
                    question: 'Что измеряет Time to Production?',
                    answers: [
                        'Время от коммита до продакшена',
                        'Время до первого коммита',
                        'Время выполнения тестов',
                        'Время сборки'
                    ],
                    correct: 0
                },
                {
                    question: 'Почему DevX важен?',
                    answers: [
                        'Ускоряет разработку и повышает удовлетворённость команды',
                        'Только экономит деньги',
                        'Только улучшает качество кода',
                        'Не важен'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 21: Итоги модуля (без вопросов)
        // ============================================================
        {
            id: 'devops_21',
            title: '🎓 Итоги модуля',
            lecture: `
                <p>🎉 <b>Поздравляем с завершением модуля «DevOps»!</b></p>

                <p>Ты прошёл 20 уроков и освоил основы DevOps — навык, который делает тебя универсальным IT-специалистом.</p>

                <p>📊 <b>Что ты теперь знаешь и умеешь:</b><br>
                • Понимаешь культуру и принципы DevOps<br>
                • Работаешь с Linux и Git<br>
                • Пишешь скрипты для автоматизации<br>
                • Используешь Docker и Kubernetes<br>
                • Настраиваешь CI/CD (GitHub Actions)<br>
                • Управляешь инфраструктурой (Terraform, Ansible)<br>
                • Настраиваешь мониторинг и логирование (Prometheus, Grafana, ELK)<br>
                • Понимаешь GitOps и DevSecOps<br>
                • Знаешь, что такое Developer Experience</p>

                <p>🔗 <b>Связь с другими модулями:</b><br>
                • <b>Python</b> — ты пишешь скрипты и автоматизируешь<br>
                • <b>Сети</b> — понимаешь, как работает инфраструктура<br>
                • <b>SQL</b> — управляешь базами данных в облаке<br>
                • <b>Кибербезопасность</b> — применяешь DevSecOps практики</p>

                <p>🚀 <b>Что дальше?</b><br>
                Ты готов к работе в DevOps-команде или к изучению облачных технологий (AWS, GCP, Azure).</p>

                <p>📌 <b>Спасибо, что был с нами!</b> Удачи в изучении новых технологий! 🚀</p>
            `,
            questions: []
        }
    ]
};

// ============================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================

export function getLessonById(lessonId) {
    return module.lessons.find(l => l.id === lessonId) || null;
}

export function getTotalLessons() {
    return module.lessons.length;
}

export function getNextLessonId(currentLessonId) {
    const index = module.lessons.findIndex(l => l.id === currentLessonId);
    if (index !== -1 && index + 1 < module.lessons.length) {
        return module.lessons[index + 1].id;
    }
    return null;
}