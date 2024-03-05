import { useContext, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import StyledButton from "./StyledButton";
import { ThemeContext } from "../context/themeContext";

export default function LoginForm({
  loginHandler,
  loading,
}: {
  loginHandler: () => void;
  loading: boolean;
}) {
  const theme = useContext(ThemeContext);

  const [user, setUser] = useState("Demo User");
  const [pw, setPw] = useState("************");

  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      padding: 10,
      borderColor: theme.brandColor.primary,
      fontSize: 16,
      borderRadius: 8,
    },
  });

  return (
    <View style={{ flex: 1, gap: 30 }}>
      <TextInput value={user} onChangeText={setUser} style={styles.input} />
      <TextInput value={pw} onChangeText={setPw} style={styles.input} />
      <StyledButton
        text="Log In"
        onPress={loginHandler}
        loadingText="Logging In"
        loading={loading}
      />
    </View>
  );
}
