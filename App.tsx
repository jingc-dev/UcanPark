import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/pages/Home";
import LogInScreen from "./app/pages/LogInScreen";
import { ScreenName } from "./app/lib/nav";
import { ThemeContext, defaultTheme } from "./app/context/themeContext";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={ScreenName.LOG_IN}
            component={LogInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ScreenName.HOME}
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
