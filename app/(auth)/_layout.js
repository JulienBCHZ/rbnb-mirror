import { Stack, Tabs } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen name="signup" options={{ title: "Signup" }} />
    </Stack>
  );
};

export default AuthLayout;
