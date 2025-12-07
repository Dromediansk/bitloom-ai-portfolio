import { MailtrapClient } from "mailtrap";
import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

const TOKEN = process.env.MAILTRAP_API_TOKEN || "";
const SENDER_EMAIL = "portfolio@bitloom.sk";
const RECIPIENT_EMAIL = "info@bitloom.sk";

// Generate professional HTML email template with Bitloom brand colors
const generateEmailTemplate = (data: ContactFormData): string => {
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
        .container {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(135deg, #0d6efd 0%, #05214d 100%); 
          color: white; 
          padding: 30px; 
          text-align: center;
        }
        .content { padding: 30px; }
        .field { 
          margin-bottom: 20px; 
          padding: 16px; 
          background: #e6f0ff; 
          border-radius: 8px; 
          border-left: 4px solid #0d6efd;
        }
        .field-label { 
          font-weight: 600; 
          color: #374151; 
          margin-bottom: 6px;
          font-size: 14px;
          text-transform: uppercase;
        }
        .field-value { 
          color: #111827;
          font-size: 16px;
        }
        .footer { 
          text-align: center; 
          padding: 20px; 
          color: #6b7280; 
          font-size: 14px;
          border-top: 1px solid #e5e7eb;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 New Message</h1>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">Contact Name</div>
            <div class="field-value">${data.name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">${data.email}</div>
          </div>
          
          ${
            data.company
              ? `
            <div class="field">
              <div class="field-label">Company</div>
              <div class="field-value">${data.company}</div>
            </div>
          `
              : ""
          }

          
          <div class="field">
            <div class="field-label">Message Text</div>
            <div class="field-value">${data.message.replace(
              /\n/g,
              "<br>"
            )}</div>
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
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { name, company } = body;

    // Initialize Mailtrap client
    const client = new MailtrapClient({ token: TOKEN });

    const newMessage = {
      from: { name: "Bitloom Contact Form", email: SENDER_EMAIL },
      to: [{ email: RECIPIENT_EMAIL, name: "Bitloom" }],
      subject: `New Message from ${name}${company ? ` (${company})` : ""}`,
      html: generateEmailTemplate(body),
    };

    // Send email via Mailtrap
    const response = await client.send(newMessage);

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
