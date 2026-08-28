import EmailTemplate from "../../components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    const emailOptions: Parameters<typeof resend.emails.send>[0] = {
      from: `${name} <onboarding@resend.dev>`,
      to: ["toastparet2027@gmail.com"],
      subject: "Anmälan av tal till Bernozzi Wedding",
      react: EmailTemplate({ name, email, message }),
    };

    const { data, error } = await resend.emails.send(emailOptions);
    console.log("Data", data);
    console.log("Error", error);

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
