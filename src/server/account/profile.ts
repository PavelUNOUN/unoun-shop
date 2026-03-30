import {
  BonusTransactionType,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@prisma/client";
import type { CheckoutAccountProfile } from "@/lib/checkout";
import { getPrismaClient } from "@/lib/prisma";

const WELCOME_BONUS_AMOUNT = 500;

type AccountUser = {
  id: string;
  fullName: string | null;
  email: string | null;
};

export type AccountOrderView = {
  id: string;
  orderNumber: string;
  dateLabel: string;
  statusLabel: string;
  paymentLabel: string;
  paymentStatusLabel: string;
  itemsCount: number;
  total: number;
  deliveryLabel: string;
  bonusUsed: number;
  createdAt: Date;
  items: Array<{
    id: string;
    title: string;
    quantity: number;
    lineTotal: number;
  }>;
};

export type AccountAddressView = {
  id: string;
  title: string;
  city: string;
  recipientName: string | null;
  recipientPhone: string | null;
  address: string;
  note: string;
  preferred: boolean;
};

export type AccountLoyaltyView = {
  balance: number;
  welcomeIssued: boolean;
  firstOrderDiscount: number;
  transactions: Array<{
    id: string;
    title: string;
    description: string;
    amount: number;
    balanceAfter: number;
    createdAtLabel: string;
  }>;
};

export type AccountDashboardData = {
  user: AccountUser;
  stats: Array<{
    label: string;
    value: string;
    hint: string;
  }>;
  latestOrder: AccountOrderView | null;
  orders: AccountOrderView[];
  addresses: AccountAddressView[];
  loyalty: AccountLoyaltyView;
};

export async function getCheckoutAccountProfile(
  user: AccountUser | null
): Promise<CheckoutAccountProfile | null> {
  if (!user) {
    return null;
  }

  const prisma = getPrismaClient();
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      addresses: {
        orderBy: [{ preferred: "desc" }, { updatedAt: "desc" }],
      },
      orders: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      bonusAccount: true,
    },
  });

  if (!dbUser) {
    return null;
  }

  const preferredAddress = dbUser.addresses[0] ?? null;
  const latestOrder = dbUser.orders[0] ?? null;

  return {
    isAuthenticated: true,
    fullName:
      dbUser.fullName ??
      preferredAddress?.recipientName ??
      latestOrder?.customerName ??
      null,
    email: dbUser.email ?? latestOrder?.customerEmail ?? null,
    phone:
      preferredAddress?.recipientPhone ??
      latestOrder?.customerPhone ??
      dbUser.phone ??
      null,
    city: preferredAddress?.city ?? latestOrder?.city ?? "Нижний Новгород",
    bonusBalance: dbUser.bonusAccount?.balance ?? 0,
    welcomeIssued: dbUser.bonusAccount?.welcomeIssued ?? false,
    preferredPickupPoint: preferredAddress
      ? {
          id: preferredAddress.pickupPointCode ?? preferredAddress.id,
          title: preferredAddress.pickupPointTitle ?? preferredAddress.title,
          address: preferredAddress.pickupPointAddress,
          note: preferredAddress.preferred
            ? "Сохранённый основной ПВЗ из личного кабинета."
            : "Сохранённый ПВЗ из предыдущего заказа.",
          eta: latestOrder?.pickupPointEta ?? null,
        }
      : latestOrder
        ? {
            id: latestOrder.pickupPointCode,
            title: latestOrder.pickupPointTitle,
            address: latestOrder.pickupPointAddress,
            note: "Последний использованный пункт выдачи.",
            eta: latestOrder.pickupPointEta ?? null,
          }
        : null,
  };
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "long",
  }).format(date);
}

function formatOrderStatusLabel(status: OrderStatus) {
  switch (status) {
    case OrderStatus.NEW:
      return "Создан";
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
      return "Получен";
    case OrderStatus.CANCELLED:
      return "Отменён";
  }
}

