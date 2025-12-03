import { Stack } from "expo-router";
import RootNavigator from "../navigation/RootNavigator";
import { AuthContextProvider } from "../context/AuthContext";

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <RootNavigator />
    </AuthContextProvider>
  );
};

export default RootLayout;
