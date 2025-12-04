import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

import ActivityIndicatorApp from "../../../components/ActivityIndicator";
import HomeRooms from "../../../components/HomeRooms";

export default function RoomsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  return isLoading ? (
    ActivityIndicatorApp()
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>All Rooms Page</Text>
      <HomeRooms
        setIsLoading={setIsLoading}
        data={data}
        setData={setData}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      {/* <TouchableOpacity
        onPress={() => {
          router.navigate("/main/home/room");
        }}
        style={styles.roomButton}
      >
        <Text style={{ color: `#E11960` }}>Room</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
