import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

import ActivityIndicatorApp from "../../../components/ActivityIndicator";

const { width } = Dimensions.get("window");

export default function PicturesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const params = useLocalSearchParams();
  const { id } = params;

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
    <FlatList
      contentContainerStyle={{
        gap: 10,
      }}
      data={data.photos}
      keyExtractor={(photos) => {
        return String(photos.picture_id);
      }}
      renderItem={({ photos }) => {
        return (
          <Image style={{ height: 200, width }} source={{ uri: photos.url }} />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({});
