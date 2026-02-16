"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function getUsers() {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") {
    throw new Error("Non autorizzato");
  }
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
}

export async function createUser(data: {
  email: string;
  name?: string;
  password: string;
  role: "ADMIN" | "EDITOR";
}) {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") {
    throw new Error("Non autorizzato");
  }
  const hash = await bcrypt.hash(data.password, 12);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      passwordHash: hash,
      role: data.role,
    },
    select: { id: true, email: true, name: true, role: true },
  });
  revalidatePath("/admin/users");
  return user;
}

export async function deleteUser(id: string) {
  const session = await auth();
  if ((session?.user as { role?: string })?.role !== "ADMIN") {
    throw new Error("Non autorizzato");
  }
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}
