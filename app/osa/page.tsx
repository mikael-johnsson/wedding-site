"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { saveGuestRsvp } from "../actions/GuestActions";

const fieldClasses =
  "mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 shadow-sm outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200";

const labelClasses = "text-sm font-medium text-stone-700";

const weddingDays = [
  { value: "friday", label: "Fredag" },
  { value: "saturday", label: "Lördag" },
  { value: "sunday", label: "Söndag" },
] as const;

function DayCheckboxGroup({
  prefix,
  name,
  title,
}: {
  prefix: "primary" | "plusOne";
  name: "DaysAttending" | "DaysOvernighting";
  title: string;
}) {
  return (
    <fieldset className="grid gap-3 rounded-xl border border-stone-200 bg-white p-4">
      <legend className="px-1 text-sm font-medium text-stone-700">
        {title}
      </legend>
      <div className="grid gap-3 sm:grid-cols-3">
        {weddingDays.map((day) => (
          <label
            key={day.value}
            className="flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-stone-700"
          >
            <input
              name={`${prefix}${name}`}
              type="checkbox"
              value={day.value}
            />
            {day.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function PersonSection({
  prefix,
  title,
}: {
  prefix: "primary" | "plusOne";
  title: string;
}) {
  return (
    <fieldset className="grid gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-5">
      <legend className="px-2 text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
        {title}
      </legend>

      <div>
        <label className={labelClasses} htmlFor={`${prefix}Name`}>
          Namn
        </label>
        <input
          className={fieldClasses}
          id={`${prefix}Name`}
          name={`${prefix}Name`}
          type="text"
          required
        />
      </div>

      <div>
        <span className={labelClasses}>Kommer att närvara?</span>
        <div className="mt-2 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-stone-700">
            <input
              name={`${prefix}Attending`}
              type="radio"
              value="yes"
              required
            />
            Ja
          </label>
          <label className="flex items-center gap-2 text-stone-700">
            <input name={`${prefix}Attending`} type="radio" value="no" />
            Nej
          </label>
        </div>
      </div>

      <div>
        <label className={labelClasses} htmlFor={`${prefix}Allergies`}>
          Allergier
        </label>
        <textarea
          className={`${fieldClasses} min-h-24`}
          id={`${prefix}Allergies`}
          name={`${prefix}Allergies`}
          rows={3}
          placeholder="Skriv inga allergier om du inte har några"
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor={`${prefix}MealChoice`}>
          Matval
        </label>
        <input
          className={fieldClasses}
          id={`${prefix}MealChoice`}
          name={`${prefix}MealChoice`}
          type="text"
          placeholder="Till exempel kött, fisk eller vegetariskt"
          required
        />
      </div>

      <div>
        <label className={labelClasses} htmlFor={`${prefix}Notes`}>
          Övrigt
        </label>
        <textarea
          className={`${fieldClasses} min-h-24`}
          id={`${prefix}Notes`}
          name={`${prefix}Notes`}
          rows={3}
          placeholder="Annan information vi behöver känna till"
        />
      </div>

      <DayCheckboxGroup
        name="DaysAttending"
        prefix={prefix}
        title="Vilka dagar är du med?"
      />

      <DayCheckboxGroup
        name="DaysOvernighting"
        prefix={prefix}
        title="Vilka dagar sover du över?"
      />

      <div>
        <label className={labelClasses} htmlFor={`${prefix}Transport`}>
          Transport
        </label>
        <input
          className={fieldClasses}
          id={`${prefix}Transport`}
          name={`${prefix}Transport`}
          type="text"
          placeholder="Till exempel egen bil, samåkning eller buss"
        />
      </div>
    </fieldset>
  );
}

const OSAPage = () => {
  const searchParams = useSearchParams();
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const hasSubmitted = searchParams.get("submitted") === "1";

  return (
    <main className="min-h-screen px-4 py-12 text-stone-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="grid gap-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-stone-500">
            OSA
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Vänligen svara på inbjudan
          </h1>
          <p className="mx-auto max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
            Svara senast xxxx-xx-xx. Om du tar med en +1 visas extra fält
            automatiskt.
          </p>
        </header>

        {hasSubmitted ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-900">
            Tack! Ditt svar är sparat.
          </div>
        ) : null}

        <form
          action={saveGuestRsvp}
          className="grid gap-6 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-stone-200 sm:p-8"
        >
          <PersonSection prefix="primary" title="Huvudgäst" />

          <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-700">
            <input
              checked={hasPlusOne}
              className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500"
              name="hasPlusOne"
              onChange={(event) => setHasPlusOne(event.target.checked)}
              type="checkbox"
            />
            Jag tar med en +1
          </label>

          {hasPlusOne ? <PersonSection prefix="plusOne" title="+1" /> : null}

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
