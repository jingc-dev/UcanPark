import { MarkedDates } from "react-native-calendars/src/types";
import { AvailableParkingSpots } from "../lib/mockApi";

export enum BookingAction {
  LOAD_AVAILABLE_SPOTS = "load-available-spots",
  ADD_BOOKING = "add-booking",
  CANCEL_BOOKING = "cancel-booking",
  SELECT_DATE = "select-date",
}

export type BookingActionType =
  | {
      type: BookingAction.LOAD_AVAILABLE_SPOTS;
      payload: AvailableParkingSpots;
    }
  | {
      type: BookingAction.ADD_BOOKING;
      payload: Booking;
    }
  | {
      type: BookingAction.CANCEL_BOOKING;
      payload: { id: string };
    }
  | {
      type: BookingAction.SELECT_DATE;
      payload: {
        id: string;
        color: {
          selected: string;
          booked: string;
          bookedWithBackground: string;
        };
      };
    };

export type Booking = { id: string; booking: { bookedDate: string } };

export type BookingState = {
  bookings: Booking[];
  /**
   * Dotted UI state of booked dates
   */
  bookedDates: MarkedDates;
  /**
   * Mixed UI state of booked and selected dates
   */
  markedDates: MarkedDates;
  selectedDate: string | null;
  coupons: number;
  availableSpots: AvailableParkingSpots | null;
  availableSpotsOfSelectedDate: number | null;
};

const MOCK_INITIAL_COUPONS = 2;

export const initialBookingsState: BookingState = {
  bookings: [],
  bookedDates: {},
  markedDates: {},
  selectedDate: null,
  coupons: MOCK_INITIAL_COUPONS,
  availableSpots: null,
  availableSpotsOfSelectedDate: null,
};

export const bookingsReducer = (
  state = initialBookingsState,
  action: BookingActionType
): BookingState => {
  switch (action.type) {
    case BookingAction.LOAD_AVAILABLE_SPOTS: {
      return {
        ...state,
        availableSpots: action.payload,
      };
    }

    case BookingAction.ADD_BOOKING: {
      const bookings = [...state.bookings, action.payload];
      const dateToBook = action.payload.id;
      const bookedDates = bookings.map((b) => b.booking.bookedDate);
      const dottedDates = createCalendarDotMarkedDatesFromDates(bookedDates);
      const availableSpots: AvailableParkingSpots = {
        ...state.availableSpots,
        [dateToBook]: {
          spots: state.availableSpots[dateToBook].spots - 1,
        },
      };

      return {
        ...state,
        availableSpots,
        bookings,
        bookedDates: dottedDates,
        markedDates: dottedDates,
        selectedDate: null,
        coupons: state.coupons - 1,
      };
    }

    case BookingAction.CANCEL_BOOKING: {
      const dateToCancel = action.payload.id;
      const filteredBookings = state.bookings.filter(
        (b) => b.id !== dateToCancel
      );
      const bookedDates = filteredBookings.map((d) => d.booking.bookedDate);
      const dottedDates = createCalendarDotMarkedDatesFromDates(bookedDates);
      const availableSpots: AvailableParkingSpots = {
        ...state.availableSpots,
        [dateToCancel]: {
          spots: state.availableSpots[dateToCancel].spots + 1,
        },
      };

      return {
        ...state,
        availableSpots,
        bookings: filteredBookings,
        bookedDates: dottedDates,
        markedDates: dottedDates,
        coupons: state.coupons + 1,
        selectedDate: null,
      };
    }

    case BookingAction.SELECT_DATE: {
      const selectedDate = action.payload.id;
      const bookedIds = new Set(state.bookings.map((b) => b.id));

      const { color } = action.payload;

      const selectedDateMark = {
        [selectedDate]: {
          marked: bookedIds.has(selectedDate),
          dotColor: bookedIds.has(selectedDate)
            ? color.bookedWithBackground
            : color.booked,
          selected: true,
          selectedColor: color.selected,
        },
      };

      const availableSpotsOfSelectedDate =
        state.availableSpots[selectedDate].spots;

      return {
        ...state,
        markedDates: { ...state.bookedDates, ...selectedDateMark },
        selectedDate,
        availableSpotsOfSelectedDate,
      };
    }

    default: {
      return state;
    }
  }
};

const createCalendarDotMarkedDatesFromDates = (dates: string[]) =>
  dates.reduce(
    (acc, date) => ({ ...acc, [date]: { marked: true, dotColor: "red" } }),
    {}
  );
