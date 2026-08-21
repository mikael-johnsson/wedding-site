"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, SubmitEvent } from "react";

type EmailModalProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const EmailModal = ({ setIsModalOpen }: EmailModalProps) => {
  const router = useRouter();
  const handleSend = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      router.push("/?submitted=emailSuccess");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error sending email:", error);
      router.push("/?submitted=emailError");
    }
  };
  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center backdrop-blur-xs bg-black/20">
      <div className="flex flex-col items-center gap-4 w-full max-w-md bg-bg-primary text-primary rounded-xl shadow-xl px-8 py-6">
        <h2 className="font-semibold">Anmälan av tal</h2>
        <p>Detta meddelande skickas till toastvärdarna</p>
        <p>OBS! Nu i utvecklingsfas skickas det till Mikael Johnsson</p>
        <form onSubmit={handleSend} className="flex flex-col gap-2 w-full">
          <div className="flex justify-between">
            <label htmlFor="name">Namn:</label>
            <input id="name" name="name" className="border w-55" required />
          </div>
          <div className="flex justify-between">
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" className="border w-55" required />
          </div>
          <div className="flex justify-between ">
            <label htmlFor="message">Meddelande:</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="border w-55"
              required
            />
          </div>
          <div className="flex gap-3 mt-2 justify-end">
            <button className="border rounded p-2 bg-text-black text-bg-primary">
              Skicka
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              type="button"
              className="border rounded p-2 bg-text-black text-bg-primary"
            >
              Avbryt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
