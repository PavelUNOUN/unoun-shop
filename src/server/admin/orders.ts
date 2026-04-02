import { OrderStatus, PaymentStatus } from "@prisma/client";
import { getPrismaClient } from "@/lib/prisma";
import { getCheckoutStorageMode } from "@/server/config";

export const ADMIN_ORDER_STATUS_OPTIONS: OrderStatus[] = [
  OrderStatus.NEW,
  OrderStatus.AWAITING_PAYMENT,
  OrderStatus.PAID,
  OrderStatus.READY_FOR_SHIPPING,
  OrderStatus.IN_DELIVERY,
  OrderStatus.READY_FOR_PICKUP,
  OrderStatus.DONE,
  OrderStatus.CANCELLED,
];

export function formatOrderStatusLabel(status: OrderStatus) {
  switch (status) {
    case OrderStatus.NEW:
      return "Новый";
    case OrderStatus.AWAITING_PAYMENT:
      return "Ожидает оплаты";
    case OrderStatus.PAID:
      return "Оплачен";
    case OrderStatus.READY_FOR_SHIPPING:
      return "Готов к отгрузке";
    case OrderStatus.IN_DELIVERY:
      return "В доставке";
    case OrderStatus.READY_FOR_PICKUP:
      return "Готов к выдаче";
    case OrderStatus.DONE:
      return "Завершён";
    case OrderStatus.CANCELLED:
      return "Отменён";
  }
}

export function formatPaymentStatusLabel(status: PaymentStatus) {
  switch (status) {
    case PaymentStatus.PENDING:
      return "Ожидает обработки";
    case PaymentStatus.REQUIRES_ACTION:
      return "Ожидает оплаты";
    case PaymentStatus.PAID:
      return "Оплачено";
    case PaymentStatus.FAILED:
      return "Ошибка оплаты";
    case PaymentStatus.REFUNDED:
      return "Возврат";
  }
}

export async function getAdminOrders() {
  if (getCheckoutStorageMode() !== "database") {
    return [];
  }

  const prisma = getPrismaClient();

  return prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
    },
  });
}

export async function updateAdminOrderStatus(
  orderId: string,
  status: OrderStatus
) {
  if (getCheckoutStorageMode() !== "database") {
    throw new Error(
      "Admin order status update is unavailable until database mode is enabled."
    );
  }

  const prisma = getPrismaClient();

  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });
}
