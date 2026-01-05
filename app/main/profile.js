import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";
import axios from "axios";
import { useContext, useState, useEffect } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ActivityIndicatorApp from "../../components/ActivityIndicator";
import UpdateProfileForm from "../../components/UpdateProfileForm";

import { AuthContext } from "../../context/AuthContext";

const { width } = Dimensions.get("window");

export default function ProfilePage() {
  const { userID, userToken, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

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
          setErrorMessage("Error loading your informations !");
          setIsLoading(false);
        }
      } catch (error) {
        error.response
          ? setErrorMessage("Error loading your informations !")
          : console.log("SERVER ERROR :", error);
        setIsLoading(false);
      }
    };
    if (userID && userToken) {
      fetchProfileData();
    }
  }, [updateMessage]);

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        {avatar ? (
          <Image
            style={styles.imageAvatar}
            source={newAvatar ? { uri: newAvatar } : { uri: avatar }}
            resizeMode="contain"
            alt="avatar"
          />
        ) : (
          <View style={styles.iconAvatar}>
            <Ionicons name="person" size={80} color="grey" />
          </View>
        )}
        <View style={styles.pictureUpdate}>
          <TouchableOpacity>
            <MaterialIcons name="photo-library" size={32} color="grey" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="add-a-photo" size={32} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
      <UpdateProfileForm
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        description={description}
        setDescription={setDescription}
        setAvatar={setAvatar}
        newAvatar={newAvatar}
        setNewAvatar={setNewAvatar}
        updateLoading={updateLoading}
        setUpdateLoading={setUpdateLoading}
        updateMessage={updateMessage}
        setUpdateMessage={setUpdateMessage}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        userToken={userToken}
      />
      <View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={{ color: `#E11960` }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: `white`,
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
  avatarSection: {
    flexDirection: "row",
    gap: 20,
    paddingLeft: width / 8,
  },
  imageAvatar: {
    width: 150,
    height: 150,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: `#E11960`,
  },
  iconAvatar: {
    width: 150,
    height: 150,
    backgroundColor: `white`,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 90,
    borderWidth: 1,
    borderColor: `#E11960`,
  },
  pictureUpdate: { justifyContent: "space-around" },
});
