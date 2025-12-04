import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const ActivityIndicatorApp = () => {
  return (
    <ActivityIndicator size="large" color="grey" style={styles.container} />
  );
};

export default ActivityIndicatorApp;

const styles = StyleSheet.create({ container: { marginTop: 150 } });
