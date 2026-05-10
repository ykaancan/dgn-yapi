import { NextResponse } from "next/server";
import { Resend } from "resend";

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

    if (!apiKey) {
      console.warn("[contact] RESEND_API_KEY not set, logging only");
      console.log({ name, phone, email, message });
      return NextResponse.json({ ok: true, dev: true });
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
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
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error", err);
    return NextResponse.json({ error: "send failed" }, { status: 500 });
  }
}
