import { ActivityIndicator, Pressable, Text } from "react-native";

export default function StyledButton({
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
        backgroundColor: loading ? "gray" : "#4C7A7D",
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "#fff",
          padding: 10,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {loading ? loadingText : text}
      </Text>
      {loading && <ActivityIndicator color="#fff" />}
    </Pressable>
  );
}
