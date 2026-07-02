"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { saveGuestRsvp } from "../actions/GuestActions";
import PersonSection from "./formComponents/PersonSection";

function SubmissionNotice() {
  const searchParams = useSearchParams();
  const hasSubmitted = searchParams.get("submitted") === "1";

  if (!hasSubmitted) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-900">
      Tack! Ditt svar är sparat.
    </div>
  );
}

const OSAPage = () => {
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [primaryAttending, setPrimaryAttending] = useState<boolean | null>(
    null,
  );
  useEffect(() => {
    if (primaryAttending === false) {
      setHasPlusOne(false);
    }
  }, [primaryAttending]);

  return (
    <main className="min-h-screen px-4 py-12 text-text-black sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="grid gap-4 text-center">
          <h1 className="text-4xl font-heading sm:text-5xl">
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
            className="inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 sm:w-auto"
            type="submit"
          >
            Skicka OSA
          </button>
        </form>
      </div>
    </main>
  );
};

export default OSAPage;
