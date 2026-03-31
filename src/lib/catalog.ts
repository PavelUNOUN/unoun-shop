export type CatalogProduct = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  price: number;
  originalPrice: number;
  image: string;
};

export type StorefrontProduct = CatalogProduct & {
  kind: "device" | "accessory";
  summary?: string;
  highlights?: string[];
  ozonUrl?: string;
  isActive: boolean;
  stock: number;
};

export const FLAGSHIP_PRODUCT: StorefrontProduct = {
  id: "unoun-steam-mop-12-in-1",
  slug: "unoun-steam-mop-12-in-1",
  title: "Паровая швабра UNOUN 12 в 1",
  shortTitle: "UNOUN 12 в 1",
  price: 7990,
  originalPrice: 12990,
  image: "/images/1.jpg",
  kind: "device",
  summary:
    "Флагманское устройство UNOUN для ежедневной уборки дома и базовая точка входа на сайт.",
  highlights: [
    "Флагманская модель UNOUN",
    "Подходит для ежедневной уборки",
    "Главный товар на витрине",
  ],
  isActive: true,
  stock: 20,
};

export const ACCESSORY_PRODUCTS: StorefrontProduct[] = [
  {
    id: "unoun-microfiber-cloth-set",
    slug: "microfiber-cloth-set",
    title: "Набор тряпок из микрофибры для паровой швабры UNOUN",
    shortTitle: "Набор тряпок",
    price: 990,
    originalPrice: 990,
    image: "/images/nozzle-mop-cloth.png",
    kind: "accessory",
    summary:
      "Стартовый комплект сменных тряпок для регулярной уборки и аккуратной замены между большими циклами чистки.",
    highlights: [
      "Мягкая микрофибра для повседневного ухода",
      "Быстрая замена без сложной сборки",
      "Подходит для повторных покупок",
    ],
    ozonUrl:
      "https://www.ozon.ru/product/smennaya-nasadka-tryapka-dlya-parovoy-shvabry-iz-mikrofibry-3107716834/",
    isActive: true,
    stock: 40,
  },
  {
    id: "unoun-nozzle-kit",
    slug: "nozzle-kit",
    title: "Набор насадок для паровой швабры UNOUN",
    shortTitle: "Набор насадок",
    price: 1490,
    originalPrice: 1490,
    image: "/images/nozzle-round-brush.png",
    kind: "accessory",
    summary:
      "Комплект дополнительных насадок для точечной очистки и более плотной работы по сложным зонам в доме.",
    highlights: [
      "Нейлоновая щётка для регулярных загрязнений",
      "Стальная щётка для жёстких зон",
      "Круглая насадка для точечной работы",
    ],
    ozonUrl:
      "https://www.ozon.ru/product/nabor-nasadok-dlya-parovoy-shvabry-neylonovye-1sht-stalnaya-1sht-kruglaya-1sht-3107685347/?oos_search=false&prev_collection=81763264",
    isActive: true,
    stock: 30,
  },
];

export function getAccessoryProductBySlug(slug: string) {
  return ACCESSORY_PRODUCTS.find((product) => product.slug === slug);
}

export function getRelatedAccessoryProducts(currentSlug?: string) {
  return ACCESSORY_PRODUCTS.filter((product) => product.slug !== currentSlug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price);
}
