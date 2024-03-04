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
};

export const initialBookingsState: BookingState = {
  bookings: [],
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
      };
    }
    case BookingAction.CANCEL_BOOKING: {
      return {
        ...state,
        bookings: state.bookings.filter((b) => b.id !== action.payload.id),
      };
    }
    default: {
      return state;
    }
  }
};
