import GuestModel, { convertGuestToDTO, Guest } from "../models/Guest";
import { checkAuth } from "../actions/UserActions";
import GuestCard from "../components/GuestCard";
import { overNightStays } from "../lib/overnightStays";
import { weddingDaysAttendees } from "../lib/weddingDaysAttendees";
import PDFButton from "../components/PDFButton";
import { AttendingStats } from "../models/AttendingStats";
import OpenAllCardsButton from "../components/OpenAllCardsButton";

type GuestsPageProps = {
  searchParams: Promise<{ attending: string; openAll: string }>;
};

const GuestsPage = async ({ searchParams }: GuestsPageProps) => {
  const authUser = await checkAuth();
  const { attending, openAll = "true" } = await searchParams;
  const filtersProps = [];
  if (attending) {
    filtersProps.push(attending);
  }
  const filterAttending =
    attending === "attending"
      ? true
      : attending === "not-attending"
        ? false
        : undefined;

  const filter =
    filterAttending === undefined
      ? {}
      : { "primaryGuest.attending": filterAttending };

  const openAllCards = openAll === "false" ? false : true;

  const guests: Guest[] = await GuestModel.find(filter).lean(); // Fetch guests based on the filter
  const guestDTOs = guests.map((guest) => convertGuestToDTO(guest)); // Convert guests to DTOs if needed

  const numberGuests: Guest[] = await GuestModel.find().lean(); // Fetch all guests to calculate totals

  const amountOfAttending = numberGuests.reduce(
    (total, guest) => total + guest.numberOfGuests,
    0,
  );
  const amountOfOSA = numberGuests.length;
  const amountOfNotAttending = numberGuests.reduce(
    (total, guest) => total + (guest.primaryGuest.attending ? 0 : 1),
    0,
  );

  const [fridayOvernights, saturdayOvernights] = overNightStays(numberGuests);
  const [fridayAttendees, saturdayAttendees, sundayAttendees] =
    weddingDaysAttendees(numberGuests);

  const attendingStats: AttendingStats = {
    amountOfAttending,
    amountOfOSA,
    amountOfNotAttending,
    fridayOvernights,
    saturdayOvernights,
    fridayAttendees,
    saturdayAttendees,
    sundayAttendees,
  };

  if (!authUser) {
    return (
      <main className="min-h-screen p-4 py-12sm:px-6 lg:px-8">
        <h1 className="text-4xl font-heading mb-4">Gäster</h1>
        <p className="mb-4">Du måste vara inloggad för att se gästlistan.</p>
      </main>
    );
  }
  return (
    <main className="min-h-screen p-4 py-12sm:px-6 lg:px-8">
      <h1 className="text-4xl font-heading mb-4 text-center">GÄSTER</h1>
      <div className="flex flex-col justify-center mb-8 gap-1">
        <p>Totalt antal gäster: {amountOfAttending}</p>
        <p>Totalt antal svar (antal inbjudningar): {amountOfOSA}</p>
        <p>
          Totalt antal som tackat nej (antal inbjudningar):{" "}
          {amountOfNotAttending}
        </p>
        <p>Antal övernattningar fredag: {fridayOvernights}</p>
        <p>Antal övernattningar lördag: {saturdayOvernights}</p>
        <p>Antal gäster fredag: {fridayAttendees}</p>
        <p>Antal gäster lördag: {saturdayAttendees}</p>
        <p>Antal gäster söndag: {sundayAttendees}</p>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex flex-col gap-2">
          <form className="flex gap-4 mb-2">
            <div className="flex gap-1 items-center">
              <label htmlFor="attending">Närvarande</label>
              <select
                className="border rounded p-1"
                name="attending"
                id="attending"
                defaultValue={attending || "everyone"}
              >
                <option value="everyone">Alla</option>
                <option value="attending">Närvarande</option>
                <option value="not-attending">Icke närvarande</option>
              </select>
            </div>
            <button
              className="px-2 py-1 rounded border hover:bg-teal-900 hover:text-white"
              type="submit"
            >
              Filtrera
            </button>
          </form>
          <form action={"/guests"} method="GET" className="flex gap-4">
            <button
              className="px-2 py-1 rounded border hover:bg-teal-900 hover:text-white"
              type="submit"
            >
              Rensa filter
            </button>
            <PDFButton
              guests={guestDTOs}
              filters={filtersProps}
              attendingStats={attendingStats}
            />
          </form>
        </div>
        <div>
          <OpenAllCardsButton isOpen={openAllCards} />
        </div>
      </div>
      <ul className="space-y-4">
        {!guests || guests.length === 0 ? (
          <li>
            <p>Inga gäster hittades.</p>
          </li>
        ) : (
          guests.map((guest) => (
            <GuestCard
              defaultOpen={openAllCards}
              key={guest._id}
              primaryGuest={guest.primaryGuest}
              plusOne={guest.plusOne}
              numberOfGuests={guest.numberOfGuests}
              rsvpSubmittedAt={guest.rsvpSubmittedAt}
              _id={guest._id.toString()}
            />
          ))
        )}
      </ul>
    </main>
  );
};

export default GuestsPage;
