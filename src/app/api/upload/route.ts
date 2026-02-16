import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const alt = (formData.get("alt") as string) || null;

  if (!file) {
    return NextResponse.json({ error: "Nessun file" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Tipo file non supportato" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File troppo grande (max 10MB)" }, { status: 400 });
  }

  const ext = path.extname(file.name) || (file.type.startsWith("video/") ? ".mp4" : ".jpg");
  const base = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const filename = `${base}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filepath = path.join(uploadDir, filename);

  await mkdir(uploadDir, { recursive: true });
  const bytes = await file.arrayBuffer();
  await writeFile(filepath, Buffer.from(bytes));

  const url = `/uploads/${filename}`;
  const mediaType = file.type.startsWith("video/") ? "VIDEO" : "IMAGE";

  const media = await prisma.media.create({
    data: {
      type: mediaType,
      url,
      alt,
      width: null,
      height: null,
    },
  });

  return NextResponse.json({ id: media.id, url, type: mediaType });
}
