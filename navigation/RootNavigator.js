import { Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RootNavigator = () => {
  const { userID, userToken } = useContext(AuthContext);

  return (
    <Stack>
      <Stack.Protected guard={!userID || !userToken}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={userID && userToken}>
        <Stack.Screen name="main" />
      </Stack.Protected>
    </Stack>
  );
};

export default RootNavigator;
