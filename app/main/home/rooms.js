import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import axios from "axios";

import ActivityIndicatorApp from "../../../components/ActivityIndicator";
import HomeRooms from "../../../components/HomeRooms";

export default function RoomsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  return (
    <View style={styles.container}>
      <HomeRooms
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        data={data}
        setData={setData}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
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
