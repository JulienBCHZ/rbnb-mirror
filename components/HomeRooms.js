import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import axios from "axios";

//         setIsLoading={setIsLoading}
//         data={data}
//         setData={setData}
//   errorMessage={errorMessage}
//         setErrorMessage={setErrorMessage}

const HomeRooms = ({
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
        console.log("DATA :", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("Something went wrong...");
        console.log(error);
      }
    };
  }, []);

  return <View></View>;
};

export default HomeRooms;
