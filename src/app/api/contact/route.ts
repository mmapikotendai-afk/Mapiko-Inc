import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, isContactConfigured } from "@/lib/contact";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return NextResponse.json(
      { error: "Please submit your enquiry from this website." },
      { status: 403 },
    );
  if (Number(request.headers.get("content-length") || 0) > 20000)
    return NextResponse.json(
      { error: "Your enquiry is too long. Please shorten it and try again." },
      { status: 413 },
    );
  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > 20000)
      return NextResponse.json(
        { error: "Your enquiry is too long." },
        { status: 413 },
      );
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { error: "We could not read your enquiry. Please try again." },
      { status: 400 },
    );
  }
  const result = contactSchema.safeParse(raw);
  if (!result.success)
    return NextResponse.json(
      {
        error: result.error.issues[0]?.message || "Please check your details.",
      },
      { status: 400 },
    );
  const data = result.data;
  if (
    data.website ||
    Date.now() - data.startedAt < 2000 ||
    data.startedAt > Date.now() ||
    Date.now() - data.startedAt > 86400000
  )
    return NextResponse.json(
      { error: "Please refresh the page and try again." },
      { status: 400 },
    );
  if (!isContactConfigured())
    return NextResponse.json(
      {
        error:
          "Email enquiries are temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    );
  const idempotencyKey = request.headers.get("idempotency-key");
  if (!idempotencyKey || !/^[\da-f-]{36}$/i.test(idempotencyKey))
    return NextResponse.json(
      { error: "Please refresh the page and try again." },
      { status: 400 },
    );
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data: sent, error } = await resend.emails.send(
      {
        from: process.env.CONTACT_FROM_EMAIL!,
        to: process.env.CONTACT_TO_EMAIL!,
        replyTo: data.email,
        subject: `Mapiko Inc. project enquiry: ${data.service}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Organisation: ${data.organisation || "Not supplied"}`,
          `Service: ${data.service}`,
          `Budget: ${data.budget || "Not supplied"}`,
          `Timeframe: ${data.timeframe || "Not supplied"}`,
          "",
          data.message,
        ].join("\n"),
      },
      { idempotencyKey },
    );
    if (error || !sent?.id)
      return NextResponse.json(
        {
          error:
            "Your enquiry could not be sent. Your details are still here; please try again.",
        },
        { status: 502 },
      );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "We could not connect to the email service. Please try again." },
      { status: 502 },
    );
  }
}
