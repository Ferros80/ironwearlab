import { prisma } from "@/lib/db";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Ordini</h1>
      <p className="mt-1 text-zinc-400">
        Stub: gestione ordini (shop non ancora attivo)
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Data</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Totale</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Email</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                  Nessun ordine
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-b border-zinc-800/50">
                  <td className="px-4 py-3 font-mono text-sm text-zinc-400">
                    {o.id.slice(0, 8)}...
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    {new Date(o.createdAt).toLocaleDateString("it-IT")}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded px-2 py-0.5 text-xs font-medium bg-zinc-500/20 text-zinc-400">
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    {(o.totalCents / 100).toFixed(2)}€
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{o.customerEmail ?? "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
