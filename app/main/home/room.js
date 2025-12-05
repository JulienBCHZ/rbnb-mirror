import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import RoomDetails from "../../../components/RoomDetails";

export default function RoomPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const params = useLocalSearchParams();
  return (
    <View style={styles.container}>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <RoomDetails
        id={params.id}
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
});
