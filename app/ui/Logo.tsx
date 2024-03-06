import { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../context/themeContext";

export default function Logo() {
  const theme = useContext(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: theme.backgroundColor.secondary,
        padding: 20,
        paddingTop: 40,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: theme.border.tint,
        borderWidth: 1,
      }}
    >
      <Text
        style={{
          color: theme.brandColor.accent,
          fontSize: 26,
          fontWeight: "bold",
        }}
      >
        UCAN
      </Text>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>PARKING</Text>
      <Text style={{ fontSize: 16 }}>Book your carpark</Text>
    </View>
  );
}
