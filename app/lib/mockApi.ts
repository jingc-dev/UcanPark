import { getMaxDateInFormat } from "./dates";

/**
 * @returns an object with structure like {"2024-03-03": {"spots": 92}, "2024-03-04": {"spots": 69}}
 */
export const getMockedAvailableParkingSpots = (
  startDay: Date,
  durationInDays: number
): Promise<AvailableParkingSpots> => {
  if (durationInDays <= 0) throw new Error("Invalid duration.");

  const data = new Map();
  for (let i = 0; i <= durationInDays; i++) {
    const date = getMaxDateInFormat(startDay, i);
    const spots = Math.floor(Math.random() * 100);
    data.set(date, { spots: spots });
  }

  return new Promise((resolve) => {
    setTimeout(
      () => resolve(Object.fromEntries(data)),
      DELAY_DURATION_MILLISECOND
    );
  });
};

export type AvailableParkingSpots = {
  date: {
    spots: number;
  };
};

const delay = () => () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), DELAY_DURATION_MILLISECOND);
  });

export const mockBookingSpot = delay();
export const mockLogIn = delay();
export const mockLogOut = delay();

const DELAY_DURATION_MILLISECOND = 1250;
