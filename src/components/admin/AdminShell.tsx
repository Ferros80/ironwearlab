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
      <main className="flex-1 p-4 pt-16 md:ml-56 md:p-6 md:pt-6">{children}</main>
    </div>
  );
}
