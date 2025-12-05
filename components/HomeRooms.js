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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
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
    <View>
      {/* <Text>Coucou</Text> */}
      <FlatList
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
      />
    </View>
  );
};

export default HomeRooms;
