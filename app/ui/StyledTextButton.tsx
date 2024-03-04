import { ActivityIndicator, Pressable, Text } from "react-native";

export default function StyledTextButton({
  text = "Click Me",
  loading,
  loadingText = "Processing",
  onPress,
}: {
  text: string;
  loading?: boolean;
  loadingText?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={{
        padding: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: loading ? "gray" : "#4C7A7D",
          paddingHorizontal: 10,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {loading ? loadingText : text}
      </Text>
      {loading && <ActivityIndicator color="gray" />}
    </Pressable>
  );
}
