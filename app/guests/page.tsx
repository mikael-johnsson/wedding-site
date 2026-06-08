import GuestModel, { Guest } from "../models/Guest";
import DeleteGuestForm from "../components/DeleteGuestForm";
import { checkAuth } from "../actions/UserActions";
import { formatDays } from "../lib/formatDays";
import GuestCard from "../components/GuestCard";

const GuestsPage = async () => {
  const authUser = await checkAuth();
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
  if (!authUser) {
    return (
      <main className="min-h-screen p-4 py-12sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Gäster</h1>
        <p className="mb-4">Du måste vara inloggad för att se gästlistan.</p>
      </main>
    );
  }
  return (
    <main className="min-h-screen p-4 py-12sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-4">Gäster</h1>
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
          guests.map((guest) => <GuestCard key={guest._id} {...guest} />)
        )}
      </ul>
    </main>
  );
};

export default GuestsPage;
