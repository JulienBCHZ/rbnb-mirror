import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import axios from "axios";
import { useContext, useState, useEffect } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import ActivityIndicatorApp from "../../components/ActivityIndicator";

import { AuthContext } from "../../context/AuthContext";

export default function ProfilePage() {
  const { userID, userToken, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${userID}`,
          { headers: { authorization: `Bearer ${userToken}` } }
        );
        if (response.data) {
          console.log("USER INFO :", response.data);
          response.data.email && setEmail(response.data.email);
          response.data.username && setUsername(response.data.username);
          response.data.description &&
            setDescription(response.data.description);
          response.data.photo && setAvatar(response.data.photo);
        } else {
          setErrorMessage("Unauthorized !");
          setIsLoading(false);
        }
      } catch (error) {
        error.response
          ? setErrorMessage("Authentification error !")
          : console.log("SERVER ERROR :", error);
        setIsLoading(false);
      }
    };
    if (userID && userToken) {
      fetchProfileData();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        {avatar ? (
          <Image
            style={styles.imageAvatar}
            source={{ uri: avatar }}
            alt="avatar"
          />
        ) : (
          <View style={styles.iconAvatar}>
            <Ionicons name="person" size={80} color="black" />
          </View>
        )}
      </View>
      <Text style={styles.title}>Profile Page</Text>
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={{ color: `#E11960` }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: `white`,
    borderWidth: 3,
    borderColor: `#E11960`,
    width: 150,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  iconAvatar: {
    width: 150,
    height: 150,
    backgroundColor: `white`,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 90,
  },
});
