function getEnvValue(value: string | undefined, fallback: string) {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : fallback;
}

export const LEGAL_LAST_UPDATED = "31 марта 2026 года";

export const SELLER_DETAILS = {
  sellerName: "Индивидуальный предприниматель Рогожкин Павел Сергеевич",
  inn: "526019123814",
  ogrnip: "323527500108974",
  postalCode: "603093",
  businessAddress: getEnvValue(
    process.env.SELLER_BUSINESS_ADDRESS,
    "603093, Нижний Новгород, улица Родионова, дом 165, корпус 12, квартира 36"
  ),
  returnAddress: getEnvValue(
    process.env.RETURN_ADDRESS,
    "603093, Нижний Новгород, улица Родионова, дом 165, корпус 12, квартира 36"
  ),
  supportEmail: getEnvValue(
    process.env.SUPPORT_EMAIL,
    "accauntreclama@yandex.ru"
  ),
  legalEmail: getEnvValue(
    process.env.LEGAL_CONTACT_EMAIL,
    "accauntreclama@yandex.ru"
  ),
  supportPhone: getEnvValue(
    process.env.SUPPORT_PHONE,
    "+7 (999) 140-21-08"
  ),
  supportHours: getEnvValue(
    process.env.SUPPORT_HOURS,
    "ежедневно с 10:00 до 17:00"
  ),
  settlementAccount: "40802810300000660491",
  correspondentAccount: "30101810645374525068",
  bankName: 'ООО "ОЗОН Банк"',
  bik: "044525068",
  bankInn: "9703077050",
  bankAddress:
    "РФ, 123112, г. Москва, вн.тер.г. Муниципальный Округ Пресненский, Пресненская наб., дом 10, этаж 19",
} as const;

export const SELLER_DETAILS_LIST = [
  { label: "Продавец", value: SELLER_DETAILS.sellerName },
  { label: "ИНН", value: SELLER_DETAILS.inn },
  { label: "ОГРНИП", value: SELLER_DETAILS.ogrnip },
  { label: "Почтовый индекс", value: SELLER_DETAILS.postalCode },
  { label: "Адрес продавца", value: SELLER_DETAILS.businessAddress },
  { label: "Адрес для возвратов", value: SELLER_DETAILS.returnAddress },
  { label: "Телефон", value: SELLER_DETAILS.supportPhone },
  { label: "Часы поддержки", value: SELLER_DETAILS.supportHours },
  { label: "Email поддержки", value: SELLER_DETAILS.supportEmail },
  { label: "Юридический email", value: SELLER_DETAILS.legalEmail },
  { label: "Расчетный счет", value: SELLER_DETAILS.settlementAccount },
  { label: "Корреспондентский счет", value: SELLER_DETAILS.correspondentAccount },
  { label: "Банк", value: SELLER_DETAILS.bankName },
  { label: "БИК", value: SELLER_DETAILS.bik },
  { label: "ИНН банка", value: SELLER_DETAILS.bankInn },
  { label: "Юридический адрес банка", value: SELLER_DETAILS.bankAddress },
] as const;

export const LEGAL_CONTACT_CHANNELS = [
  {
    label: "Поддержка покупателей",
    value: `${SELLER_DETAILS.supportEmail} · ${SELLER_DETAILS.supportPhone}`,
  },
  {
    label: "Часы связи",
    value: SELLER_DETAILS.supportHours,
  },
  {
    label: "Юридически значимые обращения",
    value: SELLER_DETAILS.legalEmail,
  },
  {
    label: "Адрес продавца",
    value: SELLER_DETAILS.businessAddress,
  },
  {
    label: "Адрес для возврата товара",
    value: SELLER_DETAILS.returnAddress,
  },
] as const;

export const PERSONAL_DATA_RIGHTS = [
  "получать сведения об обработке своих персональных данных;",
  "требовать уточнения, блокирования или уничтожения данных, если они неполные, устаревшие, неточные, незаконно получены или не нужны для заявленной цели;",
  "отозвать согласие на обработку персональных данных;",
  "обжаловать действия или бездействие оператора в Роскомнадзоре или в судебном порядке;",
  "защищать свои права и законные интересы иными способами, предусмотренными законодательством РФ.",
] as const;

export const PERSONAL_DATA_CATEGORIES = [
  "фамилия, имя, отчество или иные данные, которые пользователь самостоятельно указывает в формах;",
  "номер телефона, адрес электронной почты, город, адрес доставки или сведения о выбранном пункте выдачи;",
  "информация о заказе, оплате, возврате, сервисном обращении и истории взаимодействия с магазином;",
  "данные аккаунта и бонусного счёта, если пользователь авторизуется и использует соответствующие функции;",
  "технические данные: IP-адрес, cookie, сведения о браузере, устройстве, операционной системе, источнике перехода и действиях на сайте.",
] as const;

export const PERSONAL_DATA_PURPOSES = [
  "регистрация и сопровождение учетной записи пользователя;",
  "оформление, подтверждение, исполнение и сопровождение заказа;",
  "прием и обработка платежей, возвратов и связанных бухгалтерских операций;",
  "организация доставки, передачи товара, гарантийного и сервисного обслуживания;",
  "обратная связь, ответы на обращения и направление сервисных уведомлений;",
  "ведение внутренней отчетности, защита от злоупотреблений и соблюдение требований законодательства РФ;",
  "аналитика и улучшение работы сайта, включая использование cookie и Яндекс Метрики.",
] as const;

export const PERSONAL_DATA_THIRD_PARTIES = [
  "платежные провайдеры и банки — только в объеме, необходимом для приема и возврата оплаты;",
  "службы доставки и пункты выдачи — только в объеме, необходимом для передачи заказа;",
  "IT-подрядчики, хостинг-провайдеры и сервисы сопровождения сайта — в пределах технической необходимости;",
  "государственные органы и иные лица — в случаях, прямо предусмотренных законодательством РФ.",
] as const;

export const DATA_SECURITY_MEASURES = [
  "ограничение доступа к персональным данным только для уполномоченных лиц;",
  "использование организационных и технических мер защиты в пределах применимых рисков и действующего законодательства;",
  "хранение данных в инфраструктуре и сервисах, выбранных с учетом требований законодательства РФ;",
  "пересмотр состава собираемых данных и удаление либо обезличивание данных, когда цель обработки достигнута и дальнейшее хранение не требуется.",
] as const;
