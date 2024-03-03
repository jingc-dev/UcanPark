import { Pressable, Text } from "react-native";

export default function StyledButton({
  text = "Click Me",
  onPress,
}: {
  text: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 10,
        backgroundColor: "#4C7A7D",
        borderRadius: 8,
      }}
    >
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          padding: 10,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
