import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import Swiper from "react-native-swiper";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import ActivityIndicatorApp from "./ActivityIndicator";
import ratingStars from "../utils/ratingStars";
import ItemLocationMap from "./ItemLocationMap";

const { width } = Dimensions.get("window");

const RoomDetails = ({ id, isLoading, setIsLoading, data, setData }) => {
  const router = useRouter();
  const [showText, setShowText] = useState(false);

  console.log("ID: ", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        if (response.data) {
          // console.log("DATA :", response.data);
          setData(response.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          alert("Something went wrong...");
          console.log("RD : ", response);
        }
      } catch (error) {
        setIsLoading(false);
        if (error.response) {
          console.log("R DETAILS ERROR : ", error.response);
          alert(`Something went wrong : ${error.response.data.message}`);
        } else {
          alert("Something went wrong...");
          console.log("RR SERVER ERROR : ", error);
        }
      }
    };
    fetchData();
  }, []);
  // Dans le swiper intégrer un .map() avec le shéma suivant : <View><Image /></View> pour chaque item
  return isLoading ? (
    ActivityIndicatorApp()
  ) : (
    <View style={styles.roomDetailsContainer}>
      <View style={styles.preview}>
        <Pressable
          style={styles.swiperTouch}
          onPress={() => {
            router.navigate({
              pathname: "/main/home/pictures",
              params: { id: id },
            });
          }}
        >
          <View style={styles.price}>
            <Text style={styles.priceText}>{data.price}</Text>
            <Text style={styles.priceText}>€</Text>
          </View>
          <Swiper
            style={styles.swipeWrapper}
            height={180}
            width={width}
            autoplay
          >
            {data.photos?.map((item) => {
              return (
                <View style={styles.slide} key={item.picture_id}>
                  <Image
                    style={styles.photo}
                    source={{ uri: item.url }}
                    alt="room pictures"
                  />
                </View>
              );
            })}
          </Swiper>
        </Pressable>
        <View style={styles.roomOverview}>
          <View style={styles.roomPresentation}>
            <View style={styles.titleAndRating}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {data.title}
              </Text>
              <View style={styles.ratingContainer}>
                <View>{ratingStars(data.ratingValue)}</View>
                {data.reviews === 1 ? (
                  <Text
                    style={{ color: `grey` }}
                  >{`${data.reviews} review`}</Text>
                ) : (
                  <Text
                    style={{ color: `grey` }}
                  >{`${data.reviews} reviews`}</Text>
                )}
              </View>
            </View>
            <Image
              style={styles.ownerAvatar}
              source={{ uri: data.user.account.photo.url }}
              alt="user avatar"
            />
          </View>
          {showText ? (
            <View>
              <Text>{data.description}</Text>
              <TouchableOpacity
                style={styles.showButton}
                onPress={() => {
                  setShowText(false);
                }}
              >
                <Text style={{ color: `grey`, fontSize: 15 }}>Show Less</Text>
                <FontAwesome name="caret-up" size={24} color="grey" />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text numberOfLines={3} ellipsizeMode="tail">
                {data.description}
              </Text>
              <TouchableOpacity
                style={styles.showButton}
                onPress={() => {
                  setShowText(true);
                }}
              >
                <Text style={{ color: `grey`, fontSize: 15 }}>Show More</Text>
                <FontAwesome name="caret-down" size={24} color="grey" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={{ flex: 1 }}>{ItemLocationMap(data)}</View>
    </View>
  );
};

export default RoomDetails;

const styles = StyleSheet.create({
  errorContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  roomDetailsContainer: {
    gap: 10,
    paddingBottom: 5,
  },

  swiperTouch: { height: 220, width, position: "relative" },
  price: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    gap: 3,
    height: 35,
    width: 80,
    backgroundColor: "black",
    zIndex: 1000,
  },
  priceText: { color: "white", fontWeight: 600 },
  photo: { height: 200, width, objectFit: "cover" },
  slide: {
    // flex: 1,
    height: 180,
    alignItems: "center",
  },
  preview: { justifyContent: "flex-start" },
  swipeWrapper: {},

  roomPresentation: { flexDirection: "row", justifyContent: "space-between" },
  ownerAvatar: { height: 80, width: 80, objectFit: "cover", borderRadius: 50 },
  title: {
    fontSize: 24,
    width: 270,
  },
  roomOverview: { paddingLeft: 20, paddingRight: 20, gap: 7 },
  titleAndRating: { gap: 10 },
  ratingContainer: { flexDirection: "row", alignItems: "center", gap: 6 },
  showButton: {
    height: 24,
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
