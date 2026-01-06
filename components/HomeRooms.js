import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import axios from "axios";

import ActivityIndicatorApp from "./ActivityIndicator";
import ratingStars from "../utils/ratingStars";

const HomeRooms = ({ isLoading, setIsLoading, data, setData }) => {
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
          alert("Something went wrong...");
          console.log("RR : ", response);
        }
      } catch (error) {
        setIsLoading(false);
        if (error.response) {
          console.log("ROOMS ERROR : ", error.response);
          alert(`Something went wrong : ${error.response.data.message}`);
        } else {
          alert("Something went wrong...");
          console.log("RR SERVER ERROR : ", error);
        }
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    ActivityIndicatorApp()
  ) : (
    <View>
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
              <View style={styles.pictureAndPrice}>
                <Image
                  style={{ height: 180, width: 350 }}
                  source={{ uri: item.photos[0].url }}
                />
                <View style={styles.price}>
                  <Text style={styles.textColor}>{item.price}</Text>
                  <Text style={styles.textColor}>€</Text>
                </View>
              </View>
              <View style={styles.detailsPreview}>
                <View style={styles.titleAndRating}>
                  <Text
                    style={styles.textTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <View>{ratingStars(item.ratingValue)}</View>
                    {item.reviews > 1 ? (
                      <Text
                        style={{ color: `grey` }}
                      >{`${item.reviews} reviews`}</Text>
                    ) : (
                      <Text
                        style={{ color: `grey` }}
                      >{`${item.reviews} review`}</Text>
                    )}
                  </View>
                </View>
                <Image
                  style={styles.ownerAvatar}
                  source={{ uri: item.user.account.photo.url }}
                  alt="user avatar"
                />
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
    paddingBottom: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
  },
  // pictureAndPrice: {},
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

  detailsPreview: { flexDirection: "row", alignItems: "center", gap: 15 },
  textTitle: { fontSize: 18, width: 260 },
  titleAndRating: { gap: 10 },
  ratingContainer: { flexDirection: "row", alignItems: "center", gap: 6 },
  ownerAvatar: { height: 70, width: 70, objectFit: "cover", borderRadius: 50 },
});
