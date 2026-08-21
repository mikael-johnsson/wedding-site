"use client";

import { Dispatch, SetStateAction } from "react";

const weddingDays = [
  { value: "friday", label: "Fredag" },
  { value: "saturday", label: "Lördag" },
  { value: "sunday", label: "Söndag" },
] as const;

const overNightDays = [
  { value: "friday", label: "Fredag" },
  { value: "saturday", label: "Lördag" },
] as const;

type DayCheckboxGroupProps = {
  prefix: "primary" | "plusOne";
  name: "DaysAttending" | "DaysOvernighting";
  title: string;
  required?: boolean;
  setAttendingFriday?: Dispatch<SetStateAction<boolean | null>>;
};

function DayCheckboxGroup({
  prefix,
  name,
  title,
  required,
  setAttendingFriday,
}: DayCheckboxGroupProps) {
  const attendingDays = name === "DaysAttending" ? true : false;
  const days = attendingDays ? weddingDays : overNightDays;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "friday" && attendingDays) {
      setAttendingFriday?.(event.target.checked);
    }
  };
  return (
    <fieldset className="grid gap-3 rounded-xl border border-stone-200 bg-white p-4">
      <legend className="px-1 text-sm font-medium text-stone-700">
        {title}
      </legend>
      <div className="grid gap-3 sm:grid-cols-3">
        {days.map((day) => (
          <label
            key={day.value}
            className="flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-stone-700"
          >
            <input
              name={`${prefix}${name}`}
              type="checkbox"
              value={day.value}
              required={required}
              onChange={handleChange}
            />
            {day.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default DayCheckboxGroup;
