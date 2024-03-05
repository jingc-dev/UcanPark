import { createContext } from "react";

export const defaultTheme: ValueType = {
  brandColor: {
    primary: "#4C7A7D",
    secondary: "#333333",
    accent: "#C6171F",
  },
  backgroundColor: {
    primary: "#EBF7F8",
    secondary: "#fff",
    busy: "gray",
  },
  textWhite: "#fff",
  textGray: "gray",
  vibrantRed: "red",
  border: "#4C7A7D50",
};

type ValueType = {
  brandColor: {
    primary: string;
    secondary: string;
    accent: string;
  };
  backgroundColor: {
    primary: string;
    secondary: string;
    busy: string;
  };
  textWhite: string;
  textGray: string;
  vibrantRed: string;
  border: string;
};

export const ThemeContext = createContext<ValueType | null>(null);
