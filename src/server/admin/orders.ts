import { OrderStatus } from "@prisma/client";
import { getPrismaClient } from "@/lib/prisma";

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

export async function getAdminOrders() {
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
