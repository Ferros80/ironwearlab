import { prisma } from "./db";
import { GIFTED_ARTISTS } from "./mockData";

const MOCK_ITEMS = GIFTED_ARTISTS.map((a) => ({
  id: a.id,
  name: a.name,
  imageSrc: a.imageSrc,
  caption: a.caption,
}));

export async function getPublicGifted() {
  try {
    const items = await prisma.giftedItem.findMany({
      include: { media: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    if (items.length === 0) return MOCK_ITEMS;
    return items.map((item) => ({
      id: item.id,
      name: item.name,
      imageSrc: item.media.url,
      caption: item.note ?? "",
    }));
  } catch {
    return MOCK_ITEMS;
  }
}
