import os
import json
import telebot
from telebot import types
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv('BOT_TOKEN')
WEB_APP_URL = os.getenv('WEB_APP_URL')

bot = telebot.TeleBot(TOKEN)

@bot.message_handler(commands=['start'])
def start_message(message):
    markup = types.InlineKeyboardMarkup()
    web_app = types.WebAppInfo(WEB_APP_URL)
    button = types.InlineKeyboardButton("🚀 Начать учиться", web_app=web_app)
    markup.add(button)
    
    bot.send_message(
        message.chat.id,
        f"Привет, {message.from_user.first_name}! 👋\nНажми на кнопку, чтобы открыть приложение.",
        reply_markup=markup
    )

@bot.message_handler(content_types=['web_app_data'])
def handle_web_app_data(message):
    try:
        data = json.loads(message.web_app_data.data)
        bot.send_message(message.chat.id, f"✅ Получены данные: {data}")
    except:
        bot.send_message(message.chat.id, "❌ Ошибка обработки данных")

print("🤖 Бот запущен!")
bot.polling(none_stop=True)