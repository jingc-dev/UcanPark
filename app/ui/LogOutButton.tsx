import { useState } from "react";
import { mockLogOut } from "../lib/mockApi";
import { ScreenName } from "../lib/nav";
import StyledTextButton from "./StyledTextButton";

export default function LogOutButton({ navigation }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onPressLogOut = () => {
    logOut();
  };

  const logOut = async () => {
    setIsLoggingOut(true);
    try {
      await mockLogOut();
      navigation.navigate(ScreenName.LOG_IN);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <StyledTextButton
      onPress={onPressLogOut}
      loading={isLoggingOut}
      loadingText="Logging Out"
      text="Log Out"
    />
  );
}
