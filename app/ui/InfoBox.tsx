import { View } from "react-native";

export default function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        gap: 10,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {children}
    </View>
  );
}
