import Link from "next/link";
import Image from "next/image";
import { getGiftedItems } from "@/actions/gifted";
import { GiftedDeleteBtn } from "./GiftedDeleteBtn";

export default async function AdminGiftedPage() {
  const items = await getGiftedItems();

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-white sm:text-2xl">Gifted</h1>
        <Link
          href="/admin/gifted/new"
          className="inline-flex min-h-[44px] w-fit items-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950"
        >
          + Nuovo
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Immagine</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Nome</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Nota</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-zinc-400">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-zinc-800/50">
                <td className="px-4 py-3">
                  <div className="relative size-12 overflow-hidden rounded bg-zinc-800">
                    <Image
                      src={item.media.url}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                <td className="px-4 py-3 text-zinc-400">{item.note ?? "-"}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/gifted/${item.id}`}
                    className="mr-2 text-sm text-zinc-400 hover:text-white"
                  >
                    Modifica
                  </Link>
                  <GiftedDeleteBtn id={item.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