function formatPaymentStatusLabel(status: PaymentStatus) {
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

function formatPaymentMethodLabel(method: PaymentMethod) {
  return method === PaymentMethod.SPLIT ? "Яндекс Split" : "Яндекс Pay";
}

function mapBonusTransactionTitle(type: BonusTransactionType) {
  switch (type) {
    case BonusTransactionType.WELCOME_ISSUED:
      return "Welcome-бонус";
    case BonusTransactionType.ORDER_APPLIED:
      return "Списание на заказ";
    case BonusTransactionType.MANUAL_ADJUSTMENT:
      return "Ручная корректировка";
  }
}

async function ensureBonusAccount(userId: string) {
  const prisma = getPrismaClient();
  const bonusAccount = await prisma.bonusAccount.findUnique({
    where: { userId },
  });

  if (!bonusAccount) {
    await prisma.bonusAccount.create({
      data: {
        userId,
        balance: WELCOME_BONUS_AMOUNT,
        welcomeIssued: true,
        transactions: {
          create: {
            type: BonusTransactionType.WELCOME_ISSUED,
            amount: WELCOME_BONUS_AMOUNT,
            balanceAfter: WELCOME_BONUS_AMOUNT,
            description: "Приветственный бонус за вход через Яндекс",
          },
        },
      },
    });
    return;
  }

  if (!bonusAccount.welcomeIssued) {
    const balanceAfter = bonusAccount.balance + WELCOME_BONUS_AMOUNT;
    await prisma.bonusAccount.update({
      where: { userId },
      data: {
        balance: balanceAfter,
        welcomeIssued: true,
        transactions: {
          create: {
            type: BonusTransactionType.WELCOME_ISSUED,
            amount: WELCOME_BONUS_AMOUNT,
            balanceAfter,
            description: "Приветственный бонус за вход через Яндекс",
          },
        },
      },
    });
  }
}

async function syncAddressesFromOrders(userId: string) {
  const prisma = getPrismaClient();
  const [orders, existingAddresses] = await Promise.all([
    prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        city: true,
        customerName: true,
        customerPhone: true,
        pickupPointCode: true,
        pickupPointTitle: true,
        pickupPointAddress: true,
      },
    }),
    prisma.address.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const seen = new Set(
    existingAddresses.map((address) =>
      `${address.pickupPointCode ?? ""}::${address.pickupPointAddress}`
    )
  );

  let createdCount = existingAddresses.length;

  for (const order of orders) {
    const key = `${order.pickupPointCode}::${order.pickupPointAddress}`;

    if (seen.has(key)) {
      continue;
    }

    createdCount += 1;
    seen.add(key);

    await prisma.address.create({
      data: {
        userId,
        title:
          createdCount === 1
            ? "Основной получатель"
            : `Сохранённый ПВЗ #${createdCount}`,
        city: order.city,
        recipientName: order.customerName,
        recipientPhone: order.customerPhone,
        pickupPointCode: order.pickupPointCode,
        pickupPointTitle: order.pickupPointTitle,
        pickupPointAddress: order.pickupPointAddress,
        preferred: createdCount === 1,
      },
    });
  }
}

export async function syncAccountCommerceProfile(
  userId: string,
  email: string | null
) {
  const prisma = getPrismaClient();
  const normalizedEmail = email?.trim().toLowerCase() || null;

  if (normalizedEmail) {
    await prisma.order.updateMany({
      where: {
        userId: null,
        customerEmail: normalizedEmail,
      },
      data: {
        userId,
        checkoutMode: "account",
      },
    });
  }

  await ensureBonusAccount(userId);
  await syncAddressesFromOrders(userId);
}

