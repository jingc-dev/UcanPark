import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScreenName } from "../lib/nav";
import LogOutButton from "../ui/LogOutButton";
import BookSpotScreen from "./BookSpot";
import MyBookings from "./MyBookings";
import { bookingsReducer, initialBookingsState } from "../data/bookingsReducer";
import { BookingStateContext } from "../context/bookingContext";
import { useContext, useReducer } from "react";
import { ThemeContext } from "../context/themeContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  const theme = useContext(ThemeContext);
  const [state, dispatch] = useReducer(bookingsReducer, initialBookingsState);

  return (
    <BookingStateContext.Provider value={{ state, dispatch }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.brandColor.primary,
          tabBarInactiveTintColor: theme.textGray,
          tabBarStyle: {
            backgroundColor: theme.backgroundColor.secondary,
          },
        }}
      >
        <Tab.Screen
          name={ScreenName.BOOK_SPOT}
          component={BookSpotScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="car" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={ScreenName.MY_BOOKINGS}
          component={MyBookings}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="view-list"
                color={color}
                size={size}
              />
            ),
            headerRight: () => <LogOutButton navigation={navigation} />,
          }}
        />
      </Tab.Navigator>
    </BookingStateContext.Provider>
  );
}
