import { useContext, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { BookingAction } from "../data/bookingsReducer";
import { BookingStateContext } from "../data/context";
import { mockCancelBooking } from "../lib/mockApi";
import StyledTextButton from "../ui/StyledTextButton";

export default function MyBookings() {
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
        backgroundColor: "#EBF7F8",
        paddingTop: 50,
        paddingBottom: 50,
        paddingHorizontal: 20,
        gap: 10,
        justifyContent: "space-between",
      }}
    >
      {state.bookings.length === 0 && <Text>You have no bookings yet.</Text>}

      <FlatList
        data={state.bookings}
        renderItem={({ item }) => (
          <Item
            title={item.booking.bookedDate}
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
  return (
    <Pressable
      style={{
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        gap: 40,
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
        <Text style={{ fontSize: 16 }}>{title}</Text>
        <Text style={{ color: "#4C7A7D", fontWeight: "bold", fontSize: 16 }}>
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
