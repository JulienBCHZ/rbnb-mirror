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
    const fetchData = () => {};
  }, []);

  return <View></View>;
};

export default HomeRooms;
