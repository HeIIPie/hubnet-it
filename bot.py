import os
import json
import telebot
from telebot import types
from dotenv import load_dotenv
from flask import Flask, request

# Загружаем переменные из .env
load_dotenv()

TOKEN = os.getenv('BOT_TOKEN')
WEB_APP_URL = os.getenv('WEB_APP_URL')

if not TOKEN:
    raise ValueError("❌ BOT_TOKEN не найден в .env файле!")
if not WEB_APP_URL:
    raise ValueError("❌ WEB_APP_URL не найден в .env файле!")

# Инициализируем бота
bot = telebot.TeleBot(TOKEN)

# Создаём Flask приложение для Render
app = Flask(__name__)

# ============ КОМАНДЫ БОТА ============

@bot.message_handler(commands=['start'])
def start_message(message):
    user_id = message.from_user.id
    first_name = message.from_user.first_name

    # Создаём кнопку для открытия мини-аппа
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

@bot.message_handler(content_types=['web_app_data'])
def handle_web_app_data(message):
    try:
        data = json.loads(message.web_app_data.data)
        action = data.get('action')
        user_name = data.get('user_name', 'Студент')
        lesson_id = data.get('lesson_id')

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

    except Exception as e:
        print(f"Ошибка: {e}")

@bot.message_handler(commands=['help'])
def help_message(message):
    help_text = (
        "📖 **Помощь по боту Hubnet IT**\n\n"
        "Команды:\n"
        "/start - Начать обучение\n"
        "/help - Показать эту справку\n\n"
        "💡 Используй кнопку 'Начать учиться' чтобы открыть приложение."
    )
    bot.send_message(message.chat.id, help_text, parse_mode="Markdown")

# ============ ВЕБ-ХУК ДЛЯ RENDER ============

@app.route('/', methods=['GET'])
def index():
    return "🤖 Бот Hubnet IT работает!", 200

@app.route('/webhook', methods=['POST'])
def webhook():
    try:
        update = telebot.types.Update.de_json(request.stream.read().decode('utf-8'))
        bot.process_new_updates([update])
        return "OK", 200
    except Exception as e:
        print(f"Ошибка вебхука: {e}")
        return "Error", 500

# ============ ЗАПУСК ============

if __name__ == '__main__':
    print("🤖 Бот Hubnet IT запущен!")
    print(f"🌐 Web App URL: {WEB_APP_URL}")
    print("⏳ Ожидание команд...")
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)))