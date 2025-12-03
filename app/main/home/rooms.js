import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";

export default function RoomsPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Rooms Page</Text>
      <TouchableOpacity onPress={logout} style={styles.roomButton}>
        <Text style={{ color: `#E11960` }}>Room</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  roomButton: {
    backgroundColor: `white`,
    borderWidth: 3,
    borderColor: `#E11960`,
    width: 150,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
