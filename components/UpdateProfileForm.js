import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

//    email={email}
//         setEmail={setEmail}
//         username={username}
//         setUsername={setUsername}
//         description={description}
//         setDescription={setDescription}
//    newAvatar={newAvatar}
//     setNewAvatar={setNewAvatar}
//     updateLoading={updateLoading}
//     setUpdateLoading={setUpdateLoading}
//     successMessage={successMessage}
//     setSuccessMessage={setSuccessMessage}

const UpdateProfileForm = ({
  email,
  setEmail,
  username,
  setUsername,
  description,
  setDescription,
  newAvatar,
  setNewAvatar,
  updateLoading,
  setUpdateLoading,
  successMessage,
  setSuccessMessage,
}) => {
  const handleSubmitUpdate = (event) => {
    event.preventDefault();
    let response;
    if (!email || !username || !description) {
      setErrorMessage("Field(s) missing !");
    }
  };

  return (
    <View style={styles.profileInfoContainer}>
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
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.updateButton}>
          <Text style={{ color: `#E11960` }}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateProfileForm;

const styles = StyleSheet.create({
  profileInfoContainer: { gap: 10 },
  inputSection: { gap: 35 },
  input: {
    width: 300,
    height: 30,
    fontSize: 26,
    borderBottomColor: `#E11960`,
    borderBottomWidth: 1,
    lineHeight: 28,
  },
  inputDescription: {
    width: 300,
    height: 130,
    fontSize: 26,
    borderColor: `#E11960`,
    borderWidth: 1,
  },
  buttonSection: { alignItems: "center", paddingTop: 50 },
  updateButton: {
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
