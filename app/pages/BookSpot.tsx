import { useState } from "react";
import { Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { getMaxDateInFormat, getTodayInFormat } from "../lib/dates";

export default function BookSpotScreen({ navigation }) {
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const onDayPress = (day: DateData) => {
    console.log("selected day", day);
    //TODO Fix slight flicker before styling takes effect in tapped date
    setMarkedDates({
      [day.dateString]: { selected: true, selectedColor: "#4C7A7D" },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#EBF7F8",
        paddingTop: 50,
        paddingHorizontal: 20,
        gap: 10,
      }}
    >
      <Text style={{ fontSize: 16 }}>Book Parking Spot</Text>
      <Calendar
        firstDay={1}
        //TODO dynamic min & max dates
        minDate={getTodayInFormat()}
        maxDate={getMaxDateInFormat(new Date(), BOOKABLE_DURATION_IN_DAYS)}
        markedDates={markedDates}
        onDayPress={onDayPress}
      />
    </View>
  );
}

const BOOKABLE_DURATION_IN_DAYS = 10;
