import { NavigationContainer } from "@react-navigation/native";
import BookSpotScreen from "./BookSpot";
import MyBookings from "./MyBookings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function Home() {
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
        <Tab.Screen
          name="BookSpot"
          component={BookSpotScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="MyBookings"
          component={MyBookings}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
}
