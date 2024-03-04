import { useContext, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import StyledButton from "../ui/StyledButton";
import StyledTextButton from "../ui/StyledTextButton";
import { BookingStateContext } from "../data/context";

export default function MyBookings({ navigation }) {
  const { state, dispatch } = useContext(BookingStateContext);

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
        renderItem={({ item }) => <Item title={item.booking.bookedDate} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={MySeparator}
      />
    </View>
  );
}

const Item = ({ title }: { title: string }) => {
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
          onPress={() => null}
        />
      )}
    </Pressable>
  );
};

const MySeparator = () => {
  return <View style={{ height: 16 }} />;
};
