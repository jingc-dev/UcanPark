import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { Booking, BookingAction } from "../data/bookingsReducer";
import { BookingStateContext } from "../data/context";
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

export default function BookSpotScreen({ navigation }) {
  const { state, dispatch } = useContext(BookingStateContext);

  const [parkingSpots, setParkingSpots] = useState<AvailableParkingSpots>();
  const [bookingProcessing, setBookingProcessing] = useState(false);

  const selectedDateAlreadyBooked = state.bookings
    .map((b) => b.id)
    .includes(state.selectedDate);

  const showBookingAction = state.selectedDate && !selectedDateAlreadyBooked;

  const spotsOfSelectedDay = parkingSpots?.[`${state.selectedDate}`]?.spots;
  const showBookButton = showBookingAction && state.coupons > 0;

  const onDayPress = (day: DateData) => {
    dispatch({
      type: BookingAction.SELECT_DATE,
      payload: { id: day.dateString },
    });

    //TODO Fix slight flicker before styling takes effect in tapped date
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
      setParkingSpots(data);
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
        backgroundColor: "#EBF7F8",
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

      <View>
        <Text style={{ textAlign: "right" }}>
          Your coupons: {state.coupons}
        </Text>
      </View>

      {state.selectedDate && (
        <InfoBox>
          {state.selectedDate && (
            <View style={styles.infoGroup}>
              <Text style={styles.info}>Selected</Text>
              <Text style={styles.infoImportant}>
                {format(new Date(state.selectedDate), NZ_DATE_FORMAT)}
              </Text>
            </View>
          )}
          {spotsOfSelectedDay && (
            <View style={styles.infoGroup}>
              <Text style={styles.info}>Spots left</Text>
              <Text style={styles.infoImportant}>{spotsOfSelectedDay}</Text>
            </View>
          )}
        </InfoBox>
      )}

      {selectedDateAlreadyBooked && (
        <InfoBox>
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
