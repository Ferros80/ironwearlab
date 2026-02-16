"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getCustomRequests(status?: string) {
  return prisma.customRequest.findMany({
    where: status ? { status: status } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function getCustomRequestById(id: string) {
  return prisma.customRequest.findUnique({
    where: { id },
  });
}

export async function updateRequestStatus(
  id: string,
  data: { status?: string; adminNotes?: string }
) {
  const item = await prisma.customRequest.update({
    where: { id },
    data: {
      ...(data.status && { status: data.status as "NEW" | "IN_PROGRESS" | "DONE" | "REJECTED" }),
      ...(data.adminNotes !== undefined && { adminNotes: data.adminNotes }),
    },
  });
  revalidatePath("/admin/requests");
  return item;
}
