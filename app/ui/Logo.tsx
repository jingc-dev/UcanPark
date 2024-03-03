import { Text, View } from "react-native";

export default function Logo() {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 40,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: "#4C7A7D50",
        borderWidth: 1,
      }}
    >
      <Text style={{ color: "#C6171F", fontSize: 26, fontWeight: "bold" }}>
        UCAN
      </Text>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>PARKING</Text>
      <Text style={{ fontSize: 16 }}>Book your carpark</Text>
    </View>
  );
}
