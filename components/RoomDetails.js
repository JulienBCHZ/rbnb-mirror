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

const RoomDetails = ({
  id,
  isLoading,
  data,
  setData,
  errorMessage,
  setErrorMessage,
}) => {
  return <View></View>;
};

export default RoomDetails;
