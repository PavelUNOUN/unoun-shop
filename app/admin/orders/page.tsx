import { formatPrice } from "@/lib/catalog";
import AdminShell from "@/components/admin/AdminShell";
import {
  ADMIN_ORDER_STATUS_OPTIONS,
  formatOrderStatusLabel,
  getAdminOrders,
} from "@/server/admin/orders";

export const metadata = {
  title: "Admin Orders",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <AdminShell currentPath="/admin/orders">
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="rounded-[28px] border border-zinc-200 bg-zinc-50 px-6 py-8 text-sm text-zinc-600">
            Заказов пока нет. Как только придёт первый заказ, он появится здесь.
          </div>
        ) : null}

        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-[28px] border border-zinc-200 bg-zinc-50/70 p-5 shadow-[0_20px_60px_-55px_rgba(24,24,27,0.45)] md:p-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                    {new Intl.DateTimeFormat("ru-RU", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(order.createdAt)}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
                    {order.orderNumber}
                  </h2>
                </div>

                <div className="grid gap-3 text-sm text-zinc-700 md:grid-cols-2">
                  <p>
                    <span className="font-semibold text-zinc-950">Клиент:</span>{" "}
                    {order.customerName}
                  </p>
                  <p>
                    <span className="font-semibold text-zinc-950">Телефон:</span>{" "}
                    {order.customerPhone}
                  </p>
                  <p>
                    <span className="font-semibold text-zinc-950">Email:</span>{" "}
                    {order.customerEmail}
                  </p>
                  <p>
                    <span className="font-semibold text-zinc-950">Город:</span>{" "}
                    {order.city}
                  </p>
                  <p className="md:col-span-2">
                    <span className="font-semibold text-zinc-950">ПВЗ:</span>{" "}
                    {order.pickupPointTitle}, {order.pickupPointAddress}
                  </p>
                </div>

                <div className="rounded-2xl border border-white bg-white px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                    Состав заказа
                  </p>
                  <div className="mt-3 space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col justify-between gap-1 text-sm text-zinc-700 sm:flex-row sm:items-center"
                      >
                        <span>
                          {item.productTitle} × {item.quantity}
                        </span>
                        <span className="font-semibold text-zinc-950">
                          {formatPrice(item.lineTotal)} ₽
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full rounded-[24px] border border-white bg-white p-4 sm:max-w-xs">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Управление
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
                  {formatPrice(order.grandTotal)} ₽
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  Способ оплаты: {order.paymentMethod === "SPLIT" ? "Split" : "Полная онлайн-оплата"}
                </p>

                <form action="/api/admin/orders/status" method="POST" className="mt-5 space-y-3">
                  <input type="hidden" name="orderId" value={order.id} />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-zinc-700">
                      Статус заказа
                    </label>
                    <select
                      name="status"
                      defaultValue={order.status}
                      className="h-11 rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-900 outline-none transition-colors duration-150 focus:border-zinc-900 focus:bg-white"
                    >
                      {ADMIN_ORDER_STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {formatOrderStatusLabel(status)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-11 w-full items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-black"
                  >
                    Сохранить статус
                  </button>
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
