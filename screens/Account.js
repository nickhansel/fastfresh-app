// account info page

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

const Account = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState({});

  const getUser = async () => {
    const storage = await AsyncStorage.getItem("@user");

    const parsedUser = JSON.parse(storage);

    setUser(parsedUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
      <Text
      style={{
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
        }}
        >
      Welcome back {user.name}!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    marginTop: 20,
    paddingLeft: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Account;
