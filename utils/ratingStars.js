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

import Entypo from "@expo/vector-icons/Entypo";

const ratingStars = (value) => {
  if (value === 5) {
    return (
      <View style={styles.ratingContainer}>
        <Entypo name="star" size={24} color="black" style={styles.ratingStar} />
        <Entypo name="star" size={24} color="black" style={styles.ratingStar} />
        <Entypo name="star" size={24} color="black" style={styles.ratingStar} />
        <Entypo name="star" size={24} color="black" style={styles.ratingStar} />
        <Entypo name="star" size={24} color="black" style={styles.ratingStar} />
      </View>
    );
  }
};

export default ratingStars;

const styles = StyleSheet.create({
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  ratingStar: { fontSize: 22, color: "gold" },
});
