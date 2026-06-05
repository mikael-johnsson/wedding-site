export const formatDays = (days: string[] | undefined) => {
  if (!days || days.length === 0) {
    return "Inga valda dagar";
  }

  return days
    .map((day) => {
      if (day === "friday") return "Fredag";
      if (day === "saturday") return "Lördag";
      if (day === "sunday") return "Söndag";

      return day;
    })
    .join(", ");
};
