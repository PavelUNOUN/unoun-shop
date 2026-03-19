export type CatalogProduct = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  price: number;
  originalPrice: number;
  image: string;
};

export const FLAGSHIP_PRODUCT: CatalogProduct = {
  id: "unoun-steam-mop-12-in-1",
  slug: "unoun-steam-mop-12-in-1",
  title: "Паровая швабра UNOUN 12 в 1",
  shortTitle: "UNOUN 12 в 1",
  price: 7990,
  originalPrice: 12990,
  image: "/images/1.jpg",
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price);
}
