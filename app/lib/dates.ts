import { add, format } from "date-fns";

export const CALENDAR_LIBRARY_DATE_FORMAT = "yyyy-MM-dd";
export const NZ_DATE_FORMAT = "dd/MM/yyyy";

/**
 * @returns a date in the future with given duration, in string format like "2024-03-03"
 */
export const getMaxDateInFormat = (date: Date, durationInDays: number = 0) => {
  if (durationInDays < 0) throw new Error("Invalid duration");
  if (durationInDays === 0) return format(date, CALENDAR_LIBRARY_DATE_FORMAT);

  const maxDate = add(date, { days: durationInDays });
  return format(maxDate, CALENDAR_LIBRARY_DATE_FORMAT);
};
