import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { updateProduct } from "@/actions/products";
import { createProductVariant, updateProductVariant, deleteProductVariant } from "@/actions/products";
import { ProductForm } from "../ProductForm";
import { VariantForm } from "./VariantForm";

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: true },
  });
  if (!product) notFound();

  async function submit(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || undefined;
    const baseType = (formData.get("baseType") as string) || undefined;
    const priceStr = formData.get("priceCents") as string;
    const priceCents = priceStr ? Math.round(parseFloat(priceStr) * 100) : null;
    const isActive = formData.get("isActive") === "on";
    if (!title) return;
    await updateProduct(id, {
      title,
      description,
      baseType,
      priceCents,
      isActive,
    });
    redirect("/admin/products");
  }

  return (
    <div>
      <Link href="/admin/products" className="text-sm text-zinc-400 hover:text-white">
        ← Prodotti
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-white">Modifica prodotto</h1>
      <ProductForm action={submit} defaultValues={product} />
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-white">Varianti</h2>
        <VariantForm productId={id} variants={product.variants} />
      </div>
    </div>
  );
}
