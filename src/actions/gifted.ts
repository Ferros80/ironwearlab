"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getGiftedItems() {
  return prisma.giftedItem.findMany({
    include: { media: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function createGiftedItem(data: {
  name: string;
  note?: string;
  mediaId: string;
}) {
  const item = await prisma.giftedItem.create({
    data,
  });
  revalidatePath("/gifted");
  revalidatePath("/admin/gifted");
  return item;
}

export async function updateGiftedItem(
  id: string,
  data: { name?: string; note?: string; mediaId?: string; sortOrder?: number }
) {
  const item = await prisma.giftedItem.update({
    where: { id },
    data,
  });
  revalidatePath("/gifted");
  revalidatePath("/admin/gifted");
  return item;
}

export async function deleteGiftedItem(id: string) {
  await prisma.giftedItem.delete({ where: { id } });
  revalidatePath("/gifted");
  revalidatePath("/admin/gifted");
}
