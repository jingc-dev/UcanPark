import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { Booking, BookingAction } from "../data/bookingsReducer";
import { BookingStateContext } from "../context/bookingContext";
import {
  CALENDAR_LIBRARY_DATE_FORMAT,
  NZ_DATE_FORMAT,
  getMaxDateInFormat,
} from "../lib/dates";
import {
  AvailableParkingSpots,
  getMockedAvailableParkingSpots,
  mockBookingSpot,
} from "../lib/mockApi";
import { ScreenName } from "../lib/nav";
import StyledButton from "../ui/StyledButton";
import InfoBox from "../ui/InfoBox";
import { ThemeContext } from "../context/themeContext";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function BookSpotScreen({ navigation }) {
  const { state, dispatch } = useContext(BookingStateContext);
  const theme = useContext(ThemeContext);

  const [bookingProcessing, setBookingProcessing] = useState(false);

  const selectedDateAlreadyBooked = state.bookings
    .map((b) => b.id)
    .includes(state.selectedDate);

  const showBookingAction = state.selectedDate && !selectedDateAlreadyBooked;
  const showCouponWarning = state.selectedDate && state.coupons === 0;

  const { availableSpotsOfSelectedDate } = state;

  const showBookButton =
    showBookingAction &&
    state.coupons > 0 &&
    typeof availableSpotsOfSelectedDate === "number" &&
    availableSpotsOfSelectedDate > 0;

  const onDayPress = (day: DateData) => {
    dispatch({
      type: BookingAction.SELECT_DATE,
      payload: {
        id: day.dateString,
        color: {
          selected: theme.brandColor.primary,
          booked: theme.vibrantRed,
          bookedWithBackground: theme.textWhite,
        },
      },
    });
  };

  const bookingHandler = () => {
    confirmBooking();
  };

  const fetchData = async () => {
    try {
      const data = await getMockedAvailableParkingSpots(
        new Date(),
        BOOKABLE_DURATION_IN_DAYS
      );
      dispatch({ type: BookingAction.LOAD_AVAILABLE_SPOTS, payload: data });
    } catch (err) {
      console.error(err);
    }
  };

  const confirmBooking = async () => {
    setBookingProcessing(true);
    try {
      await mockBookingSpot();
      dispatch({
        type: BookingAction.ADD_BOOKING,
        payload: {
          id: state.selectedDate,
          booking: { bookedDate: state.selectedDate },
        } as Booking,
      });
      navigation.navigate(ScreenName.MY_BOOKINGS);
    } catch (err) {
      console.error(err);
    } finally {
      setBookingProcessing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.backgroundColor.primary,
        paddingTop: 50,
        paddingHorizontal: 20,
        gap: 16,
      }}
    >
      <Calendar
        firstDay={1}
        minDate={format(new Date(), CALENDAR_LIBRARY_DATE_FORMAT)}
        maxDate={getMaxDateInFormat(new Date(), BOOKABLE_DURATION_IN_DAYS)}
        markedDates={state.markedDates}
        onDayPress={onDayPress}
        style={{ borderRadius: 8 }}
      />

      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Text style={{ fontSize: 16 }}>My Coupons: </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {state.coupons}
        </Text>
      </View>

      {state.selectedDate !== null && (
        <InfoBox>
          <View style={styles.infoGroup}>
            <Text style={styles.info}>Selected</Text>
            <Text style={styles.infoImportant}>
              {format(new Date(state.selectedDate), NZ_DATE_FORMAT)}
            </Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.info}>Spots left</Text>
            <Text style={styles.infoImportant}>
              {availableSpotsOfSelectedDate}
            </Text>
          </View>
        </InfoBox>
      )}

      {selectedDateAlreadyBooked && (
        <InfoBox>
          <MaterialCommunityIcons name="check" size={20} />
          <Text style={styles.info}>You have booked a spot on this date.</Text>
        </InfoBox>
      )}

      {showBookButton && (
        <StyledButton
          onPress={bookingHandler}
          text={"Book Now"}
          loading={bookingProcessing}
        />
      )}

      {showCouponWarning && (
        <InfoBox>
          <MaterialCommunityIcons name="information-outline" size={20} />
          <Text style={styles.info}>You have run out of coupons. </Text>
        </InfoBox>
      )}
    </View>
  );
}

const BOOKABLE_DURATION_IN_DAYS = 10;

const styles = StyleSheet.create({
  infoGroup: {
    flex: 1,
    gap: 5,
  },
  info: {
    fontSize: 16,
  },
  infoImportant: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
