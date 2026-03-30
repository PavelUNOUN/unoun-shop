import { randomUUID } from "node:crypto";
import {
  DeliveryMethod,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@prisma/client";
import type { CreateCheckoutOrderResponse } from "@/lib/checkout";
import { getPrismaClient } from "@/lib/prisma";
import { getCheckoutStorageMode } from "@/server/config";
import type { CreateCheckoutOrderInput } from "@/server/checkout/schema";
import { sendTelegramOrderNotification } from "@/server/notifications/telegram";
import {
  createYandexPayPaymentLink,
  isYandexPayEnabled,
} from "@/server/payments/yandexPay";

function createOrderNumber(): string {
  const date = new Date();
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  const sequence = String(Math.floor(Math.random() * 9000) + 1000);

  return `UN-${stamp}-${sequence}`;
}

function mapPaymentMethod(
  paymentMethod: CreateCheckoutOrderInput["paymentMethod"]
): PaymentMethod {
  return paymentMethod === "split"
    ? PaymentMethod.SPLIT
    : PaymentMethod.FULL_ONLINE;
}

export async function createCheckoutOrder(
  input: CreateCheckoutOrderInput
): Promise<CreateCheckoutOrderResponse> {
  const subtotal = input.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const orderNumber = createOrderNumber();
  const grandTotal = subtotal;
  const storageMode = getCheckoutStorageMode();

  if (storageMode === "mock") {
    return {
      orderId: randomUUID(),
      orderNumber,
      storageMode,
      paymentUrl: null,
      paymentProvider: null,
    };
  }

  const prisma = getPrismaClient();

  const order = await prisma.order.create({
    data: {
      orderNumber,
      status: OrderStatus.NEW,
      paymentMethod: mapPaymentMethod(input.paymentMethod),
      paymentStatus: PaymentStatus.PENDING,
      deliveryMethod: DeliveryMethod.CDEK_PICKUP,
      checkoutMode: "guest",
      customerName: input.contact.name,
      customerPhone: input.contact.phone.replace(/\s+/g, " ").trim(),
      customerEmail: input.contact.email.trim().toLowerCase(),
      city: input.contact.city,
      consentAccepted: input.consentAccepted,
      pickupPointCode: input.pickupPoint.id,
      pickupPointTitle: input.pickupPoint.title,
      pickupPointAddress: input.pickupPoint.address,
      pickupPointEta: input.pickupPoint.eta,
      subtotal,
      grandTotal,
      items: {
        create: input.items.map((item) => ({
          productSlug: item.slug,
          productTitle: item.title,
          image: item.image,
          unitPrice: item.price,
          originalPrice: item.originalPrice,
          quantity: item.quantity,
          lineTotal: item.price * item.quantity,
        })),
      },
    },
    select: {
      id: true,
      orderNumber: true,
    },
  });

  void sendTelegramOrderNotification({
    orderNumber: order.orderNumber,
    customerName: input.contact.name,
    customerPhone: input.contact.phone.replace(/\s+/g, " ").trim(),
    customerEmail: input.contact.email.trim().toLowerCase(),
    city: input.contact.city,
    pickupPointTitle: input.pickupPoint.title,
    pickupPointAddress: input.pickupPoint.address,
    grandTotal,
    itemLines: input.items.map(
      (item) => `${item.title} × ${item.quantity} — ${item.price * item.quantity} ₽`
    ),
  }).catch((error) => {
    console.error("Telegram order notification error", error);
  });

  let paymentUrl: string | null = null;
  let paymentProvider: "yandex_pay" | null = null;

  if (isYandexPayEnabled()) {
    try {
      paymentUrl = await createYandexPayPaymentLink({
        orderId: order.id,
        orderNumber: order.orderNumber,
        items: input.items,
        total: grandTotal,
        paymentMethod: input.paymentMethod,
        storageMode,
      });

      if (paymentUrl) {
        paymentProvider = "yandex_pay";

        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: OrderStatus.AWAITING_PAYMENT,
            paymentStatus: PaymentStatus.REQUIRES_ACTION,
            paymentReference: order.id,
          },
        });
      }
    } catch (error) {
      console.error("Yandex Pay link creation error", error);
    }
  }

  return {
    orderId: order.id,
    orderNumber: order.orderNumber,
    storageMode,
    paymentUrl,
    paymentProvider,
  };
}
