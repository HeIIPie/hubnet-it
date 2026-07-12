import os
import json
import logging
import telebot
from telebot import types
from flask import Flask, request
from dotenv import load_dotenv

# ============ НАСТРОЙКА ЛОГИРОВАНИЯ ============
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============ ЗАГРУЗКА ПЕРЕМЕННЫХ ============
load_dotenv()

TOKEN = os.getenv('BOT_TOKEN')
WEB_APP_URL = os.getenv('WEB_APP_URL')

if not TOKEN:
    logger.error("❌ BOT_TOKEN не найден в .env файле!")
    raise ValueError("❌ BOT_TOKEN не найден в .env файле!")

if not WEB_APP_URL:
    logger.error("❌ WEB_APP_URL не найден в .env файле!")
    raise ValueError("❌ WEB_APP_URL не найден в .env файле!")

logger.info(f"✅ Бот инициализирован. WEB_APP_URL: {WEB_APP_URL}")
logger.info(f"✅ Токен получен: {TOKEN[:10]}... (скрыто)")

# ============ ИНИЦИАЛИЗАЦИЯ ============
bot = telebot.TeleBot(TOKEN)
app = Flask(__name__)

# ============ ОБРАБОТЧИКИ КОМАНД (для совместимости) ============

@bot.message_handler(commands=['start'])
def start_message(message):
    """Обработчик /start (для polling, но мы используем вебхук)"""
    try:
        user_id = message.from_user.id
        first_name = message.from_user.first_name or "Друг"
        
        logger.info(f"📩 Получена команда /start от {user_id} ({first_name}) через обработчик")
        
        markup = types.InlineKeyboardMarkup()
        web_app_url = f"{WEB_APP_URL}?user_id={user_id}&name={first_name}"
        web_app = types.WebAppInfo(web_app_url)
        
        button = types.InlineKeyboardButton(
            text="🚀 Начать учиться",
            web_app=web_app
        )
        markup.add(button)
        
        welcome_text = (
            f"Привет, {first_name}! 👋\n\n"
            "Добро пожаловать в академию **Hubnet IT**.\n"
            "Нажми на кнопку ниже, чтобы открыть приложение."
        )
        
        bot.send_message(
            message.chat.id,
            welcome_text,
            reply_markup=markup,
            parse_mode="Markdown"
        )
        
        logger.info(f"✅ Ответ отправлен пользователю {user_id}")
        
    except Exception as e:
        logger.error(f"❌ Ошибка в start_message: {e}")
        logger.exception("Подробности:")

@bot.message_handler(content_types=['web_app_data'])
def handle_web_app_data(message):
    try:
        data = json.loads(message.web_app_data.data)
        action = data.get('action')
        user_name = data.get('user_name', 'Студент')
        lesson_id = data.get('lesson_id')
        user_id = data.get('user_id')
        
        logger.info(f"📩 Получены данные от {user_id}: {data}")
        
        if action == 'start_lesson':
            bot.send_message(
                message.chat.id,
                f"📚 {user_name} начал урок {lesson_id}! Удачи! 🍀"
            )
        elif action == 'complete_lesson':
            xp = data.get('xp', 0)
            bot.send_message(
                message.chat.id,
                f"🎉 Отлично, {user_name}! Ты прошёл урок {lesson_id}! +50 XP! ⭐"
            )
        else:
            bot.send_message(
                message.chat.id,
                f"ℹ️ Получено действие: {action}"
            )
            
    except json.JSONDecodeError as e:
        logger.error(f"❌ Ошибка парсинга JSON: {e}")
    except Exception as e:
        logger.error(f"❌ Ошибка обработки web_app_data: {e}")
        logger.exception("Подробности:")

@bot.message_handler(func=lambda message: True)
def echo_all_messages(message):
    """Обработчик любого текстового сообщения (для отладки)"""
    try:
        logger.info(f"📩 Получено текстовое сообщение: '{message.text}' от {message.from_user.id}")
        bot.reply_to(
            message, 
            f"Я получил твоё сообщение: {message.text}\n\n"
            f"Попробуй команду /start"
        )
        logger.info(f"✅ Ответ отправлен на текстовое сообщение")
    except Exception as e:
        logger.error(f"❌ Ошибка в echo: {e}")
        logger.exception("Подробности:")

