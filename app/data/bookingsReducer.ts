export enum BookingAction {
  ADD_BOOKING = "update-my-bookings",
}

export type BookingActionType = {
  type: "update-my-bookings";
  payload: Booking;
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
    default: {
      return state;
    }
  }
};
