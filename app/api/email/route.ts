import EmailTemplate from "@/app/components/EmailTemplate";
import { transporter } from "@/app/lib/EmailTransporter";
import { NextResponse } from "next/server";
import { render } from "react-email";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  try {
    await transporter.verify();
    console.log("Server is ready to take our messages");
    const htmlContent = await render(EmailTemplate({ name, email, message }));

    const info = await transporter.sendMail({
      from: `${name} <mikaeljohanjohnsson@gmail.com>`,
      to: "toastparet2027@gmail.com",
      subject: "Bernozzi Wedding",
      html: htmlContent,
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
