import { StyleSheet, View } from "react-native";

import Entypo from "@expo/vector-icons/Entypo";

const ratingStars = (value) => {
  if (value === 5) {
    return (
      <View style={styles.ratingContainer}>
        <Entypo name="star" size={24} style={styles.ratingStar} />
        <Entypo name="star" size={24} style={styles.ratingStar} />
        <Entypo name="star" size={24} style={styles.ratingStar} />
        <Entypo name="star" size={24} style={styles.ratingStar} />
        <Entypo name="star" size={24} style={styles.ratingStar} />
      </View>
    );
  } else if (value === 4) {
    return (
      <View style={styles.ratingContainer}>
        <Entypo name="star" size={24} style={styles.ratingStar} />
        <Entypo name="star" size={24} style={styles.ratingStar} />
        <Entypo name="star" size={24} style={styles.ratingStar} />
        <Entypo name="star" size={24} style={styles.ratingStar} />
      </View>
    );
  } else if (value === 3) {
    return (
      <View style={styles.ratingContainer}>
        <Entypo name="star" size={24} style={styles.ratingStar} />
        <Entypo name="star" size={24} style={styles.ratingStar} />
        <Entypo name="star" size={24} style={styles.ratingStar} />
      </View>
    );
  } else if (value === 2) {
    return (
      <View style={styles.ratingContainer}>
        <Entypo name="star" size={24} style={styles.ratingStar} />
        <Entypo name="star" size={24} style={styles.ratingStar} />
      </View>
    );
  } else if (value === 1) {
    return (
      <View style={styles.ratingContainer}>
        <Entypo name="star" size={24} style={styles.ratingStar} />
      </View>
    );
  } else if (value === 0) return null;
};

export default ratingStars;

const styles = StyleSheet.create({
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  ratingStar: { fontSize: 22, color: "gold" },
});
