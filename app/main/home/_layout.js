import { Stack, Tabs } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="room" options={{ title: "Room" }} />
      <Stack.Screen name="rooms" options={{ title: "Rooms" }} />
    </Stack>
  );
};

export default HomeLayout;
