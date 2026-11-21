import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

// In-memory rate limiting map: ip -> { count, lastReset }
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 3 * 60 * 1000; // 3 minutes
const MAX_REQUESTS = 5;

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (record.count >= MAX_REQUESTS) {
    return false;
  }
  record.count += 1;
  return true;
}

// Escape all HTML characters to prevent HTML/XSS injection into the email template
function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Strip newlines to prevent email header injection
function sanitizeHeader(str: string): string {
  if (!str) return '';
  return str.replace(/[\r\n]+/g, ' ').trim();
}

export async function POST(req: Request) {
  try {
    // 1. Rate limiting check
    const ip = getClientIp(req);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions detected from your network. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    // 2. Parse request body
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid transmission payload.' },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      company,
      subject,
      budget,
      message,
      bot_check_field_123,
    } = body;

    // 3. Honeypot check for spam bots
    if (bot_check_field_123) {
      // Silently discard spam bot submissions with 200 OK
      return NextResponse.json({
        success: true,
        message: 'Your inquiry has been submitted successfully.',
      });
    }

    // 4. Server-side validation of required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Full Name is required.' },
        { status: 400 }
      );
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { error: 'Valid Email Address is required.' },
        { status: 400 }
      );
    }
    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return NextResponse.json(
        { error: 'Please select a Subject / Service Required.' },
        { status: 400 }
      );
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Project Details / Message is required.' },
        { status: 400 }
      );
    }

    // 5. Length limits
    if (name.length > 100 || email.length > 100 || (company && company.length > 100)) {
      return NextResponse.json(
        { error: 'Input field exceeds maximum allowed character length (100 characters).' },
        { status: 400 }
      );
    }
    if (subject.length > 150) {
      return NextResponse.json(
        { error: 'Subject exceeds maximum allowed length.' },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message exceeds maximum allowed length (5000 characters).' },
        { status: 400 }
      );
    }

    // 6. Strict email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'The email address provided is invalid. Please double-check your entry.' },
        { status: 400 }
      );
    }

    // 7. Sanitize inputs
    const cleanName = sanitizeHeader(name);
    const cleanEmail = sanitizeHeader(email);
    const cleanPhone = sanitizeHeader(phone || '');
    const cleanCompany = sanitizeHeader(company || '');
    const cleanSubject = sanitizeHeader(subject);
    const cleanBudget = sanitizeHeader(budget || 'Not specified');

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safePhone = escapeHtml(cleanPhone);
    const safeCompany = escapeHtml(cleanCompany);
    const safeSubject = escapeHtml(cleanSubject);
    const safeBudget = escapeHtml(cleanBudget);
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br/>');

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'techdefenderss@gmail.com';
    const submissionDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const emailSubject = `[TECH DEFENDERS WEBSITE] New Inquiry — ${cleanSubject}`;

    // 8. Plaintext fallback content
    const textContent = `
========================================
TECH DEFENDERS // NEW PROJECT INQUIRY
========================================

You have received a new business inquiry from the Tech Defenders website.

SUBMISSION DETAILS:
-------------------
Client Name:        ${cleanName}
Email Address:      ${cleanEmail}
Phone Number:       ${cleanPhone || 'Not provided'}
Company:            ${cleanCompany || 'Not provided'}
Service Requested:  ${cleanSubject}
Project Budget:     ${cleanBudget || 'Not specified'}
Timestamp:          ${submissionDate} (IST)

CLIENT MESSAGE:
-------------------
${message.trim()}

----------------------------------------
To reply directly to the client, write to: ${cleanEmail}
Website: https://www.techdefenderss.com/
========================================
    `.trim();

    // 9. Premium Branded HTML Email Template for techdefenderss@gmail.com
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(emailSubject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030610; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #f1f5f9; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #030610; width: 100%; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #080f1e; border: 1px solid rgba(0, 229, 255, 0.35); border-radius: 6px; overflow: hidden; box-shadow: 0 0 35px rgba(0, 184, 255, 0.15);">
          
          <!-- Cyber Glowing Top Accent Bar -->
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #0055ff 0%, #00e5ff 50%, #35e6c4 100%);"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 28px 28px 20px 28px; background-color: #050b18; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: left;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; letter-spacing: 0.22em; color: #00e5ff; text-transform: uppercase; margin-bottom: 4px; font-weight: bold;">
                      // SYSTEM INQUIRY DISPATCH
                    </div>
                    <div style="font-size: 24px; font-weight: 900; letter-spacing: 0.12em; color: #ffffff; text-transform: uppercase; margin: 0; line-height: 1.2;">
                      TECH DEFENDERS
                    </div>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 10px; color: #94a3b8; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 2px;">
                      ENTERPRISE IT &amp; CYBERSECURITY
                    </div>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <span style="display: inline-block; padding: 4px 10px; border: 1px solid rgba(0, 229, 255, 0.4); background-color: rgba(0, 229, 255, 0.08); color: #00e5ff; font-family: 'Courier New', Courier, monospace; font-size: 10px; font-weight: bold; letter-spacing: 0.15em; border-radius: 3px;">
                      NEW LEAD
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Notification Banner -->
          <tr>
            <td style="padding: 16px 28px; background-color: rgba(0, 229, 255, 0.05); border-bottom: 1px solid rgba(0, 229, 255, 0.15);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="20" style="vertical-align: middle; padding-right: 10px; color: #00e5ff; font-size: 16px;">
                    ⚡
                  </td>
                  <td style="font-family: 'Courier New', Courier, monospace; font-size: 12px; color: #e2e8f0; letter-spacing: 0.12em; font-weight: bold; text-transform: uppercase;">
                    YOU HAVE RECEIVED A NEW BUSINESS INQUIRY
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Details Table -->
          <tr>
            <td style="padding: 24px 28px 16px 28px;">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 10px; color: #00e5ff; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 12px; font-weight: bold;">
                // CLIENT SPECIFICATIONS
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; background-color: rgba(3, 7, 18, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 4px;">
                <tr>
                  <td width="38%" style="padding: 11px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: bold;">
                    Full Name
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; color: #f8fafc; font-weight: 600;">
                    ${safeName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: bold;">
                    Email Address
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; color: #00e5ff; font-weight: 500;">
                    <a href="mailto:${safeEmail}" style="color: #00e5ff; text-decoration: none;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: bold;">
                    Phone Number
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; color: #f8fafc;">
                    ${safePhone ? `<a href="tel:${safePhone}" style="color: #f8fafc; text-decoration: none;">${safePhone}</a>` : '<span style="color: #64748b; font-style: italic;">Not provided</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: bold;">
                    Company Name
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; color: #f8fafc;">
                    ${safeCompany || '<span style="color: #64748b; font-style: italic;">Not provided</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: bold;">
                    Service Required
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; color: #35e6c4; font-weight: bold;">
                    <span style="display: inline-block; padding: 2px 8px; background-color: rgba(53, 230, 196, 0.12); border: 1px solid rgba(53, 230, 196, 0.4); border-radius: 3px;">
                      ${safeSubject}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: bold;">
                    Budget Range
                  </td>
                  <td style="padding: 11px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-size: 14px; color: #f8fafc;">
                    ${safeBudget}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 11px 16px; font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: bold;">
                    Received At
                  </td>
                  <td style="padding: 11px 16px; font-size: 12px; color: #94a3b8; font-family: 'Courier New', Courier, monospace;">
                    ${submissionDate} (IST)
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body Section -->
          <tr>
            <td style="padding: 8px 28px 24px 28px;">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 10px; color: #00e5ff; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 10px; font-weight: bold;">
                // PROJECT DESCRIPTION &amp; REQUIREMENTS
              </div>
              <div style="background-color: rgba(3, 7, 18, 0.85); border-left: 3px solid #00e5ff; border: 1px solid rgba(0, 229, 255, 0.25); border-left-width: 4px; padding: 18px 20px; border-radius: 3px; font-size: 14px; line-height: 1.65; color: #f1f5f9; font-family: 'Courier New', Courier, monospace; word-break: break-word;">
                ${safeMessage}
              </div>
            </td>
          </tr>

          <!-- Reply to Client Action Button -->
          <tr>
            <td style="padding: 12px 28px 28px 28px; text-align: center;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;">
                <tr>
                  <td align="center" style="border-radius: 3px; background: linear-gradient(90deg, #00e5ff 0%, #35e6c4 100%); box-shadow: 0 0 20px rgba(0, 229, 255, 0.4);">
                    <a href="mailto:${safeEmail}?subject=Re:%20[Tech%20Defenders]%20Project%20Inquiry%20-%20${encodeURIComponent(cleanSubject)}" target="_blank" style="display: inline-block; padding: 14px 32px; font-family: 'Courier New', Courier, monospace; font-size: 13px; font-weight: bold; letter-spacing: 0.15em; color: #030610; text-decoration: none; text-transform: uppercase;">
                      [ REPLY TO CLIENT ] →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="padding: 24px 28px; background-color: #040813; border-top: 1px solid rgba(255, 255, 255, 0.08); text-align: center;">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; letter-spacing: 0.18em; color: #00e5ff; font-weight: bold; text-transform: uppercase; margin-bottom: 6px;">
                TECH DEFENDERS IT
              </div>
              <div style="font-size: 11px; color: #64748b; line-height: 1.5; margin-bottom: 8px;">
                Custom Software Engineering • Web Architecture • AI Automation • Cybersecurity
              </div>
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 10px; color: #475569;">
                <a href="https://www.techdefenderss.com/" style="color: #00e5ff; text-decoration: none;">www.techdefenderss.com</a>
                &nbsp;•&nbsp; Direct Desk: <a href="mailto:techdefenderss@gmail.com" style="color: #94a3b8; text-decoration: none;">techdefenderss@gmail.com</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // 10. Customer Acknowledgement Email Template
    const ackSubject = `Thank you for contacting Tech Defenders`;
    const ackHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${ackSubject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030610; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f1f5f9;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #030610; padding: 32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 580px; background-color: #080f1e; border: 1px solid rgba(0, 229, 255, 0.35); border-radius: 6px; overflow: hidden;">
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #0055ff 0%, #00e5ff 100%);"></td>
          </tr>
          <tr>
            <td style="padding: 24px 28px; background-color: #050b18; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; letter-spacing: 0.2em; color: #00e5ff; font-weight: bold;">
                // INQUIRY CONFIRMATION
              </div>
              <div style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.1em; text-transform: uppercase;">
                TECH DEFENDERS IT
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px;">
              <p style="font-size: 15px; color: #f8fafc; margin-top: 0; font-weight: 600;">
                Hello ${safeName},
              </p>
              <p style="font-size: 13px; line-height: 1.6; color: #cbd5e1;">
                Thank you for reaching out to <strong>Tech Defenders</strong>. We have successfully received your project inquiry regarding <strong>${safeSubject}</strong>.
              </p>
              <div style="background-color: rgba(0, 229, 255, 0.05); border-left: 3px solid #00e5ff; padding: 14px 16px; margin: 20px 0; font-size: 13px; color: #e2e8f0;">
                Our engineering team is currently evaluating your requirements. A senior technology lead will contact you via email or phone within <strong>24 business hours</strong>.
              </div>
              <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
                If your project requires immediate assistance, you can reach our direct rapid hotline at <a href="tel:+917600426578" style="color: #00e5ff; text-decoration: none;">+91 7600426578</a> or reply directly to this transmission.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 28px; background-color: #040813; border-top: 1px solid rgba(255, 255, 255, 0.08); text-align: center; font-size: 11px; color: #64748b;">
              Tech Defenders IT • Enterprise Technology Solutions<br/>
              <a href="https://www.techdefenderss.com/" style="color: #00e5ff; text-decoration: none;">www.techdefenderss.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // 11. Delivery Dispatch Engine (Resend API -> Nodemailer SMTP fallback)
    const resendApiKey = process.env.RESEND_API_KEY;
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    let emailDelivered = false;
    let providerUsed = '';

    // A) Try Resend if RESEND_API_KEY is configured
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const fromAddress = process.env.CONTACT_SENDER_EMAIL || 'Tech Defenders <onboarding@resend.dev>';

        const resendResult = await resend.emails.send({
          from: fromAddress,
          to: [receiverEmail],
          replyTo: cleanEmail,
          subject: emailSubject,
          text: textContent,
          html: htmlContent,
        });

        if (resendResult.error) {
          console.error('[Tech Defenders Contact API] Resend API error:', resendResult.error);
        } else {
          emailDelivered = true;
          providerUsed = 'Resend';

          // Send confirmation acknowledgement to visitor
          try {
            await resend.emails.send({
              from: fromAddress,
              to: [cleanEmail],
              subject: ackSubject,
              html: ackHtml,
            });
          } catch (ackErr) {
            console.warn('[Tech Defenders Contact API] Visitor acknowledgement note:', ackErr);
          }
        }
      } catch (resendErr) {
        console.error('[Tech Defenders Contact API] Resend dispatch exception:', resendErr);
      }
    }

    // B) Fallback to SMTP (Nodemailer) if Resend wasn't configured or failed, and SMTP is set
    if (!emailDelivered && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT) || 465,
          secure: Number(process.env.SMTP_PORT) === 465 || !process.env.SMTP_PORT,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const fromAddress = process.env.CONTACT_SENDER_EMAIL || `"Tech Defenders" <${smtpUser}>`;

        await transporter.sendMail({
          from: fromAddress,
          to: receiverEmail,
          replyTo: cleanEmail,
          subject: emailSubject,
          text: textContent,
          html: htmlContent,
        });

        emailDelivered = true;
        providerUsed = 'SMTP/Nodemailer';

        // Send confirmation acknowledgement to visitor
        try {
          await transporter.sendMail({
            from: fromAddress,
            to: cleanEmail,
            subject: ackSubject,
            html: ackHtml,
          });
        } catch (ackErr) {
          console.warn('[Tech Defenders Contact API] Visitor acknowledgement note:', ackErr);
        }
      } catch (smtpErr) {
        console.error('[Tech Defenders Contact API] SMTP dispatch exception:', smtpErr);
      }
    }

    // C) Handle result
    if (emailDelivered) {
      console.log(`[Tech Defenders Contact API] Email successfully delivered to ${receiverEmail} via ${providerUsed}`);
      return NextResponse.json({
        success: true,
        message: 'Your inquiry has been submitted successfully. We will get back to you as soon as possible.',
      });
    }

    // If neither Resend nor SMTP credentials are set
    console.warn(
      '[Tech Defenders Contact API] Email delivery credentials missing. Please set RESEND_API_KEY in .env.local to enable live delivery to techdefenderss@gmail.com.'
    );

    return NextResponse.json(
      {
        error:
          'Email delivery service is currently awaiting configuration. Please ensure RESEND_API_KEY is configured or email us directly at techdefenderss@gmail.com.',
      },
      { status: 503 }
    );
  } catch (error) {
    console.error('[Tech Defenders Contact API] Unexpected handler error:', error);
    return NextResponse.json(
      {
        error:
          'An unexpected transmission failure occurred. Please reach us directly at techdefenderss@gmail.com or +91 7600426578.',
      },
      { status: 500 }
    );
  }
}
