"use client";

import { useState } from "react";
import DayCheckboxGroup from "./DayCheckboxGroup";
import Link from "next/link";

const fieldClasses =
  "mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 shadow-sm outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200";

const labelClasses = "text-md font-medium text-text-black";

function PersonSection({
  prefix,
  title,
  onAttendingChange,
}: {
  prefix: "primary" | "plusOne";
  title: string;
  onAttendingChange?: (value: boolean) => void;
}) {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [attendingFriday, setAttendingFriday] = useState<boolean | null>(null);

  return (
    <fieldset className="grid gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-5">
      <legend className="px-2 text-md font-semibold uppercase tracking-[0.2em] text-stone-500">
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
        <span className={labelClasses}>Jag kommer!</span>
        <div className="mt-2 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-stone-700">
            <input
              name={`${prefix}Attending`}
              type="radio"
              value="yes"
              required
              onChange={() => {
                setAttending(true);
                onAttendingChange?.(true);
              }}
            />
            Ja
          </label>
          <label className="flex items-center gap-2 text-stone-700">
            <input
              name={`${prefix}Attending`}
              type="radio"
              value="no"
              onChange={() => {
                setAttending(false);
                onAttendingChange?.(false);
              }}
            />
            Nej
          </label>
        </div>
      </div>

      {attending !== false && (
        <>
          <div>
            <label className={labelClasses} htmlFor={`${prefix}Allergies`}>
              Allergier
            </label>
            <textarea
              className={`${fieldClasses} min-h-18`}
              id={`${prefix}Allergies`}
              name={`${prefix}Allergies`}
              rows={2}
              placeholder="Till exempel skaldjur eller dålig musik"
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
              placeholder="Till exempel kött eller vegetariskt"
              required={attending === true}
            />
          </div>

          <div>
            <label className={labelClasses} htmlFor={`${prefix}Notes`}>
              Övrigt
            </label>
            <textarea
              className={`${fieldClasses} min-h-18`}
              id={`${prefix}Notes`}
              name={`${prefix}Notes`}
              rows={2}
              placeholder="Annan information vi behöver känna till"
            />
          </div>

          <DayCheckboxGroup
            name="DaysAttending"
            prefix={prefix}
            title="Vilka dagar är du med?"
            setAttendingFriday={setAttendingFriday}
          />
          {attendingFriday === true && (
            <div>
              <label
                className={labelClasses}
                htmlFor={`${prefix}MealChoiceFriday`}
              >
                Middagsval fredag
              </label>
              <textarea
                className={`${fieldClasses} min-h-18`}
                id={`${prefix}MealChoiceFriday`}
                name={`${prefix}MealChoiceFriday`}
                rows={2}
                placeholder="Kött eller vegetariskt"
              />
            </div>
          )}

          <DayCheckboxGroup
            name="DaysOvernighting"
            prefix={prefix}
            title="Vilka dagar sover du över?"
          />
          <div className="p-2">
            <span className="text-md text-text-black italic">
              OBS! Boende bokas på egen hand. Uppge Olivia & Simon vid bokning.
              Mer om boende
            </span>
            <span className="ml-1 text-sm text-text-black italic">
              <Link href="#logistik" target="_blank" className="font-semibold ">
                här.
              </Link>
            </span>
          </div>

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
              required={attending === true}
            />
          </div>
        </>
      )}
    </fieldset>
  );
}

export default PersonSection;