export async function getAccountDashboardData(
  user: AccountUser
): Promise<AccountDashboardData> {
  const prisma = getPrismaClient();
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            orderBy: { createdAt: "asc" },
          },
        },
      },
      addresses: {
        orderBy: [{ preferred: "desc" }, { updatedAt: "desc" }],
      },
      bonusAccount: {
        include: {
          transactions: {
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  if (!dbUser) {
    throw new Error("Authenticated account user not found in database.");
  }

  const orders: AccountOrderView[] = dbUser.orders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    dateLabel: formatDate(order.createdAt),
    statusLabel: formatOrderStatusLabel(order.status),
    paymentLabel: formatPaymentMethodLabel(order.paymentMethod),
    paymentStatusLabel: formatPaymentStatusLabel(order.paymentStatus),
    itemsCount: order.items.reduce((total, item) => total + item.quantity, 0),
    total: order.grandTotal,
    deliveryLabel: `${order.pickupPointTitle}, ${order.pickupPointAddress}`,
    bonusUsed: order.bonusApplied,
    createdAt: order.createdAt,
    items: order.items.map((item) => ({
      id: item.id,
      title: item.productTitle,
      quantity: item.quantity,
      lineTotal: item.lineTotal,
    })),
  }));

  const addresses: AccountAddressView[] = dbUser.addresses.map((address) => ({
    id: address.id,
    title: address.title,
    city: address.city,
    recipientName: address.recipientName,
    recipientPhone: address.recipientPhone,
    address: address.pickupPointAddress,
    note: address.pickupPointTitle
      ? `ПВЗ: ${address.pickupPointTitle}`
      : "Сохранённый пункт выдачи для быстрого повторного заказа.",
    preferred: address.preferred,
  }));

  const loyalty: AccountLoyaltyView = {
    balance: dbUser.bonusAccount?.balance ?? 0,
    welcomeIssued: dbUser.bonusAccount?.welcomeIssued ?? false,
    firstOrderDiscount: WELCOME_BONUS_AMOUNT,
    transactions:
      dbUser.bonusAccount?.transactions.map((transaction) => ({
        id: transaction.id,
        title: mapBonusTransactionTitle(transaction.type),
        description:
          transaction.description ||
          (transaction.type === BonusTransactionType.ORDER_APPLIED
            ? "Бонусы были использованы в оформленном заказе."
            : "Операция по бонусному счёту."),
        amount: transaction.amount,
        balanceAfter: transaction.balanceAfter,
        createdAtLabel: formatDate(transaction.createdAt),
      })) ?? [],
  };

  const activeOrders = orders.filter(
    (order) =>
      !["Получен", "Отменён"].includes(order.statusLabel)
  ).length;

  const stats = [
    {
      label: "Активные заказы",
      value: String(activeOrders),
      hint:
        activeOrders > 0
          ? "Здесь показаны все заказы, которые ещё не завершены."
          : "Сейчас активных заказов нет, но история покупок уже сохранена.",
    },
    {
      label: "Бонусный баланс",
      value: `${loyalty.balance} ₽`,
      hint: loyalty.welcomeIssued
        ? "Приветственный бонус уже начислен на счёт."
        : "Бонусы появятся после активации welcome-механики.",
    },
    {
      label: "Сохранённые получатели",
      value: String(addresses.length),
      hint:
        addresses.length > 0
          ? "Пункты выдачи и контакты можно быстро подставлять в следующий заказ."
          : "После первого заказа здесь появится сохранённый получатель.",
    },
  ];

  return {
    user: {
      id: dbUser.id,
      fullName: dbUser.fullName,
      email: dbUser.email,
    },
    stats,
    latestOrder: orders[0] ?? null,
    orders,
    addresses,
    loyalty,
  };
}

export async function getAccountOrderDetail(
  userId: string,
  orderId: string
): Promise<AccountOrderView | null> {
  const prisma = getPrismaClient();
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    include: {
      items: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!order) {
    return null;
  }

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    dateLabel: formatDate(order.createdAt),
    statusLabel: formatOrderStatusLabel(order.status),
    paymentLabel: formatPaymentMethodLabel(order.paymentMethod),
    paymentStatusLabel: formatPaymentStatusLabel(order.paymentStatus),
    itemsCount: order.items.reduce((total, item) => total + item.quantity, 0),
    total: order.grandTotal,
    deliveryLabel: `${order.pickupPointTitle}, ${order.pickupPointAddress}`,
    bonusUsed: order.bonusApplied,
    createdAt: order.createdAt,
    items: order.items.map((item) => ({
      id: item.id,
      title: item.productTitle,
      quantity: item.quantity,
      lineTotal: item.lineTotal,
    })),
  };
}
