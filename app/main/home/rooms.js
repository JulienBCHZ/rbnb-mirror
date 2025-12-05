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
import { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import axios from "axios";

import ActivityIndicatorApp from "../../../components/ActivityIndicator";
import HomeRooms from "../../../components/HomeRooms";

export default function RoomsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
  //         );
  //         if (response.data) {
  //           console.log("DATA :", response.data);
  //           setData(response.data);
  //           setIsLoading(false);
  //         } else {
  //           setErrorMessage("Something went wrong...");
  //           console.log(response);
  //         }
  //       } catch (error) {
  //         setIsLoading(false);
  //         setErrorMessage("Something went wrong...");
  //         console.log(error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Rooms Page</Text>
      {/* <FlatList
        data={data}
        keyExtractor={(item) => {
          return String(item._id);
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <View>
                <Image
                  style={{ height: 150, width: 300 }}
                  source={{ uri: item.photos[0].url }}
                />
                <View>
                  <Text>{item.price}</Text>
                  <Text>€</Text>
                </View>
              </View>
              <View>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      /> */}
      <HomeRooms
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        data={data}
        setData={setData}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  roomButton: {
    backgroundColor: `white`,
    borderWidth: 3,
    borderColor: `#E11960`,
    width: 150,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
