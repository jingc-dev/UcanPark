import { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../context/themeContext";

export default function InfoBox({ children }: { children: React.ReactNode }) {
  const theme = useContext(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: theme.backgroundColor.secondary,
        borderRadius: 8,
        padding: 16,
        gap: 6,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderColor: theme.border.normal,
        borderBottomWidth: 1,
      }}
    >
      {children}
    </View>
  );
}
