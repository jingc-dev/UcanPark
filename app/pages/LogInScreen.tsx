import { View } from "react-native";
import LoginForm from "../ui/LogInForm";
import Logo from "../ui/Logo";
import { useEffect, useState } from "react";
import { mockLogIn } from "../lib/mockApi";

export default function LogInScreen({ navigation }) {
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
        backgroundColor: "#EBF7F8",
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
