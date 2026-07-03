"use client";

import { useState } from "react";
import { formatDays } from "../lib/formatDays";
import { Guest } from "../models/Guest";
import DeleteGuestForm from "./DeleteGuestForm";

const GuestCard = (guest: Guest) => {
  const [cardOpen, setCardOpen] = useState(false);

  return (
    <li key={guest._id} className="border p-4 rounded-lg ">
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
              <strong>Huvudgäst:</strong> {guest.primaryGuest.name}
            </p>
            <p>
              <strong>Närvaro:</strong>{" "}
              {guest.primaryGuest.attending ? "Ja" : "Nej"}
            </p>
          </div>
          {guest.numberOfGuests > 1 && (
            <div>
              <p>
                <strong>+1 Namn:</strong>{" "}
                {guest.plusOne ? guest.plusOne.name : "Ingen"}
              </p>
              <p>
                <strong>+1 Närvaro:</strong>{" "}
                {guest.plusOne?.attending ? "Ja" : "Nej"}
              </p>
            </div>
          )}
        </div>
      )}

      {cardOpen && (
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="basis-[40%] flex flex-col gap-1">
            <p>
              <strong>Huvudgäst:</strong> {guest.primaryGuest.name}
            </p>
            <p>
              <strong>Närvaro:</strong>{" "}
              {guest.primaryGuest.attending ? "Ja" : "Nej"}
            </p>
            <p>
              <strong>Allergier:</strong>{" "}
              {guest.primaryGuest.allergies || "Inga"}
            </p>
            <p>
              <strong>Matval:</strong>{" "}
              {guest.primaryGuest.mealChoice || "Ingen"}
            </p>
            <p>
              <strong>Meddelande:</strong> {guest.primaryGuest.notes || "Inget"}
            </p>
            <p>
              <strong>Dagar närvaro:</strong>{" "}
              {formatDays(guest.primaryGuest.daysAttending)}
            </p>
            <p>
              <strong>Dagar övernattning:</strong>{" "}
              {formatDays(guest.primaryGuest.daysOvernighting)}
            </p>
            <p>
              <strong>Transport:</strong>{" "}
              {guest.primaryGuest.transport || "Ingen transport angiven"}
            </p>
          </div>
          {guest.plusOne && (
            <div className="basis-[40%] flex flex-col gap-1">
              <p>
                <strong>+1 Namn:</strong> {guest.plusOne.name}
              </p>
              <p>
                <strong>+1 Närvaro:</strong>{" "}
                {guest.plusOne.attending ? "Ja" : "Nej"}
              </p>
              <p>
                <strong>+1 Allergier:</strong>{" "}
                {guest.plusOne.allergies || "Inga"}
              </p>
              <p>
                <strong>+1 Matval:</strong>{" "}
                {guest.plusOne.mealChoice || "Inget val gjort"}
              </p>
              <p>
                <strong>+1 Meddelande:</strong>{" "}
                {guest.plusOne.notes || "Inget meddelande"}
              </p>
              <p>
                <strong>+1 Dagar närvaro:</strong>{" "}
                {formatDays(guest.plusOne.daysAttending)}
              </p>
              <p>
                <strong>+1 Dagar övernattning:</strong>{" "}
                {formatDays(guest.plusOne.daysOvernighting)}
              </p>
              <p>
                <strong>+1 Transport:</strong>{" "}
                {guest.plusOne.transport || "Ingen transport angiven"}
              </p>
            </div>
          )}
          <div className="basis-[20%] flex flex-col gap-1">
            <p>
              <strong>Svar inlämnat:</strong> <br></br>
              {guest.rsvpSubmittedAt
                ? new Date(guest.rsvpSubmittedAt).toLocaleString("sv-SE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "Nej"}
            </p>
            <p>
              <strong>Antal gäster:</strong> {guest.numberOfGuests}
            </p>
            <DeleteGuestForm guestId={guest._id.toString()} />
          </div>
        </div>
      )}
    </li>
  );
};

export default GuestCard;
