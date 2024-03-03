import { add, format } from "date-fns";

const CALENDAR_DATE_FORMAT = "yyyy-MM-dd";

/**
 * @returns today in a string format like "2024-03-03"
 */
export const getTodayInFormat = () => format(new Date(), CALENDAR_DATE_FORMAT);

/**
 * @returns a date in the future with given duration, in string format like "2024-03-03"
 */
export const getMaxDateInFormat = (date: Date, durationInDays: number = 0) => {
  if (durationInDays < 0) throw new Error("Invalid duration");
  if (durationInDays === 0) return format(date, CALENDAR_DATE_FORMAT);

  const maxDate = add(date, { days: durationInDays });
  return format(maxDate, CALENDAR_DATE_FORMAT);
};
