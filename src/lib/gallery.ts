import { prisma } from "./db";
import { GALLERY_ITEMS } from "./mockData";

const MOCK_ITEMS = GALLERY_ITEMS.map((m) => ({
  id: m.id,
  title: m.title,
  category: m.category,
  mediaType: m.mediaType === "video" ? "VIDEO" as const : "IMAGE" as const,
  src: m.src,
  description: m.description ?? null,
}));

export async function getPublicGallery(category?: string) {
  try {
    const items = await prisma.galleryItem.findMany({
      where: category ? { category } : undefined,
      include: { media: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    if (items.length === 0) return MOCK_ITEMS;
    return items.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      mediaType: item.media.type as "IMAGE" | "VIDEO",
      src: item.media.url,
      description: null,
    }));
  } catch {
    return MOCK_ITEMS;
  }
}
