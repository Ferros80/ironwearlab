import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;

  return <AdminShell role={role}>{children}</AdminShell>;
}
