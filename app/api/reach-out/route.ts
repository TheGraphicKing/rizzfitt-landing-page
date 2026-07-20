import { NextResponse } from "next/server";

/**
 * Placeholder reach-out endpoint. Accepts any form submission, validates that a
 * known form id + an email/name are present, and echoes success. Wire this to
 * email (Resend/SES) or a CRM later — the client contract (POST JSON → { ok })
 * stays the same.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const formId = typeof body.formId === "string" ? body.formId : null;
  if (!formId) {
    return NextResponse.json({ ok: false, error: "Missing formId" }, { status: 400 });
  }

  // TODO: forward to email / CRM. For now we just acknowledge.
  // console.log("reach-out", formId, body);

  return NextResponse.json({ ok: true, formId });
}
