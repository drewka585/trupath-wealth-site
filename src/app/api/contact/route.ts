import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const requiredFields = ["firstName", "lastName", "email", "message"] as const;

type ContactPayload = Record<(typeof requiredFields)[number] | "phone", string>;

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<ContactPayload>;

    for (const field of requiredFields) {
      if (!payload[field]) {
        return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
      }
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_TO || "garrett@trupathwealth.com";
    const fromEmail = process.env.CONTACT_FROM || "no-reply@trupathwealth.com";

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const name = `${payload.firstName} ${payload.lastName}`;
    const messageLines = [
      `Name: ${name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || "N/A"}`,
      "",
      payload.message || "",
    ];

    await transporter.sendMail({
      from: `Trupath Wealth <${fromEmail}>`,
      to: toEmail,
      replyTo: payload.email,
      subject: "New Trupath Wealth inquiry",
      text: messageLines.join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Unable to send message." }, { status: 500 });
  }
}
