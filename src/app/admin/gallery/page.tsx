import Link from "next/link";
import Image from "next/image";
import { getGalleryItems } from "@/actions/gallery";
import { deleteGalleryItem } from "@/actions/gallery";
import { GalleryDeleteBtn } from "./GalleryDeleteBtn";

export default async function AdminGalleryPage() {
  const items = await getGalleryItems();

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-white sm:text-2xl">Gallery</h1>
        <Link
          href="/admin/gallery/new"
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
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Titolo</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Categoria</th>
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
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-white">{item.title}</td>
                <td className="px-4 py-3 text-zinc-400">{item.category}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/gallery/${item.id}`}
                    className="mr-2 text-sm text-zinc-400 hover:text-white"
                  >
                    Modifica
                  </Link>
                  <GalleryDeleteBtn id={item.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
