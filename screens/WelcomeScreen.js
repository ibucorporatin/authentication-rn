import axios from "axios";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { authContext, authUseContext } from "../store/authContext";

function WelcomeScreen() {
  const [fetchUser, setfetchUser] = useState("");
  const { token } = authUseContext();
  const check = async () => {
    axios
      .get(
        "https://authebtication-in-reactnative-default-rtdb.firebaseio.com/message.json?auth=" +
          token
      )
      .then((res) => setfetchUser(res.data))
      .catch((res) => console.log("error"));
  };
  check();
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchUser}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
