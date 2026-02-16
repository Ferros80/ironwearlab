import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUsers, createUser, deleteUser } from "@/actions/users";
import { UserCreateForm } from "./UserCreateForm";
import { UserDeleteBtn } from "./UserDeleteBtn";

export default async function AdminUsersPage() {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") {
    redirect("/admin");
  }

  const users = await getUsers();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Utenti</h1>
      <p className="mt-1 text-zinc-400">Solo ADMIN può gestire gli utenti</p>
      <div className="mt-6 max-w-md">
        <h2 className="font-semibold text-white">Nuovo utente</h2>
        <UserCreateForm action={createUser} />
      </div>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Nome</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-400">Ruolo</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-zinc-400">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-zinc-800/50">
                <td className="px-4 py-3 font-medium text-white">{u.email}</td>
                <td className="px-4 py-3 text-zinc-400">{u.name ?? "-"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${
                      u.role === "ADMIN" ? "bg-amber-500/20 text-amber-400" : "bg-zinc-500/20 text-zinc-400"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <UserDeleteBtn id={u.id} action={deleteUser} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
