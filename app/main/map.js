import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";

import MainMap from "../../components/MainMap";

export default function MapPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [mapData, setMapData] = useState(null);
  const [actualPosition, setActualPosition] = useState(null);

  return (
    <View style={styles.container}>
      <MainMap
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        mapData={mapData}
        setMapData={setMapData}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        actualPosition={actualPosition}
        setActualPosition={setActualPosition}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
