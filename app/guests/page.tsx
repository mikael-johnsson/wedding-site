import { deleteGuest } from "../actions/GuestActions";
import GuestModel, { Guest } from "../models/Guest";
import DeleteGuestForm from "../components/DeleteGuestForm";

const GuestsPage = async () => {
  const guests: Guest[] = await GuestModel.find().lean();
  const amountOfAttending = guests.reduce(
    (total, guest) => total + guest.numberOfGuests,
    0,
  );
  const amountOfOSA = guests.length;
  const amountOfNotAttending = guests.reduce(
    (total, guest) => total + (guest.primaryGuest.attending ? 0 : 1),
    0,
  );
  return (
    <main className="min-h-screen p-4 py-12sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Gäster</h1>
      <p className="mb-4">Totalt antal gäster: {amountOfAttending}</p>
      <p className="mb-4">
        Totalt antal svar (antal inbjudningar): {amountOfOSA}
      </p>
      <p className="mb-4">
        Totalt antal som tackat nej (antal inbjudningar): {amountOfNotAttending}
      </p>
      <ul className="space-y-4">
        {!guests || guests.length === 0 ? (
          <li>
            <p>Inga gäster hittades.</p>
          </li>
        ) : (
          guests.map((guest) => (
            <li key={guest._id} className="border p-4 rounded-lg">
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
                {" "}
                <strong>Meddelande:</strong>{" "}
                {guest.primaryGuest.notes || "Inget"}
              </p>
              {guest.plusOne && (
                <>
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
                </>
              )}
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
            </li>
          ))
        )}
      </ul>
    </main>
  );
};

export default GuestsPage;
