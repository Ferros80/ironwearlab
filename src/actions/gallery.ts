"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getGalleryItems(category?: string) {
  return prisma.galleryItem.findMany({
    where: category ? { category } : undefined,
    include: { media: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function createGalleryItem(data: {
  title: string;
  category: string;
  mediaId: string;
  featured?: boolean;
}) {
  const item = await prisma.galleryItem.create({
    data: { ...data, featured: data.featured ?? false },
  });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  return item;
}

export async function updateGalleryItem(
  id: string,
  data: { title?: string; category?: string; mediaId?: string; featured?: boolean; sortOrder?: number }
) {
  const item = await prisma.galleryItem.update({
    where: { id },
    data,
  });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  return item;
}

export async function deleteGalleryItem(id: string) {
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}
