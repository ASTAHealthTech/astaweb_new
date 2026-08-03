import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { rateLimit } from "@/lib/rateLimit";

// ── Rate-limit config ───────────────────────────────────────────────
const RATE_LIMIT = 5; // max submissions
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

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

function validateEmail(body: unknown): { ok: true; email: string } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const b = body as Record<string, unknown>;
  const email = String(b.email ?? "").trim();

  if (!email || !EMAIL_RE.test(email)) return { ok: false, error: "A valid email is required." };
  if (email.length > 255) return { ok: false, error: "Email too long." };

  return { ok: true, email };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: NextRequest) {
  try {
    // 1. Resolve client IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    // 2. Rate-limit check
    const rl = rateLimit(`newsletter_${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
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
        }
      );
    }

    // 3. Parse and validate
    const body = await request.json().catch(() => null);
    const validation = validateEmail(body);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // 4. Compose and send
    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    const safeEmail = escapeHtml(validation.email);

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
        <h2 style="color: #0f172a;">New Newsletter Subscription</h2>
        <p style="color: #333; font-size: 16px;">
          <strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a>
        </p>
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <p style="color: #888; font-size: 12px;">
          Submitted ${timestamp} IST · IP ${ip}
        </p>
      </div>
    `;

    await getTransporter().sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: process.env.CONTACT_RECIPIENT,
      subject: "ASTA Newsletter Subscription",
      html,
    });

    return NextResponse.json(
      { message: "Subscribed successfully." },
      {
        status: 200,
        headers: {
          "X-RateLimit-Remaining": String(rl.remaining),
        },
      }
    );
  } catch (err) {
    console.error("[newsletter-api]", err);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}
