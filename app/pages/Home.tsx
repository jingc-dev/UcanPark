import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScreenName } from "../lib/nav";
import LogOutButton from "../ui/LogOutButton";
import BookSpotScreen from "./BookSpot";
import MyBookings from "./MyBookings";
import { bookingsReducer, initialBookingsState } from "../data/bookingsReducer";
import { BookingStateContext } from "../data/context";
import { useReducer } from "react";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  const [state, dispatch] = useReducer(bookingsReducer, initialBookingsState);

  return (
    <BookingStateContext.Provider value={{ state, dispatch }}>
      <Tab.Navigator
        screenOptions={{
          //TODO refactor colour uses
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
    </BookingStateContext.Provider>
  );
}
