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
// updateMessage={updateMessage}
//     setUpdateMessage={setUpdateMessage}
//  errorMessage={errorMessage}
//       setErrorMessage={setErrorMessage}

const UpdateProfileForm = ({
  email,
  setEmail,
  username,
  setUsername,
  description,
  setDescription,
  setAvatar,
  newAvatar,
  setNewAvatar,
  updateLoading,
  setUpdateLoading,
  updateMessage,
  setUpdateMessage,
  errorMessage,
  setErrorMessage,
  userToken,
}) => {
  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    setUpdateLoading(true);
    let infoResponse;
    let avatarResponse;
    if (!email || !username || !description) {
      setErrorMessage("Field(s) missing !");
    } else {
      if (newAvatar) {
        const formData = new FormData();
        formData.append("picture", newAvatar);

        const putInfo = async () => {
          try {
            infoResponse = await axios.put(
              "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update",
              { email: email, username: username, description: description },
              { headers: { authorization: `Bearer ${userToken}` } }
            );
            if (infoResponse.data) {
              console.log("INFO RETURN :", infoResponse.data);
              setEmail(infoResponse.data.email);
              setUsername(infoResponse.data.username);
              setDescription(infoResponse.data.username);
            } else {
              console.log("ELSE IR :", infoResponse);
            }
          } catch (error) {
            error.response
              ? setErrorMessage(`Something went wrong : ${error.response}`)
              : console.log("SERVER ERROR INFOS :", error);
          }
        };
        const putAvatar = async () => {
          try {
            avatarResponse = await axios.put(
              "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture",
              formData,
              { headers: { authorization: `Bearer ${userToken}` } }
            );
            if (avatarResponse.data) {
              console.log("AVATAR RETURN :", avatarResponse.data);
              setAvatar(avatarResponse.data.url);
            } else {
              console.log("ELSE AR :", avatarResponse);
            }
          } catch (error) {
            error.response
              ? setErrorMessage(`Something went wrong : ${error.response}`)
              : console.log("SERVER ERROR AVATAR :", error);
          }
        };

        const p = await Promise.all(putInfo(), putAvatar());
        if (p) {
          setUpdateLoading(false);
          setUpdateMessage("Profile successfully updated !");
        } else {
          setUpdateLoading(false);
          setUpdateMessage("Profile has NOT been updated !");
        }
      } else {
        try {
          infoResponse = await axios.put(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update",
            { email: email, username: username, description: description },
            { headers: { authorization: `Bearer ${userToken}` } }
          );
          if (infoResponse.data) {
            console.log("INFO RETURN :", infoResponse.data);
            setEmail(infoResponse.data.email);
            setUsername(infoResponse.data.username);
            setDescription(infoResponse.data.description);
            setUpdateLoading(false);
            setUpdateMessage("Profile successfully updated !");
          } else {
            console.log("ELSE IR :", infoResponse);
            setUpdateLoading(false);
            setUpdateMessage("Profile has NOT been updated !");
          }
        } catch (error) {
          if (error.response) {
            setErrorMessage(`Something went wrong : ${error.response}`);
            setUpdateLoading(false);
            setUpdateMessage("Profile has NOT been updated !");
          } else {
            console.log("SERVER ERROR INFOS :", error);
            setErrorMessage(`Something went wrong...`);
            setUpdateLoading(false);
            setUpdateMessage("Profile has NOT been updated !");
          }
        }
      }
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

      <View>
        {errorMessage && (
          <View>
            <Text styles={{ color: "red" }}>{errorMessage}</Text>
          </View>
        )}
        {updateMessage && (
          <View>
            <Text>{updateMessage}</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonSection}>
        {updateLoading ? (
          <View style={styles.updateDisabled}>
            <Text style={styles.updateDisabledText}>Update</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleSubmitUpdate}
          >
            <Text style={{ color: `#E11960` }}>Update</Text>
          </TouchableOpacity>
        )}
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
    borderRadius: 3,
    paddingLeft: 3,
    paddingRight: 3,
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
  updateDisabled: {
    backgroundColor: `white`,
    borderWidth: 3,
    borderColor: "lightgrey",
    width: 150,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  updateDisabledText: { color: "lightgrey" },
});
