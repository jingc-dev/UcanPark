import { Text, View } from "react-native";
import StyledButton from "../ui/StyledButton";
import { mockLogOut } from "../lib/mockApi";
import { useEffect, useState } from "react";

export default function MyBookings({ navigation }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onPressLogOut = () => {
    logOut();
  };

  const logOut = async () => {
    setIsLoggingOut(true);
    try {
      await mockLogOut();
      navigation.navigate("LogIn");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoggingOut(false);
    }
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
      <StyledButton
        text="Log Out"
        onPress={onPressLogOut}
        loading={isLoggingOut}
        loadingText="Logging Out"
      />
    </View>
  );
}
