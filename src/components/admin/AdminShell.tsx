"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

interface AdminShellProps {
  children: React.ReactNode;
  role?: string;
}

export function AdminShell({ children, role }: AdminShellProps) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <div className="min-h-screen bg-zinc-950">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar role={role} />
      <main className="ml-56 flex-1 p-6">{children}</main>
    </div>
  );
}
