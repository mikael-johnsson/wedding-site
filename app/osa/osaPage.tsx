"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { saveGuestRsvp } from "../actions/GuestActions";
import PersonSection from "./formComponents/PersonSection";
import { toast } from "sonner";
import SubmissionNotice from "./formComponents/SubmissionNotice";
import { submissionMessages, SubmissionStatus } from "../models/Toasts";

const OSAPage = () => {
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [primaryAttending, setPrimaryAttending] = useState<boolean | null>(
    null,
  );
  const [openForm, setOpenForm] = useState(false);
  const searchParams = useSearchParams();
  const status = (searchParams.get("submitted") as SubmissionStatus) || null;
  const message = submissionMessages[status];

  useEffect(() => {
    if (status === "osaSuccess") {
      toast.success(message);
    } else if (status === "osaDeclined") {
      toast.error(message);
    }

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.hash}`,
    );
  }, [status, message]);

  const handlePrimaryAttendingChange = (value: boolean) => {
    setPrimaryAttending(value);

    if (value === false) {
      setHasPlusOne(false);
    }
  };

  return (
    <section id="osa" className="text-text-black scroll-mt-30 px-4">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="grid gap-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading">
            BRÖLLOPSINBJUDAN
          </h2>
          <p className="mx-auto max-w-xl text-text-black sm:text-lg">
            Svara senast 31 maj 2027.
          </p>
          <p className="mx-auto max-w-xl text-text-black sm:text-lg">
            Om du tar med en +1 visas extra fält automatiskt.
          </p>
          <button
            onClick={() => setOpenForm(!openForm)}
            className="hover:cursor-pointer border rounded-md p-2 mx-auto bg-text-black text-bg-primary w-40"
          >
            {openForm ? "Stäng formuläret" : "Öppna formuläret"}
          </button>
        </header>
        <Suspense fallback={null}>
          <SubmissionNotice />
        </Suspense>

        <form
          action={saveGuestRsvp}
          className={` rounded-3xl bg-white p-6 shadow-lg sm:p-8 `}
        >
          <div className={`opacity-50 md:w-175`}>
            <fieldset
              className={`grid gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-5 ${openForm ? "hidden" : "block"}`}
            >
              <legend className="px-2 text-md font-semibold uppercase tracking-[0.2em] text-stone-500">
                Huvudgäst
              </legend>
              <label>Namn</label>
              <input
                disabled
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 shadow-sm outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
              />
            </fieldset>
          </div>
          <div className={`grid gap-6 ${openForm ? "block" : "hidden"}`}>
            <PersonSection
              prefix="primary"
              title="Huvudgäst"
              onAttendingChange={handlePrimaryAttendingChange}
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
          </div>
        </form>
      </div>
    </section>
  );
};

export default OSAPage;
