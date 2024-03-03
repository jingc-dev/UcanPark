import { View } from "react-native";
import LoginForm from "../ui/LogInForm";
import Logo from "../ui/Logo";

export default function LogInScreen({ navigation }) {
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
        <LoginForm loginHandler={() => navigation.navigate("Home")} />
      </View>
    </View>
  );
}
