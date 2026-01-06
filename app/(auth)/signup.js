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
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response;
    if (!password || !email || !username || !description) {
      alert("All fields are required");
    } else if (confirmPassword !== password) {
      alert("Passwords must be the same");
    } else {
      setIsLoading(true);
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
          // console.log("RES", response.data);
          login(response.data.id, response.data.token);
          setIsLoading(false);
        } else {
          alert("Something went wrong...");
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response) {
          alert(`Something went wrong : ${error.response}`);
          setIsLoading(false);
        } else {
          alert(`Something went wrong...`);
          setIsLoading(false);
          console.log("SERVER ERROR : ", error);
        }
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
            multiline={true}
            textAlignVertical="top"
            onChangeText={setDescription}
            style={styles.inputDescription}
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
          {isLoading ? (
            <View style={styles.submitDisabled}>
              <Text style={styles.submitDisabledText}>Login</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.loginSubmit} onPress={handleSubmit}>
              <Text style={styles.submitText}>Signup</Text>
            </TouchableOpacity>
          )}
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
    paddingVertical: 20,
    paddingHorizontal: 2,
  },

  logoTitle: { alignItems: "center", gap: 10 },
  title: { fontSize: 24, fontWeight: 600, color: `grey` },

  inputSection: { gap: 25 },
  input: {
    width: 300,
    height: 34,
    fontSize: 30,
    borderBottomColor: `#E11960`,
    borderBottomWidth: 1,
    lineHeight: 32,
  },
  inputDescription: {
    width: 300,
    height: 100,
    fontSize: 24,
    lineHeight: 26,
    borderColor: `#E11960`,
    borderWidth: 1,
    paddingLeft: 3,
    paddingRight: 3,
  },

  submitSection: { gap: 25, alignItems: "center", paddingBottom: 25 },
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
