import { useContext } from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { ThemeContext } from "../context/themeContext";

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
  const theme = useContext(ThemeContext);

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={{
        padding: 10,
        backgroundColor: loading
          ? theme.backgroundColor.busy
          : theme.brandColor.primary,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: theme.textWhite,
          padding: 10,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {loading ? loadingText : text}
      </Text>
      {loading && <ActivityIndicator color={theme.textWhite} />}
    </Pressable>
  );
}
