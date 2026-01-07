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
import axios from "axios";

import ActivityIndicatorApp from "../../../components/ActivityIndicator";

const { width } = Dimensions.get("window");

export default function PicturesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const params = useLocalSearchParams();
  const { id } = params;

  console.log("ID PICS: ", id);

  if (id) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
          );
          if (response.data) {
            // console.log("DATA PICS :", response.data.photos);
            setData(response.data.photos);
            setIsLoading(false);
          } else {
            alert("Server doesn't respond...");
            setIsLoading(false);
            console.log(response);
          }
        } catch (error) {
          setIsLoading(false);
          alert(`Something went wrong : ${error.message}`);
          console.log(error);
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
            return String(item.picture_id);
          }}
          renderItem={({ item }) => {
            return (
              <Image
                style={{ height: 200, width }}
                source={{ uri: item.url }}
              />
            );
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.textContainer}>
        <Text style={{ fontSize: 16 }}>No photos to show !</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
});
