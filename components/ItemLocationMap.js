import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const ItemLocationMap = (room) => {
  //   console.log("LAT :", item.location[1]);

  const markers = [
    {
      id: room._id,
      longitude: room.location[0],
      latitude: room.location[1],
      title: `${room.price} €`,
      description: room.title,
    },
  ];
  console.log("LAT 1:", room.location[1]);

  return (
    <View style={{ width, height: 350 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: room.location[1],
          longitude: room.location[0],
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
        showsUserLocation={false}
      >
        {markers.map((marker) => {
          return (
            <Marker
              key={marker.id}
              coordinate={{
                longitude: marker.longitude,
                latitude: marker.latitude,
              }}
              title={marker.title}
              description={marker.description}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default ItemLocationMap;
