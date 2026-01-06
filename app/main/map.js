import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import MainMap from "../../components/MainMap";

export default function MapPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mapData, setMapData] = useState(null);

  return (
    <View style={styles.container}>
      <MainMap
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        mapData={mapData}
        setMapData={setMapData}
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
