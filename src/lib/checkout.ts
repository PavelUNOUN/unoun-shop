export type CheckoutPaymentMethod = "full_online" | "split";

export type CheckoutContactData = {
  name: string;
  phone: string;
  email: string;
  city: string;
};

export type CheckoutPickupPoint = {
  id: string;
  title: string;
  address: string;
  eta: string;
};

export type CheckoutItem = {
  id: string;
  slug: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
};

export type CreateCheckoutOrderPayload = {
  contact: CheckoutContactData;
  pickupPoint: CheckoutPickupPoint;
  paymentMethod: CheckoutPaymentMethod;
  consentAccepted: boolean;
  items: CheckoutItem[];
};

export type CreateCheckoutOrderResponse = {
  orderId: string;
  orderNumber: string;
  storageMode: "mock" | "database";
  paymentUrl?: string | null;
  paymentProvider?: "yandex_pay" | null;
};
