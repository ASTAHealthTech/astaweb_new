import nodemailer from "nodemailer"
import { z } from "zod"


const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return false
  }

  if (now - record.lastReset > RATE_LIMIT_WINDOW) {
    record.count = 1
    record.lastReset = now
    return false
  }

  if (record.count >= MAX_REQUESTS) {
    return true
  }

  record.count++
  return false
}

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  organization: z.string().max(100).optional(),
  role: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  message: z.string().min(10).max(5000),
  requestType: z.string().max(50).optional(),
})

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}


export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown"
  
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ success: false, error: "Too many requests" }), { status: 429 })
  }

  try {
    const body = await req.json()
    const validatedData = contactSchema.parse(body)

    const {
      name,
      email,
      organization,
      role,
      phone,
      message,
      requestType,
    } = validatedData

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailOptions = {
      from: `"ASTA Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: `New Contact Request from ${escapeHtml(name)}`,
      html: `
        <h2>New Message Received</h2>
        <p><strong>Full Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email Address:</strong> ${escapeHtml(email)}</p>
        <p><strong>Organization:</strong> ${escapeHtml(organization || "N/A")}</p>
        <p><strong>Role:</strong> ${escapeHtml(role || "N/A")}</p>
        <p><strong>Phone Number:</strong> ${escapeHtml(phone || "N/A")}</p>
        <p><strong>Request Type:</strong> ${escapeHtml(requestType || "N/A")}</p>
        <p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    }

    await transporter.sendMail(mailOptions)
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ success: false, error: "Invalid input", details: error.errors }), { status: 400 })
    }
    console.error("Mail send error:", error)
    return new Response(JSON.stringify({ success: false, error: "Internal server error" }), { status: 500 })
  }
}