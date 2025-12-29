import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const ItemLocationMap = (item) => {
  //   console.log("LAT :", item.location[1]);

  const marker = {
    id: 1,
    longitude: item.location[0],
    latitude: item.location[1],
    title: `${item.price} €`,
    description: item.title,
  };
  console.log("LAT 1:", marker.latitude);

  return (
    <MapView
      style={{ width, height: 350 }}
      initialRegion={{
        latitude: item.location[1],
        longitude: item.location[0],
        latitudeDelta: 0.25,
        longitudeDelta: 0.25,
      }}
      showsUserLocation={false}
    >
      <Marker
        key={marker.id}
        coordinate={{ latitude: marker.latitude, longitute: marker.longitude }}
        title={marker.title}
        description={marker.description}
      />
    </MapView>
  );
};

export default ItemLocationMap;
