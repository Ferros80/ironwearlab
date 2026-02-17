import Link from "next/link";
import { getProducts } from "@/actions/products";
import { deleteProduct } from "@/actions/products";
import { ProductDeleteBtn } from "./ProductDeleteBtn";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-white sm:text-2xl">Prodotti</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex min-h-[44px] w-fit items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950"
        >
          + Nuovo
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Titolo</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Base</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Prezzo</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Varianti</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-zinc-400">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-zinc-800/50">
                <td className="px-4 py-3 font-medium text-white">{p.title}</td>
                <td className="px-4 py-3 text-zinc-400">{p.baseType ?? "-"}</td>
                <td className="px-4 py-3 text-zinc-400">
                  {p.priceCents != null ? `${(p.priceCents / 100).toFixed(2)}€` : "-"}
                </td>
                <td className="px-4 py-3 text-zinc-400">{p.variants.length}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="mr-2 text-sm text-zinc-400 hover:text-white"
                  >
                    Modifica
                  </Link>
                  <ProductDeleteBtn id={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
