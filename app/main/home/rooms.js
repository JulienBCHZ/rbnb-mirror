import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

import HomeRooms from "../../../components/HomeRooms";

export default function RoomsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <HomeRooms
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        data={data}
        setData={setData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  roomButton: {
    backgroundColor: `white`,
    borderWidth: 3,
    borderColor: `#E11960`,
    width: 150,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
