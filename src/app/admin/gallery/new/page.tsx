import { redirect } from "next/navigation";
import Link from "next/link";
import { createGalleryItem } from "@/actions/gallery";
import { GalleryForm } from "../GalleryForm";

export default function AdminGalleryNewPage() {
  async function submit(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const mediaId = formData.get("mediaId") as string;
    const featured = formData.get("featured") === "on";
    if (!title || !category || !mediaId) return;
    await createGalleryItem({ title, category, mediaId, featured });
    redirect("/admin/gallery");
  }

  return (
    <div>
      <Link href="/admin/gallery" className="text-sm text-zinc-400 hover:text-white">
        ← Gallery
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-white">Nuovo item gallery</h1>
      <GalleryForm action={submit} />
    </div>
  );
}
