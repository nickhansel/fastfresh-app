import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Pressable
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const HomeItem = ( props ) => {
  const navigation = useNavigation();

  const image = {
    uri: props.url,
  };

  return (
    <View style={styles.container}>
          <Image source={image} style={styles.image}></Image>
      <View
        style={{
          height: "30%",
          width: "90%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            height: "50%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>{props.name}</Text>
          <Text style={styles.secondTitle}>4.3 mi - 35 min</Text>
        </View>
        <View
          style={{
            height: "50%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.body}>Dairy, meat</Text>
          <Text style={styles.secondBody}>${props.fee.toFixed(2)} delivery fee</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    borderBottomWidth: 0.35,
    borderBottomColor: "#d9d9d9",
    display: "flex",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "91%",
    height: 100,
    // backgroundColor: "red",
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    marginTop: 10,
    fontWeight: "bold",
  },
  secondTitle: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: "medium",
    color: "#808080"
  },
  body: {
    fontSize: 15,
    fontWeight: "medium",
    color: "#808080",
  },
    secondBody: {
    fontSize: 13,
    fontWeight: "medium",
    color: "#808080",
    }
});

export default HomeItem;
