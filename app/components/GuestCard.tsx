import { formatDays } from "../lib/formatDays";
import { Guest } from "../models/Guest";
import DeleteGuestForm from "./DeleteGuestForm";

const GuestCard = (guest: Guest) => {
  return (
    <li key={guest._id} className="border p-4 rounded-lg flex justify-between">
      <div>
        <p>
          <strong>Huvudgäst:</strong> {guest.primaryGuest.name}
        </p>
        <p>
          <strong>Närvaro:</strong>{" "}
          {guest.primaryGuest.attending ? "Ja" : "Nej"}
        </p>
        <p>
          <strong>Allergier:</strong> {guest.primaryGuest.allergies || "Inga"}
        </p>
        <p>
          <strong>Matval:</strong> {guest.primaryGuest.mealChoice || "Ingen"}
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
        <div>
          <p>
            <strong>+1 Namn:</strong> {guest.plusOne.name}
          </p>
          <p>
            <strong>+1 Närvaro:</strong>{" "}
            {guest.plusOne.attending ? "Ja" : "Nej"}
          </p>
          <p>
            <strong>+1 Allergier:</strong> {guest.plusOne.allergies || "Inga"}
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
      <div>
        <p>
          <strong>RSVP Inlämnad:</strong>{" "}
          {guest.rsvpSubmittedAt
            ? new Date(guest.rsvpSubmittedAt).toLocaleString()
            : "Nej"}
        </p>
        <p>
          <strong>Antal gäster:</strong> {guest.numberOfGuests}
        </p>
        <DeleteGuestForm guestId={guest._id.toString()} />
      </div>
    </li>
  );
};

export default GuestCard;
