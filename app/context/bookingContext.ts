import { BookingActionType, BookingState } from "../data/bookingsReducer";

import { createContext } from "react";

type ValueType = {
  state: BookingState;
  dispatch: React.Dispatch<BookingActionType>;
};

export const BookingStateContext = createContext<ValueType | null>(null);
