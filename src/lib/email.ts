import { Resend } from "resend";
import type { CustomRequestInput } from "./validators";

const resend = new Resend(process.env.RESEND_API_KEY);

function buildHtml(data: CustomRequestInput): string {
  const inspiration = [
    data.inspirationLink1,
    data.inspirationLink2,
    data.inspirationLink3,
  ]
    .filter((s): s is string => typeof s === "string" && s.length > 0)
    .join(", ");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Richiesta Custom</title></head>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;line-height:1.6;">
  <h2>Nuova richiesta personalizzazione</h2>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>Cappellino base</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee;">${data.hatBase}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>Colore</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee;">${data.color}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>Taglia</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee;">${data.size ?? "-"}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>Tecniche</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee;">${data.techniques.join(", ")}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>Testo</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee;">${data.text ?? "-"}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>Palette</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee;">${data.palette ?? "-"}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>Link ispirazione</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee;">${inspiration || "-"}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>Budget</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee;">${data.budgetRange}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>Data desiderata</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee;">${data.desiredDate ?? "-"}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>Consegna</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee;">${data.delivery}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>Nome</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee;">${data.name}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>Email</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee;">${data.email}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>Telefono</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee;">${data.phone}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong>Instagram</strong></td><td style="padding:8px 0;border-bottom:1px solid #eee;">${data.instagram ?? "-"}</td></tr>
  </table>
</body>
</html>
  `.trim();
}

export async function sendCustomRequestEmail(data: CustomRequestInput): Promise<{ ok: boolean; error?: string }> {
  const from = process.env.RESEND_FROM ?? "onboarding@resend.dev";
  const to = process.env.RESEND_TO ?? "delivered@resend.dev";

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `[Custom Request] ${data.name} - ${data.hatBase} ${data.color}`,
    html: buildHtml(data),
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
