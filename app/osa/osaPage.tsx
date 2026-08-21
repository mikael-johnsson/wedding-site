"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { saveGuestRsvp } from "../actions/GuestActions";
import PersonSection from "./formComponents/PersonSection";
import { toast } from "sonner";
import SubmissionNotice from "./formComponents/SubmissionNotice";

const OSAPage = () => {
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [primaryAttending, setPrimaryAttending] = useState<boolean | null>(
    null,
  );
  const searchParams = useSearchParams();
  const hasSubmitted = searchParams.get("submitted") === "1";

  useEffect(() => {
    if (hasSubmitted) {
      toast.success("Tack för din OSA! Vad kul att du kommer!");
    } else if (searchParams.get("submitted") === "0") {
      toast.error("Tack för din OSA! Vad synd att du inte kan komma.");
    }

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.hash}`,
    );
  }, [hasSubmitted]);

  useEffect(() => {
    if (primaryAttending === false) {
      setHasPlusOne(false);
    }
  }, [primaryAttending]);

  return (
    <section id="osa" className="min-h-screen text-text-black scroll-mt-30">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="grid gap-4 text-center">
          <h1 className="text-3xl font-heading sm:text-4xl">
            BRÖLLOPSINBJUDAN
          </h1>
          <p className="mx-auto max-w-xl text-text-black sm:text-lg">
            Svara senast 31 maj 2027.
          </p>
          <p className="mx-auto max-w-xl text-text-black sm:text-lg">
            Om du tar med en +1 visas extra fält automatiskt.
          </p>
        </header>
        <Suspense fallback={null}>
          <SubmissionNotice />
        </Suspense>

        <form
          action={saveGuestRsvp}
          className="grid gap-6 rounded-3xl bg-white p-6 shadow-lg sm:p-8"
        >
          <PersonSection
            prefix="primary"
            title="Huvudgäst"
            onAttendingChange={setPrimaryAttending}
          />

          {primaryAttending !== false && (
            <>
              <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-700">
                <input
                  checked={hasPlusOne}
                  className="h-4 w-4 rounded border-stone-300 text-text-black focus:ring-stone-500"
                  name="hasPlusOne"
                  onChange={(event) => setHasPlusOne(event.target.checked)}
                  type="checkbox"
                />
                Jag tar med en +1
              </label>

              {hasPlusOne ? (
                <PersonSection prefix="plusOne" title="+1" />
              ) : null}
            </>
          )}

          <button
            className="inline-flex w-full items-center justify-center rounded-full bg-text-black px-6 py-3 text-sm font-semibold text-bg-primary transition hover:bg-black hover:shadow hover:cursor-pointer sm:w-auto"
            type="submit"
          >
            Skicka OSA
          </button>
        </form>
      </div>
    </section>
  );
};

export default OSAPage;
