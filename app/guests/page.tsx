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
      <section
        id="guests"
        className="min-h-screen px-4 sm:px-6 lg:px-8 scroll-mt-30"
      >
        <h2 className="text-3xl font-heading mb-8">Gäster</h2>
        <p className="mb-4">Du måste vara inloggad för att se gästlistan.</p>
      </section>
    );
  }
  return (
    <section
      id="guests"
      className="min-h-screen px-4 sm:px-6 lg:px-8 scroll-mt-30"
    >
      <h2 className="text-3xl font-heading mb-8 text-center">GÄSTER</h2>
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
      <div className="flex flex-col justify-between mb-4 gap-4 sm:flex-row">
        <div className="flex flex-col gap-2">
          <form className="flex flex-col gap-3 mb-2 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-1 sm:min-w-48">
              <label htmlFor="attending">Närvarande</label>
              <select
                className="w-full rounded border border-slate-300 px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 sm:min-w-56"
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
              className="hover:cursor-pointer rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-teal-900 hover:text-white"
              type="submit"
            >
              Filtrera
            </button>
          </form>
          <form action={"/guests"} method="GET" className="flex gap-4">
            <button
              className="hover:cursor-pointer px-2 py-1 rounded border hover:bg-teal-900 hover:text-white"
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
        <div className="self-end">
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
    </section>
  );
};

export default GuestsPage;
