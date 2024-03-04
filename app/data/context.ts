import { BookingActionType, BookingState } from "./bookingsReducer";

import { createContext } from "react";

type ValueType = {
  state: BookingState;
  dispatch: React.Dispatch<BookingActionType>;
};

export const BookingStateContext = createContext<ValueType | null>(null);
