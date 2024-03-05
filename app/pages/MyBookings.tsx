import { useContext, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { BookingAction } from "../data/bookingsReducer";
import { BookingStateContext } from "../context/bookingContext";
import { mockCancelBooking } from "../lib/mockApi";
import StyledTextButton from "../ui/StyledTextButton";
import { ThemeContext } from "../context/themeContext";
import { format } from "date-fns";
import { NZ_DATE_FORMAT } from "../lib/dates";

export default function MyBookings() {
  const theme = useContext(ThemeContext);

  const { state, dispatch } = useContext(BookingStateContext);
  const [isCancelling, setIsCancelling] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");

  const onPressCancel = (id: string) => {
    cancelBooking(id);
  };

  const cancelBooking = async (id: string) => {
    setIsCancelling(true);
    setSelectedItemId(id);
    try {
      await mockCancelBooking();
      dispatch({ type: BookingAction.CANCEL_BOOKING, payload: { id: id } });
    } catch (err) {
      console.error(err);
    } finally {
      setIsCancelling(false);
      setSelectedItemId("");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.backgroundColor.primary,
        paddingTop: 50,
        paddingBottom: 50,
        paddingHorizontal: 20,
        gap: 10,
        justifyContent: "space-between",
      }}
    >
      {state.bookings.length === 0 && (
        <Text
          style={{ fontSize: 16, textAlign: "center", color: theme.textGray }}
        >
          No bookings found
        </Text>
      )}

      <FlatList
        data={state.bookings}
        renderItem={({ item }) => (
          <Item
            title={format(item.booking.bookedDate, NZ_DATE_FORMAT)}
            id={item.id}
            loading={selectedItemId === item.id && isCancelling}
            onPressCancel={onPressCancel}
          />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={MySeparator}
      />
    </View>
  );
}

const Item = ({
  id,
  title,
  loading = false,
  onPressCancel,
}: {
  id: string;
  title: string;
  loading?: boolean;
  onPressCancel: (id: string) => void;
}) => {
  const [expand, setExpand] = useState(false);
  const onPress = () => {
    setExpand(!expand);
  };
  const theme = useContext(ThemeContext);

  return (
    <Pressable
      style={{
        padding: 16,
        backgroundColor: theme.backgroundColor.secondary,
        borderRadius: 8,
        gap: 40,
        borderColor: theme.border.normal,
        borderBottomWidth: 1,
      }}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            gap: 6,
          }}
        >
          <Text style={{ fontSize: 12, color: theme.textGray }}>
            Full Day Parking on
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        </View>
        <Text
          style={{
            color: theme.brandColor.primary,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {expand ? "Done" : "Edit"}
        </Text>
      </View>
      {expand && (
        <StyledTextButton
          text="Cancel this Booking"
          type="warning"
          loadingText="Cancelling"
          loading={loading}
          onPress={() => onPressCancel(id)}
        />
      )}
    </Pressable>
  );
};

const MySeparator = () => {
  return <View style={{ height: 16 }} />;
};
