// Настройки страницы — поменяйте под себя.
window.STARTAP_CONFIG = {
  // Username Telegram-бота подписки (без @), например "startap_bot".
  // Кнопки ведут на t.me/<бот>?start=<язык сайта> — бот ответит на этом языке.
  telegramBot: "startap_com_bot",

  // Запасной вариант, если бота нет: обычная ссылка на канал.
  telegramUrl: "https://t.me/your_channel",

  // URL веб-приложения Google Apps Script (заканчивается на /exec) —
  // подписки попадут в Google Таблицу. Как получить: README.md.
  // Пока пусто — адреса сохраняются только в localStorage браузера
  // (режим для локальной проверки).
  formEndpoint: "https://script.google.com/macros/s/AKfycbwZWAA_PrX527T4d3mCePH-AuEEDwfslI78n-27Igfc8d1L3aQVUZbPzxnbL7dmJPe5/exec",
};
