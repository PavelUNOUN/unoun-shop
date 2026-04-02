type TelegramOrderNotificationInput = {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  city: string;
  pickupPointTitle: string;
  pickupPointAddress: string;
  grandTotal: number;
  itemLines: string[];
};

function getTelegramConfig() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    return null;
  }

  return { botToken, chatId };
}

function escapeTelegramMarkdown(value: string) {
  return value.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

function buildMessage(input: TelegramOrderNotificationInput) {
  return [
    "🛒 *Новый заказ UNOUN*",
    "",
    `Номер: *${escapeTelegramMarkdown(input.orderNumber)}*`,
    `Имя: ${escapeTelegramMarkdown(input.customerName)}`,
    `Телефон: ${escapeTelegramMarkdown(input.customerPhone)}`,
    `Email: ${escapeTelegramMarkdown(input.customerEmail)}`,
    `Город: ${escapeTelegramMarkdown(input.city)}`,
    `ПВЗ Яндекс Доставки: ${escapeTelegramMarkdown(input.pickupPointTitle)}`,
    `Адрес: ${escapeTelegramMarkdown(input.pickupPointAddress)}`,
    `Сумма: *${escapeTelegramMarkdown(formatPrice(input.grandTotal))} ₽*`,
    "",
    "*Состав заказа:*",
    ...input.itemLines.map((line) => `• ${escapeTelegramMarkdown(line)}`),
  ].join("\n");
}

export async function sendTelegramOrderNotification(
  input: TelegramOrderNotificationInput
) {
  const config = getTelegramConfig();

  if (!config) {
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${config.botToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: buildMessage(input),
        parse_mode: "MarkdownV2",
        disable_web_page_preview: true,
      }),
    }
  );

  if (!response.ok) {
    const details = await response.text();

    throw new Error(`Telegram notification failed: ${response.status} ${details}`);
  }
}
