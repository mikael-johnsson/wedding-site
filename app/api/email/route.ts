import { transporter } from "@/app/lib/EmailTransporter";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  try {
    await transporter.verify();
    console.log("Server is ready to take our messages");

    const info = await transporter.sendMail({
      from: `${name} <mikaeljohanjohnsson@gmail.com>`,
      to: "mikaeljohanjohnsson@gmail.com",
      subject: "Bernozzi Wedding",
      text: "Test, detta är plain text body", // plain text body
      // html: `<b>Mail från: ${email}. Meddelande: ${message}</b>`, // HTML body
      html: EmailTemplate({ name, email, message }), // HTML body using the EmailTemplate component
    });
    console.log("Info:", info);
    console.log("Message sent: %s", info.messageId);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Verification failed:", err);
    return NextResponse.json(
      { message: "Failed to send email", error: err },
      { status: 500 },
    );
  }
}
