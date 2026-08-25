"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import EmailModal from "../components/EmailModal";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { SubmissionStatus, submissionMessages } from "../models/Toasts";

const ToastPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const status = (searchParams.get("submitted") as SubmissionStatus) || null;
  const message = submissionMessages[status];

  useEffect(() => {
    if (status === "emailSuccess") {
      toast.success(message);
    } else if (status === "emailError") {
      toast.error(message);
    }

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.hash}`,
    );
  }, [status, message]);
  return (
    <section id="toast" className="min-h-screen px-5 scroll-mt-30">
      <h1 className="text-4xl font-heading text-center mb-8">
        TOASTPAR & KYRKVÄRDAR
      </h1>
      <div className="mx-auto sm:w-117">
        <div className="w-full px-4 py-10">
          <h2 className="text-2xl font-heading text-center mb-10">
            Toastparet
          </h2>
          <div>
            <h3 className="text-center text-lg mb-2">Irma & Nicklas Sokoli</h3>
            <Image
              src="/toast-paret.jpeg"
              alt="Toast"
              width={400}
              height={300}
              className="mx-auto rounded-lg shadow-xl"
            />
            <div className="mt-4 flex flex-col gap-4 mx-auto sm:text-center">
              <p>
                Sveriges främsta goals-par kommer leda er genom denna
                bröllopshelg. The Sokolis är alltid on fleak & har ständigt ett
                kanonskämt i rockärmen. De kan helt enkelt hjälpa dig med allt
                från look till att skapa ett riktigt partyhöjande spex!
              </p>
              <p>Irma Sokoli: 070-427 05 67</p>
            </div>
          </div>
          <div className="flex flex-col justify-center mt-7 items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="border rounded-md p-2 bg-text-black text-bg-primary w-40"
            >
              Anmäl tal
            </button>
            <p>Här anmäler du tal eller spex!</p>
          </div>
        </div>
        <div className="w-full px-4 py-10">
          <h2 className="text-2xl font-heading text-center mb-10">
            Kyrkvärdarna
          </h2>

          <div>
            <h3 className="text-center text-lg mb-2">
              Sarah Sandahl & Linus Berg
            </h3>

            <Image
              src="/kyrkvardarna.jpeg"
              alt="Toast"
              width={400}
              height={300}
              className="mx-auto rounded-lg shadow-xl"
            />
            <div className="mt-4 flex flex-col gap-4 mx-auto sm:text-center">
              <p>
                De mest charmiga & välkomnande människorna vi känner kommer
                guida er kring vigseln. Har du kört vilse, behöver du hjälp med
                skjuts eller har du glömt näsdukar? Oavsett vad finns
                lillasyster bonna-Berntsson & hennes ljuvliga vapendragare där
                för dig!
              </p>
              <p>Sarah Sandahl: 073-093 37 07</p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <EmailModal setIsModalOpen={setIsModalOpen} />}
    </section>
  );
};

export default ToastPage;
