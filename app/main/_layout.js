import { Stack, Tabs } from "expo-router";

const MainLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ title: "Rooms", headerShown: false }}
      />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="map" options={{ title: "Map" }} />
    </Tabs>
  );
};

export default MainLayout;
