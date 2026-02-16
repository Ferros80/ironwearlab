import { redirect } from "next/navigation";
import Link from "next/link";
import { createProduct } from "@/actions/products";
import { ProductForm } from "../ProductForm";

export default function AdminProductNewPage() {
  async function submit(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || undefined;
    const baseType = (formData.get("baseType") as string) || undefined;
    const priceStr = formData.get("priceCents") as string;
    const priceCents = priceStr ? Math.round(parseFloat(priceStr) * 100) : null;
    const isActive = formData.get("isActive") === "on";
    if (!title) return;
    await createProduct({
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
      <h1 className="mt-4 text-2xl font-bold text-white">Nuovo prodotto</h1>
      <ProductForm action={submit} />
    </div>
  );
}
