export const SELLER_DETAILS = {
  sellerName: "Индивидуальный предприниматель Рогожкин Павел Сергеевич",
  inn: "526019123814",
  ogrnip: "323527500108974",
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
  { label: "Расчетный счет", value: SELLER_DETAILS.settlementAccount },
  { label: "Корреспондентский счет", value: SELLER_DETAILS.correspondentAccount },
  { label: "Банк", value: SELLER_DETAILS.bankName },
  { label: "БИК", value: SELLER_DETAILS.bik },
  { label: "ИНН банка", value: SELLER_DETAILS.bankInn },
  { label: "Юридический адрес банка", value: SELLER_DETAILS.bankAddress },
] as const;
