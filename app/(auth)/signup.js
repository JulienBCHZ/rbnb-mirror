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

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response;
    if (!password || !email || !username || !description) {
      setErrorMessage("Field(s) missing !");
    } else if (confirmPassword !== password) {
      setErrorMessage("Passwords must be the same !");
    } else {
      try {
        response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
          {
            email: email,
            username: username,
            description: description,
            password: password,
          }
        );
        if (response.data.token) {
          console.log("RES", response.data);
          login(response.data.id, response.data.token);
          // setToken(response.data.token);
          setErrorMessage("");
        } else {
          setErrorMessage("Check all fields !");
        }
      } catch (error) {
        error.response
          ? setErrorMessage("Wrong email and/or password")
          : console.log(error.response);
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
          <Text style={styles.title}>Signup</Text>
        </View>
        <View style={styles.inputSection}>
          <TextInput
            placeholder="username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <TextInput
            placeholder="confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={
              confirmPassword === password
                ? {
                    width: 300,
                    height: 34,
                    fontSize: 30,
                    borderBottomColor: `#E11960`,
                    borderBottomWidth: 1,
                  }
                : {
                    width: 300,
                    height: 34,
                    fontSize: 30,
                    borderBottomColor: `red`,
                    borderBottomWidth: 2,
                    color: "red",
                  }
            }
          />
        </View>
        <View style={styles.submitSection}>
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
          {isLoading ? (
            <View style={styles.submitDisabled}>
              <Text style={styles.submitDisabledText}>Login</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.loginSubmit} onPress={handleSubmit}>
              <Text style={styles.submitText}>Signup</Text>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity style={styles.loginSubmit} onPress={handleSubmit}>
            <Text style={styles.submitText}>Login</Text>
          </TouchableOpacity> */}
          <Link href="/" replace>
            Déjà un compte ? Connectez-vous.
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

  inputSection: { gap: 20 },
  input: {
    width: 300,
    height: 34,
    fontSize: 30,
    borderBottomColor: `#E11960`,
    borderBottomWidth: 1,
  },

  submitSection: { gap: 25, alignItems: "center" },
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
