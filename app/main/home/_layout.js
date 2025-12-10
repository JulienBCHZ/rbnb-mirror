import { Stack, Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: () => {
          return <FontAwesome5 name="airbnb" size={35} color="#E11960" />;
        },
      }}
    >
      <Stack.Screen name="rooms" options={{ title: "Rooms" }} />
      <Stack.Screen name="room" options={{ title: "Room" }} />
    </Stack>
  );
};

export default HomeLayout;
