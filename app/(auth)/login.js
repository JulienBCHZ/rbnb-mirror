import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import Constants from "expo-constants";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(null);
  console.log(email);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let response;
    if (!password || !email) {
      setErrorMessage("Field(s) missing !");
    } else {
      try {
        response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          { email: email, password: password }
        );
        if (response.data.token) {
          setToken(response.data.token);
          setErrorMessage("connected !");
        } else {
          setErrorMessage("Wrong email and/or password");
        }
      } catch (error) {
        error.response
          ? setErrorMessage("Wrong email and/or password")
          : console.log("coucou");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.container}
    >
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
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
          <TouchableOpacity style={styles.loginSubmit} onPress={handleSubmit}>
            <Text style={styles.submitText}>Login</Text>
          </TouchableOpacity>
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
    paddingVertical: 50,
    paddingHorizontal: 2,
  },

  logoTitle: { alignItems: "center", gap: 10 },
  title: { fontSize: 24, fontWeight: 600, color: `grey` },

  inputSection: { gap: 50 },
  input: {
    width: 300,
    height: 38,
    fontSize: 32,
    borderBottomColor: `#E11960`,
    borderBottomWidth: 1,
  },

  submitSection: { gap: 10, alignItems: "center" },
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
});
