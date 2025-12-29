import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Dimensions } from "react-native";
import { useEffect } from "react";
import axios from "axios";
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

import ActivityIndicatorApp from "./ActivityIndicator";

const { width } = Dimensions.get("window");

//  isLoading={isLoading}
//         setIsLoading={setIsLoading}
//         mapData={mapData}
//         setMapData={setMapData}
//         errorMessage={errorMessage}
//         setErrorMessage={setErrorMessage}
// actualPosition={actualPosition}
// setActualPosition={setActualPosition}

const MainMap = ({
  isLoading,
  setIsLoading,
  mapData,
  setMapData,
  errorMessage,
  setErrorMessage,
  actualPosition,
  setActualPosition,
}) => {
  useEffect(() => {
    const askPermissionForLocalisation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        let getPosition = await Location.getCurrentPositionAsync({});
        console.log("POS. :", getPosition);
        console.log("LAT. :", getPosition.coords.latitude);
        console.log("LONG. :", getPosition.coords.longitude);

        const obj = {
          latitude: getPosition.coords.latitude,
          longitude: getPosition.coords.longitude,
        };
        setActualPosition(obj);
      } else {
        setErrorMessage("Permission denied...");
      }
    };
    askPermissionForLocalisation();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=48.8534078&longitude=2.3434604`
        );
        // console.log(response);
        if (response.data) {
          console.log("DATA :", response.data);
          setMapData(response.data);
          setIsLoading(false);
        } else {
          setErrorMessage("Something went wrong...");
          console.log(response);
        }
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("Something went wrong...");
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    ActivityIndicatorApp()
  ) : (
    <View style={{ flex: 1 }}>
      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 48.8534078,
            longitude: 2.3434604,
            latitudeDelta: 0.25,
            longitudeDelta: 0.25,
          }}
          showsUserLocation={true}
        >
          <Marker />
        </MapView>
      )}
    </View>
  );
};

export default MainMap;
