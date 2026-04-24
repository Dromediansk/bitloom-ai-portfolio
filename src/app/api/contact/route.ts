import { MailtrapClient } from "mailtrap";
import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string; // honeypot
}

const TOKEN = process.env.MAILTRAP_API_TOKEN || "";
const SENDER_EMAIL = process.env.CONTACT_SENDER_EMAIL || "portfolio@bitloom.sk";
const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || "info@bitloom.sk";

const MAX_LEN = { name: 200, email: 254, company: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Best-effort in-memory rate limiting per IP. Note: Vercel serverless
// instances are not shared-state, so this only limits repeat hits that
// land on the same warm instance. For stronger guarantees, use a shared
// store (e.g. Upstash Redis).
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const rateHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    rateHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateHits.set(ip, hits);
  return false;
}

function clientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

const generateEmailTemplate = (data: ContactFormData): string => {
  const name = esc(data.name);
  const email = esc(data.email);
  const company = data.company ? esc(data.company) : "";
  const message = esc(data.message).replace(/\n/g, "<br>");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>You Have a New Message from Bitloom</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #0d6efd 0%, #05214d 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; padding: 16px; background: #e6f0ff; border-radius: 8px; border-left: 4px solid #0d6efd; }
        .field-label { font-weight: 600; color: #374151; margin-bottom: 6px; font-size: 14px; text-transform: uppercase; }
        .field-value { color: #111827; font-size: 16px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>New Message</h1></div>
        <div class="content">
          <div class="field">
            <div class="field-label">Contact Name</div>
            <div class="field-value">${name}</div>
          </div>
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">${email}</div>
          </div>
          ${
            company
              ? `<div class="field">
            <div class="field-label">Company</div>
            <div class="field-value">${company}</div>
          </div>`
              : ""
          }
          <div class="field">
            <div class="field-label">Message Text</div>
            <div class="field-value">${message}</div>
          </div>
        </div>
        <div class="footer">
          <p>This message was submitted through <strong>bitloom.sk</strong></p>
          <p>Reply directly to this email to respond to the client.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as ContactFormData;

    // Honeypot: silently accept but do not send
    if (body.website && body.website.trim() !== "") {
      return NextResponse.json({ submitted: true }, { status: 200 });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const company =
      typeof body.company === "string" ? body.company.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (
      name.length > MAX_LEN.name ||
      email.length > MAX_LEN.email ||
      company.length > MAX_LEN.company ||
      message.length > MAX_LEN.message
    ) {
      return NextResponse.json({ error: "Field too long" }, { status: 400 });
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!TOKEN) {
      console.error("MAILTRAP_API_TOKEN not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const client = new MailtrapClient({ token: TOKEN });
    const safeData = { name, email, company, message };

    const response = await client.send({
      from: { name: "Bitloom Contact Form", email: SENDER_EMAIL },
      to: [{ email: RECIPIENT_EMAIL, name: "Bitloom" }],
      subject: `New Message from ${name}${company ? ` (${company})` : ""}`,
      html: generateEmailTemplate(safeData),
    });

    console.log("Email sent successfully via Mailtrap:", {
      messageId: response.message_ids?.[0],
      success: response.success,
    });

    return NextResponse.json({ submitted: true }, { status: 200 });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
