import { NavigationContainer } from "@react-navigation/native";
import BookSpotScreen from "./BookSpot";
import MyBookings from "./MyBookings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScreenName } from "../lib/nav";
import { Pressable, Text } from "react-native";
import LogOutButton from "../ui/LogOutButton";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#4C7A7D",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#fff",
          },
        }}
      >
        <Tab.Screen name={ScreenName.BOOK_SPOT} component={BookSpotScreen} />
        <Tab.Screen
          name={ScreenName.MY_BOOKINGS}
          component={MyBookings}
          options={{
            headerRight: () => <LogOutButton navigation={navigation} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
}
