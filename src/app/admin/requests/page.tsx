import Link from "next/link";
import { getCustomRequests } from "@/actions/requests";

export default async function AdminRequestsPage() {
  const requests = await getCustomRequests();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Richieste custom</h1>
      <p className="mt-1 text-zinc-400">Lista richieste dal form pubblico</p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Data</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Status</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-zinc-400">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b border-zinc-800/50">
                <td className="px-4 py-3 text-zinc-400">
                  {new Date(r.createdAt).toLocaleDateString("it-IT")}
                </td>
                <td className="px-4 py-3 font-medium text-white">{r.contactEmail}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${
                      r.status === "NEW"
                        ? "bg-amber-500/20 text-amber-400"
                        : r.status === "DONE"
                          ? "bg-green-500/20 text-green-400"
                          : r.status === "REJECTED"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-zinc-500/20 text-zinc-400"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/requests/${r.id}`}
                    className="text-sm text-zinc-400 hover:text-white"
                  >
                    Dettaglio
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
