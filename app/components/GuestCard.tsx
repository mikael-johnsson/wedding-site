"use client";

import { useEffect, useState } from "react";
import { formatDays } from "../lib/formatDays";
import { Guest, PersonInfo } from "../models/Guest";
import DeleteGuestForm from "./DeleteGuestForm";

type GuestCardProps = {
  defaultOpen?: boolean;
  primaryGuest: PersonInfo;
  plusOne?: PersonInfo;
  numberOfGuests: number;
  rsvpSubmittedAt?: Date;
  _id: string;
};

const GuestCard = ({
  defaultOpen,
  primaryGuest,
  plusOne,
  numberOfGuests,
  rsvpSubmittedAt,
  _id,
}: GuestCardProps) => {
  const [cardOpen, setCardOpen] = useState(defaultOpen);

  useEffect(() => {
    setCardOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <li key={_id} className="border p-4 rounded-lg ">
      <button
        onClick={() => setCardOpen(!cardOpen)}
        className="px-3 py-1 border rounded mb-2"
      >
        {cardOpen ? "Stäng" : "Öppna"}
      </button>
      {!cardOpen && (
        <div className="flex flex-col items-start gap-3 md:flex-row sm:justify-start">
          <div className="basis-[40%]">
            <p>
              <strong>Huvudgäst:</strong> {primaryGuest.name}
            </p>
            <p>
              <strong>Närvaro:</strong> {primaryGuest.attending ? "Ja" : "Nej"}
            </p>
          </div>
          {numberOfGuests > 1 && (
            <div>
              <p>
                <strong>+1 Namn:</strong> {plusOne ? plusOne.name : "Ingen"}
              </p>
              <p>
                <strong>+1 Närvaro:</strong> {plusOne?.attending ? "Ja" : "Nej"}
              </p>
            </div>
          )}
        </div>
      )}

      {cardOpen && (
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="basis-[40%] flex flex-col gap-1">
            <p>
              <strong>Huvudgäst:</strong> {primaryGuest.name}
            </p>
            <p>
              <strong>Närvaro:</strong> {primaryGuest.attending ? "Ja" : "Nej"}
            </p>
            <p>
              <strong>Allergier:</strong> {primaryGuest.allergies || "Inga"}
            </p>
            <p>
              <strong>Matval:</strong> {primaryGuest.mealChoice || "Ingen"}
            </p>
            <p>
              <strong>Meddelande:</strong> {primaryGuest.notes || "Inget"}
            </p>
            <p>
              <strong>Dagar närvaro:</strong>{" "}
              {formatDays(primaryGuest.daysAttending)}
            </p>
            <p>
              <strong>Dagar övernattning:</strong>{" "}
              {formatDays(primaryGuest.daysOvernighting)}
            </p>
            <p>
              <strong>Transport:</strong>{" "}
              {primaryGuest.transport || "Ingen transport angiven"}
            </p>
          </div>
          {plusOne && (
            <div className="basis-[40%] flex flex-col gap-1">
              <p>
                <strong>+1 Namn:</strong> {plusOne.name}
              </p>
              <p>
                <strong>+1 Närvaro:</strong> {plusOne.attending ? "Ja" : "Nej"}
              </p>
              <p>
                <strong>+1 Allergier:</strong> {plusOne.allergies || "Inga"}
              </p>
              <p>
                <strong>+1 Matval:</strong>{" "}
                {plusOne.mealChoice || "Inget val gjort"}
              </p>
              <p>
                <strong>+1 Meddelande:</strong>{" "}
                {plusOne.notes || "Inget meddelande"}
              </p>
              <p>
                <strong>+1 Dagar närvaro:</strong>{" "}
                {formatDays(plusOne.daysAttending)}
              </p>
              <p>
                <strong>+1 Dagar övernattning:</strong>{" "}
                {formatDays(plusOne.daysOvernighting)}
              </p>
              <p>
                <strong>+1 Transport:</strong>{" "}
                {plusOne.transport || "Ingen transport angiven"}
              </p>
            </div>
          )}
          <div className="basis-[20%] flex flex-col gap-1">
            <p>
              <strong>Svar inlämnat:</strong> <br></br>
              {rsvpSubmittedAt
                ? new Date(rsvpSubmittedAt).toLocaleString("sv-SE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "Nej"}
            </p>
            <p>
              <strong>Antal gäster:</strong> {numberOfGuests}
            </p>
            <DeleteGuestForm guestId={_id.toString()} />
          </div>
        </div>
      )}
    </li>
  );
};

export default GuestCard;
