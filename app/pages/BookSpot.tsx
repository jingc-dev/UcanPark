import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { getMaxDateInFormat, getTodayInFormat } from "../lib/dates";
import {
  AvailableParkingSpots,
  getMockedAvailableParkingSpots,
  mockBookingSpot,
} from "../lib/mockApi";
import StyledButton from "../ui/StyledButton";

export default function BookSpotScreen({ navigation }) {
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [selectedDate, setSelectedDate] = useState<string>();
  const [parkingSpots, setParkingSpots] = useState<AvailableParkingSpots>();

  const [coupons, setCoupons] = useState(MOCK_INITIAL_COUPONS);

  const [bookingProcessing, setBookingProcessing] = useState(false);

  const spotsOfSelectedDay = parkingSpots?.[`${selectedDate}`]?.spots;
  const showBookButton = selectedDate && coupons > 0;

  const onDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);

    //TODO Fix slight flicker before styling takes effect in tapped date
    setMarkedDates({
      [day.dateString]: { selected: true, selectedColor: "#4C7A7D" },
    });
  };

  const bookingHandler = () => {
    setCoupons(coupons - 1);
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
      navigation.navigate("MyBookings");
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
      <Text style={{ fontSize: 16 }}>Book Parking Spot</Text>
      <Calendar
        firstDay={1}
        minDate={getTodayInFormat()}
        maxDate={getMaxDateInFormat(new Date(), BOOKABLE_DURATION_IN_DAYS)}
        markedDates={markedDates}
        onDayPress={onDayPress}
        style={{ borderRadius: 8 }}
        //TODO nice to have: a dot below the date if the user has booked a spot on that day
      />
      <View>
        <Text style={{ textAlign: "right" }}>Your coupons: {coupons}</Text>
      </View>
      <View style={{ paddingVertical: 10 }}>
        {selectedDate && (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              padding: 16,
              gap: 10,
            }}
          >
            {selectedDate && (
              <Text style={styles.info}>Selected: {selectedDate}</Text>
            )}
            {spotsOfSelectedDay && (
              <Text style={styles.info}>Spots left: {spotsOfSelectedDay}</Text>
            )}
            <Text style={styles.info}>Duration: Full day</Text>
          </View>
        )}
      </View>

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
const MOCK_INITIAL_COUPONS = 30;

const styles = StyleSheet.create({
  info: {
    fontSize: 16,
  },
});
