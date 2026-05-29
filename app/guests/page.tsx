import GuestModel, { Guest } from "../models/Guest";

const GuestsPage = async () => {
  const guests: Guest[] = await GuestModel.find().lean();
  return (
    <main className="min-h-screen px-4 py-12sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Gäster</h1>
      <ul className="space-y-4">
        {guests.map((guest) => (
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
                  {guest.plusOne.mealChoice || "Ingen"}
                </p>
              </>
            )}
            <p>
              <strong>RSVP Inlämnad:</strong>{" "}
              {guest.rsvpSubmittedAt
                ? new Date(guest.rsvpSubmittedAt).toLocaleString()
                : "Nej"}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default GuestsPage;
