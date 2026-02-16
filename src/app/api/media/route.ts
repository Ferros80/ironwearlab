import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type"); // IMAGE | VIDEO
  const q = searchParams.get("q") || "";

  const media = await prisma.media.findMany({
    where: {
      ...(type ? { type: type as "IMAGE" | "VIDEO" } : {}),
      ...(q ? { OR: [{ url: { contains: q } }, { alt: { contains: q } }] } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(media);
}
