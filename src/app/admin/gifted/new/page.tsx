import { redirect } from "next/navigation";
import Link from "next/link";
import { createGiftedItem } from "@/actions/gifted";
import { GiftedForm } from "../GiftedForm";

export default function AdminGiftedNewPage() {
  async function submit(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const note = (formData.get("note") as string) || undefined;
    const mediaId = formData.get("mediaId") as string;
    if (!name || !mediaId) return;
    await createGiftedItem({ name, note, mediaId });
    redirect("/admin/gifted");
  }

  return (
    <div>
      <Link href="/admin/gifted" className="text-sm text-zinc-400 hover:text-white">
        ← Gifted
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-white">Nuovo gifted</h1>
      <GiftedForm action={submit} />
    </div>
  );
}
