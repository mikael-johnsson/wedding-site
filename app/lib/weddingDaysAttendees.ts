import { Guest } from "../models/Guest";

export const weddingDaysAttendees = (guests: Guest[]) => {
  const fridayPrimaryAttendees = guests.filter(
    (guest) =>
      guest.primaryGuest.attending &&
      guest.primaryGuest.daysAttending?.includes("friday"),
  ).length;

  const fridayPlusOneAttendees = guests.filter(
    (guest) =>
      guest.plusOne?.attending &&
      guest.plusOne?.daysAttending?.includes("friday"),
  ).length;

  const saturdayPrimaryAttendees = guests.filter(
    (guest) =>
      guest.primaryGuest.attending &&
      guest.primaryGuest.daysAttending?.includes("saturday"),
  ).length;

  const saturdayPlusOneAttendees = guests.filter(
    (guest) =>
      guest.plusOne?.attending &&
      guest.plusOne?.daysAttending?.includes("saturday"),
  ).length;

  const sundayPrimaryAttendees = guests.filter(
    (guest) =>
      guest.primaryGuest.attending &&
      guest.primaryGuest.daysAttending?.includes("sunday"),
  ).length;

  const sundayPlusOneAttendees = guests.filter(
    (guest) =>
      guest.plusOne?.attending &&
      guest.plusOne?.daysAttending?.includes("sunday"),
  ).length;

  const totalFriday = fridayPrimaryAttendees + fridayPlusOneAttendees;
  const totalSaturday = saturdayPrimaryAttendees + saturdayPlusOneAttendees;
  const totalSunday = sundayPrimaryAttendees + sundayPlusOneAttendees;

  return [totalFriday, totalSaturday, totalSunday];
};
