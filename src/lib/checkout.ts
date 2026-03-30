export type CheckoutPaymentMethod = "full_online" | "split";
export type CheckoutDeliveryMethod = "yandex_pickup";

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
  eta?: string | null;
  note?: string | null;
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
  deliveryMethod: CheckoutDeliveryMethod;
  pickupPoint: CheckoutPickupPoint;
  paymentMethod: CheckoutPaymentMethod;
  applyAvailableBonuses?: boolean;
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

export type CheckoutPickupPointsResponse = {
  source: "mock" | "live";
  points: CheckoutPickupPoint[];
};

export type CheckoutAccountProfile = {
  isAuthenticated: boolean;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  city: string;
  bonusBalance: number;
  welcomeIssued: boolean;
  preferredPickupPoint: CheckoutPickupPoint | null;
};
