// ============================================================
// МОДУЛЬ 4: PYTHON ОСНОВЫ
// ============================================================

export const module = {
    id: 'python',
    title: 'Python основы',
    icon: '🐍',
    game: 'bug_hunter', // игра будет добавлена позже
    totalLessons: 21,
    lessons: [
        // ============================================================
        // УРОК 1: Что такое Python и зачем он нужен?
        // ============================================================
        {
            id: 'python_1',
            title: 'Что такое Python и зачем он нужен?',
            lecture: `
                <p>🐍 <b>Python</b> — это язык программирования, который используется для:</p>
                <p>• Веб-разработки (Django, Flask)<br>
                • Автоматизации (скрипты, боты)<br>
                • Науки о данных (Pandas, NumPy)<br>
                • Тестирования (pytest, Selenium)<br>
                • Искусственного интеллекта (TensorFlow, PyTorch)</p>

                <p>📌 <b>Почему Python популярен?</b><br>
                • Простой синтаксис — читается как английский<br>
                • Огромное количество библиотек<br>
                • Большое сообщество и документация<br>
                • Работает на всех платформах</p>

                <p>⚙️ <b>Что можно сделать на Python уже сейчас:</b><br>
                • Написать калькулятор<br>
                • Собрать данные с сайта (парсинг)<br>
                • Автоматизировать рутинные задачи<br>
                • Написать тесты для своего кода</p>

                <p>📊 <b>Где используется Python в IT:</b><br>
                • Backend-разработка — серверная логика<br>
                • Data Science — анализ данных<br>
                • DevOps — автоматизация инфраструктуры<br>
                • QA — написание автотестов</p>
            `,
            questions: [
                {
                    question: 'Для чего чаще всего используют Python?',
                    answers: [
                        'Только для веб-разработки',
                        'Для автоматизации, Data Science, тестирования и веб-разработки',
                        'Только для игр',
                        'Только для мобильных приложений'
                    ],
                    correct: 1
                },
                {
                    question: 'Что такое библиотека в Python?',
                    answers: [
                        'Набор готового кода для решения задач',
                        'Способ хранения данных',
                        'Тип переменной',
                        'Встроенная функция'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой фреймворк используется для веб-разработки на Python?',
                    answers: ['React', 'Django', 'Angular', 'Vue'],
                    correct: 1
                },
                {
                    question: 'Что делает интерпретатор Python?',
                    answers: [
                        'Переводит код Python в машинный код и выполняет его',
                        'Создаёт веб-страницы',
                        'Компилирует код в C++',
                        'Оптимизирует базы данных'
                    ],
                    correct: 0
                },
                {
                    question: 'Почему Python популярен среди начинающих?',
                    answers: [
                        'Потому что он сложный',
                        'Из-за простого синтаксиса и большого сообщества',
                        'Потому что он самый быстрый',
                        'Потому что он используется только в науке'
                    ],
                    correct: 1
                }
            ]
        },

        // ============================================================
        // УРОК 2: Установка и настройка окружения
        // ============================================================
        {
            id: 'python_2',
            title: 'Установка и настройка окружения',
            lecture: `
                <p>🛠️ <b>Что нужно для работы с Python?</b></p>

                <p>📌 <b>1. Установка Python</b><br>
                • Скачать с официального сайта python.org<br>
                • Выбрать версию для своей ОС (Windows, macOS, Linux)<br>
                • <b>Важно:</b> при установке поставить галочку "Add Python to PATH"</p>

                <p>📌 <b>2. IDE (среда разработки)</b><br>
                • <b>VS Code</b> — бесплатный, лёгкий, популярный<br>
                • <b>PyCharm</b> — мощный, платный (есть бесплатная версия)<br>
                • <b>IDLE</b> — встроенная в Python</p>

                <p>📌 <b>3. Проверка установки</b><br>
                • Открыть терминал (командную строку)<br>
                • Ввести: <code>python --version</code><br>
                • Должно появиться: <code>Python 3.x.x</code></p>

                <p>📌 <b>4. pip — менеджер пакетов</b><br>
                • Устанавливается вместе с Python<br>
                • Позволяет устанавливать сторонние библиотеки<br>
                • Команда: <code>pip install название_библиотеки</code></p>

                <p>📌 <b>5. Виртуальное окружение</b><br>
                • Позволяет изолировать проекты друг от друга<br>
                • Команда: <code>python -m venv venv</code></p>
            `,
            questions: [
                {
                    question: 'Что нужно сделать при установке Python на Windows?',
                    answers: [
                        'Поставить галочку "Add Python to PATH"',
                        'Установить только без галочек',
                        'Выбрать другую версию',
                        'Ничего не нужно делать'
                    ],
                    correct: 0
                },
                {
                    question: 'Какая IDE является бесплатной и популярной для Python?',
                    answers: ['PyCharm', 'VS Code', 'IDLE', 'WordPad'],
                    correct: 1
                },
                {
                    question: 'Как проверить, установлен ли Python?',
                    answers: [
                        'python --version',
                        'python -v',
                        'python --check',
                        'python version'
                    ],
                    correct: 0
                },
                {
                    question: 'Для чего нужен pip?',
                    answers: [
                        'Для установки сторонних библиотек',
                        'Для запуска Python',
                        'Для создания веб-сайтов',
                        'Для компиляции кода'
                    ],
                    correct: 0
                },
                {
                    question: 'Как создать виртуальное окружение в Python?',
                    answers: [
                        'python -m venv venv',
                        'pip install venv',
                        'python create venv',
                        'virtualenv venv'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 3: Первая программа
        // ============================================================
        {
            id: 'python_3',
            title: 'Первая программа: print(), input(), комментарии',
            lecture: `
                <p>💻 <b>Первая программа на Python</b></p>

                <p>📌 <b>print() — вывод на экран</b><br>
                <code>print("Hello, World!")</code><br>
                <code>print(42)</code><br>
                <code>print("Меня зовут", name)</code></p>

                <p>📌 <b>input() — ввод с клавиатуры</b><br>
                <code>name = input("Введите имя: ")</code><br>
                <code>age = int(input("Введите возраст: "))</code></p>

                <p>📌 <b>Комментарии — для пояснения кода</b><br>
                <code># Это однострочный комментарий</code><br>
                <code>
                """
                Это многострочный
                комментарий
                """
                </code></p>

                <p>📌 <b>Пример программы:</b><br>
                <code>
                name = input("Как тебя зовут? ")<br>
                print("Привет,", name, "!")<br>
                age = int(input("Сколько тебе лет? "))<br>
                print("Тебе", age, "лет")
                </code></p>
            `,
            questions: [
                {
                    question: 'Как вывести текст на экран в Python?',
                    answers: ['print()', 'echo()', 'write()', 'output()'],
                    correct: 0
                },
                {
                    question: 'Как получить данные от пользователя?',
                    answers: ['print()', 'input()', 'read()', 'get()'],
                    correct: 1
                },
                {
                    question: 'Что делает функция int()?',
                    answers: [
                        'Превращает строку в число',
                        'Превращает число в строку',
                        'Выводит число на экран',
                        'Создаёт список'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой символ обозначает однострочный комментарий?',
                    answers: ['//', '/*', '#', '--'],
                    correct: 2
                },
                {
                    question: 'Что выведет print("Привет,", name)?',
                    answers: [
                        'Привет, name',
                        'Привет, значение переменной name',
                        'Привет, "name"',
                        'Ошибку'
                    ],
                    correct: 1
                }
            ]
        },

        // ============================================================
        // УРОК 4: Переменные и типы данных
        // ============================================================
        {
            id: 'python_4',
            title: 'Переменные и типы данных',
            lecture: `
                <p>📦 <b>Переменные</b> — это контейнеры для хранения данных.</p>

                <p>📌 <b>Основные типы данных:</b><br>
                • <b>int</b> — целые числа (10, -5, 0)<br>
                • <b>float</b> — числа с плавающей точкой (3.14, -2.5)<br>
                • <b>str</b> — строки (текст в кавычках)<br>
                • <b>bool</b> — логические значения (True / False)</p>

                <p>📌 <b>Как создать переменную:</b><br>
                <code>age = 25          # int</code><br>
                <code>price = 19.99      # float</code><br>
                <code>name = "Alice"     # str</code><br>
                <code>is_active = True   # bool</code></p>

                <p>📌 <b>Определение типа переменной:</b><br>
                <code>type(age)    # <class 'int'></code><br>
                <code>type(name)   # <class 'str'></code></p>

                <p>📌 <b>Преобразование типов:</b><br>
                <code>int("10")     # 10</code><br>
                <code>str(25)       # "25"</code><br>
                <code>float("3.14") # 3.14</code></p>
            `,
            questions: [
                {
                    question: 'Какой тип данных у числа 3.14?',
                    answers: ['int', 'float', 'str', 'bool'],
                    correct: 1
                },
                {
                    question: 'Какой тип данных у значения True?',
                    answers: ['int', 'float', 'str', 'bool'],
                    correct: 3
                },
                {
                    question: 'Как преобразовать строку "10" в число?',
                    answers: ['int("10")', 'str(10)', 'float("10")', 'bool(10)'],
                    correct: 0
                },
                {
                    question: 'Что выведет type(True)?',
                    answers: ["<class 'bool'>", "<class 'int'>", "<class 'str'>", "<class 'float'>"],
                    correct: 0
                },
                {
                    question: 'Какой тип данных у значения "Привет"?',
                    answers: ['int', 'float', 'str', 'bool'],
                    correct: 2
                }
            ]
        },

        // ============================================================
        // УРОК 5: Ввод и вывод. Форматирование строк
        // ============================================================
        {
            id: 'python_5',
            title: 'Ввод и вывод. Форматирование строк',
            lecture: `
                <p>📝 <b>Форматирование строк</b> — способ вставлять переменные в текст.</p>

                <p>📌 <b>Способы форматирования:</b><br>
                1. <b>f-строки (рекомендуемый)</b><br>
                <code>name = "Alice"<br>
                age = 25<br>
                print(f"Меня зовут {name}, мне {age} лет")</code></p>

                2. <b>Метод .format()</b><br>
                <code>print("Меня зовут {}, мне {} лет".format(name, age))</code></p>

                3. <b>Конкатенация (склеивание)</b><br>
                <code>print("Меня зовут " + name + ", мне " + str(age) + " лет")</code></p>

                <p>📌 <b>Пример работы с вводом и выводом:</b><br>
                <code>
                name = input("Как тебя зовут? ")<br>
                age = int(input("Сколько тебе лет? "))<br>
                print(f"Привет, {name}! Тебе {age} лет.")<br>
                print(f"Через 5 лет тебе будет {age + 5} лет.")
                </code></p>
            `,
            questions: [
                {
                    question: 'Какой способ форматирования строк считается рекомендуемым?',
                    answers: ['f-строки', 'format()', 'Конкатенация', 'Проценты %s'],
                    correct: 0
                },
                {
                    question: 'Какой синтаксис у f-строки?',
                    answers: ['f"текст {переменная}"', '"текст {переменная}"', 'f"текст {переменная}"', 'F"текст {переменная}"'],
                    correct: 0
                },
                {
                    question: 'Что выведет print(f"5 + 3 = {5+3}")?',
                    answers: ['5 + 3 = 8', '5 + 3 = {5+3}', '5 + 3 = 5+3', 'Ошибку'],
                    correct: 0
                },
                {
                    question: 'Как объединить строки без дополнительных символов?',
                    answers: ['Конкатенация через +', 'f-строки', 'format()', 'Все варианты подходят'],
                    correct: 3
                },
                {
                    question: 'Что произойдёт, если попытаться сложить строку и число через +?',
                    answers: [
                        'Будет ошибка TypeError',
                        'Число автоматически станет строкой',
                        'Строка станет числом',
                        'Всё сработает'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 6: Условные операторы if, elif, else
        // ============================================================
        {
            id: 'python_6',
            title: 'Условные операторы if, elif, else',
            lecture: `
                <p>⚖️ <b>Условные операторы</b> позволяют выполнять код в зависимости от условий.</p>

                <p>📌 <b>Синтаксис:</b><br>
                <code>
                if условие:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;# код выполняется, если условие истинно<br>
                elif другое_условие:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;# код выполняется, если первое условие ложно<br>
                else:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;# код выполняется, если все условия ложны
                </code></p>

                <p>📌 <b>Пример:</b><br>
                <code>
                age = int(input("Сколько тебе лет? "))<br>
                if age >= 18:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print("Ты совершеннолетний")<br>
                elif age >= 14:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print("Ты подросток")<br>
                else:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print("Ты ребёнок")
                </code></p>

                <p>📌 <b>Важно:</b><br>
                • Отступы (4 пробела) обязательны<br>
                • elif может быть сколько угодно<br>
                • else не обязателен</p>
            `,
            questions: [
                {
                    question: 'Какой отступ используется в Python после if?',
                    answers: ['2 пробела', '4 пробела', 'Tab', 'Любой, но одинаковый'],
                    correct: 1
                },
                {
                    question: 'Что выведет код: if 5 > 3: print("A") else: print("B")?',
                    answers: ['A', 'B', 'Ошибку', 'Ничего'],
                    correct: 0
                },
                {
                    question: 'Сколько раз можно использовать elif?',
                    answers: ['Только один', 'Несколько раз', 'Только два', 'Ни одного'],
                    correct: 1
                },
                {
                    question: 'Что будет, если ни одно условие не истинно и нет else?',
                    answers: [
                        'Будет ошибка',
                        'Код просто пропустит блок if',
                        'Ничего не произойдёт',
                        'Выполнится первое условие'
                    ],
                    correct: 1
                },
                {
                    question: 'Какое ключевое слово используется для альтернативного условия?',
                    answers: ['else', 'elif', 'else if', 'elsif'],
                    correct: 1
                }
            ]
        },

        // ============================================================
        // УРОК 7: Логические операторы and, or, not
        // ============================================================
        {
            id: 'python_7',
            title: 'Логические операторы and, or, not',
            lecture: `
                <p>🔗 <b>Логические операторы</b> — объединяют условия.</p>

                <p>📌 <b>and — И (оба условия должны быть истинны)</b><br>
                <code>
                if age >= 18 and is_student == True:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print("Студент старше 18")
                </code></p>

                <p>📌 <b>or — ИЛИ (хотя бы одно условие истинно)</b><br>
                <code>
                if temperature > 30 or temperature < -10:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print("Экстремальная погода")
                </code></p>

                <p>📌 <b>not — НЕ (обратное условие)</b><br>
                <code>
                if not is_blocked:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print("Доступ разрешён")
                </code></p>

                <p>📌 <b>Таблица истинности:</b><br>
                • True and True = True<br>
                • True and False = False<br>
                • True or False = True<br>
                • False or False = False<br>
                • not True = False<br>
                • not False = True</p>
            `,
            questions: [
                {
                    question: 'Что вернёт выражение True and False?',
                    answers: ['True', 'False', 'Ошибку', 'None'],
                    correct: 1
                },
                {
                    question: 'Что вернёт выражение True or False?',
                    answers: ['True', 'False', 'Ошибку', 'None'],
                    correct: 0
                },
                {
                    question: 'Что вернёт not True?',
                    answers: ['True', 'False', 'Ошибку', 'None'],
                    correct: 1
                },
                {
                    question: 'Какое условие нужно для проверки "возраст от 18 до 30"?',
                    answers: [
                        'age >= 18 and age <= 30',
                        'age >= 18 or age <= 30',
                        'age > 18 and age < 30',
                        'age >= 18 and age < 30'
                    ],
                    correct: 0
                },
                {
                    question: 'Что будет выведено: if not True: print("A") else: print("B")?',
                    answers: ['A', 'B', 'Ошибку', 'Ничего'],
                    correct: 1
                }
            ]
        },

        // ============================================================
        // УРОК 8: Циклы for и range()
        // ============================================================
        {
            id: 'python_8',
            title: 'Циклы for и range()',
            lecture: `
                <p>🔄 <b>Цикл for</b> — используется для повторения кода определённое количество раз.</p>

                <p>📌 <b>Синтаксис:</b><br>
                <code>
                for переменная in последовательность:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;# код выполняется для каждого элемента
                </code></p>

                <p>📌 <b>range() — генерирует последовательность чисел</b><br>
                <code>
                for i in range(5):   # 0, 1, 2, 3, 4<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print(i)
                </code></p>

                <p>📌 <b>Примеры использования range():</b><br>
                <code>
                range(5)     # 0, 1, 2, 3, 4<br>
                range(2, 6)  # 2, 3, 4, 5<br>
                range(1, 10, 2) # 1, 3, 5, 7, 9 (шаг 2)
                </code></p>

                <p>📌 <b>Цикл по списку:</b><br>
                <code>
                fruits = ["apple", "banana", "cherry"]<br>
                for fruit in fruits:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print(fruit)
                </code></p>
            `,
            questions: [
                {
                    question: 'Что выведет list(range(3))?',
                    answers: ['[0, 1, 2]', '[1, 2, 3]', '[0, 1, 2, 3]', '[1, 2]'],
                    correct: 0
                },
                {
                    question: 'Какой синтаксис у цикла for?',
                    answers: [
                        'for i in range(5):',
                        'for (i=0; i<5; i++)',
                        'for i = 0 to 5',
                        'loop i from 0 to 5'
                    ],
                    correct: 0
                },
                {
                    question: 'Что выведет range(2, 6)?',
                    answers: ['[2, 3, 4, 5]', '[2, 3, 4, 5, 6]', '[1, 2, 3, 4]', '[3, 4, 5, 6]'],
                    correct: 0
                },
                {
                    question: 'Как задать шаг в range()?',
                    answers: [
                        'range(1, 10, 2) — шаг 2',
                        'range(1, 10, step=2)',
                        'range(1, 10, 2) — второй параметр это шаг',
                        'range(1, 10) — шаг всегда 1'
                    ],
                    correct: 0
                },
                {
                    question: 'Что выведет код: for i in range(1, 4): print(i)',
                    answers: ['1 2 3', '1 2 3 4', '0 1 2 3', '0 1 2'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 9: Циклы while, break, continue
        // ============================================================
        {
            id: 'python_9',
            title: 'Циклы while, break, continue',
            lecture: `
                <p>🔄 <b>Цикл while</b> — выполняется, пока условие истинно.</p>

                <p>📌 <b>Синтаксис:</b><br>
                <code>
                while условие:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;# код выполняется, пока условие True
                </code></p>

                <p>📌 <b>Пример:</b><br>
                <code>
                i = 0<br>
                while i < 5:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print(i)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;i += 1
                </code></p>

                <p>📌 <b>break — прерывает цикл досрочно</b><br>
                <code>
                while True:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;answer = input("Введи 'выход': ")<br>
                &nbsp;&nbsp;&nbsp;&nbsp;if answer == "выход":<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break
                </code></p>

                <p>📌 <b>continue — переходит к следующей итерации</b><br>
                <code>
                for i in range(5):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;if i == 2:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;continue<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print(i)  # пропустит 2
                </code></p>
            `,
            questions: [
                {
                    question: 'Что делает break в цикле?',
                    answers: [
                        'Прерывает выполнение цикла',
                        'Пропускает итерацию',
                        'Запускает цикл заново',
                        'Выводит ошибку'
                    ],
                    correct: 0
                },
                {
                    question: 'Что делает continue в цикле?',
                    answers: [
                        'Прерывает выполнение цикла',
                        'Пропускает текущую итерацию',
                        'Запускает цикл заново',
                        'Выводит ошибку'
                    ],
                    correct: 1
                },
                {
                    question: 'Что выведет код: i=0; while i<3: i+=1; print(i)',
                    answers: ['1 2 3', '0 1 2', '1 2', '0 1 2 3'],
                    correct: 0
                },
                {
                    question: 'Как создать бесконечный цикл?',
                    answers: ['while True:', 'while 1:', 'while 0:', 'while False:'],
                    correct: 0
                },
                {
                    question: 'Что произойдёт в цикле с continue?',
                    answers: [
                        'Код после continue не выполнится в этой итерации',
                        'Код после continue выполнится',
                        'Цикл прервётся',
                        'Будет ошибка'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 10: Списки (list)
        // ============================================================
        {
            id: 'python_10',
            title: 'Списки (list) — методы и операции',
            lecture: `
                <p>📋 <b>Список (list)</b> — упорядоченная коллекция элементов.</p>

                <p>📌 <b>Создание списка:</b><br>
                <code>
                numbers = [1, 2, 3, 4, 5]<br>
                fruits = ["apple", "banana", "cherry"]<br>
                mixed = [1, "hello", 3.14, True]
                </code></p>

                <p>📌 <b>Доступ к элементам:</b><br>
                <code>
                fruits[0]     # "apple" (первый)<br>
                fruits[-1]    # "cherry" (последний)
                </code></p>

                <p>📌 <b>Основные методы списков:</b><br>
                <code>
                fruits.append("orange")   # добавить в конец<br>
                fruits.insert(1, "grape") # вставить по индексу<br>
                fruits.remove("banana")   # удалить по значению<br>
                fruits.pop()              # удалить последний<br>
                fruits.sort()             # сортировка<br>
                len(fruits)               # длина
                </code></p>

                <p>📌 <b>Срезы (slicing):</b><br>
                <code>
                numbers[1:4]    # [2, 3, 4]<br>
                numbers[:3]     # [1, 2, 3]<br>
                numbers[2:]     # [3, 4, 5]
                </code></p>
            `,
            questions: [
                {
                    question: 'Как получить первый элемент списка?',
                    answers: ['list[0]', 'list[1]', 'list.first()', 'list.get(0)'],
                    correct: 0
                },
                {
                    question: 'Как добавить элемент в конец списка?',
                    answers: ['append()', 'add()', 'insert()', 'push()'],
                    correct: 0
                },
                {
                    question: 'Что вернёт len([1, 2, 3])?',
                    answers: ['3', '4', '2', '1'],
                    correct: 0
                },
                {
                    question: 'Как удалить последний элемент списка?',
                    answers: ['pop()', 'remove()', 'delete()', 'clear()'],
                    correct: 0
                },
                {
                    question: 'Что выведет numbers[1:3] для [10, 20, 30, 40]?',
                    answers: ['[20, 30]', '[10, 20]', '[30, 40]', '[20, 30, 40]'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 11: Кортежи и множества
        // ============================================================
        {
            id: 'python_11',
            title: 'Кортежи (tuple) и множества (set)',
            lecture: `
                <p>📦 <b>Кортеж (tuple)</b> — неизменяемая упорядоченная коллекция.</p>

                <p>📌 <b>Создание кортежа:</b><br>
                <code>
                coordinates = (10, 20)<br>
                colors = ("red", "green", "blue")<br>
                single = (5,)  # запятая обязательна!
                </code></p>

                <p>📌 <b>Особенности кортежей:</b><br>
                • Неизменяемы (нельзя изменить элемент)<br>
                • Быстрее списков<br>
                • Используются для координат, констант</p>

                <p>📦 <b>Множество (set)</b> — неупорядоченная коллекция уникальных элементов.</p>

                <p>📌 <b>Создание множества:</b><br>
                <code>
                unique = {1, 2, 3, 3, 4}  # {1, 2, 3, 4}<br>
                numbers = set([1, 2, 2, 3])  # {1, 2, 3}
                </code></p>

                <p>📌 <b>Операции с множествами:</b><br>
                <code>
                set1.add(5)          # добавить элемент<br>
                set1.remove(3)       # удалить элемент<br>
                set1.union(set2)     # объединение<br>
                set1.intersection(set2) # пересечение
                </code></p>
            `,
            questions: [
                {
                    question: 'Чем кортеж отличается от списка?',
                    answers: [
                        'Кортеж неизменяемый',
                        'Кортеж изменяемый',
                        'Кортеж быстрее удаляет элементы',
                        'Кортеж медленнее списка'
                    ],
                    correct: 0
                },
                {
                    question: 'Как создать кортеж с одним элементом?',
                    answers: ['(5,)', '(5)', '[5]', '{5}'],
                    correct: 0
                },
                {
                    question: 'Что будет в множестве {1, 2, 2, 3}?',
                    answers: ['{1, 2, 3}', '{1, 2, 2, 3}', '{1, 2}', 'Ошибку'],
                    correct: 0
                },
                {
                    question: 'Какая операция возвращает пересечение множеств?',
                    answers: ['intersection()', 'union()', 'difference()', 'add()'],
                    correct: 0
                },
                {
                    question: 'Можно ли изменить элемент в кортеже?',
                    answers: ['Нет', 'Да', 'Только если он один', 'Только если он число'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 12: Словари (dict)
        // ============================================================
        {
            id: 'python_12',
            title: 'Словари (dict) — хранение данных по ключу',
            lecture: `
                <p>🗂️ <b>Словарь (dict)</b> — коллекция пар "ключ-значение".</p>

                <p>📌 <b>Создание словаря:</b><br>
                <code>
                user = {<br>
                &nbsp;&nbsp;&nbsp;&nbsp;"name": "Alice",<br>
                &nbsp;&nbsp;&nbsp;&nbsp;"age": 25,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;"city": "Moscow"<br>
                }
                </code></p>

                <p>📌 <b>Доступ к значениям:</b><br>
                <code>
                user["name"]   # "Alice"<br>
                user.get("age") # 25<br>
                user.get("email", "Не указан") # если нет ключа
                </code></p>

                <p>📌 <b>Основные методы:</b><br>
                <code>
                user["email"] = "alice@mail.com"  # добавить/изменить<br>
                user.keys()    # все ключи<br>
                user.values()  # все значения<br>
                user.items()   # пары (ключ, значение)
                </code></p>

                <p>📌 <b>Итерация по словарю:</b><br>
                <code>
                for key, value in user.items():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print(f"{key}: {value}")
                </code></p>
            `,
            questions: [
                {
                    question: 'Как получить значение по ключу в словаре?',
                    answers: ['dict[key]', 'dict.value(key)', 'dict.get_key(key)', 'dict.find(key)'],
                    correct: 0
                },
                {
                    question: 'Что вернёт dict.get("key", "default") если ключа нет?',
                    answers: ['"default"', 'None', 'Ошибку', 'Пустую строку'],
                    correct: 0
                },
                {
                    question: 'Как добавить новую пару в словарь?',
                    answers: ['dict["key"] = value', 'dict.add("key", value)', 'dict.insert("key", value)', 'dict.push("key", value)'],
                    correct: 0
                },
                {
                    question: 'Что вернёт dict.keys()?',
                    answers: ['Список ключей', 'Список значений', 'Список пар', 'Словарь'],
                    correct: 0
                },
                {
                    question: 'Как проверить, есть ли ключ в словаре?',
                    answers: ['"key" in dict', 'dict.has_key("key")', 'dict.contains("key")', 'dict.exists("key")'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 13: Строки — методы, срезы, форматирование
        // ============================================================
        {
            id: 'python_13',
            title: 'Строки — методы, срезы, форматирование',
            lecture: `
                <p>📝 <b>Строки</b> — неизменяемые последовательности символов.</p>

                <p>📌 <b>Основные методы строк:</b><br>
                <code>
                text = "Hello World"<br>
                text.upper()     # "HELLO WORLD"<br>
                text.lower()     # "hello world"<br>
                text.replace("World", "Python")<br>
                text.split()     # ["Hello", "World"]<br>
                text.strip()     # убирает пробелы по краям<br>
                " ".join(["a", "b"])  # "a b"
                </code></p>

                <p>📌 <b>Срезы строк:</b><br>
                <code>
                text[0]      # "H"<br>
                text[0:5]    # "Hello"<br>
                text[-5:]    # "World"<br>
                text[::-1]   # "dlroW olleH" (разворот)
                </code></p>

                <p>📌 <b>Проверка содержимого:</b><br>
                <code>
                text.startswith("Hello")  # True<br>
                text.endswith("World")    # True<br>
                "llo" in text             # True
                </code></p>
            `,
            questions: [
                {
                    question: 'Что вернёт "hello".upper()?',
                    answers: ['"HELLO"', '"hello"', '"Hello"', '"hEllO"'],
                    correct: 0
                },
                {
                    question: 'Как разбить строку по пробелам?',
                    answers: ['split()', 'break()', 'separate()', 'divide()'],
                    correct: 0
                },
                {
                    question: 'Что выведет "hello world"[0:5]?',
                    answers: ['"hello"', '"ello"', '"hell"', '"world"'],
                    correct: 0
                },
                {
                    question: 'Как проверить, начинается ли строка с "Hello"?',
                    answers: ['startswith("Hello")', 'beginswith("Hello")', 'starts("Hello")', 'has_prefix("Hello")'],
                    correct: 0
                },
                {
                    question: 'Что выведет "hello"[::-1]?',
                    answers: ['"olleh"', '"hello"', '"h"', '"elloh"'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 14: Функции def, return, параметры
        // ============================================================
        {
            id: 'python_14',
            title: 'Функции: def, return, параметры',
            lecture: `
                <p>📦 <b>Функция</b> — блок кода, который можно вызывать многократно.</p>

                <p>📌 <b>Синтаксис:</b><br>
                <code>
                def имя_функции(параметры):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;# код<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return результат
                </code></p>

                <p>📌 <b>Пример:</b><br>
                <code>
                def greet(name):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return f"Привет, {name}!"<br>
                <br>
                def add(a, b):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return a + b
                </code></p>

                <p>📌 <b>Вызов функции:</b><br>
                <code>
                print(greet("Alice"))   # Привет, Alice!<br>
                result = add(5, 3)      # 8
                </code></p>

                <p>📌 <b>Параметры по умолчанию:</b><br>
                <code>
                def greet(name, greeting="Привет"):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return f"{greeting}, {name}!"<br>
                greet("Alice")          # Привет, Alice!<br>
                greet("Alice", "Здравствуй") # Здравствуй, Alice!
                </code></p>
            `,
            questions: [
                {
                    question: 'Какое ключевое слово используется для создания функции?',
                    answers: ['def', 'function', 'func', 'define'],
                    correct: 0
                },
                {
                    question: 'Что делает return в функции?',
                    answers: [
                        'Возвращает значение из функции',
                        'Выводит значение на экран',
                        'Прерывает программу',
                        'Создаёт переменную'
                    ],
                    correct: 0
                },
                {
                    question: 'Как вызвать функцию с параметром?',
                    answers: ['имя_функции(аргумент)', 'call имя_функции(аргумент)', 'имя_функции аргумент', 'run имя_функции(аргумент)'],
                    correct: 0
                },
                {
                    question: 'Что выведет print(add(2, 3)) при def add(a, b): return a + b?',
                    answers: ['5', '23', 'Ошибку', 'None'],
                    correct: 0
                },
                {
                    question: 'Как задать параметр по умолчанию?',
                    answers: ['def func(a=5):', 'def func(a default=5):', 'def func(a = 5)', 'def func(a: 5)'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 15: Области видимости переменных
        // ============================================================
        {
            id: 'python_15',
            title: 'Области видимости переменных',
            lecture: `
                <p>🎯 <b>Область видимости</b> — где доступна переменная.</p>

                <p>📌 <b>Глобальные переменные:</b><br>
                <code>
                x = 10  # глобальная<br>
                def func():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print(x)  # можно прочитать
                </code></p>

                <p>📌 <b>Локальные переменные:</b><br>
                <code>
                def func():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;y = 5  # локальная<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print(y)<br>
                print(y)  # ошибка — y не существует
                </code></p>

                <p>📌 <b>Изменение глобальной переменной:</b><br>
                <code>
                x = 10<br>
                def change():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;global x<br>
                &nbsp;&nbsp;&nbsp;&nbsp;x = 20<br>
                change()<br>
                print(x)  # 20
                </code></p>

                <p>📌 <b>nonlocal — для вложенных функций:</b><br>
                <code>
                def outer():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;x = 10<br>
                &nbsp;&nbsp;&nbsp;&nbsp;def inner():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nonlocal x<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x = 20<br>
                &nbsp;&nbsp;&nbsp;&nbsp;inner()<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print(x)  # 20
                </code></p>
            `,
            questions: [
                {
                    question: 'Где доступна глобальная переменная?',
                    answers: ['Везде в программе', 'Только внутри одной функции', 'Только в цикле', 'Только в условии'],
                    correct: 0
                },
                {
                    question: 'Как изменить глобальную переменную внутри функции?',
                    answers: ['global', 'nonlocal', 'local', 'change'],
                    correct: 0
                },
                {
                    question: 'Что произойдёт при попытке вывести локальную переменную вне функции?',
                    answers: ['Ошибка NameError', 'Выведется None', 'Выведется 0', 'Всё сработает'],
                    correct: 0
                },
                {
                    question: 'Для чего используется nonlocal?',
                    answers: [
                        'Для изменения переменной из внешней функции',
                        'Для изменения глобальной переменной',
                        'Для создания новой переменной',
                        'Для удаления переменной'
                    ],
                    correct: 0
                },
                {
                    question: 'Какая переменная доступна только внутри функции?',
                    answers: ['Локальная', 'Глобальная', 'Встроенная', 'Стандартная'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 16: *args, **kwargs
        // ============================================================
        {
            id: 'python_16',
            title: '*args, **kwargs — функции с переменным числом аргументов',
            lecture: `
                <p>📦 <b>*args</b> — кортеж всех переданных позиционных аргументов.</p>

                <p>📌 <b>Пример:</b><br>
                <code>
                def sum_all(*args):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return sum(args)<br>
                sum_all(1, 2, 3)   # 6<br>
                sum_all(1, 2)      # 3
                </code></p>

                <p>📦 <b>**kwargs</b> — словарь всех переданных именованных аргументов.</p>

                <p>📌 <b>Пример:</b><br>
                <code>
                def print_info(**kwargs):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;for key, value in kwargs.items():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(f"{key}: {value}")<br>
                print_info(name="Alice", age=25)  # name: Alice, age: 25
                </code></p>

                <p>📌 <b>Комбинированное использование:</b><br>
                <code>
                def func(a, b, *args, **kwargs):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print(a, b)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print(args)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print(kwargs)<br>
                func(1, 2, 3, 4, x=5, y=6)
                </code></p>
            `,
            questions: [
                {
                    question: 'Что такое *args в Python?',
                    answers: [
                        'Кортеж с позиционными аргументами',
                        'Словарь с именованными аргументами',
                        'Список аргументов',
                        'Множество аргументов'
                    ],
                    correct: 0
                },
                {
                    question: 'Что такое **kwargs в Python?',
                    answers: [
                        'Словарь с именованными аргументами',
                        'Кортеж с позиционными аргументами',
                        'Список аргументов',
                        'Множество аргументов'
                    ],
                    correct: 0
                },
                {
                    question: 'Что выведет sum_all(1, 2, 3) при def sum_all(*args): return sum(args)?',
                    answers: ['6', '123', '3', 'Ошибку'],
                    correct: 0
                },
                {
                    question: 'Как передать именованные аргументы в функцию?',
                    answers: ['func(name="Alice")', 'func("Alice")', 'func(name="Alice")', 'func(name: "Alice")'],
                    correct: 0
                },
                {
                    question: 'В каком порядке должны идти параметры в функции?',
                    answers: ['a, b, *args, **kwargs', '*args, **kwargs, a, b', '**kwargs, *args, a, b', 'a, b, **kwargs, *args'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 17: Импорт модулей
        // ============================================================
        {
            id: 'python_17',
            title: 'Импорт модулей: import, from ... import',
            lecture: `
                <p>📦 <b>Модуль</b> — файл с кодом, который можно импортировать.</p>

                <p>📌 <b>Способы импорта:</b><br>
                <code>
                import math  # импорт всего модуля<br>
                import math as m  # с псевдонимом<br>
                from math import sqrt  # импорт конкретной функции<br>
                from math import *  # импорт всего (не рекомендуется)
                </code></p>

                <p>📌 <b>Примеры:</b><br>
                <code>
                import math<br>
                math.sqrt(16)  # 4.0<br>
                math.pi        # 3.14159
                </code></p>

                <p>📌 <b>from ... import:</b><br>
                <code>
                from math import sqrt, pi<br>
                sqrt(25)  # 5.0<br>
                pi        # 3.14159
                </code></p>

                <p>📌 <b>Импорт своих модулей:</b><br>
                <code>
                import my_module<br>
                from my_module import my_function
                </code></p>
            `,
            questions: [
                {
                    question: 'Как импортировать весь модуль math?',
                    answers: ['import math', 'from math import *', 'include math', 'require math'],
                    correct: 0
                },
                {
                    question: 'Как импортировать только функцию sqrt из модуля math?',
                    answers: ['from math import sqrt', 'import sqrt from math', 'math.import sqrt', 'include sqrt from math'],
                    correct: 0
                },
                {
                    question: 'Что делает as в import math as m?',
                    answers: [
                        'Создаёт псевдоним для модуля',
                        'Импортирует модуль',
                        'Создаёт копию модуля',
                        'Удаляет модуль'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой способ импорта считается нежелательным?',
                    answers: ["from math import *", "import math", "from math import sqrt", "import math as m"],
                    correct: 0
                },
                {
                    question: 'Что выведет math.sqrt(9) после import math?',
                    answers: ['3.0', '9', '3', 'Ошибку'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 18: Работа с файлами
        // ============================================================
        {
            id: 'python_18',
            title: 'Работа с файлами: open(), read(), write(), with',
            lecture: `
                <p>📁 <b>Работа с файлами</b> — чтение и запись данных в файлы.</p>

                <p>📌 <b>Открытие файла:</b><br>
                <code>
                file = open("file.txt", "r")  # чтение<br>
                file = open("file.txt", "w")  # запись<br>
                file = open("file.txt", "a")  # добавление в конец
                </code></p>

                <p>📌 <b>Чтение файла:</b><br>
                <code>
                file = open("file.txt", "r")<br>
                content = file.read()      # всё содержимое<br>
                line = file.readline()     # одна строка<br>
                lines = file.readlines()   # список строк<br>
                file.close()  # обязательно!
                </code></p>

                <p>📌 <b>Запись в файл:</b><br>
                <code>
                file = open("file.txt", "w")<br>
                file.write("Hello World!\\n")<br>
                file.writelines(["line1\\n", "line2\\n"])<br>
                file.close()
                </code></p>

                <p>📌 <b>with — автоматическое закрытие файла:</b><br>
                <code>
                with open("file.txt", "r") as file:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;content = file.read()<br>
                # файл автоматически закроется
                </code></p>
            `,
            questions: [
                {
                    question: 'Какой режим открытия файла используется для чтения?',
                    answers: ['"r"', '"w"', '"a"', '"rw"'],
                    correct: 0
                },
                {
                    question: 'Какой режим открытия файла удаляет старое содержимое?',
                    answers: ['"w"', '"r"', '"a"', '"rw"'],
                    correct: 0
                },
                {
                    question: 'Что делает with при работе с файлом?',
                    answers: [
                        'Автоматически закрывает файл после блока кода',
                        'Открывает файл для записи',
                        'Читает файл',
                        'Удаляет файл'
                    ],
                    correct: 0
                },
                {
                    question: 'Как прочитать все строки файла в список?',
                    answers: ['readlines()', 'read()', 'readline()', 'readall()'],
                    correct: 0
                },
                {
                    question: 'Что произойдёт, если не закрыть файл?',
                    answers: [
                        'Может возникнуть утечка памяти',
                        'Ничего не произойдёт',
                        'Файл удалится',
                        'Будет ошибка'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 19: Обработка ошибок try, except, finally
        // ============================================================
        {
            id: 'python_19',
            title: 'Обработка ошибок: try, except, finally',
            lecture: `
                <p>🛡️ <b>Обработка ошибок</b> — позволяет программе не падать при ошибках.</p>

                <p>📌 <b>Синтаксис:</b><br>
                <code>
                try:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;# код, который может вызвать ошибку<br>
                except Тип_ошибки:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;# код, если ошибка произошла<br>
                else:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;# код, если ошибки не было<br>
                finally:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;# код, выполняется всегда
                </code></p>

                <p>📌 <b>Пример:</b><br>
                <code>
                try:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;num = int(input("Введите число: "))<br>
                &nbsp;&nbsp;&nbsp;&nbsp;result = 10 / num<br>
                except ValueError:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print("Ошибка: введите число!")<br>
                except ZeroDivisionError:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print("Ошибка: деление на ноль!")<br>
                else:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print("Результат:", result)<br>
                finally:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print("Конец программы")
                </code></p>

                <p>📌 <b>Популярные ошибки:</b><br>
                • ValueError — неверное значение<br>
                • ZeroDivisionError — деление на ноль<br>
                • FileNotFoundError — файл не найден<br>
                • TypeError — неверный тип<br>
                • KeyError — ключ не найден</p>
            `,
            questions: [
                {
                    question: 'Для чего используется try-except?',
                    answers: [
                        'Для обработки ошибок без падения программы',
                        'Для ускорения работы программы',
                        'Для создания новых ошибок',
                        'Для логирования'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой блок выполняется всегда, независимо от ошибки?',
                    answers: ['finally', 'else', 'except', 'try'],
                    correct: 0
                },
                {
                    question: 'Какая ошибка возникает при делении на ноль?',
                    answers: ['ZeroDivisionError', 'ValueError', 'TypeError', 'KeyError'],
                    correct: 0
                },
                {
                    question: 'Что делает блок else в try-except?',
                    answers: [
                        'Выполняется, если ошибки не было',
                        'Выполняется при ошибке',
                        'Выполняется всегда',
                        'Не используется в Python'
                    ],
                    correct: 0
                },
                {
                    question: 'Какая ошибка возникает при преобразовании "abc" в int?',
                    answers: ['ValueError', 'ZeroDivisionError', 'TypeError', 'KeyError'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 20: Библиотеки Python
        // ============================================================
        {
            id: 'python_20',
            title: 'Библиотеки Python: pip, стандартные и сторонние',
            lecture: `
                <p>📦 <b>Библиотека (модуль)</b> — это набор готового кода для решения задач.</p>

                <p>📌 <b>Стандартные библиотеки (встроены в Python):</b><br>
                • <b>math</b> — математические функции<br>
                • <b>random</b> — генерация случайных чисел<br>
                • <b>datetime</b> — работа с датами и временем<br>
                • <b>json</b> — работа с JSON-данными<br>
                • <b>os</b> — работа с операционной системой<br>
                • <b>sys</b> — системные параметры</p>

                <p>📌 <b>Установка сторонних библиотек через pip:</b><br>
                <code>pip install название_библиотеки</code></p>

                <p>📌 <b>Популярные сторонние библиотеки:</b><br>
                • <b>requests</b> — отправка HTTP-запросов (API)<br>
                • <b>pandas</b> — работа с данными (Excel, CSV)<br>
                • <b>numpy</b> — математические вычисления<br>
                • <b>pytest</b> — написание тестов<br>
                • <b>selenium</b> — автоматизация браузера</p>

                <p>📌 <b>Как импортировать библиотеку:</b><br>
                <code>
                import math<br>
                from random import randint<br>
                import pandas as pd  # с псевдонимом
                </code></p>

                <p>📌 <b>Для автоматизации тестирования нужны:</b><br>
                • requests — тестирование API<br>
                • pytest — написание и запуск тестов<br>
                • selenium — тестирование UI</p>
            `,
            questions: [
                {
                    question: 'Что такое библиотека в Python?',
                    answers: [
                        'Набор готового кода для решения задач',
                        'Способ хранения данных',
                        'Тип переменной',
                        'Встроенная функция'
                    ],
                    correct: 0
                },
                {
                    question: 'Какая библиотека используется для работы с JSON?',
                    answers: ['json', 'os', 'math', 'random'],
                    correct: 0
                },
                {
                    question: 'Как установить стороннюю библиотеку через pip?',
                    answers: ['pip install название', 'pip get название', 'python install название', 'pip add название'],
                    correct: 0
                },
                {
                    question: 'Для чего нужна библиотека requests?',
                    answers: [
                        'Для отправки HTTP-запросов',
                        'Для работы с Excel',
                        'Для генерации случайных чисел',
                        'Для автоматизации браузера'
                    ],
                    correct: 0
                },
                {
                    question: 'Какая библиотека используется для написания тестов?',
                    answers: ['pytest', 'requests', 'selenium', 'numpy'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 21: Итоги модуля (без вопросов)
        // ============================================================
        {
            id: 'python_21',
            title: '🎓 Итоги модуля',
            lecture: `
                <p>🎉 <b>Поздравляем с завершением модуля «Python основы»!</b></p>

                <p>Ты прошёл 20 уроков и освоил основы Python — одного из самых востребованных языков программирования.</p>

                <p>📊 <b>Что ты теперь знаешь и умеешь:</b><br>
                • Писать простые программы на Python<br>
                • Использовать переменные, циклы и условия<br>
                • Работать со списками, словарями и строками<br>
                • Писать функции и использовать модули<br>
                • Работать с файлами и обрабатывать ошибки<br>
                • Устанавливать и использовать сторонние библиотеки</p>

                <p>🔗 <b>Связь с QA-модулем:</b><br>
                Ты уже знаешь теорию тестирования. Теперь у тебя есть инструмент — Python — чтобы автоматизировать тесты!</p>

                <p>🚀 <b>Что дальше?</b><br>
                Теперь тебе открывается модуль «Автотесты основы», где ты научишься применять Python для автоматизации тестирования.</p>

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