"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  return prisma.product.findMany({
    include: { variants: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { variants: true },
  });
}

export async function createProduct(data: {
  title: string;
  description?: string;
  baseType?: string;
  priceCents?: number | null;
  isActive?: boolean;
}) {
  const product = await prisma.product.create({
    data: { ...data, isActive: data.isActive ?? true },
  });
  revalidatePath("/admin/products");
  return product;
}

export async function updateProduct(
  id: string,
  data: { title?: string; description?: string; baseType?: string; priceCents?: number | null; isActive?: boolean }
) {
  const product = await prisma.product.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/products");
  return product;
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}

export async function createProductVariant(data: {
  productId: string;
  sku?: string;
  color?: string;
  size?: string;
  stock?: number;
}) {
  const v = await prisma.productVariant.create({
    data: { ...data, stock: data.stock ?? 0 },
  });
  revalidatePath("/admin/products");
  return v;
}

export async function updateProductVariant(
  id: string,
  data: { sku?: string; color?: string; size?: string; stock?: number }
) {
  const v = await prisma.productVariant.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/products");
  return v;
}

export async function deleteProductVariant(id: string) {
  await prisma.productVariant.delete({ where: { id } });
  revalidatePath("/admin/products");
}
