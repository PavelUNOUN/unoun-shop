import AdminShell from "@/components/admin/AdminShell";
import { getStorefrontFlagshipProduct } from "@/server/catalog/flagshipProduct";

export const metadata = {
  title: "Admin Products",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const product = await getStorefrontFlagshipProduct();

  return (
    <AdminShell currentPath="/admin/products">
      <div className="space-y-4">
        {params.saved === "1" ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Изменения по товару сохранены.
          </div>
        ) : null}

        {params.error === "invalid" ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Не удалось сохранить товар. Проверь поля цены и названия.
          </div>
        ) : null}

        <div className="rounded-[28px] border border-zinc-200 bg-zinc-50 px-6 py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
            Флагманский товар
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
            Управление витриной без входа в код
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">
            На этом этапе лучше не делать большой каталог сразу. Правильнее
            сначала дать тебе полный контроль над главным товаром: цена, старая
            цена, остаток и активность. Когда это стабильно заработает на
            витрине, следующим шагом добавим создание новых товаров и
            аксессуаров.
          </p>

          <form action="/api/admin/products" method="POST" className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-medium text-zinc-700">Название</label>
              <input
                name="title"
                defaultValue={product.title}
                className="h-12 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition-colors duration-150 focus:border-zinc-900"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700">Короткое название</label>
              <input
                name="shortTitle"
                defaultValue={product.shortTitle}
                className="h-12 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition-colors duration-150 focus:border-zinc-900"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700">Остаток</label>
              <input
                name="stock"
                type="number"
                min="0"
                defaultValue={product.stock}
                className="h-12 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition-colors duration-150 focus:border-zinc-900"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700">Текущая цена</label>
              <input
                name="price"
                type="number"
                min="0"
                defaultValue={product.price}
                className="h-12 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition-colors duration-150 focus:border-zinc-900"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700">Старая цена</label>
              <input
                name="originalPrice"
                type="number"
                min="0"
                defaultValue={product.originalPrice}
                className="h-12 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition-colors duration-150 focus:border-zinc-900"
                required
              />
            </div>

            <label className="inline-flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 md:col-span-2">
              <input
                name="isActive"
                type="checkbox"
                defaultChecked={product.isActive}
                className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
              />
              Показывать товар на витрине и разрешать покупку
            </label>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-black"
              >
                Сохранить товар
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
