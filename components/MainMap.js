import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
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

const MainMap = ({
  isLoading,
  setIsLoading,
  mapData,
  setMapData,
  errorMessage,
  setErrorMessage,
}) => {
  const [actualLocation, setActualLocation] = useState(null);

  useEffect(() => {
    const askPermissionForLocalisation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        let getPosition = await Location.getCurrentPositionAsync({});
        console.log("POS. :", getPosition);
        console.log("LAT. :", getPosition.coords.latitude);
        console.log("LONG. :", getPosition.coords.longitude);
        if (getPosition.coords.latitude && getPosition.coords.longitude) {
          const obj = {
            latitude: getPosition.coords.latitude,
            longitude: getPosition.coords.longitude,
          };
          setActualLocation(obj);

          try {
            const response = await axios.get(
              `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${getPosition.coords.latitude}&longitude=${getPosition.coords.longitude}`
            );

            if (response.data) {
              console.log("DATA :", response.data);
              setMapData(response.data);
              setIsLoading(false);
            } else {
              setErrorMessage(
                "Something went wrong loading positions around..."
              );
              setIsLoading(false);
              console.log(response);
            }
          } catch (error) {
            setIsLoading(false);
            setErrorMessage("Something went wrong loading positions around...");
            console.log(error);
          }
        }
      } else {
        setIsLoading(false);
        setErrorMessage("Permission denied...");
      }
    };
    askPermissionForLocalisation();
  }, []);

  return isLoading ? (
    ActivityIndicatorApp()
  ) : (
    <View style={{ flex: 1 }}>
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text
            style={styles.errorText}
          >{`${errorMessage}. Check your location permissions 👇`}</Text>
          <TouchableOpacity style={styles.permissionButton}>
            <Text style={{ color: `#E11960` }}>Go to Settings</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: actualLocation.latitude,
            longitude: actualLocation.longitude,
            latitudeDelta: 0.15,
            longitudeDelta: 0.15,
          }}
          showsUserLocation={true}
        >
          {mapData.map((room) => {
            return (
              <Marker
                key={room._id}
                coordinate={{
                  longitude: room.location[0],
                  latitude: room.location[1],
                }}
                title={`${room.price} €`}
                description={room.title}
              />
            );
          })}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  permissionButton: {
    backgroundColor: `white`,
    borderWidth: 3,
    borderColor: `#E11960`,
    width: 200,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: { fontSize: 16, fontWeight: "bold" },
});

export default MainMap;
