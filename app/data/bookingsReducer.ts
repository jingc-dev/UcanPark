export enum BookingAction {
  ADD_BOOKING = "add-booking",
  CANCEL_BOOKING = "cancel-booking",
}

export type BookingActionType =
  | {
      type: BookingAction.ADD_BOOKING;
      payload: Booking;
    }
  | {
      type: BookingAction.CANCEL_BOOKING;
      payload: { id: string };
    };

export type Booking = { id: string; booking: { bookedDate: string } };

export type BookingState = {
  bookings: Booking[];
  coupons: number;
};

const MOCK_INITIAL_COUPONS = 30;

export const initialBookingsState: BookingState = {
  bookings: [],
  coupons: MOCK_INITIAL_COUPONS,
};

export const bookingsReducer = (
  state = initialBookingsState,
  action: BookingActionType
): BookingState => {
  switch (action.type) {
    case BookingAction.ADD_BOOKING: {
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
        coupons: state.coupons - 1,
      };
    }
    case BookingAction.CANCEL_BOOKING: {
      return {
        ...state,
        bookings: state.bookings.filter((b) => b.id !== action.payload.id),
        coupons: state.coupons + 1,
      };
    }
    default: {
      return state;
    }
  }
};
