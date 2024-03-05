import { View } from "react-native";
import LoginForm from "../ui/LogInForm";
import Logo from "../ui/Logo";
import { useContext, useEffect, useState } from "react";
import { mockLogIn } from "../lib/mockApi";
import { ThemeContext } from "../context/themeContext";

export default function LogInScreen({ navigation }) {
  const theme = useContext(ThemeContext);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const onPressLogIn = () => {
    logIn();
  };

  const logIn = async () => {
    setIsLoggingIn(true);
    try {
      await mockLogIn();
      navigation.navigate("Home");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.backgroundColor.primary,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Logo />
      </View>
      <View
        style={{
          flex: 1,
          padding: 30,
        }}
      >
        <LoginForm loginHandler={onPressLogIn} loading={isLoggingIn} />
      </View>
    </View>
  );
}
