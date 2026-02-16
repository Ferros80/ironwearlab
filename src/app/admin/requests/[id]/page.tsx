import { notFound } from "next/navigation";
import Link from "next/link";
import { getCustomRequestById } from "@/actions/requests";
import { updateRequestStatus } from "@/actions/requests";
import { RequestStatusForm } from "./RequestStatusForm";

export default async function AdminRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const req = await getCustomRequestById(id);
  if (!req) notFound();

  let payload: Record<string, unknown> = {};
  try {
    payload = JSON.parse(req.payloadJson);
  } catch {
    payload = {};
  }

  return (
    <div>
      <Link href="/admin/requests" className="text-sm text-zinc-400 hover:text-white">
        ← Richieste
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-white">
        Richiesta {req.id.slice(0, 8)}...
      </h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-semibold text-white">Dati form</h2>
          <dl className="mt-4 space-y-2 text-sm">
            {Object.entries(payload).map(([k, v]) => {
              if (k === "honeypot") return null;
              const val = Array.isArray(v) ? v.join(", ") : String(v ?? "-");
              return (
                <div key={k} className="flex gap-2">
                  <dt className="min-w-[140px] text-zinc-500">{k}</dt>
                  <dd className="text-zinc-300">{val}</dd>
                </div>
              );
            })}
          </dl>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h2 className="font-semibold text-white">Contatti</h2>
          <p className="mt-2 text-zinc-300">{req.contactEmail}</p>
          {req.contactPhone && (
            <p className="text-zinc-300">{req.contactPhone}</p>
          )}
          {req.instagram && (
            <p className="text-zinc-400">@{req.instagram}</p>
          )}
          <h2 className="mt-6 font-semibold text-white">Azioni</h2>
          <RequestStatusForm
            id={req.id}
            status={req.status}
            adminNotes={req.adminNotes}
            action={updateRequestStatus}
          />
        </div>
      </div>
    </div>
  );
}
