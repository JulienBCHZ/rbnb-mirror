import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, Text, View } from "react-native";

import ActivityIndicatorApp from "./ActivityIndicator";

const MainMap = ({ isLoading, setIsLoading, mapData, setMapData }) => {
  const [actualLocation, setActualLocation] = useState(null);
  const [finishLoading, setFinishLoading] = useState(false);

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
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        alert("Permission denied - check your settings");
      }
    };
    askPermissionForLocalisation();
  }, []);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${actualLocation.latitude}&longitude=${actualLocation.longitude}`
        );

        if (response.data) {
          console.log("DATA :", response.data);
          setMapData(response.data);
          setFinishLoading(true);
        } else {
          alert("Something went wrong loading locations around you");
          console.log(response);
        }
      } catch (error) {
        setFinishLoading(true);
        if (error.response) {
          console.log("ERROR MSG: ", error.response);
          alert(`Something went wrong : ${error.response.data.message}`);
        } else {
          alert("Something went wrong loading locations around you");
          console.log("ERROR : ", error);
        }
      }
    };
    if (!isLoading && actualLocation) {
      fetchPositions();
    }
  }, [actualLocation]);

  return isLoading ? (
    ActivityIndicatorApp()
  ) : (
    <View style={{ flex: 1 }}>
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
        {finishLoading &&
          mapData?.map((room) => {
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
    </View>
  );
};

export default MainMap;
