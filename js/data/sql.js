// ============================================================
// МОДУЛЬ 6: БАЗЫ ДАННЫХ (SQL)
// ============================================================

export const module = {
    id: 'sql',
    title: 'Базы данных (SQL)',
    icon: '🗄️',
    game: 'sql_puzzle', // игра будет добавлена позже
    totalLessons: 21,
    lessons: [
        // ============================================================
        // УРОК 1: Что такое базы данных? Реляционная модель
        // ============================================================
        {
            id: 'sql_1',
            title: 'Что такое базы данных? Реляционная модель',
            lecture: `
                <p>🗄️ <b>База данных (БД)</b> — это организованная коллекция данных, хранящаяся в электронном виде.</p>

                <p>📌 <b>Реляционная модель</b> — данные хранятся в таблицах, связанных между собой:<br>
                • <b>Таблица (Table)</b> — набор строк и столбцов<br>
                • <b>Строка (Row/Record)</b> — одна запись<br>
                • <b>Столбец (Column/Field)</b> — одно поле<br>
                • <b>Первичный ключ (Primary Key)</b> — уникальный идентификатор записи<br>
                • <b>Внешний ключ (Foreign Key)</b> — ссылка на первичный ключ другой таблицы</p>

                <p>📊 <b>Пример:</b><br>
                Таблица "users" (id, name, email)<br>
                Таблица "orders" (id, user_id, product, price)<br>
                Связь: orders.user_id → users.id</p>

                <p>⚡ <b>SQL (Structured Query Language)</b> — язык для работы с реляционными БД:<br>
                • <b>DDL</b> — определение данных (CREATE, ALTER, DROP)<br>
                • <b>DML</b> — манипуляция данными (SELECT, INSERT, UPDATE, DELETE)<br>
                • <b>DCL</b> — управление доступом (GRANT, REVOKE)</p>

                <p>📌 <b>Популярные СУБД:</b><br>
                • <b>PostgreSQL</b> — мощная, бесплатная, промышленная<br>
                • <b>MySQL</b> — популярная, простая, для веб-приложений<br>
                • <b>SQLite</b> — лёгкая, встроенная, для мобильных приложений<br>
                • <b>Oracle</b> — коммерческая, для крупных предприятий<br>
                • <b>Microsoft SQL Server</b> — коммерческая, интеграция с .NET</p>
            `,
            questions: [
                {
                    question: 'Что такое реляционная модель данных?',
                    answers: [
                        'Данные хранятся в таблицах со связями',
                        'Данные хранятся в виде дерева',
                        'Данные хранятся в одном файле',
                        'Данные хранятся в JSON'
                    ],
                    correct: 0
                },
                {
                    question: 'Что такое первичный ключ (Primary Key)?',
                    answers: [
                        'Уникальный идентификатор записи в таблице',
                        'Ссылка на другую таблицу',
                        'Индекс для ускорения поиска',
                        'Тип данных'
                    ],
                    correct: 0
                },
                {
                    question: 'Что такое SQL?',
                    answers: [
                        'Язык для работы с реляционными базами данных',
                        'Язык программирования для веб-разработки',
                        'Операционная система',
                        'Протокол передачи данных'
                    ],
                    correct: 0
                },
                {
                    question: 'Какая СУБД является бесплатной и промышленной?',
                    answers: ['PostgreSQL', 'Oracle', 'Microsoft SQL Server', 'MongoDB'],
                    correct: 0
                },
                {
                    question: 'Что такое внешний ключ (Foreign Key)?',
                    answers: [
                        'Ссылка на первичный ключ другой таблицы',
                        'Уникальный идентификатор записи',
                        'Индекс для ускорения поиска',
                        'Тип данных'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 2: Установка и настройка СУБД
        // ============================================================
        {
            id: 'sql_2',
            title: 'Установка и настройка СУБД (PostgreSQL / MySQL)',
            lecture: `
                <p>🛠️ <b>Установка СУБД — первый шаг к работе с базами данных.</b></p>

                <p>📌 <b>PostgreSQL (рекомендуется для обучения):</b><br>
                • <b>Windows:</b> скачать с postgresql.org, установить с pgAdmin<br>
                • <b>macOS:</b> brew install postgresql<br>
                • <b>Linux:</b> sudo apt install postgresql postgresql-contrib</p>

                <p>📌 <b>MySQL:</b><br>
                • <b>Windows:</b> скачать с mysql.com, установить с MySQL Workbench<br>
                • <b>macOS:</b> brew install mysql<br>
                • <b>Linux:</b> sudo apt install mysql-server</p>

                <p>📌 <b>Первый запуск PostgreSQL:</b><br>
                <code>
                sudo -u postgres psql  # вход в консоль<br>
                CREATE DATABASE mydb;   # создать БД<br>
                CREATE USER myuser WITH PASSWORD 'mypass';  # создать пользователя<br>
                GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
                </code></p>

                <p>📌 <b>Подключение к БД:</b><br>
                <code>
                psql -U myuser -d mydb -h localhost
                </code></p>

                <p>📌 <b>Популярные GUI-инструменты:</b><br>
                • <b>pgAdmin</b> — для PostgreSQL<br>
                • <b>MySQL Workbench</b> — для MySQL<br>
                • <b>DBeaver</b> — универсальный, для всех СУБД</p>
            `,
            questions: [
                {
                    question: 'Какая СУБД рекомендуется для обучения?',
                    answers: ['PostgreSQL', 'Oracle', 'MongoDB', 'Redis'],
                    correct: 0
                },
                {
                    question: 'Как создать базу данных в PostgreSQL?',
                    answers: ['CREATE DATABASE mydb;', 'CREATE DB mydb;', 'NEW DATABASE mydb;', 'MAKE DATABASE mydb;'],
                    correct: 0
                },
                {
                    question: 'Какой GUI-инструмент используется для PostgreSQL?',
                    answers: ['pgAdmin', 'MySQL Workbench', 'DBeaver', 'phpMyAdmin'],
                    correct: 0
                },
                {
                    question: 'Как подключиться к PostgreSQL из командной строки?',
                    answers: ['psql -U user -d db', 'mysql -u user -p', 'sqlite3 db', 'psql -u user -d db'],
                    correct: 0
                },
                {
                    question: 'Какой инструмент является универсальным для всех СУБД?',
                    answers: ['DBeaver', 'pgAdmin', 'MySQL Workbench', 'phpMyAdmin'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 3: Типы данных в SQL
        // ============================================================
        {
            id: 'sql_3',
            title: 'Типы данных в SQL',
            lecture: `
                <p>📊 <b>Типы данных</b> — определяют, какая информация может храниться в столбце.</p>

                <p>📌 <b>Числовые типы:</b><br>
                • <b>INT</b> — целые числа (от -2³¹ до 2³¹-1)<br>
                • <b>BIGINT</b> — большие целые числа (до 2⁶³-1)<br>
                • <b>DECIMAL(p, s)</b> — точные числа с фиксированной точкой<br>
                • <b>FLOAT</b> — числа с плавающей точкой (приближённые)</p>

                <p>📌 <b>Строковые типы:</b><br>
                • <b>VARCHAR(n)</b> — строка переменной длины (до n символов)<br>
                • <b>CHAR(n)</b> — строка фиксированной длины (всегда n символов)<br>
                • <b>TEXT</b> — длинная строка (без ограничения)</p>

                <p>📌 <b>Дата и время:</b><br>
                • <b>DATE</b> — дата (2024-07-22)<br>
                • <b>TIME</b> — время (14:30:00)<br>
                • <b>TIMESTAMP</b> — дата и время (2024-07-22 14:30:00)</p>

                <p>📌 <b>Логический тип:</b><br>
                • <b>BOOLEAN</b> — TRUE / FALSE (в PostgreSQL)<br>
                • <b>BIT</b> — 0 / 1 (в MySQL)</p>

                <p>📌 <b>Специальные типы:</b><br>
                • <b>JSON / JSONB</b> — для хранения JSON-данных (PostgreSQL)<br>
                • <b>ARRAY</b> — массив значений (PostgreSQL)<br>
                • <b>UUID</b> — универсальный уникальный идентификатор</p>
            `,
            questions: [
                {
                    question: 'Какой тип данных используется для чисел с фиксированной точкой?',
                    answers: ['DECIMAL', 'FLOAT', 'INT', 'BIGINT'],
                    correct: 0
                },
                {
                    question: 'Какая разница между VARCHAR и CHAR?',
                    answers: [
                        'VARCHAR — переменная длина, CHAR — фиксированная',
                        'CHAR — переменная длина, VARCHAR — фиксированная',
                        'Это одно и то же',
                        'VARCHAR используется только для чисел'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой тип данных используется для хранения даты и времени?',
                    answers: ['TIMESTAMP', 'DATE', 'TIME', 'DATETIME'],
                    correct: 0
                },
                {
                    question: 'Какой тип данных в PostgreSQL используется для JSON?',
                    answers: ['JSONB', 'TEXT', 'VARCHAR', 'ARRAY'],
                    correct: 0
                },
                {
                    question: 'Какой тип данных для логических значений в PostgreSQL?',
                    answers: ['BOOLEAN', 'BIT', 'INT', 'CHAR'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 4: Создание таблиц
        // ============================================================
        {
            id: 'sql_4',
            title: 'Создание таблиц: CREATE TABLE, ALTER TABLE, DROP TABLE',
            lecture: `
                <p>📋 <b>Создание таблиц</b> — основа работы с базами данных.</p>

                <p>📌 <b>CREATE TABLE — создание таблицы:</b><br>
                <code>
                CREATE TABLE users (<br>
                &nbsp;&nbsp;&nbsp;&nbsp;id SERIAL PRIMARY KEY,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;name VARCHAR(100) NOT NULL,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;email VARCHAR(255) UNIQUE NOT NULL,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;age INT,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP<br>
                );
                </code></p>

                <p>📌 <b>Ограничения (Constraints):</b><br>
                • <b>PRIMARY KEY</b> — уникальный идентификатор записи<br>
                • <b>FOREIGN KEY</b> — ссылка на другую таблицу<br>
                • <b>NOT NULL</b> — поле не может быть пустым<br>
                • <b>UNIQUE</b> — значение должно быть уникальным<br>
                • <b>DEFAULT</b> — значение по умолчанию<br>
                • <b>CHECK</b> — проверка условия</p>

                <p>📌 <b>ALTER TABLE — изменение таблицы:</b><br>
                <code>
                ALTER TABLE users ADD COLUMN phone VARCHAR(20);<br>
                ALTER TABLE users DROP COLUMN age;<br>
                ALTER TABLE users RENAME COLUMN name TO full_name;<br>
                ALTER TABLE users ALTER COLUMN email SET NOT NULL;
                </code></p>

                <p>📌 <b>DROP TABLE — удаление таблицы:</b><br>
                <code>
                DROP TABLE users;  # удалить таблицу<br>
                DROP TABLE IF EXISTS users;  # без ошибки, если нет
                </code></p>
            `,
            questions: [
                {
                    question: 'Какое ограничение делает поле уникальным?',
                    answers: ['UNIQUE', 'PRIMARY KEY', 'NOT NULL', 'DEFAULT'],
                    correct: 0
                },
                {
                    question: 'Как добавить новый столбец в существующую таблицу?',
                    answers: [
                        'ALTER TABLE ADD COLUMN',
                        'CREATE TABLE ADD COLUMN',
                        'UPDATE TABLE ADD COLUMN',
                        'INSERT TABLE ADD COLUMN'
                    ],
                    correct: 0
                },
                {
                    question: 'Какое ограничение используется для первичного ключа?',
                    answers: ['PRIMARY KEY', 'UNIQUE', 'FOREIGN KEY', 'NOT NULL'],
                    correct: 0
                },
                {
                    question: 'Как удалить таблицу?',
                    answers: ['DROP TABLE', 'DELETE TABLE', 'REMOVE TABLE', 'CLEAR TABLE'],
                    correct: 0
                },
                {
                    question: 'Какое ограничение запрещает пустые значения?',
                    answers: ['NOT NULL', 'UNIQUE', 'DEFAULT', 'CHECK'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 5: Вставка, обновление, удаление данных
        // ============================================================
        {
            id: 'sql_5',
            title: 'INSERT INTO, UPDATE, DELETE',
            lecture: `
                <p>✏️ <b>DML (Data Manipulation Language)</b> — работа с данными в таблицах.</p>

                <p>📌 <b>INSERT INTO — добавление данных:</b><br>
                <code>
                INSERT INTO users (name, email, age)<br>
                VALUES ('Alice', 'alice@mail.com', 25);<br>
                <br>
                INSERT INTO users (name, email)<br>
                VALUES ('Bob', 'bob@mail.com');  # age будет NULL
                </code></p>

                <p>📌 <b>UPDATE — обновление данных:</b><br>
                <code>
                UPDATE users<br>
                SET age = 26, email = 'alice_new@mail.com'<br>
                WHERE name = 'Alice';
                </code></p>

                <p>📌 <b>DELETE — удаление данных:</b><br>
                <code>
                DELETE FROM users WHERE name = 'Bob';<br>
                DELETE FROM users;  # удалить все записи (осторожно!)
                </code></p>

                <p>📌 <b>Важно:</b><br>
                • Всегда используй WHERE в UPDATE и DELETE<br>
                • Без WHERE — изменятся/удалятся все записи<br>
                • Используй транзакции для безопасности<br>
                <code>
                BEGIN;<br>
                UPDATE users SET age = 30 WHERE id = 1;<br>
                ROLLBACK;  # или COMMIT
                </code></p>
            `,
            questions: [
                {
                    question: 'Как добавить новую запись в таблицу?',
                    answers: ['INSERT INTO', 'ADD INTO', 'CREATE INTO', 'UPDATE INTO'],
                    correct: 0
                },
                {
                    question: 'Что произойдёт при UPDATE без WHERE?',
                    answers: [
                        'Обновятся все записи в таблице',
                        'Будет ошибка',
                        'Ничего не произойдёт',
                        'Обновится первая запись'
                    ],
                    correct: 0
                },
                {
                    question: 'Как удалить все записи из таблицы?',
                    answers: ['DELETE FROM table;', 'DROP TABLE table;', 'TRUNCATE table;', 'CLEAR table;'],
                    correct: 0
                },
                {
                    question: 'Как откатить изменения в транзакции?',
                    answers: ['ROLLBACK', 'UNDO', 'CANCEL', 'REVERT'],
                    correct: 0
                },
                {
                    question: 'Как обновить данные в таблице?',
                    answers: ['UPDATE ... SET ... WHERE', 'UPDATE ... WHERE ... SET', 'CHANGE ... SET ... WHERE', 'MODIFY ... SET ... WHERE'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 6: SELECT и фильтрация
        // ============================================================
        {
            id: 'sql_6',
            title: 'SELECT — выборка данных. WHERE, ORDER BY, LIMIT',
            lecture: `
                <p>🔍 <b>SELECT</b> — самый частый запрос в SQL.</p>

                <p>📌 <b>Базовый синтаксис:</b><br>
                <code>
                SELECT column1, column2 FROM table_name;
                </code></p>

                <p>📌 <b>SELECT * — все столбцы:</b><br>
                <code>
                SELECT * FROM users;
                </code></p>

                <p>📌 <b>WHERE — фильтрация:</b><br>
                <code>
                SELECT * FROM users WHERE age > 18;<br>
                SELECT * FROM users WHERE name = 'Alice';<br>
                SELECT * FROM users WHERE age BETWEEN 20 AND 30;<br>
                SELECT * FROM users WHERE email LIKE '%@gmail.com';
                </code></p>

                <p>📌 <b>ORDER BY — сортировка:</b><br>
                <code>
                SELECT * FROM users ORDER BY age DESC;  # по убыванию<br>
                SELECT * FROM users ORDER BY name ASC;  # по возрастанию
                </code></p>

                <p>📌 <b>LIMIT — ограничение количества записей:</b><br>
                <code>
                SELECT * FROM users LIMIT 10;  # первые 10<br>
                SELECT * FROM users OFFSET 10 LIMIT 10;  # 11-20
                </code></p>
            `,
            questions: [
                {
                    question: 'Как выбрать все столбцы из таблицы?',
                    answers: ['SELECT * FROM table;', 'SELECT ALL FROM table;', 'SELECT FROM table;', 'GET * FROM table;'],
                    correct: 0
                },
                {
                    question: 'Как отсортировать результат по возрастанию?',
                    answers: ['ORDER BY column ASC', 'ORDER BY column DESC', 'SORT BY column ASC', 'ORDER column ASC'],
                    correct: 0
                },
                {
                    question: 'Как выбрать первые 10 записей?',
                    answers: ['LIMIT 10', 'TOP 10', 'ROWS 10', 'FIRST 10'],
                    correct: 0
                },
                {
                    question: 'Какой оператор используется для фильтрации?',
                    answers: ['WHERE', 'HAVING', 'FILTER', 'CONDITION'],
                    correct: 0
                },
                {
                    question: 'Как выбрать записи, где age между 18 и 30?',
                    answers: ['WHERE age BETWEEN 18 AND 30', 'WHERE age >= 18 AND age <= 30', 'WHERE age > 18 AND age < 30', 'WHERE age IN (18, 30)'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 7: Операторы сравнения и логические операторы
        // ============================================================
        {
            id: 'sql_7',
            title: 'Операторы сравнения и логические операторы',
            lecture: `
                <p>⚖️ <b>Операторы сравнения</b> — позволяют сравнивать значения в WHERE.</p>

                <p>📌 <b>Операторы сравнения:</b><br>
                • <b>=</b> — равно<br>
                • <b><></b> или <b>!=</b> — не равно<br>
                • <b>></b> — больше<br>
                • <b><</b> — меньше<br>
                • <b>>=</b> — больше или равно<br>
                • <b><=</b> — меньше или равно</p>

                <p>📌 <b>Логические операторы:</b><br>
                • <b>AND</b> — оба условия должны быть истинны<br>
                • <b>OR</b> — хотя бы одно условие истинно<br>
                • <b>NOT</b> — отрицание</p>

                <p>📌 <b>Примеры:</b><br>
                <code>
                SELECT * FROM users WHERE age >= 18 AND age <= 30;<br>
                SELECT * FROM users WHERE name = 'Alice' OR name = 'Bob';<br>
                SELECT * FROM users WHERE NOT age > 18;  # возраст <= 18
                </code></p>

                <p>📌 <b>Приоритет операторов:</b><br>
                1. NOT<br>
                2. AND<br>
                3. OR</p>
            `,
            questions: [
                {
                    question: 'Какой оператор означает "не равно" в SQL?',
                    answers: ['<>', '!=', 'NOT =', 'Все варианты верны'],
                    correct: 3
                },
                {
                    question: 'Что вернёт запрос с AND?',
                    answers: [
                        'Оба условия должны быть истинны',
                        'Хотя бы одно условие истинно',
                        'Ни одно условие не истинно',
                        'Все условия ложны'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой оператор имеет наивысший приоритет?',
                    answers: ['NOT', 'AND', 'OR', 'Все одинаково'],
                    correct: 0
                },
                {
                    question: 'Что вернёт запрос с OR?',
                    answers: [
                        'Хотя бы одно условие истинно',
                        'Оба условия должны быть истинны',
                        'Ни одно условие не истинно',
                        'Все условия ложны'
                    ],
                    correct: 0
                },
                {
                    question: 'Как проверить, что возраст НЕ больше 18?',
                    answers: ['NOT age > 18', 'age <= 18', 'age < 18', 'age = 18'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 8: Работа с NULL
        // ============================================================
        {
            id: 'sql_8',
            title: 'Работа с NULL. IS NULL, IS NOT NULL, COALESCE',
            lecture: `
                <p>⚠️ <b>NULL</b> — отсутствие значения, не равно 0 или пустой строке.</p>

                <p>📌 <b>Проверка на NULL:</b><br>
                <code>
                SELECT * FROM users WHERE age IS NULL;  # возраст не указан<br>
                SELECT * FROM users WHERE age IS NOT NULL;  # возраст указан
                </code></p>

                <p>📌 <b>COALESCE — замена NULL на значение по умолчанию:</b><br>
                <code>
                SELECT name, COALESCE(age, 0) as age FROM users;<br>
                # Если age NULL, будет 0
                </code></p>

                <p>📌 <b>NULL в операциях:</b><br>
                • NULL + 10 = NULL<br>
                • NULL = NULL — НЕИЗВЕСТНО (не TRUE)<br>
                • NULL IS NULL — TRUE</p>

                <p>📌 <b>Важно:</b><br>
                • Не используй = NULL (всегда FALSE)<br>
                • Используй IS NULL или IS NOT NULL</p>
            `,
            questions: [
                {
                    question: 'Как проверить, что значение NULL?',
                    answers: ['IS NULL', '= NULL', '== NULL', 'IS NULL или = NULL'],
                    correct: 0
                },
                {
                    question: 'Что вернёт NULL = NULL?',
                    answers: ['NULL', 'TRUE', 'FALSE', 'Ошибку'],
                    correct: 0
                },
                {
                    question: 'Что делает COALESCE?',
                    answers: [
                        'Заменяет NULL на значение по умолчанию',
                        'Удаляет NULL',
                        'Создаёт NULL',
                        'Проверяет на NULL'
                    ],
                    correct: 0
                },
                {
                    question: 'Как проверить, что значение НЕ NULL?',
                    answers: ['IS NOT NULL', '!= NULL', 'NOT NULL', 'IS NOT NULL или != NULL'],
                    correct: 0
                },
                {
                    question: 'Что вернёт NULL + 5?',
                    answers: ['NULL', '5', 'Ошибку', '0'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 9: DISTINCT, LIKE, IN, BETWEEN
        // ============================================================
        {
            id: 'sql_9',
            title: 'DISTINCT, LIKE, IN, BETWEEN',
            lecture: `
                <p>🔍 <b>Специальные операторы для фильтрации.</b></p>

                <p>📌 <b>DISTINCT — уникальные значения:</b><br>
                <code>
                SELECT DISTINCT city FROM users;  # все города без повторов<br>
                SELECT COUNT(DISTINCT city) FROM users;  # количество уникальных городов
                </code></p>

                <p>📌 <b>LIKE — поиск по шаблону:</b><br>
                <code>
                SELECT * FROM users WHERE name LIKE 'A%';  # начинается с A<br>
                SELECT * FROM users WHERE name LIKE '%son';  # заканчивается на son<br>
                SELECT * FROM users WHERE name LIKE '%li%';  # содержит li<br>
                SELECT * FROM users WHERE name LIKE 'J_n';  # J + любой символ + n
                </code></p>

                <p>📌 <b>IN — проверка вхождения в список:</b><br>
                <code>
                SELECT * FROM users WHERE city IN ('Moscow', 'SPb', 'Kazan');<br>
                SELECT * FROM users WHERE age IN (18, 25, 30);
                </code></p>

                <p>📌 <b>BETWEEN — диапазон значений:</b><br>
                <code>
                SELECT * FROM users WHERE age BETWEEN 18 AND 30;<br>
                SELECT * FROM users WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';
                </code></p>
            `,
            questions: [
                {
                    question: 'Что делает DISTINCT?',
                    answers: [
                        'Возвращает уникальные значения',
                        'Возвращает все значения',
                        'Сортирует значения',
                        'Фильтрует NULL'
                    ],
                    correct: 0
                },
                {
                    question: 'Что найдёт LIKE "%li%"?',
                    answers: [
                        'Строки, содержащие "li" в любом месте',
                        'Строки, начинающиеся с "li"',
                        'Строки, заканчивающиеся на "li"',
                        'Точное совпадение "li"'
                    ],
                    correct: 0
                },
                {
                    question: 'Как проверить, что значение в списке?',
                    answers: ['IN', 'LIKE', 'BETWEEN', 'IS IN'],
                    correct: 0
                },
                {
                    question: 'Что делает BETWEEN?',
                    answers: [
                        'Проверяет, что значение в диапазоне',
                        'Проверяет, что значение в списке',
                        'Проверяет, что значение NULL',
                        'Проверяет, что значение уникально'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой шаблон найдёт имена, начинающиеся с "J" и заканчивающиеся на "n"?',
                    answers: ['LIKE "J%n"', 'LIKE "J_n"', 'LIKE "%J%n%"', 'LIKE "J_%n"'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 10: JOIN
        // ============================================================
        {
            id: 'sql_10',
            title: 'JOIN: INNER, LEFT, RIGHT, FULL JOIN',
            lecture: `
                <p>🔗 <b>JOIN</b> — объединяет данные из двух таблиц.</p>

                <p>📌 <b>INNER JOIN — только совпадающие записи:</b><br>
                <code>
                SELECT users.name, orders.product, orders.price<br>
                FROM users<br>
                INNER JOIN orders ON users.id = orders.user_id;
                </code></p>

                <p>📌 <b>LEFT JOIN — все записи из левой таблицы + совпавшие из правой:</b><br>
                <code>
                SELECT users.name, orders.product<br>
                FROM users<br>
                LEFT JOIN orders ON users.id = orders.user_id;<br>
                # Пользователи без заказов — тоже будут (orders будет NULL)
                </code></p>

                <p>📌 <b>RIGHT JOIN — все записи из правой таблицы + совпавшие из левой:</b><br>
                <code>
                SELECT users.name, orders.product<br>
                FROM users<br>
                RIGHT JOIN orders ON users.id = orders.user_id;
                </code></p>

                <p>📌 <b>FULL JOIN — все записи из обеих таблиц:</b><br>
                <code>
                SELECT users.name, orders.product<br>
                FROM users<br>
                FULL JOIN orders ON users.id = orders.user_id;
                </code></p>

                <p>📌 <b>JOIN с несколькими таблицами:</b><br>
                <code>
                SELECT u.name, o.product, p.name as product_name<br>
                FROM users u<br>
                JOIN orders o ON u.id = o.user_id<br>
                JOIN products p ON o.product_id = p.id;
                </code></p>
            `,
            questions: [
                {
                    question: 'Какой JOIN возвращает только совпадающие записи?',
                    answers: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'],
                    correct: 0
                },
                {
                    question: 'Какой JOIN возвращает все записи из левой таблицы?',
                    answers: ['LEFT JOIN', 'INNER JOIN', 'RIGHT JOIN', 'FULL JOIN'],
                    correct: 0
                },
                {
                    question: 'Что будет с пользователями без заказов при LEFT JOIN?',
                    answers: [
                        'Они будут с NULL в полях заказов',
                        'Они не будут включены в результат',
                        'Будет ошибка',
                        'Они будут удалены'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой JOIN возвращает все записи из обеих таблиц?',
                    answers: ['FULL JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN'],
                    correct: 0
                },
                {
                    question: 'Что такое псевдоним таблицы?',
                    answers: [
                        'Краткое имя для таблицы в запросе',
                        'Новое имя для таблицы',
                        'Копия таблицы',
                        'Индекс таблицы'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 11: Агрегатные функции
        // ============================================================
        {
            id: 'sql_11',
            title: 'Агрегатные функции: COUNT, SUM, AVG, MIN, MAX',
            lecture: `
                <p>📊 <b>Агрегатные функции</b> — выполняют вычисления над набором строк.</p>

                <p>📌 <b>COUNT — количество записей:</b><br>
                <code>
                SELECT COUNT(*) FROM users;  # все записи<br>
                SELECT COUNT(age) FROM users;  # только где age NOT NULL<br>
                SELECT COUNT(DISTINCT city) FROM users;  # уникальные города
                </code></p>

                <p>📌 <b>SUM — сумма значений:</b><br>
                <code>
                SELECT SUM(price) FROM orders;  # общая сумма всех заказов
                </code></p>

                <p>📌 <b>AVG — среднее значение:</b><br>
                <code>
                SELECT AVG(price) FROM orders;  # средняя цена заказа
                </code></p>

                <p>📌 <b>MIN — минимальное значение:</b><br>
                <code>
                SELECT MIN(price) FROM orders;  # самый дешёвый заказ
                </code></p>

                <p>📌 <b>MAX — максимальное значение:</b><br>
                <code>
                SELECT MAX(price) FROM orders;  # самый дорогой заказ
                </code></p>

                <p>📌 <b>Комбинирование:</b><br>
                <code>
                SELECT COUNT(*) as total, AVG(price) as avg_price, SUM(price) as total_sum<br>
                FROM orders;
                </code></p>
            `,
            questions: [
                {
                    question: 'Какая функция возвращает количество записей?',
                    answers: ['COUNT', 'SUM', 'AVG', 'LENGTH'],
                    correct: 0
                },
                {
                    question: 'Какая функция возвращает среднее значение?',
                    answers: ['AVG', 'SUM', 'COUNT', 'MEAN'],
                    correct: 0
                },
                {
                    question: 'Что вернёт COUNT(age), если есть NULL в age?',
                    answers: [
                        'Количество записей с NOT NULL age',
                        'Количество всех записей',
                        'NULL',
                        'Ошибку'
                    ],
                    correct: 0
                },
                {
                    question: 'Какая функция возвращает максимальное значение?',
                    answers: ['MAX', 'MIN', 'TOP', 'HIGHEST'],
                    correct: 0
                },
                {
                    question: 'Как посчитать сумму всех заказов?',
                    answers: ['SUM(price)', 'TOTAL(price)', 'ADD(price)', 'SUM_ALL(price)'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 12: GROUP BY и HAVING
        // ============================================================
        {
            id: 'sql_12',
            title: 'GROUP BY и HAVING — группировка и фильтрация групп',
            lecture: `
                <p>📊 <b>GROUP BY</b> — группирует записи по одному или нескольким столбцам.</p>

                <p>📌 <b>Базовый синтаксис:</b><br>
                <code>
                SELECT city, COUNT(*) as user_count<br>
                FROM users<br>
                GROUP BY city;
                </code></p>

                <p>📌 <b>Группировка по нескольким столбцам:</b><br>
                <code>
                SELECT city, age, COUNT(*) as count<br>
                FROM users<br>
                GROUP BY city, age;
                </code></p>

                <p>📌 <b>HAVING — фильтрация групп (после GROUP BY):</b><br>
                <code>
                SELECT city, COUNT(*) as user_count<br>
                FROM users<br>
                GROUP BY city<br>
                HAVING COUNT(*) > 5;  # только города с > 5 пользователями
                </code></p>

                <p>📌 <b>Отличие WHERE и HAVING:</b><br>
                • WHERE — фильтрует строки ДО группировки<br>
                • HAVING — фильтрует группы ПОСЛЕ группировки</p>

                <p>📌 <b>Пример:</b><br>
                <code>
                SELECT city, AVG(age) as avg_age<br>
                FROM users<br>
                WHERE age IS NOT NULL<br>
                GROUP BY city<br>
                HAVING AVG(age) > 25;
                </code></p>
            `,
            questions: [
                {
                    question: 'Для чего используется GROUP BY?',
                    answers: [
                        'Для группировки записей по столбцам',
                        'Для сортировки записей',
                        'Для фильтрации записей',
                        'Для объединения таблиц'
                    ],
                    correct: 0
                },
                {
                    question: 'Чем HAVING отличается от WHERE?',
                    answers: [
                        'HAVING фильтрует группы, WHERE — строки',
                        'HAVING фильтрует строки, WHERE — группы',
                        'Это одно и то же',
                        'HAVING работает быстрее'
                    ],
                    correct: 0
                },
                {
                    question: 'Что вернёт запрос с GROUP BY city?',
                    answers: [
                        'По одной строке на каждый город',
                        'Все строки таблицы',
                        'По одной строке на каждого пользователя',
                        'Ошибку'
                    ],
                    correct: 0
                },
                {
                    question: 'Как отфильтровать группы с более чем 10 записями?',
                    answers: ['HAVING COUNT(*) > 10', 'WHERE COUNT(*) > 10', 'FILTER COUNT(*) > 10', 'HAVING > 10'],
                    correct: 0
                },
                {
                    question: 'Где правильно использовать WHERE?',
                    answers: [
                        'До GROUP BY',
                        'После GROUP BY',
                        'Вместо GROUP BY',
                        'После HAVING'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 13: Подзапросы (Subqueries)
        // ============================================================
        {
            id: 'sql_13',
            title: 'Подзапросы (Subqueries) — WHERE, FROM, SELECT',
            lecture: `
                <p>📦 <b>Подзапрос (Subquery)</b> — запрос внутри другого запроса.</p>

                <p>📌 <b>Подзапрос в WHERE:</b><br>
                <code>
                SELECT * FROM users<br>
                WHERE age > (SELECT AVG(age) FROM users);<br>
                # пользователи старше среднего возраста
                </code></p>

                <p>📌 <b>Подзапрос с IN:</b><br>
                <code>
                SELECT * FROM users<br>
                WHERE id IN (SELECT user_id FROM orders WHERE price > 1000);<br>
                # пользователи с заказами дороже 1000
                </code></p>

                <p>📌 <b>Подзапрос в FROM:</b><br>
                <code>
                SELECT avg_age<br>
                FROM (SELECT AVG(age) as avg_age FROM users) as sub;<br>
                # подзапрос как временная таблица
                </code></p>

                <p>📌 <b>Подзапрос в SELECT:</b><br>
                <code>
                SELECT name,<br>
                (SELECT COUNT(*) FROM orders WHERE user_id = users.id) as order_count<br>
                FROM users;
                </code></p>

                <p>📌 <b>Существование (EXISTS):</b><br>
                <code>
                SELECT * FROM users u<br>
                WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);<br>
                # только пользователи с заказами
                </code></p>
            `,
            questions: [
                {
                    question: 'Что такое подзапрос (Subquery)?',
                    answers: [
                        'Запрос внутри другого запроса',
                        'Запрос к нескольким таблицам',
                        'Запрос с GROUP BY',
                        'Запрос с ORDER BY'
                    ],
                    correct: 0
                },
                {
                    question: 'Где можно использовать подзапрос?',
                    answers: ['WHERE, FROM, SELECT', 'Только WHERE', 'Только FROM', 'Только SELECT'],
                    correct: 0
                },
                {
                    question: 'Что делает подзапрос с EXISTS?',
                    answers: [
                        'Проверяет существование записей в подзапросе',
                        'Считает количество записей',
                        'Суммирует значения',
                        'Удаляет записи'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой оператор используется с подзапросом для проверки вхождения в список?',
                    answers: ['IN', 'EXISTS', 'ANY', 'ALL'],
                    correct: 0
                },
                {
                    question: 'Может ли подзапрос возвращать несколько строк?',
                    answers: ['Да', 'Нет', 'Только одну', 'Только две'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 14: Оконные функции — ROW_NUMBER, RANK, DENSE_RANK
        // ============================================================
        {
            id: 'sql_14',
            title: 'Оконные функции: ROW_NUMBER, RANK, DENSE_RANK',
            lecture: `
                <p>📊 <b>Оконные функции (Window Functions)</b> — выполняют вычисления по набору строк, связанных с текущей строкой.</p>

                <p>📌 <b>ROW_NUMBER() — нумерация строк:</b><br>
                <code>
                SELECT name, salary,<br>
                ROW_NUMBER() OVER (ORDER BY salary DESC) as rank<br>
                FROM employees;
                </code></p>

                <p>📌 <b>RANK() — с пропусками при одинаковых значениях:</b><br>
                <code>
                SELECT name, salary,<br>
                RANK() OVER (ORDER BY salary DESC) as rank<br>
                FROM employees;<br>
                # 1, 2, 2, 4, 5 (если два вторых)
                </code></p>

                <p>📌 <b>DENSE_RANK() — без пропусков:</b><br>
                <code>
                SELECT name, salary,<br>
                DENSE_RANK() OVER (ORDER BY salary DESC) as rank<br>
                FROM employees;<br>
                # 1, 2, 2, 3, 4 (если два вторых)
                </code></p>

                <p>📌 <b>PARTITION BY — группировка внутри окна:</b><br>
                <code>
                SELECT name, department, salary,<br>
                ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank_in_dept<br>
                FROM employees;
                </code></p>
            `,
            questions: [
                {
                    question: 'Что делает ROW_NUMBER()?',
                    answers: [
                        'Нумерует строки в окне',
                        'Ранжирует строки с пропусками',
                        'Ранжирует строки без пропусков',
                        'Группирует строки'
                    ],
                    correct: 0
                },
                {
                    question: 'Чем RANK отличается от DENSE_RANK?',
                    answers: [
                        'RANK с пропусками, DENSE_RANK без пропусков',
                        'DENSE_RANK с пропусками, RANK без пропусков',
                        'Это одно и то же',
                        'RANK быстрее'
                    ],
                    correct: 0
                },
                {
                    question: 'Что делает PARTITION BY в оконной функции?',
                    answers: [
                        'Делит строки на группы для вычислений',
                        'Сортирует строки',
                        'Фильтрует строки',
                        'Объединяет таблицы'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой синтаксис у оконной функции?',
                    answers: ['OVER()', 'WINDOW()', 'WITH()', 'GROUP()'],
                    correct: 0
                },
                {
                    question: 'Что вернёт RANK() при одинаковых значениях?',
                    answers: ['Одинаковые ранги с пропусками', 'Одинаковые ранги без пропусков', 'Разные ранги', 'Ошибку'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 15: Оконные функции — LAG, LEAD, SUM OVER
        // ============================================================
        {
            id: 'sql_15',
            title: 'Оконные функции: LAG, LEAD, SUM OVER, AVG OVER',
            lecture: `
                <p>📊 <b>Оконные функции для работы со строками.</b></p>

                <p>📌 <b>LAG() — значение из предыдущей строки:</b><br>
                <code>
                SELECT date, sales,<br>
                LAG(sales) OVER (ORDER BY date) as previous_day_sales<br>
                FROM daily_sales;
                </code></p>

                <p>📌 <b>LEAD() — значение из следующей строки:</b><br>
                <code>
                SELECT date, sales,<br>
                LEAD(sales) OVER (ORDER BY date) as next_day_sales<br>
                FROM daily_sales;
                </code></p>

                <p>📌 <b>SUM() OVER — накопительная сумма:</b><br>
                <code>
                SELECT date, sales,<br>
                SUM(sales) OVER (ORDER BY date) as cumulative_sum<br>
                FROM daily_sales;
                </code></p>

                <p>📌 <b>AVG() OVER — скользящее среднее:</b><br>
                <code>
                SELECT date, sales,<br>
                AVG(sales) OVER (ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as moving_avg<br>
                FROM daily_sales;
                </code></p>

                <p>📌 <b>ROWS BETWEEN — задание окна:</b><br>
                • <b>ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</b> — текущая + 2 предыдущие<br>
                • <b>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</b> — от начала до текущей<br>
                • <b>ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING</b> — от текущей до конца</p>
            `,
            questions: [
                {
                    question: 'Что возвращает LAG()?',
                    answers: [
                        'Значение из предыдущей строки',
                        'Значение из следующей строки',
                        'Значение из первой строки',
                        'Значение из последней строки'
                    ],
                    correct: 0
                },
                {
                    question: 'Что возвращает LEAD()?',
                    answers: [
                        'Значение из следующей строки',
                        'Значение из предыдущей строки',
                        'Значение из первой строки',
                        'Значение из последней строки'
                    ],
                    correct: 0
                },
                {
                    question: 'Для чего используется SUM() OVER?',
                    answers: [
                        'Для накопительной суммы',
                        'Для общей суммы',
                        'Для среднего значения',
                        'Для ранжирования'
                    ],
                    correct: 0
                },
                {
                    question: 'Что означает ROWS BETWEEN 2 PRECEDING AND CURRENT ROW?',
                    answers: [
                        'Текущая строка + 2 предыдущие',
                        'Текущая строка + 2 следующие',
                        'Все строки от начала до текущей',
                        'Все строки от текущей до конца'
                    ],
                    correct: 0
                },
                {
                    question: 'Для чего нужна оконная функция AVG() OVER?',
                    answers: [
                        'Для скользящего среднего',
                        'Для общего среднего',
                        'Для ранжирования',
                        'Для накопительной суммы'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 16: CTE (Common Table Expressions)
        // ============================================================
        {
            id: 'sql_16',
            title: 'CTE (Common Table Expressions) — WITH ... AS',
            lecture: `
                <p>📦 <b>CTE (Common Table Expression)</b> — временная таблица, существующая только в рамках одного запроса.</p>

                <p>📌 <b>Синтаксис:</b><br>
                <code>
                WITH cte_name AS (<br>
                &nbsp;&nbsp;&nbsp;&nbsp;SELECT column1, column2 FROM table_name WHERE condition<br>
                )<br>
                SELECT * FROM cte_name;
                </code></p>

                <p>📌 <b>Пример:</b><br>
                <code>
                WITH high_value_orders AS (<br>
                &nbsp;&nbsp;&nbsp;&nbsp;SELECT user_id, SUM(price) as total<br>
                &nbsp;&nbsp;&nbsp;&nbsp;FROM orders<br>
                &nbsp;&nbsp;&nbsp;&nbsp;GROUP BY user_id<br>
                &nbsp;&nbsp;&nbsp;&nbsp;HAVING SUM(price) > 1000<br>
                )<br>
                SELECT u.name, h.total<br>
                FROM users u<br>
                JOIN high_value_orders h ON u.id = h.user_id;
                </code></p>

                <p>📌 <b>Несколько CTE в одном запросе:</b><br>
                <code>
                WITH<br>
                &nbsp;&nbsp;cte1 AS (SELECT * FROM table1),<br>
                &nbsp;&nbsp;cte2 AS (SELECT * FROM table2)<br>
                SELECT * FROM cte1 JOIN cte2 ON cte1.id = cte2.id;
                </code></p>

                <p>📌 <b>Рекурсивные CTE:</b><br>
                <code>
                WITH RECURSIVE org_tree AS (<br>
                &nbsp;&nbsp;&nbsp;&nbsp;SELECT id, name, manager_id, 1 as level<br>
                &nbsp;&nbsp;&nbsp;&nbsp;FROM employees WHERE manager_id IS NULL<br>
                &nbsp;&nbsp;&nbsp;&nbsp;UNION ALL<br>
                &nbsp;&nbsp;&nbsp;&nbsp;SELECT e.id, e.name, e.manager_id, ot.level + 1<br>
                &nbsp;&nbsp;&nbsp;&nbsp;FROM employees e<br>
                &nbsp;&nbsp;&nbsp;&nbsp;JOIN org_tree ot ON e.manager_id = ot.id<br>
                )<br>
                SELECT * FROM org_tree;
                </code></p>
            `,
            questions: [
                {
                    question: 'Что такое CTE в SQL?',
                    answers: [
                        'Временная таблица в рамках запроса',
                        'Постоянная таблица',
                        'Индекс таблицы',
                        'Представление'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой ключевой синтаксис у CTE?',
                    answers: ['WITH ... AS', 'CREATE TEMP', 'WITH ... SELECT', 'CTE ... AS'],
                    correct: 0
                },
                {
                    question: 'Можно ли использовать несколько CTE в одном запросе?',
                    answers: ['Да', 'Нет', 'Только два', 'Только один'],
                    correct: 0
                },
                {
                    question: 'Что такое рекурсивная CTE?',
                    answers: [
                        'CTE, которая ссылается на саму себя',
                        'CTE с несколькими таблицами',
                        'CTE с JOIN',
                        'CTE с GROUP BY'
                    ],
                    correct: 0
                },
                {
                    question: 'Где используется CTE?',
                    answers: [
                        'Вместо подзапросов для улучшения читаемости',
                        'Только в SELECT',
                        'Только в INSERT',
                        'Только в UPDATE'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 17: CASE — условная логика в SQL
        // ============================================================
        {
            id: 'sql_17',
            title: 'CASE — условная логика в SQL',
            lecture: `
                <p>⚖️ <b>CASE</b> — позволяет выполнять условную логику в SQL.</p>

                <p>📌 <b>Синтаксис:</b><br>
                <code>
                CASE<br>
                &nbsp;&nbsp;&nbsp;&nbsp;WHEN условие1 THEN результат1<br>
                &nbsp;&nbsp;&nbsp;&nbsp;WHEN условие2 THEN результат2<br>
                &nbsp;&nbsp;&nbsp;&nbsp;ELSE результат_по_умолчанию<br>
                END
                </code></p>

                <p>📌 <b>Пример 1: Категоризация возраста</b><br>
                <code>
                SELECT name, age,<br>
                CASE<br>
                &nbsp;&nbsp;&nbsp;&nbsp;WHEN age < 18 THEN 'Ребёнок'<br>
                &nbsp;&nbsp;&nbsp;&nbsp;WHEN age BETWEEN 18 AND 30 THEN 'Молодой'<br>
                &nbsp;&nbsp;&nbsp;&nbsp;WHEN age BETWEEN 31 AND 60 THEN 'Взрослый'<br>
                &nbsp;&nbsp;&nbsp;&nbsp;ELSE 'Пожилой'<br>
                END as age_group<br>
                FROM users;
                </code></p>

                <p>📌 <b>Пример 2: Сортировка с CASE</b><br>
                <code>
                SELECT * FROM users<br>
                ORDER BY<br>
                CASE<br>
                &nbsp;&nbsp;&nbsp;&nbsp;WHEN city = 'Moscow' THEN 1<br>
                &nbsp;&nbsp;&nbsp;&nbsp;WHEN city = 'SPb' THEN 2<br>
                &nbsp;&nbsp;&nbsp;&nbsp;ELSE 3<br>
                END;
                </code></p>

                <p>📌 <b>Пример 3: CASE в агрегации</b><br>
                <code>
                SELECT<br>
                SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_count,<br>
                SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) as inactive_count<br>
                FROM users;
                </code></p>
            `,
            questions: [
                {
                    question: 'Для чего используется CASE в SQL?',
                    answers: [
                        'Для условной логики',
                        'Для группировки',
                        'Для сортировки',
                        'Для объединения'
                    ],
                    correct: 0
                },
                {
                    question: 'Что делает ELSE в CASE?',
                    answers: [
                        'Значение по умолчанию, если ни одно условие не подошло',
                        'Дополнительное условие',
                        'Завершает CASE',
                        'Создаёт новое условие'
                    ],
                    correct: 0
                },
                {
                    question: 'Можно ли использовать CASE в ORDER BY?',
                    answers: ['Да', 'Нет', 'Только в SELECT', 'Только в WHERE'],
                    correct: 0
                },
                {
                    question: 'Как в CASE записать несколько условий?',
                    answers: ['CASE WHEN ... THEN ... WHEN ... THEN ... END', 'CASE WHEN ... AND ... THEN ... END', 'CASE IF ... THEN ... END', 'CASE ... END'],
                    correct: 0
                },
                {
                    question: 'Что будет, если ни одно условие в CASE не выполнилось и нет ELSE?',
                    answers: ['Вернётся NULL', 'Вернётся ошибка', 'Вернётся 0', 'Вернётся пустая строка'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 18: Индексы и EXPLAIN
        // ============================================================
        {
            id: 'sql_18',
            title: 'Индексы и EXPLAIN',
            lecture: `
                <p>⚡ <b>Индексы</b> — структуры данных, ускоряющие поиск в таблицах.</p>

                <p>📌 <b>CREATE INDEX:</b><br>
                <code>
                CREATE INDEX idx_users_email ON users(email);<br>
                CREATE INDEX idx_users_age_city ON users(age, city);  # составной индекс
                </code></p>

                <p>📌 <b>Типы индексов (PostgreSQL):</b><br>
                • <b>B-tree</b> — стандартный, для точного сравнения и диапазонов<br>
                • <b>Hash</b> — для точного сравнения (=)<br>
                • <b>GIN</b> — для полнотекстового поиска и JSON<br>
                • <b>GiST</b> — для геоданных</p>

                <p>📌 <b>EXPLAIN — анализ плана выполнения:</b><br>
                <code>
                EXPLAIN SELECT * FROM users WHERE email = 'test@mail.com';<br>
                EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@mail.com';
                </code></p>

                <p>📌 <b>Когда индексы НЕ нужны:</b><br>
                • Маленькая таблица (< 1000 записей)<br>
                • Частые вставки/обновления (индексы замедляют их)<br>
                • Низкая селективность (например, поле с 2 значениями)</p>

                <p>📌 <b>DROP INDEX — удаление индекса:</b><br>
                <code>
                DROP INDEX idx_users_email;
                </code></p>
            `,
            questions: [
                {
                    question: 'Для чего нужны индексы в SQL?',
                    answers: [
                        'Для ускорения поиска данных',
                        'Для хранения данных',
                        'Для сортировки данных',
                        'Для группировки данных'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой индекс является стандартным в PostgreSQL?',
                    answers: ['B-tree', 'Hash', 'GIN', 'GiST'],
                    correct: 0
                },
                {
                    question: 'Что делает EXPLAIN в SQL?',
                    answers: [
                        'Показывает план выполнения запроса',
                        'Выполняет запрос',
                        'Удаляет данные',
                        'Создаёт индекс'
                    ],
                    correct: 0
                },
                {
                    question: 'Когда НЕ стоит создавать индекс?',
                    answers: [
                        'На маленьких таблицах (< 1000 записей)',
                        'На больших таблицах',
                        'На часто запрашиваемых полях',
                        'На внешних ключах'
                    ],
                    correct: 0
                },
                {
                    question: 'Как удалить индекс?',
                    answers: ['DROP INDEX', 'DELETE INDEX', 'REMOVE INDEX', 'CLEAR INDEX'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 19: Работа с JSON в SQL
        // ============================================================
        {
            id: 'sql_19',
            title: 'Работа с JSON в SQL',
            lecture: `
                <p>📦 <b>JSON в SQL</b> — хранение и работа с JSON-данными в реляционных базах.</p>

                <p>📌 <b>Создание таблицы с JSON:</b><br>
                <code>
                CREATE TABLE products (<br>
                &nbsp;&nbsp;&nbsp;&nbsp;id SERIAL PRIMARY KEY,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;name VARCHAR(100),<br>
                &nbsp;&nbsp;&nbsp;&nbsp;attributes JSONB<br>
                );<br>
                <br>
                INSERT INTO products (name, attributes)<br>
                VALUES ('Phone', '{"color": "black", "memory": 128, "os": "Android"}');
                </code></p>

                <p>📌 <b>Операторы для JSON в PostgreSQL:</b><br>
                • <b>-></b> — получить значение как JSON<br>
                • <b>->></b> — получить значение как текст<br>
                • <b>#> / #>></b> — доступ по пути</p>

                <p>📌 <b>Примеры:</b><br>
                <code>
                SELECT name, attributes->>'color' as color FROM products;<br>
                SELECT name, attributes->'memory' as memory FROM products;<br>
                SELECT name FROM products WHERE attributes->>'os' = 'Android';<br>
                SELECT name FROM products WHERE attributes @> '{"memory": 128}';
                </code></p>

                <p>📌 <b>Обновление JSON:</b><br>
                <code>
                UPDATE products<br>
                SET attributes = jsonb_set(attributes, '{color}', '"red"')<br>
                WHERE id = 1;
                </code></p>
            `,
            questions: [
                {
                    question: 'Какой тип данных в PostgreSQL используется для JSON?',
                    answers: ['JSONB', 'TEXT', 'VARCHAR', 'ARRAY'],
                    correct: 0
                },
                {
                    question: 'Какой оператор возвращает JSON-значение как текст?',
                    answers: ['->>', '->', '#>', '#>>'],
                    correct: 0
                },
                {
                    question: 'Как проверить, содержит ли JSON определённое поле?',
                    answers: ['@>', '->', '->>', '#>'],
                    correct: 0
                },
                {
                    question: 'Как обновить поле в JSON-объекте?',
                    answers: ['jsonb_set()', 'set()', 'update()', 'json_update()'],
                    correct: 0
                },
                {
                    question: 'Чем JSONB отличается от JSON в PostgreSQL?',
                    answers: [
                        'JSONB оптимизирован для хранения и индексации',
                        'JSON быстрее JSONB',
                        'Это одно и то же',
                        'JSONB хранит данные в виде текста'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 20: AI-ассистенты для SQL
        // ============================================================
        {
            id: 'sql_20',
            title: 'AI-ассистенты для SQL: использование ChatGPT и Copilot',
            lecture: `
                <p>🤖 <b>AI-ассистенты</b> — меняют способ написания и оптимизации SQL-запросов.</p>

                <p>📌 <b>Как использовать AI для SQL:</b><br>
                1. <b>Описать задачу на естественном языке</b><br>
                "Напиши запрос, который покажет всех пользователей старше 18 лет"<br>
                2. <b>Получить SQL-запрос</b><br>
                3. <b>Проверить и адаптировать</b> под свою СУБД</p>

                <p>📌 <b>Пример промпта:</b><br>
                "Напиши SQL-запрос для PostgreSQL, который:<br>
                - Показывает имя пользователя, сумму его заказов<br>
                - Только пользователей с суммой > 1000<br>
                - Отсортированных по убыванию суммы"</p>

                <p>📌 <b>AI для оптимизации:</b><br>
                <code>
                -- Запрос работает медленно<br>
                SELECT * FROM users WHERE email LIKE '%@gmail.com';<br>
                -- AI может предложить: создать индекс на email или использовать полнотекстовый поиск
                </code></p>

                <p>📌 <b>Важно помнить:</b><br>
                • AI не заменяет понимание SQL<br>
                • Всегда проверяй запросы перед выполнением<br>
                • AI может ошибаться с синтаксисом конкретной СУБД<br>
                • Хороший запрос требует понимания данных и структуры</p>

                <p>📌 <b>Инструменты:</b><br>
                • <b>ChatGPT</b> — универсальный помощник<br>
                • <b>GitHub Copilot</b> — подсказки в IDE<br>
                • <b>pgExplain</b> — AI-анализ планов выполнения</p>
            `,
            questions: [
                {
                    question: 'Как AI может помочь в работе с SQL?',
                    answers: [
                        'Генерировать запросы по описанию, оптимизировать медленные запросы',
                        'Только генерировать запросы',
                        'Только оптимизировать запросы',
                        'Заменять DBA полностью'
                    ],
                    correct: 0
                },
                {
                    question: 'Что важно помнить при использовании AI для SQL?',
                    answers: [
                        'Всегда проверять запросы перед выполнением',
                        'Полностью доверять AI',
                        'Никогда не проверять запросы',
                        'Использовать AI только для SELECT'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой инструмент помогает с анализом планов выполнения?',
                    answers: ['pgExplain', 'ChatGPT', 'Copilot', 'PostgreSQL'],
                    correct: 0
                },
                {
                    question: 'Что должен уметь специалист в эпоху AI-ассистентов?',
                    answers: [
                        'Понимать структуру данных и проверять запросы',
                        'Только писать промпты',
                        'Только выполнять запросы',
                        'Не знать SQL'
                    ],
                    correct: 0
                },
                {
                    question: 'Почему AI не заменяет понимание SQL?',
                    answers: [
                        'AI может ошибаться, не понимает бизнес-логику, не знает структуру конкретных данных',
                        'AI не умеет писать SQL',
                        'AI медленнее человека',
                        'AI не может работать с базами данных'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 21: Итоги модуля (без вопросов)
        // ============================================================
        {
            id: 'sql_21',
            title: '🎓 Итоги модуля',
            lecture: `
                <p>🎉 <b>Поздравляем с завершением модуля «Базы данных (SQL)»!</b></p>

                <p>Ты прошёл 20 уроков и освоил основы работы с реляционными базами данных — ключевой навык для любого IT-специалиста.</p>

                <p>📊 <b>Что ты теперь знаешь и умеешь:</b><br>
                • Понимаешь, что такое реляционные базы данных<br>
                • Умеешь создавать таблицы и управлять ими<br>
                • Работаешь с CRUD-операциями (INSERT, SELECT, UPDATE, DELETE)<br>
                • Фильтруешь, сортируешь и группируешь данные<br>
                • Используешь JOIN для объединения таблиц<br>
                • Применяешь агрегатные функции и оконные функции<br>
                • Пишешь подзапросы и CTE<br>
                • Понимаешь индексы и оптимизацию запросов<br>
                • Работаешь с JSON в SQL<br>
                • Используешь AI-ассистенты для написания SQL</p>

                <p>🔗 <b>Связь с другими модулями:</b><br>
                • <b>Python</b> — ты можешь подключаться к БД из Python (psycopg2, SQLAlchemy)<br>
                • <b>Автотесты</b> — тестирование БД — часть автоматизации<br>
                • <b>DevOps</b> — управление базами данных в облаке</p>

                <p>🚀 <b>Что дальше?</b><br>
                Следующий модуль — «DevOps», где ты изучишь автоматизацию, CI/CD и облачные технологии.</p>

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