import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { rateLimit } from "@/lib/rateLimit";

// ── Rate-limit config ───────────────────────────────────────────────
const RATE_LIMIT = 3; // max submissions
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// ── Lazy-initialized SMTP transport ─────────────────────────────────
let _transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false, // STARTTLS on port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return _transporter;
}

// ── Validation helpers ──────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  fullName: string;
  workEmail: string;
  institution: string;
  phone: string;
  countryCode: string;
  message: string;
  inquiryType: string;
};

function validatePayload(body: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const b = body as Record<string, unknown>;

  const fullName = String(b.fullName ?? "").trim();
  const workEmail = String(b.workEmail ?? "").trim();
  const institution = String(b.institution ?? "").trim();
  const phone = String(b.phone ?? "").trim();
  const countryCode = String(b.countryCode ?? "").trim();
  const message = String(b.message ?? "").trim();
  const inquiryType = String(b.inquiryType ?? "Other").trim();

  if (!fullName) return { ok: false, error: "Full name is required." };
  if (!workEmail || !EMAIL_RE.test(workEmail)) return { ok: false, error: "A valid work email is required." };
  if (!institution) return { ok: false, error: "Hospital / institution is required." };
  if (!message) return { ok: false, error: "Message is required." };

  return { ok: true, data: { fullName, workEmail, institution, phone, countryCode, message, inquiryType } };
}

// ── Email composition ───────────────────────────────────────────────
function composeEmail(data: ContactPayload, ip: string): { subject: string; html: string; text: string } {
  const subjectParts =
    data.inquiryType === "Other"
      ? ["ASTA Inquiry", data.institution || data.fullName]
      : ["ASTA Inquiry", data.inquiryType, data.institution || data.fullName];
  const subject = subjectParts.filter(Boolean).join(" · ");

  const phoneDisplay = data.phone
    ? `${data.countryCode} ${data.phone}`
    : "Not provided";

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const html = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 28px 32px;">
      <h1 style="margin: 0; font-size: 18px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
        New Contact Inquiry
      </h1>
      <p style="margin: 6px 0 0; font-size: 12px; color: rgba(255,255,255,0.55); font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em;">
        ASTA Health Tech · Inquiry Portal
      </p>
    </div>

    <!-- Inquiry type badge -->
    <div style="padding: 20px 32px 0;">
      <span style="display: inline-block; padding: 5px 14px; font-size: 12px; font-weight: 600; color: #4F6BFF; background: rgba(79,107,255,0.08); border: 1px solid rgba(79,107,255,0.20); border-radius: 20px;">
        ${data.inquiryType}
      </span>
    </div>

    <!-- Details table -->
    <div style="padding: 20px 32px 28px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 0; color: #64748b; font-weight: 500; width: 140px; vertical-align: top;">Full Name</td>
          <td style="padding: 12px 0; color: #0f172a; font-weight: 600;">${escapeHtml(data.fullName)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 0; color: #64748b; font-weight: 500; vertical-align: top;">Work Email</td>
          <td style="padding: 12px 0; color: #0f172a;">
            <a href="mailto:${escapeHtml(data.workEmail)}" style="color: #4F6BFF; text-decoration: none;">${escapeHtml(data.workEmail)}</a>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 0; color: #64748b; font-weight: 500; vertical-align: top;">Institution</td>
          <td style="padding: 12px 0; color: #0f172a;">${escapeHtml(data.institution)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 0; color: #64748b; font-weight: 500; vertical-align: top;">Phone</td>
          <td style="padding: 12px 0; color: #0f172a;">${escapeHtml(phoneDisplay)}</td>
        </tr>
      </table>

      <!-- Message -->
      <div style="margin-top: 20px; padding: 16px 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;">
        <div style="font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
          Message
        </div>
        <div style="font-size: 14px; color: #1e293b; line-height: 1.65; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 16px 32px; background: #f8fafc; border-top: 1px solid #e5e7eb; font-size: 11px; color: #94a3b8;">
      Submitted ${timestamp} IST · IP ${ip}
    </div>
  </div>`;

  const text = [
    `New Contact Inquiry — ${data.inquiryType}`,
    ``,
    `Full Name: ${data.fullName}`,
    `Work Email: ${data.workEmail}`,
    `Institution: ${data.institution}`,
    `Phone: ${phoneDisplay}`,
    ``,
    `Message:`,
    data.message,
    ``,
    `Submitted ${timestamp} IST · IP ${ip}`,
  ].join("\n");

  return { subject, html, text };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Route handler ───────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // 1. Resolve client IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    // 2. Rate-limit check
    const rl = rateLimit(ip, RATE_LIMIT, RATE_WINDOW_MS);
    if (!rl.success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfterMs: rl.resetIn,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rl.resetIn / 1000)),
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    // 3. Parse and validate
    const body = await request.json().catch(() => null);
    const validation = validatePayload(body);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // 4. Compose and send
    const { subject, html, text } = composeEmail(validation.data, ip);

    await getTransporter().sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: process.env.CONTACT_RECIPIENT,
      replyTo: validation.data.workEmail,
      subject,
      html,
      text,
    });

    return NextResponse.json(
      { message: "Inquiry sent successfully." },
      {
        status: 200,
        headers: {
          "X-RateLimit-Remaining": String(rl.remaining),
        },
      },
    );
  } catch (err) {
    console.error("[contact-api]", err);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again or email us directly." },
      { status: 500 },
    );
  }
}
