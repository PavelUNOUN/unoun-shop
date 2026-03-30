import { OrderStatus, PaymentStatus } from "@prisma/client";
import { getSiteUrl } from "@/lib/site";
import type { CheckoutItem, CheckoutPaymentMethod } from "@/lib/checkout";
import { getPrismaClient } from "@/lib/prisma";

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

type YandexPayWebhookPayload = {
  event?: string;
  merchantId?: string;
  order?: {
    orderId?: string;
    status?: string;
    paymentStatus?: string;
  };
  operation?: {
    orderId?: string;
    status?: string;
  };
};

type YandexPayCartItemPayload = {
  productId: string;
  title: string;
  total: string;
  quantity: {
    count: string;
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
  if (getYandexPayEnv() === "sandbox") {
    return getYandexPayMerchantId();
  }

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

function buildYandexPayCartItems(
  items: CheckoutItem[],
  total: number
): YandexPayCartItemPayload[] {
  const sourceItems = items.map((item) => ({
    ...item,
    lineTotalCents: item.price * item.quantity * 100,
  }));
  const subtotalCents = sourceItems.reduce(
    (sum, item) => sum + item.lineTotalCents,
    0
  );
  const targetCents = Math.max(Math.round(total * 100), 0);

  if (subtotalCents <= 0 || subtotalCents === targetCents) {
    return items.map((item) => ({
      productId: item.slug,
      title: item.title,
      total: item.price.toFixed(2),
      quantity: {
        count: String(item.quantity),
      },
    }));
  }

  let remainingTargetCents = targetCents;

  return sourceItems.map((item, index) => {
    const isLast = index === sourceItems.length - 1;
    const adjustedLineCents = isLast
      ? remainingTargetCents
      : Math.max(
          Math.round((item.lineTotalCents / subtotalCents) * targetCents),
          0
        );

    remainingTargetCents -= adjustedLineCents;

    return {
      productId: item.slug,
      title: item.title,
      total: (adjustedLineCents / item.quantity / 100).toFixed(2),
      quantity: {
        count: String(item.quantity),
      },
    };
  });
}

export function isYandexPayEnabled(): boolean {
  return Boolean(getYandexPayMerchantId() && getYandexPayApiKey());
}

export function getDefaultYandexPayNotificationUrl() {
  return `${getSiteUrl()}/api/payments/yandex-pay/webhook`;
}

function normalizeYandexPaymentStatus(
  payload: YandexPayWebhookPayload
): string | null {
  return (
    payload.order?.paymentStatus?.trim() ||
    payload.order?.status?.trim() ||
    payload.operation?.status?.trim() ||
    null
  );
}

function normalizeYandexOrderId(payload: YandexPayWebhookPayload): string | null {
  return payload.order?.orderId?.trim() || payload.operation?.orderId?.trim() || null;
}

function mapYandexPaymentStatus(
  status: string
): { paymentStatus: PaymentStatus; orderStatus?: OrderStatus } {
  switch (status) {
    case "AUTHORIZED":
    case "CAPTURED":
    case "CONFIRMED":
      return {
        paymentStatus: PaymentStatus.PAID,
        orderStatus: OrderStatus.PAID,
      };
    case "REFUNDED":
    case "PARTIALLY_REFUNDED":
      return {
        paymentStatus: PaymentStatus.REFUNDED,
        orderStatus: OrderStatus.CANCELLED,
      };
    case "FAILED":
    case "VOIDED":
    case "CANCELLED":
      return {
        paymentStatus: PaymentStatus.FAILED,
        orderStatus: OrderStatus.AWAITING_PAYMENT,
      };
    case "PENDING":
    case "NEW":
    default:
      return {
        paymentStatus: PaymentStatus.REQUIRES_ACTION,
        orderStatus: OrderStatus.AWAITING_PAYMENT,
      };
  }
}

export async function applyYandexPayWebhook(payload: YandexPayWebhookPayload) {
  const merchantId = getYandexPayMerchantId();
  const orderId = normalizeYandexOrderId(payload);
  const paymentStatusRaw = normalizeYandexPaymentStatus(payload);

  if (!merchantId || !orderId || !paymentStatusRaw) {
    return { updated: false, reason: "missing-required-fields" as const };
  }

  if (payload.merchantId && payload.merchantId !== merchantId) {
    return { updated: false, reason: "merchant-id-mismatch" as const };
  }

  const prisma = getPrismaClient();
  const statusMapping = mapYandexPaymentStatus(paymentStatusRaw);

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    select: {
      id: true,
    },
  });

  if (!order) {
    return { updated: false, reason: "order-not-found" as const };
  }

  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      paymentStatus: statusMapping.paymentStatus,
      status: statusMapping.orderStatus,
      paymentReference: orderId,
    },
  });

  return {
    updated: true,
    reason: "ok" as const,
    paymentStatus: statusMapping.paymentStatus,
    orderStatus: statusMapping.orderStatus ?? null,
  };
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
        items: buildYandexPayCartItems(items, total),
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
