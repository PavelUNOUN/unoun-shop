import { getSiteUrl } from "@/lib/site";
import type { CheckoutItem, CheckoutPaymentMethod } from "@/lib/checkout";

const SANDBOX_API_BASE = "https://sandbox.pay.yandex.ru/api/merchant";
const PRODUCTION_API_BASE = "https://pay.yandex.ru/api/merchant";

type CreateYandexPayLinkInput = {
  orderId: string;
  orderNumber: string;
  items: CheckoutItem[];
  total: number;
  paymentMethod: CheckoutPaymentMethod;
  storageMode: "mock" | "database";
};

type YandexPayCreateOrderResponse = {
  data?: {
    paymentUrl?: string;
  };
};

function getYandexPayEnv(): "sandbox" | "production" {
  return process.env.YANDEX_PAY_ENV === "production" ? "production" : "sandbox";
}

function getYandexPayApiBase(): string {
  return getYandexPayEnv() === "production" ? PRODUCTION_API_BASE : SANDBOX_API_BASE;
}

function getYandexPayMerchantId(): string | null {
  const value = process.env.YANDEX_PAY_MERCHANT_ID?.trim();
  return value || null;
}

function getYandexPayApiKey(): string | null {
  const value = process.env.YANDEX_PAY_API_KEY?.trim();
  return value || null;
}

function buildReturnUrl(
  orderNumber: string,
  storageMode: "mock" | "database",
  paymentState: "success" | "error"
): string {
  const baseUrl = process.env.YANDEX_PAY_RETURN_URL?.trim() || `${getSiteUrl()}/checkout/success`;
  const url = new URL(baseUrl);

  url.searchParams.set("orderNumber", orderNumber);
  url.searchParams.set("mode", storageMode);
  url.searchParams.set("provider", "yandex_pay");
  url.searchParams.set("payment", paymentState);

  return url.toString();
}

function mapAvailablePaymentMethods(
  paymentMethod: CheckoutPaymentMethod
): Array<"CARD" | "SPLIT"> {
  return paymentMethod === "split" ? ["SPLIT"] : ["CARD"];
}

export function isYandexPayEnabled(): boolean {
  return Boolean(getYandexPayMerchantId() && getYandexPayApiKey());
}

export async function createYandexPayPaymentLink({
  orderId,
  orderNumber,
  items,
  total,
  paymentMethod,
  storageMode,
}: CreateYandexPayLinkInput): Promise<string | null> {
  const merchantId = getYandexPayMerchantId();
  const apiKey = getYandexPayApiKey();

  if (!merchantId || !apiKey) {
    return null;
  }

  const response = await fetch(`${getYandexPayApiBase()}/v1/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${apiKey}`,
    },
    body: JSON.stringify({
      orderId,
      merchantId,
      currencyCode: "RUB",
      availablePaymentMethods: mapAvailablePaymentMethods(paymentMethod),
      ttl: 1800,
      redirectUrls: {
        onSuccess: buildReturnUrl(orderNumber, storageMode, "success"),
        onError: buildReturnUrl(orderNumber, storageMode, "error"),
      },
      cart: {
        items: items.map((item) => ({
          productId: item.slug,
          title: item.title,
          total: item.price.toFixed(2),
          quantity: {
            count: String(item.quantity),
          },
        })),
        total: {
          amount: total.toFixed(2),
        },
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Yandex Pay order creation failed: ${response.status} ${errorBody}`);
  }

  const result = (await response.json()) as YandexPayCreateOrderResponse;
  return result.data?.paymentUrl ?? null;
}
