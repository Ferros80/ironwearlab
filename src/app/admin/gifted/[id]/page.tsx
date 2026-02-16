import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { updateGiftedItem } from "@/actions/gifted";
import { GiftedForm } from "../GiftedForm";

export default async function AdminGiftedEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.giftedItem.findUnique({
    where: { id },
    include: { media: true },
  });
  if (!item) notFound();

  async function submit(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const note = (formData.get("note") as string) || undefined;
    const mediaId = formData.get("mediaId") as string;
    if (!name || !mediaId) return;
    await updateGiftedItem(id, { name, note, mediaId });
    redirect("/admin/gifted");
  }

  return (
    <div>
      <Link href="/admin/gifted" className="text-sm text-zinc-400 hover:text-white">
        ← Gifted
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-white">Modifica gifted</h1>
      <GiftedForm action={submit} defaultValues={item} />
    </div>
  );
}
