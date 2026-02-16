import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const [galleryCount, giftedCount, requestsCount, productsCount, ordersCount] =
    await Promise.all([
      prisma.galleryItem.count(),
      prisma.giftedItem.count(),
      prisma.customRequest.count(),
      prisma.product.count(),
      prisma.order.count(),
    ]);

  const newRequests = await prisma.customRequest.count({
    where: { status: "NEW" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="mt-1 text-zinc-400">Panoramica del backoffice</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/admin/gallery"
          className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
        >
          <p className="text-3xl font-bold text-white">{galleryCount}</p>
          <p className="mt-1 text-sm text-zinc-400">Gallery</p>
        </Link>
        <Link
          href="/admin/gifted"
          className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
        >
          <p className="text-3xl font-bold text-white">{giftedCount}</p>
          <p className="mt-1 text-sm text-zinc-400">Gifted</p>
        </Link>
        <Link
          href="/admin/requests"
          className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
        >
          <p className="text-3xl font-bold text-white">{requestsCount}</p>
          <p className="mt-1 text-sm text-zinc-400">Richieste</p>
          {newRequests > 0 && (
            <p className="mt-2 text-sm text-amber-400">{newRequests} nuove</p>
          )}
        </Link>
        <Link
          href="/admin/products"
          className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
        >
          <p className="text-3xl font-bold text-white">{productsCount}</p>
          <p className="mt-1 text-sm text-zinc-400">Prodotti</p>
        </Link>
        <Link
          href="/admin/orders"
          className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700"
        >
          <p className="text-3xl font-bold text-white">{ordersCount}</p>
          <p className="mt-1 text-sm text-zinc-400">Ordini</p>
        </Link>
      </div>
    </div>
  );
}
