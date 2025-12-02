import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link, useRouter, Redirect } from "expo-router";

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="black" />
      <Text>Open up App.js to start working on your app!</Text>
      <TouchableOpacity
        style={styles.toLogin}
        onPress={() => {
          router.navigate("/login");
        }}
      >
        <Text style={styles.textColor}>Go To Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.toLogin}
        onPress={() => {
          router.navigate("/signup");
        }}
      >
        <Text style={styles.textColor}>Go To Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  toLogin: {
    height: 30,
    width: 100,
    backgroundColor: `#E11960`,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  textColor: { color: `white`, fontWeight: 600 },
});
