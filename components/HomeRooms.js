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
import { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import axios from "axios";

import ActivityIndicatorApp from "./ActivityIndicator";

//         setIsLoading={setIsLoading}
//         data={data}
//         setData={setData}
//   errorMessage={errorMessage}
//         setErrorMessage={setErrorMessage}

const HomeRooms = ({
  isLoading,
  setIsLoading,
  data,
  setData,
  errorMessage,
  setErrorMessage,
}) => {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        if (response.data) {
          //   console.log("DATA :", response.data);
          setData(response.data);
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
    <View>
      {/* <Text>Coucou</Text> */}
      <FlatList
        contentContainerStyle={{
          gap: 10,
        }}
        data={data}
        keyExtractor={(item) => {
          return String(item._id);
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.previewContainer}
              onPress={() => {
                router.navigate({
                  pathname: "/main/home/room",
                  params: { id: item._id },
                });
              }}
            >
              <View>
                <Image
                  style={{ height: 180, width: 350 }}
                  source={{ uri: item.photos[0].url }}
                />
                <View style={styles.price}>
                  <Text style={styles.textColor}>{item.price}</Text>
                  <Text style={styles.textColor}>€</Text>
                </View>
              </View>
              <View>
                <View>
                  <Text
                    style={styles.textTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HomeRooms;

const styles = StyleSheet.create({
  previewContainer: {
    gap: 10,
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
  },
  pictureAndPrice: { position: "relative" },
  price: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    gap: 3,
    height: 35,
    width: 80,
    backgroundColor: "black",
  },
  textColor: { color: "white", fontWeight: 600 },
  textTitle: { fontSize: 18, width: 280 },
});
