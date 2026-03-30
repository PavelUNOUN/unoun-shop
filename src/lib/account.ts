export type AccountNavItem = {
  href: string;
  label: string;
  description: string;
};

export type AccountStat = {
  label: string;
  value: string;
  hint: string;
};

export type AccountOrderStatus =
  | "Создан"
  | "Подтвержден"
  | "Передан в Яндекс Доставку"
  | "Получен";

export type AccountOrder = {
  id: string;
  date: string;
  status: AccountOrderStatus;
  itemsCount: number;
  total: number;
  delivery: string;
  paymentLabel: string;
  bonusUsed: number;
};

export type SavedAddress = {
  id: string;
  title: string;
  city: string;
  address: string;
  note: string;
};

export type LoyaltyEvent = {
  title: string;
  description: string;
};

export const ACCOUNT_NAV_ITEMS: AccountNavItem[] = [
  {
    href: "/account",
    label: "Обзор",
    description: "Сводка по заказам, бонусам и быстрым действиям.",
  },
  {
    href: "/account/orders",
    label: "Заказы",
    description: "История заказов, статусы и состав корзины.",
  },
  {
    href: "/account/loyalty",
    label: "Бонусы",
    description: "Баланс, welcome-скидка и будущая логика клуба.",
  },
  {
    href: "/account/addresses",
    label: "Получатели",
    description: "Контакты и сохраненные предпочтения по доставке.",
  },
  {
    href: "/account/service",
    label: "Сервис",
    description: "Гарантия, инструкция и обращения по поддержке.",
  },
];

export const ACCOUNT_DASHBOARD_STATS: AccountStat[] = [
  {
    label: "Активные заказы",
    value: "1",
    hint: "Один заказ в пути до ПВЗ Яндекс Доставки.",
  },
  {
    label: "Бонусный баланс",
    value: "500 ₽",
    hint: "Welcome-бонус подготовлен как сценарий после авторизации.",
  },
  {
    label: "Сохраненные получатели",
    value: "2",
    hint: "Основной покупатель и резервный контакт.",
  },
];

export const ACCOUNT_RECENT_ORDERS: AccountOrder[] = [
  {
    id: "UN-240219-015",
    date: "19 февраля 2026",
    status: "Передан в Яндекс Доставку",
    itemsCount: 1,
    total: 7990,
    delivery: "ПВЗ Яндекс Доставки на Родионова",
    paymentLabel: "Онлайн-оплата",
    bonusUsed: 500,
  },
  {
    id: "UN-140118-004",
    date: "18 января 2026",
    status: "Получен",
    itemsCount: 1,
    total: 7990,
    delivery: "ПВЗ Яндекс Доставки на Белинского",
    paymentLabel: "Яндекс Pay / Split",
    bonusUsed: 0,
  },
];

export const SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: "home",
    title: "Основной получатель",
    city: "Нижний Новгород",
    address: "ПВЗ Яндекс Доставки, ул. Родионова, 165А",
    note: "Используется по умолчанию для быстрых повторных заказов.",
  },
  {
    id: "office",
    title: "Получатель для офиса",
    city: "Нижний Новгород",
    address: "ПВЗ Яндекс Доставки, ул. Максима Горького, 152",
    note: "Можно переключать на этапе checkout, когда появится реальная интеграция.",
  },
];

export const LOYALTY_SUMMARY = {
  balance: 500,
  availableAfterLogin: true,
  firstOrderDiscount: 500,
  nextLevelHint: "После подключения backend здесь появится история начислений.",
} as const;

export const LOYALTY_EVENTS: LoyaltyEvent[] = [
  {
    title: "Вход в аккаунт",
    description:
      "Пользователь авторизуется через Яндекс и получает доступ к welcome-механике.",
  },
  {
    title: "Первый заказ",
    description:
      "500 бонусов применяются сразу как фиксированная скидка на первую покупку.",
  },
  {
    title: "Повторные покупки",
    description:
      "На следующих этапах сюда можно добавить механику для аксессуаров и расходников.",
  },
];

export const SERVICE_TOUCHPOINTS = [
  {
    title: "Инструкция и комплектация",
    description:
      "PDF-руководство уже доступно и помогает быстро открыть инструкцию после покупки или перед первым использованием.",
    href: "/manuals/instrukcia.pdf",
    linkLabel: "Открыть инструкцию",
  },
  {
    title: "Гарантия 24 месяца",
    description:
      "Здесь собраны актуальные условия гарантии, возврата и диагностики устройства после покупки.",
    href: "/service",
    linkLabel: "Перейти к сервису",
  },
  {
    title: "Статус обращений",
    description:
      "Раздел помогает быстро перейти к логике доставки и сервисного сопровождения, если понадобится поддержка по заказу.",
    href: "/delivery",
    linkLabel: "Посмотреть delivery-flow",
  },
];
