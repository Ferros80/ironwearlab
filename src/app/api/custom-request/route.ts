import { NextResponse } from "next/server";
import { customRequestSchema } from "@/lib/validators";
import { checkRateLimit } from "@/lib/rateLimit";
import { sendCustomRequestEmail } from "@/lib/email";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const rate = checkRateLimit(request);
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Troppi tentativi. Riprova più tardi." },
      {
        status: 429,
        headers: rate.retryAfter ? { "Retry-After": String(rate.retryAfter) } : undefined,
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body non valido" }, { status: 400 });
  }

  if (body && typeof body === "object" && "honeypot" in body && body.honeypot) {
    return NextResponse.json({ success: true });
  }

  const result = customRequestSchema.safeParse(body);
  if (!result.success) {
    const msg = result.error.issues[0]?.message ?? "Dati non validi";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const data = result.data;
  const payload = JSON.stringify(data);

  const customRequest = await prisma.customRequest.create({
    data: {
      payloadJson: payload,
      status: "NEW",
      contactEmail: data.email,
      contactPhone: data.phone,
      instagram: data.instagram,
    },
  });

  const emailResult = await sendCustomRequestEmail(data);
  if (!emailResult.ok) {
    await prisma.customRequest.update({
      where: { id: customRequest.id },
      data: { adminNotes: `Email fallita: ${emailResult.error}` },
    });
    return NextResponse.json(
      { error: emailResult.error ?? "Errore invio email" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
