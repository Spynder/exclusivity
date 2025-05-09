import asyncio
from telegram import Bot
from telegram.error import TelegramError
from src.config import configuration

class TelegramService:
	@staticmethod
	async def send_message_to_admin(message: str):
		bot = Bot(token=configuration.telegram_params.token)
		try:
			await bot.send_message(chat_id=configuration.telegram_params.admin_id, text=message)
			print("Message sent successfully")
		except TelegramError as e:
			print(f"Failed to send message: {e}")
	
	@staticmethod
	async def send_new_brand(brand_name: str, telegram_id: str):
		return await TelegramService.send_message_to_admin(f"""
		Новый бренд зарегистрировался на Exclusivity!

		Название бренда: {brand_name}.
		Указанный Telegram: {telegram_id}.
		""")