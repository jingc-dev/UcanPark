import { Text, View } from "react-native";
import StyledButton from "../ui/StyledButton";

export default function MyBookings({ navigation }) {
  const logOutHander = () => {
    navigation.navigate("LogIn");
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#EBF7F8",
        paddingTop: 50,
        paddingBottom: 50,
        paddingHorizontal: 20,
        gap: 10,
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: 16 }}>My Bookings</Text>
      <StyledButton text="Log Out" onPress={logOutHander} />
    </View>
  );
}
