// ============================================================
// МОДУЛЬ 5: АВТОТЕСТЫ ОСНОВЫ
// ============================================================

export const module = {
    id: 'auto_tests',
    title: 'Автотесты основы',
    icon: '🤖',
    game: 'auto_tester', // игра будет добавлена позже
    totalLessons: 11,
    lessons: [
        // ============================================================
        // УРОК 1: Что такое автоматизация тестирования?
        // ============================================================
        {
            id: 'auto_1',
            title: 'Что такое автоматизация тестирования?',
            lecture: `
                <p>🤖 <b>Автоматизация тестирования</b> — это использование программных инструментов для выполнения тестов без участия человека.</p>

                <p>📌 <b>Зачем нужна автоматизация?</b><br>
                • Быстрое выполнение тестов (секунды вместо часов)<br>
                • Возможность частого запуска (каждый коммит)<br>
                • Уменьшение человеческих ошибок<br>
                • Повторяемость (одни и те же шаги каждый раз)<br>
                • Экономия времени на регрессионном тестировании</p>

                <p>📌 <b>Когда автоматизация НЕ нужна:</b><br>
                • Если тест запускается 1 раз<br>
                • Если тест быстро выполняется вручную<br>
                • Если интерфейс часто меняется</p>

                <p>📌 <b>Пирамида автоматизации:</b><br>
                • <b>Модульные тесты (Unit)</b> — много, быстрые, дёшевые<br>
                • <b>Интеграционные тесты</b> — среднее количество<br>
                • <b>UI-тесты (E2E)</b> — мало, медленные, дорогие</p>

                <p>📌 <b>Что автоматизируют в первую очередь:</b><br>
                • Регрессионные тесты<br>
                • Smoke-тесты<br>
                • API-тесты<br>
                • Повторяющиеся сценарии</p>
            `,
            questions: [
                {
                    question: 'Что такое автоматизация тестирования?',
                    answers: [
                        'Выполнение тестов с помощью программ без участия человека',
                        'Ручное выполнение тестов',
                        'Написание баг-репортов',
                        'Создание тест-планов'
                    ],
                    correct: 0
                },
                {
                    question: 'Какое преимущество НЕ относится к автоматизации?',
                    answers: [
                        'Быстрое выполнение тестов',
                        'Уменьшение человеческих ошибок',
                        'Замена ручного тестирования полностью',
                        'Повторяемость'
                    ],
                    correct: 2
                },
                {
                    question: 'Когда автоматизация НЕ нужна?',
                    answers: [
                        'Если тест выполняется 1 раз',
                        'Если тест запускается часто',
                        'Если тест регрессионный',
                        'Если тест занимает много времени'
                    ],
                    correct: 0
                },
                {
                    question: 'Какие тесты автоматизируют в первую очередь?',
                    answers: [
                        'Регрессионные тесты',
                        'Исследовательские тесты',
                        'Тесты юзабилити',
                        'Тесты на интуицию'
                    ],
                    correct: 0
                },
                {
                    question: 'Что находится на вершине пирамиды автоматизации?',
                    answers: ['UI-тесты (E2E)', 'Модульные тесты', 'Интеграционные тесты', 'API-тесты'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 2: unittest — встроенный фреймворк
        // ============================================================
        {
            id: 'auto_2',
            title: 'unittest — встроенный фреймворк для тестов',
            lecture: `
                <p>🧪 <b>unittest</b> — встроенный в Python фреймворк для написания тестов.</p>

                <p>📌 <b>Структура теста:</b><br>
                <code>
                import unittest<br>
                <br>
                class TestCalculator(unittest.TestCase):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;def test_add(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.assertEqual(2 + 2, 4)<br>
                <br>
                &nbsp;&nbsp;&nbsp;&nbsp;def test_subtract(self):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.assertEqual(5 - 3, 2)<br>
                <br>
                if __name__ == "__main__":<br>
                &nbsp;&nbsp;&nbsp;&nbsp;unittest.main()
                </code></p>

                <p>📌 <b>Основные assert-методы:</b><br>
                • <code>assertEqual(a, b)</code> — a == b<br>
                • <code>assertNotEqual(a, b)</code> — a != b<br>
                • <code>assertTrue(x)</code> — x is True<br>
                • <code>assertFalse(x)</code> — x is False<br>
                • <code>assertIsNone(x)</code> — x is None<br>
                • <code>assertIn(a, b)</code> — a in b</p>

                <p>📌 <b>Запуск тестов:</b><br>
                <code>python -m unittest test_file.py</code><br>
                <code>python -m unittest discover</code> — найти все тесты</p>
            `,
            questions: [
                {
                    question: 'Какой фреймворк для тестов встроен в Python?',
                    answers: ['unittest', 'pytest', 'nose', 'doctest'],
                    correct: 0
                },
                {
                    question: 'Какой метод проверяет равенство в unittest?',
                    answers: ['assertEqual()', 'assertEquals()', 'assert_eq()', 'check_equal()'],
                    correct: 0
                },
                {
                    question: 'Как запустить unittest из командной строки?',
                    answers: [
                        'python -m unittest test_file.py',
                        'python test_file.py',
                        'unittest test_file.py',
                        'python run test_file.py'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой assert проверяет, что выражение истинно?',
                    answers: ['assertTrue()', 'assertEqual()', 'assertIs()', 'assertIn()'],
                    correct: 0
                },
                {
                    question: 'Что делает assertIn(a, b)?',
                    answers: [
                        'Проверяет, что a входит в b',
                        'Проверяет, что a равно b',
                        'Проверяет, что a истинно',
                        'Проверяет, что a None'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 3: pytest — установка и первый тест
        // ============================================================
        {
            id: 'auto_3',
            title: 'pytest — установка и первый тест',
            lecture: `
                <p>🚀 <b>pytest</b> — самый популярный фреймворк для тестов в Python.</p>

                <p>📌 <b>Установка:</b><br>
                <code>pip install pytest</code></p>

                <p>📌 <b>Первый тест:</b><br>
                <code>
                # test_calculator.py<br>
                def add(a, b):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return a + b<br>
                <br>
                def test_add():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;assert add(2, 2) == 4<br>
                &nbsp;&nbsp;&nbsp;&nbsp;assert add(-1, 1) == 0<br>
                &nbsp;&nbsp;&nbsp;&nbsp;assert add(0, 0) == 0
                </code></p>

                <p>📌 <b>Запуск:</b><br>
                <code>pytest test_calculator.py</code></p>

                <p>📌 <b>Преимущества pytest перед unittest:</b><br>
                • Проще синтаксис (assert, а не методы)<br>
                • Автоматический поиск тестов (файлы test_*.py)<br>
                • Подробные отчёты об ошибках<br>
                • Мощные фикстуры и плагины</p>

                <p>📌 <b>Как pytest находит тесты:</b><br>
                • Ищет файлы test_*.py или *_test.py<br>
                • Ищет функции с префиксом test_<br>
                • Ищет классы с префиксом Test</p>
            `,
            questions: [
                {
                    question: 'Как установить pytest?',
                    answers: ['pip install pytest', 'pip get pytest', 'install pytest', 'python install pytest'],
                    correct: 0
                },
                {
                    question: 'Какой синтаксис используется для проверки в pytest?',
                    answers: ['assert', 'assertEqual()', 'check()', 'verify()'],
                    correct: 0
                },
                {
                    question: 'Как pytest находит тестовые файлы?',
                    answers: [
                        'Файлы test_*.py или *_test.py',
                        'Все файлы .py',
                        'Только файлы с тестом в имени',
                        'Файлы в папке tests'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой фреймворк проще в использовании?',
                    answers: ['pytest', 'unittest', 'Оба одинаковы', 'Ни один'],
                    correct: 0
                },
                {
                    question: 'Как запустить pytest?',
                    answers: ['pytest test_file.py', 'python test_file.py', 'unittest test_file.py', 'pytest run test_file.py'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 4: Фикстуры в pytest (fixtures)
        // ============================================================
        {
            id: 'auto_4',
            title: 'Фикстуры в pytest (fixtures)',
            lecture: `
                <p>🔧 <b>Фикстуры</b> — это подготовка данных или окружения для тестов.</p>

                <p>📌 <b>Создание фикстуры:</b><br>
                <code>
                import pytest<br>
                <br>
                @pytest.fixture<br>
                def test_data():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return {"name": "Alice", "age": 25}<br>
                <br>
                def test_user(test_data):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;assert test_data["name"] == "Alice"<br>
                &nbsp;&nbsp;&nbsp;&nbsp;assert test_data["age"] == 25
                </code></p>

                <p>📌 <b>Фикстуры для подключения к БД:</b><br>
                <code>
                @pytest.fixture<br>
                def db_connection():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;conn = create_connection()<br>
                &nbsp;&nbsp;&nbsp;&nbsp;yield conn  # передаём в тест<br>
                &nbsp;&nbsp;&nbsp;&nbsp;conn.close()  # после теста
                </code></p>

                <p>📌 <b>Scope фикстур:</b><br>
                • <b>function</b> — создаётся для каждого теста (по умолчанию)<br>
                • <b>class</b> — создаётся для каждого класса<br>
                • <b>module</b> — создаётся для каждого модуля<br>
                • <b>session</b> — создаётся один раз за сессию</p>

                <p>📌 <b>Пример с scope:</b><br>
                <code>
                @pytest.fixture(scope="module")<br>
                def shared_data():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;return {"count": 0}
                </code></p>
            `,
            questions: [
                {
                    question: 'Что такое фикстуры в pytest?',
                    answers: [
                        'Подготовка данных или окружения для тестов',
                        'Набор тестовых функций',
                        'Отчёт о тестировании',
                        'Плагин для pytest'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой декоратор используется для создания фикстуры?',
                    answers: ['@pytest.fixture', '@fixture', '@test_fixture', '@setup'],
                    correct: 0
                },
                {
                    question: 'Какой scope у фикстуры по умолчанию?',
                    answers: ['function', 'class', 'module', 'session'],
                    correct: 0
                },
                {
                    question: 'Что делает yield в фикстуре?',
                    answers: [
                        'Передаёт значение в тест и выполняет код после',
                        'Завершает тест',
                        'Создаёт новую фикстуру',
                        'Возвращает ошибку'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой scope фикстуры нужен, чтобы она создавалась один раз для всех тестов в модуле?',
                    answers: ['function', 'class', 'module', 'session'],
                    correct: 2
                }
            ]
        },

        // ============================================================
        // УРОК 5: Параметризация тестов
        // ============================================================
        {
            id: 'auto_5',
            title: 'Параметризация тестов',
            lecture: `
                <p>🔄 <b>Параметризация</b> — запуск одного теста с разными данными.</p>

                <p>📌 <b>Синтаксис:</b><br>
                <code>
                import pytest<br>
                <br>
                @pytest.mark.parametrize("a, b, expected", [<br>
                &nbsp;&nbsp;&nbsp;&nbsp;(2, 2, 4),<br>
                &nbsp;&nbsp;&nbsp;&nbsp;(-1, 1, 0),<br>
                &nbsp;&nbsp;&nbsp;&nbsp;(0, 0, 0),<br>
                &nbsp;&nbsp;&nbsp;&nbsp;(100, 200, 300)<br>
                ])<br>
                def test_add(a, b, expected):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;assert a + b == expected
                </code></p>

                <p>📌 <b>Почему это полезно?</b><br>
                • Один тест проверяет множество вариантов<br>
                • Легко добавлять новые кейсы<br>
                • Каждый кейс запускается как отдельный тест</p>

                <p>📌 <b>Пример с несколькими параметрами:</b><br>
                <code>
                @pytest.mark.parametrize("text, expected", [<br>
                &nbsp;&nbsp;&nbsp;&nbsp;("hello", "HELLO"),<br>
                &nbsp;&nbsp;&nbsp;&nbsp;("Python", "PYTHON"),<br>
                &nbsp;&nbsp;&nbsp;&nbsp;("", ""),<br>
                ])<br>
                def test_upper(text, expected):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;assert text.upper() == expected
                </code></p>

                <p>📌 <b>Комбинирование параметров:</b><br>
                <code>
                @pytest.mark.parametrize("a", [1, 2, 3])<br>
                @pytest.mark.parametrize("b", [10, 20])<br>
                def test_combo(a, b):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;print(a, b)  # 3×2 = 6 комбинаций
                </code></p>
            `,
            questions: [
                {
                    question: 'Для чего используется параметризация в pytest?',
                    answers: [
                        'Запуск одного теста с разными наборами данных',
                        'Запуск нескольких тестов одновременно',
                        'Создание новых тестов',
                        'Ускорение выполнения тестов'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой декоратор используется для параметризации?',
                    answers: [
                        '@pytest.mark.parametrize',
                        '@pytest.parametrize',
                        '@parametrize',
                        '@pytest.parameterize'
                    ],
                    correct: 0
                },
                {
                    question: 'Сколько раз выполнится тест, если передать 5 наборов данных?',
                    answers: ['1 раз', '5 раз', '10 раз', '0 раз'],
                    correct: 1
                },
                {
                    question: 'Какие данные можно передавать в параметризацию?',
                    answers: ['Списки', 'Кортежи', 'Словари', 'Всё перечисленное'],
                    correct: 3
                },
                {
                    question: 'Что произойдёт, если один из параметров в параметризации упадёт?',
                    answers: [
                        'Упадут все тесты',
                        'Упадёт только этот тест, остальные выполнятся',
                        'Тест не выполнится вообще',
                        'Будет ошибка компиляции'
                    ],
                    correct: 1
                }
            ]
        },

        // ============================================================
        // УРОК 6: Моки (mock)
        // ============================================================
        {
            id: 'auto_6',
            title: 'Моки (mock) — подмена объектов для тестов',
            lecture: `
                <p>🎭 <b>Моки (mock)</b> — это объекты-заглушки, которые заменяют реальные объекты в тестах.</p>

                <p>📌 <b>Зачем нужны моки?</b><br>
                • Изолировать тестируемый код от внешних зависимостей<br>
                • Тестировать без реальной БД, API, сети<br>
                • Ускорять выполнение тестов<br>
                • Проверять, что функции были вызваны с правильными параметрами</p>

                <p>📌 <b>Пример с mock:</b><br>
                <code>
                from unittest.mock import Mock<br>
                <br>
                # Создаём мок-объект<br>
                mock_api = Mock()<br>
                mock_api.get_user.return_value = {"name": "Alice"}<br>
                <br>
                def test_get_user():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;result = mock_api.get_user(1)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;assert result["name"] == "Alice"<br>
                &nbsp;&nbsp;&nbsp;&nbsp;mock_api.get_user.assert_called_with(1)
                </code></p>

                <p>📌 <b>Mock с pytest:</b><br>
                <code>
                from unittest.mock import patch<br>
                <br>
                @patch("module.api_call")<br>
                def test_function(mock_api):<br>
                &nbsp;&nbsp;&nbsp;&nbsp;mock_api.return_value = "mocked response"<br>
                &nbsp;&nbsp;&nbsp;&nbsp;result = my_function()<br>
                &nbsp;&nbsp;&nbsp;&nbsp;assert result == "mocked response"
                </code></p>

                <p>📌 <b>Что можно проверять с моками:</b><br>
                • Была ли вызвана функция<br>
                • С какими параметрами<br>
                • Сколько раз была вызвана</p>
            `,
            questions: [
                {
                    question: 'Что такое моки (mock) в тестировании?',
                    answers: [
                        'Объекты-заглушки для замены реальных объектов',
                        'Настоящие объекты из продакшена',
                        'Тестовые данные',
                        'Отчёты о тестировании'
                    ],
                    correct: 0
                },
                {
                    question: 'Для чего используются моки?',
                    answers: [
                        'Для изоляции кода от внешних зависимостей',
                        'Для увеличения сложности тестов',
                        'Для замены всех тестов',
                        'Для ускорения разработки'
                    ],
                    correct: 0
                },
                {
                    question: 'Как проверить, что функция была вызвана с определённым параметром?',
                    answers: ['assert_called_with()', 'assert_called()', 'assert_with()', 'check_called()'],
                    correct: 0
                },
                {
                    question: 'Какой модуль используется для моков в Python?',
                    answers: ['unittest.mock', 'pytest.mock', 'mock', 'python.mock'],
                    correct: 0
                },
                {
                    question: 'Что делает patch в pytest?',
                    answers: [
                        'Заменяет объект на мок в указанном модуле',
                        'Создаёт новый объект',
                        'Удаляет объект',
                        'Копирует объект'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 7: Тестирование API с requests + pytest
        // ============================================================
        {
            id: 'auto_7',
            title: 'Тестирование API с requests + pytest',
            lecture: `
                <p>🌐 <b>Тестирование API</b> — проверка HTTP-запросов и ответов.</p>

                <p>📌 <b>Библиотека requests:</b><br>
                <code>pip install requests</code></p>

                <p>📌 <b>Пример теста API:</b><br>
                <code>
                import requests<br>
                <br>
                def test_get_user():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;response = requests.get("https://api.example.com/users/1")<br>
                &nbsp;&nbsp;&nbsp;&nbsp;assert response.status_code == 200<br>
                &nbsp;&nbsp;&nbsp;&nbsp;assert response.json()["name"] == "Alice"
                </code></p>

                <p>📌 <b>Основные HTTP методы:</b><br>
                • GET — получить данные<br>
                • POST — создать данные<br>
                • PUT — обновить данные<br>
                • DELETE — удалить данные</p>

                <p>📌 <b>Пример с POST:</b><br>
                <code>
                def test_create_user():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;data = {"name": "Bob", "email": "bob@mail.com"}<br>
                &nbsp;&nbsp;&nbsp;&nbsp;response = requests.post("https://api.example.com/users", json=data)<br>
                &nbsp;&nbsp;&nbsp;&nbsp;assert response.status_code == 201
                </code></p>

                <p>📌 <b>Что проверяем в API:</b><br>
                • Статус-код (200, 404, 500)<br>
                • Структура ответа (JSON)<br>
                • Типы данных в ответе<br>
                • Время ответа<br>
                • Авторизация</p>
            `,
            questions: [
                {
                    question: 'Какая библиотека используется для HTTP-запросов в Python?',
                    answers: ['requests', 'http', 'urllib', 'httplib'],
                    correct: 0
                },
                {
                    question: 'Какой статус-код означает успешный GET-запрос?',
                    answers: ['200', '404', '500', '201'],
                    correct: 0
                },
                {
                    question: 'Какой метод используется для создания данных в API?',
                    answers: ['POST', 'GET', 'PUT', 'DELETE'],
                    correct: 0
                },
                {
                    question: 'Что проверяют при тестировании API в первую очередь?',
                    answers: ['Статус-код', 'Время ответа', 'Красоту JSON', 'Размер ответа'],
                    correct: 0
                },
                {
                    question: 'Как отправить JSON-данные в POST-запросе?',
                    answers: ['json=data', 'data=data', 'body=data', 'params=data'],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 8: Тестирование UI с selenium
        // ============================================================
        {
            id: 'auto_8',
            title: 'Тестирование UI с selenium',
            lecture: `
                <p>🖥️ <b>Selenium</b> — инструмент для автоматизации браузера.</p>

                <p>📌 <b>Установка:</b><br>
                <code>pip install selenium</code></p>

                <p>📌 <b>Пример теста UI:</b><br>
                <code>
                from selenium import webdriver<br>
                from selenium.webdriver.common.by import By<br>
                <br>
                def test_login():<br>
                &nbsp;&nbsp;&nbsp;&nbsp;driver = webdriver.Chrome()<br>
                &nbsp;&nbsp;&nbsp;&nbsp;driver.get("https://example.com/login")<br>
                <br>
                &nbsp;&nbsp;&nbsp;&nbsp;driver.find_element(By.ID, "username").send_keys("user")<br>
                &nbsp;&nbsp;&nbsp;&nbsp;driver.find_element(By.ID, "password").send_keys("pass")<br>
                &nbsp;&nbsp;&nbsp;&nbsp;driver.find_element(By.ID, "login-btn").click()<br>
                <br>
                &nbsp;&nbsp;&nbsp;&nbsp;assert "Welcome" in driver.page_source<br>
                &nbsp;&nbsp;&nbsp;&nbsp;driver.quit()
                </code></p>

                <p>📌 <b>Поиск элементов:</b><br>
                • <b>By.ID</b> — по id элемента<br>
                • <b>By.CLASS_NAME</b> — по классу<br>
                • <b>By.NAME</b> — по атрибуту name<br>
                • <b>By.TAG_NAME</b> — по тегу<br>
                • <b>By.XPATH</b> — по XPath (гибко, но сложно)</p>

                <p>📌 <b>WebDriverWait — ожидание загрузки:</b><br>
                <code>
                from selenium.webdriver.support.ui import WebDriverWait<br>
                from selenium.webdriver.support import expected_conditions as EC<br>
                <br>
                wait = WebDriverWait(driver, 10)<br>
                wait.until(EC.presence_of_element_located((By.ID, "result")))
                </code></p>
            `,
            questions: [
                {
                    question: 'Для чего используется Selenium?',
                    answers: [
                        'Для автоматизации браузера',
                        'Для тестирования API',
                        'Для работы с БД',
                        'Для парсинга JSON'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой метод используется для поиска элемента по id?',
                    answers: ['By.ID', 'By.CLASS_NAME', 'By.NAME', 'By.TAG_NAME'],
                    correct: 0
                },
                {
                    question: 'Что делает WebDriverWait?',
                    answers: [
                        'Ожидает загрузки элемента на странице',
                        'Ускоряет выполнение теста',
                        'Закрывает браузер',
                        'Нажимает на кнопку'
                    ],
                    correct: 0
                },
                {
                    question: 'Как ввести текст в поле ввода?',
                    answers: ['send_keys()', 'type()', 'send()', 'write()'],
                    correct: 0
                },
                {
                    question: 'Что делает driver.quit()?',
                    answers: [
                        'Закрывает браузер',
                        'Обновляет страницу',
                        'Нажимает на кнопку',
                        'Открывает новую вкладку'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 9: CI/CD — автоматический запуск тестов
        // ============================================================
        {
            id: 'auto_9',
            title: 'CI/CD — автоматический запуск тестов',
            lecture: `
                <p>⚙️ <b>CI/CD (Continuous Integration / Continuous Delivery)</b> — автоматизация сборки, тестирования и развертывания.</p>

                <p>📌 <b>CI (Continuous Integration) — непрерывная интеграция:</b><br>
                • Разработчики часто пушат код (несколько раз в день)<br>
                • При каждом пуше запускаются тесты<br>
                • Сборка проверяется автоматически</p>

                <p>📌 <b>CD (Continuous Delivery / Deployment):</b><br>
                • Continuous Delivery — автоматическая доставка в тестовую среду<br>
                • Continuous Deployment — автоматическое развертывание в продакшен</p>

                <p>📌 <b>Популярные CI/CD инструменты:</b><br>
                • <b>GitHub Actions</b> — бесплатно для открытых репозиториев<br>
                • <b>GitLab CI</b> — встроенный в GitLab<br>
                • <b>Jenkins</b> — мощный, сложный в настройке<br>
                • <b>CircleCI</b> — облачный, простой</p>

                <p>📌 <b>Пример GitHub Actions (.github/workflows/tests.yml):</b><br>
                <code>
                name: Run tests<br>
                on: push<br>
                jobs:<br>
                &nbsp;&nbsp;test:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;runs-on: ubuntu-latest<br>
                &nbsp;&nbsp;&nbsp;&nbsp;steps:<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- uses: actions/checkout@v2<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- uses: actions/setup-python@v2<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- run: pip install -r requirements.txt<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- run: pytest
                </code></p>
            `,
            questions: [
                {
                    question: 'Что такое CI/CD?',
                    answers: [
                        'Автоматизация сборки, тестирования и развертывания',
                        'Ручное тестирование',
                        'Написание кода',
                        'Создание дизайна'
                    ],
                    correct: 0
                },
                {
                    question: 'Что происходит при CI (Continuous Integration)?',
                    answers: [
                        'Тесты запускаются при каждом пуше кода',
                        'Код развертывается в продакшен',
                        'Создаётся дизайн',
                        'Пишутся требования'
                    ],
                    correct: 0
                },
                {
                    question: 'Какой инструмент бесплатен для открытых репозиториев?',
                    answers: ['GitHub Actions', 'Jenkins', 'CircleCI', 'Travis CI'],
                    correct: 0
                },
                {
                    question: 'Что означает CD?',
                    answers: [
                        'Continuous Delivery / Continuous Deployment',
                        'Code Development',
                        'Component Design',
                        'Core Database'
                    ],
                    correct: 0
                },
                {
                    question: 'Где описываются шаги для GitHub Actions?',
                    answers: [
                        '.github/workflows/название.yml',
                        '.github/actions/название.yml',
                        '.github/config/название.yml',
                        '.github/название.yml'
                    ],
                    correct: 0
                }
            ]
        },

        // ============================================================
        // УРОК 10: Лучшие практики и паттерны
        // ============================================================
        {
            id: 'auto_10',
            title: 'Лучшие практики и паттерны в автотестах',
            lecture: `
                <p>📋 <b>Лучшие практики написания автотестов</b></p>

                <p>📌 <b>1. Тесты должны быть независимыми</b><br>
                • Порядок тестов не должен влиять на результат<br>
                • Каждый тест может быть запущен отдельно</p>

                <p>📌 <b>2. Один тест — одна проверка</b><br>
                • Один тест проверяет одно поведение<br>
                • Легче понять, что сломалось</p>

                <p>📌 <b>3. Названия тестов должны быть понятными</b><br>
                • <code>def test_adding_two_numbers_returns_sum():</code><br>
                • Не <code>def test_add():</code></p>

                <p>📌 <b>4. Используйте фикстуры для подготовки данных</b><br>
                • Не дублируйте настройку в каждом тесте</p>

                <p>📌 <b>5. Не тестируйте чужой код</b><br>
                • Не тестируйте библиотеки (requests, pytest)<br>
                • Мокируйте внешние зависимости</p>

                <p>📌 <b>6. Поддерживайте чистоту кода</b><br>
                • Удаляйте тестовые данные после выполнения<br>
                • Используйте транзакции для отката изменений в БД</p>

                <p>📌 <b>7. Тесты должны быть быстрыми</b><br>
                • Медленные тесты реже запускают<br>
                • Используйте моки вместо реального API</p>

                <p>📌 <b>8. Не пишите тесты на всё подряд</b><br>
                • Приоритизируйте критическую функциональность<br>
                • 80% времени тратьте на 20% важных сценариев</p>
            `,
            questions: [
                {
                    question: 'Какое правило НЕ является хорошей практикой?',
                    answers: [
                        'Тесты должны быть независимыми',
                        'Один тест проверяет одну вещь',
                        'Тестировать все библиотеки и зависимости',
                        'Названия тестов должны быть понятными'
                    ],
                    correct: 2
                },
                {
                    question: 'Почему тесты должны быть быстрыми?',
                    answers: [
                        'Медленные тесты реже запускают',
                        'Быстрые тесты сложнее писать',
                        'Медленные тесты точнее',
                        'Быстрые тесты не нужны'
                    ],
                    correct: 0
                },
                {
                    question: 'Что делать с внешними зависимостями в тестах?',
                    answers: [
                        'Мокировать их',
                        'Тестировать реальные API',
                        'Игнорировать их',
                        'Тестировать в продакшене'
                    ],
                    correct: 0
                },
                {
                    question: 'Какое название теста лучше?',
                    answers: [
                        'def test_login_successful():',
                        'def test_login():',
                        'def test_1():',
                        'def check():'
                    ],
                    correct: 0
                },
                {
                    question: 'Сколько времени тратить на 20% важных сценариев?',
                    answers: ['20%', '80%', '50%', '10%'],
                    correct: 1
                }
            ]
        },

        // ============================================================
        // УРОК 11: Итоги модуля (без вопросов)
        // ============================================================
        {
            id: 'auto_11',
            title: '🎓 Итоги модуля',
            lecture: `
                <p>🎉 <b>Поздравляем с завершением модуля «Автотесты основы»!</b></p>

                <p>Ты прошёл 10 уроков и освоил основы автоматизации тестирования — навык, который делает тебя полноценным QA-инженером!</p>

                <p>📊 <b>Что ты теперь знаешь и умеешь:</b><br>
                • Понимаешь, что такое автоматизация и зачем она нужна<br>
                • Умеешь писать тесты с unittest и pytest<br>
                • Используешь фикстуры и параметризацию<br>
                • Создаёшь моки для изоляции тестов<br>
                • Тестируешь API с requests<br>
                • Тестируешь UI с selenium<br>
                • Знаешь, что такое CI/CD и как настраивать GitHub Actions<br>
                • Применяешь лучшие практики написания автотестов</p>

                <p>🔗 <b>Связь с другими модулями:</b><br>
                • <b>QA</b> — ты знаешь, что тестировать<br>
                • <b>Python</b> — у тебя есть инструмент для автоматизации<br>
                • <b>Автотесты</b> — ты применяешь знания на практике</p>

                <p>🚀 <b>Что дальше?</b><br>
                Ты готов применять автоматизацию в реальных проектах. Впереди — изучение баз данных (SQL) и DevOps.</p>

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