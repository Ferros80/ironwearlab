import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { updateGalleryItem } from "@/actions/gallery";
import { GalleryForm } from "../GalleryForm";

export default async function AdminGalleryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.galleryItem.findUnique({
    where: { id },
    include: { media: true },
  });
  if (!item) notFound();

  async function submit(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const mediaId = formData.get("mediaId") as string;
    const featured = formData.get("featured") === "on";
    if (!title || !category || !mediaId) return;
    await updateGalleryItem(id, { title, category, mediaId, featured });
    redirect("/admin/gallery");
  }

  return (
    <div>
      <Link href="/admin/gallery" className="text-sm text-zinc-400 hover:text-white">
        ← Gallery
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-white">Modifica gallery</h1>
      <GalleryForm action={submit} defaultValues={item} />
    </div>
  );
}