# ============ ВЕБХУК С ПРЯМОЙ ОБРАБОТКОЙ ============

@app.route('/webhook', methods=['POST'])
def webhook():
    try:
        json_str = request.stream.read().decode('utf-8')
        logger.info(f"📥 Входящий вебхук (первые 500 символов): {json_str[:500]}...")
        
        # Парсим данные
        data = json.loads(json_str)
        
        # Проверяем, есть ли сообщение
        if 'message' in data:
            message = data['message']
            text = message.get('text', '')
            chat_id = message['chat']['id']
            user_id = message['from']['id']
            first_name = message['from'].get('first_name', 'Друг')
            
            # ===== ПРЯМАЯ ОБРАБОТКА /start =====
            if text and text.startswith('/start'):
                logger.info(f"📩 Прямая обработка /start от {user_id}")
                
                # Создаём кнопку
                markup = types.InlineKeyboardMarkup()
                web_app_url = f"{WEB_APP_URL}?user_id={user_id}&name={first_name}"
                web_app = types.WebAppInfo(web_app_url)
                button = types.InlineKeyboardButton("🚀 Начать учиться", web_app=web_app)
                markup.add(button)
                
                # Отправляем приветствие
                bot.send_message(
                    chat_id,
                    f"Привет, {first_name}! 👋\n\n"
                    "Добро пожаловать в академию **Hubnet IT**.\n"
                    "Нажми на кнопку ниже, чтобы открыть приложение.",
                    reply_markup=markup,
                    parse_mode="Markdown"
                )
                
                logger.info(f"✅ Ответ отправлен пользователю {user_id} через прямую обработку")
                return "OK", 200
            
            # ===== ПРЯМАЯ ОБРАБОТКА ТЕКСТОВЫХ СООБЩЕНИЙ =====
            elif text:
                logger.info(f"📩 Прямая обработка текстового сообщения: '{text}' от {user_id}")
                bot.send_message(
                    chat_id,
                    f"Я получил твоё сообщение: {text}\n\nПопробуй команду /start"
                )
                logger.info(f"✅ Ответ отправлен на текстовое сообщение через прямую обработку")
                return "OK", 200
        
        # ===== ОБРАБОТКА ДРУГИХ ТИПОВ =====
        update = telebot.types.Update.de_json(json_str)
        bot.process_new_updates([update])
        
        return "OK", 200
        
    except json.JSONDecodeError as e:
        logger.error(f"❌ Ошибка парсинга JSON: {e}")
        return "Error: Invalid JSON", 400
    except Exception as e:
        logger.error(f"❌ Ошибка в вебхуке: {e}")
        logger.exception("Подробности:")
        return "Error", 500

# ============ ДРУГИЕ ЭНДПОИНТЫ ============

@app.route('/', methods=['GET'])
def index():
    logger.info("🌐 Получен GET запрос на /")
    return "🤖 Бот Hubnet IT работает! 🌐", 200

@app.route('/health', methods=['GET'])
def health():
    """Эндпоинт для проверки здоровья (Render использует его)"""
    return "OK", 200

@app.route('/debug', methods=['GET'])
def debug():
    """Отладочная страница с информацией о боте"""
    return {
        "status": "ok",
        "web_app_url": WEB_APP_URL,
        "bot_token": TOKEN[:10] + "... (скрыто)",
        "webhook_url": "https://hubnet-bot.onrender.com/webhook"
    }, 200

@app.route('/test', methods=['GET'])
def test_send():
    """Принудительная отправка сообщения (для теста)"""
    try:
        bot.send_message(1186911901, "✅ Тестовое сообщение от бота!")
        return "Сообщение отправлено!", 200
    except Exception as e:
        return f"Ошибка: {e}", 500

# ============ ЗАПУСК ============

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    logger.info(f"🚀 Бот запущен на порту {port}")
    logger.info(f"🔗 Ссылка на вебхук: https://hubnet-bot.onrender.com/webhook")
    logger.info(f"🔗 Ссылка на главную: https://hubnet-bot.onrender.com")
    logger.info(f"🔗 Отладочная страница: https://hubnet-bot.onrender.com/debug")
    logger.info(f"🔗 Тестовая страница: https://hubnet-bot.onrender.com/test")
    
    app.run(host='0.0.0.0', port=port)