import { Guest } from "../models/Guest";

export const overNightStays = (guests: Guest[]) => {
  const fridayPrimaryOvernights = guests.filter(
    (guest) =>
      guest.primaryGuest.attending &&
      guest.primaryGuest.daysOvernighting?.includes("friday"),
  ).length;

  const fridayPlusOneOvernights = guests.filter(
    (guest) =>
      guest.plusOne?.attending &&
      guest.plusOne?.daysOvernighting?.includes("friday"),
  ).length;

  const saturdayPrimaryOvernights = guests.filter(
    (guest) =>
      guest.primaryGuest.attending &&
      guest.primaryGuest.daysOvernighting?.includes("saturday"),
  ).length;

  const saturdayPlusOneOvernights = guests.filter(
    (guest) =>
      guest.plusOne?.attending &&
      guest.plusOne?.daysOvernighting?.includes("saturday"),
  ).length;

  const totalFriday = fridayPrimaryOvernights + fridayPlusOneOvernights;
  const totalSaturday = saturdayPrimaryOvernights + saturdayPlusOneOvernights;

  return [totalFriday, totalSaturday];
};
