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
    description: "История заказов, статусы оплаты и состав покупок.",
  },
  {
    href: "/account/loyalty",
    label: "Бонусы",
    description: "Баланс, приветственный бонус и история операций.",
  },
  {
    href: "/account/addresses",
    label: "Получатели",
    description: "Контакты и выбранные пункты выдачи для следующих покупок.",
  },
  {
    href: "/account/service",
    label: "Сервис",
    description: "Инструкция, гарантия и поддержка после покупки.",
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
    hint: "Приветственный бонус доступен после входа в аккаунт.",
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
    note: "Можно выбрать при следующем оформлении заказа.",
  },
];

export const LOYALTY_SUMMARY = {
  balance: 500,
  availableAfterLogin: true,
  firstOrderDiscount: 500,
  nextLevelHint: "История начислений появится в этом разделе автоматически.",
} as const;

export const LOYALTY_EVENTS: LoyaltyEvent[] = [
  {
    title: "Вход в аккаунт",
    description:
      "После входа через Яндекс открывается доступ к бонусному счёту.",
  },
  {
    title: "Первый заказ",
    description:
      "500 бонусов применяются сразу как фиксированная скидка на первую покупку.",
  },
  {
    title: "Повторные покупки",
    description:
      "Повторные покупки помогают использовать бонусы и следить за историей начислений.",
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
    title: "Получение и оплата",
    description:
      "Здесь собраны условия получения и оплаты, которые могут пригодиться по текущему заказу.",
    href: "/delivery",
    linkLabel: "Открыть условия получения",
  },
];
