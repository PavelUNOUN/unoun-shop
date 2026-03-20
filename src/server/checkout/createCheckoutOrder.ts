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

  return {
    orderId: order.id,
    orderNumber: order.orderNumber,
    storageMode,
  };
}
