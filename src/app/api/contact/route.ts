import { NextResponse } from "next/server";
import { Resend } from "resend";

const escapeHtml = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message, website, _ts } = body as Record<string, string>;

    // Honeypot: real users can't fill an off-screen field. Drop silently with
    // a 200 so bots can't detect the rejection and try a different vector.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    // The form always sends a numeric mount timestamp; if it's missing, the
    // submission came from a non-JS bot POSTing directly to the endpoint.
    if (!Number.isFinite(Number(_ts))) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !phone) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO ?? "bilgi@dgnyapi.tr";
    const from = process.env.CONTACT_FROM ?? "DGN Yapı <onboarding@resend.dev>";
    const referer = request.headers.get("referer");

    if (!apiKey) {
      console.warn("[contact] RESEND_API_KEY not set, logging only");
      console.log({ name, phone, email, message, referer });
      return NextResponse.json({ ok: true, dev: true });
    }

    const phoneTel = phone.replace(/[^0-9+]/g, "");
    const resend = new Resend(apiKey);
    const { data, error: sendError } = await resend.emails.send({
      from,
      to,
      replyTo: email || undefined,
      subject: `Yeni İletişim Formu — ${name}`,
      text: [
        `Ad: ${name}`,
        `Telefon: ${phone}`,
        `E-posta: ${email || "—"}`,
        ``,
        `Mesaj:`,
        message || "—",
        ...(referer ? [``, `Form sayfası: ${referer}`] : []),
      ].join("\n"),
      html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; color: #111;">
  <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600;">Yeni İletişim Formu</h2>
  <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
    <tr>
      <td style="padding: 6px 16px 6px 0; color: #666; vertical-align: top; white-space: nowrap;">Ad</td>
      <td style="padding: 6px 0;"><strong>${escapeHtml(name)}</strong></td>
    </tr>
    <tr>
      <td style="padding: 6px 16px 6px 0; color: #666; vertical-align: top; white-space: nowrap;">Telefon</td>
      <td style="padding: 6px 0;"><a href="tel:${escapeHtml(phoneTel)}" style="color: #b87333; text-decoration: none;">${escapeHtml(phone)}</a></td>
    </tr>
    <tr>
      <td style="padding: 6px 16px 6px 0; color: #666; vertical-align: top; white-space: nowrap;">E-posta</td>
      <td style="padding: 6px 0;">${email ? `<a href="mailto:${escapeHtml(email)}" style="color: #b87333; text-decoration: none;">${escapeHtml(email)}</a>` : "—"}</td>
    </tr>
    ${
      referer
        ? `<tr>
      <td style="padding: 6px 16px 6px 0; color: #666; vertical-align: top; white-space: nowrap;">Form sayfası</td>
      <td style="padding: 6px 0;"><a href="${escapeHtml(referer)}" style="color: #b87333; text-decoration: none;">${escapeHtml(referer)}</a></td>
    </tr>`
        : ""
    }
  </table>
  <div style="margin-top: 18px; padding: 14px 16px; background: #f5f5f5; border-radius: 8px;">
    <div style="color: #666; font-size: 12px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em;">Mesaj</div>
    <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${escapeHtml(message || "—")}</div>
  </div>
</div>
      `.trim(),
    });

    if (sendError) {
      console.error("[contact] resend rejected", { sendError, to, from });
      return NextResponse.json({ error: "send failed" }, { status: 502 });
    }
    console.log("[contact] sent", { id: data?.id, to });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json({ error: "send failed" }, { status: 500 });
  }
}
