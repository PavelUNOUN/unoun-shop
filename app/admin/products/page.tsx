import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin Products",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminProductsPage() {
  return (
    <AdminShell currentPath="/admin/products">
      <div className="rounded-[28px] border border-zinc-200 bg-zinc-50 px-6 py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
          Товары
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
          Следующий шаг в админке
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">
          Заказы уже подключаем в рабочем режиме. Следом сюда добавлю управление
          ценой, старой ценой, остатком и активностью товара так, чтобы это
          реально влияло на витрину и checkout, а не жило отдельно в базе.
        </p>
      </div>
    </AdminShell>
  );
}
