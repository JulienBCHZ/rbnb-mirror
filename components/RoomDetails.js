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

const RoomDetails = ({
  id,
  isLoading,
  setIsLoading,
  data,
  setData,
  errorMessage,
  setErrorMessage,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        if (response.data) {
          console.log("DATA :", response.data);
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
    <View style={styles.roomDetailsContainer}>
      <View style={styles.description}>
        <View>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {data.title}
          </Text>
        </View>
        <View>
          <Text numberOfLines={3} ellipsizeMode="tail">
            {data.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RoomDetails;

const styles = StyleSheet.create({
  roomDetailsContainer: {
    gap: 10,
    paddingTop: 15,
    paddingBottom: 5,
  },
  title: {
    fontSize: 24,
    width: 250,
  },
  description: { paddingLeft: 10, paddingRight: 10 },
});
