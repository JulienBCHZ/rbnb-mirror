import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import Constants from "expo-constants";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  //   console.log(email);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let response;
    if (!password || !email) {
      alert("Email or password missing");
    } else {
      setIsLoading(true);
      try {
        response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          { email: email, password: password }
        );
        if (response.data.token) {
          console.log("RES LOG", response.data);
          login(response.data.id, response.data.token);
        } else {
          alert("Something went wrong...");
          setIsLoading(false);
        }
      } catch (error) {
        error.message
          ? alert("Wrong email and/or password")
          : console.log("LOGIN ERROR :", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.pageVision}>
        <View style={styles.logoTitle}>
          <FontAwesome5 name="airbnb" size={100} color="#E11960" />
          <Text style={styles.title}>Login</Text>
        </View>
        <View style={styles.inputSection}>
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <View style={styles.submitSection}>
          {isLoading ? (
            <View style={styles.submitDisabled}>
              <Text style={styles.submitDisabledText}>Login</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.loginSubmit} onPress={handleSubmit}>
              <Text style={styles.submitText}>Login</Text>
            </TouchableOpacity>
          )}
          <Link href="/signup" replace>
            Pas encore de compte ? Inscrivez-vous.
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: Constants.statusBarHeight,
  },
  pageVision: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: `#fff`,
    paddingVertical: 40,
    paddingHorizontal: 2,
  },

  logoTitle: { alignItems: "center", gap: 10 },
  title: { fontSize: 24, fontWeight: 600, color: `grey` },

  inputSection: { gap: 30 },
  input: {
    width: 300,
    height: 38,
    fontSize: 32,
    borderBottomColor: `#E11960`,
    borderBottomWidth: 1,
    lineHeight: 34,
  },

  submitSection: { gap: 25, alignItems: "center", paddingBottom: 30 },
  loginSubmit: {
    borderWidth: 3,
    borderColor: `#E11960`,
    width: 150,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: { color: `#E11960`, fontSize: 20 },
  errorMessage: { color: "red", fontSize: 18 },

  submitDisabled: {
    borderWidth: 3,
    borderColor: "lightgrey",
    width: 150,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  submitDisabledText: { color: "lightgrey", fontSize: 20 },
});
