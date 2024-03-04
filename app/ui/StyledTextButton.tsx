import { ActivityIndicator, Pressable, Text } from "react-native";

export default function StyledTextButton({
  text = "Click Me",
  loading,
  loadingText = "Processing",
  type = "normal",
  onPress,
}: {
  text: string;
  loading?: boolean;
  loadingText?: string;
  type?: "normal" | "warning";
  onPress: () => void;
}) {
  const color = loading ? "gray" : type === "normal" ? "#4C7A7D" : "#C6171F";
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
          color: color,
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
