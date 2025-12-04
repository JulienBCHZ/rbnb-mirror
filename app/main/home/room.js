import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";

export default function RoomPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room Page</Text>
      {/* <TouchableOpacity
        onPress={() => {
          router.navigate("/main/home/rooms");
        }}
        style={styles.roomButton}
      >
        <Text style={{ color: `#E11960` }}>Rooms</Text>
      </TouchableOpacity> */}
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
});
