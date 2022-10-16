import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { getOrders } from "../routes/routes";
// screen to show all orders
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { ScrollView } from "react-native-gesture-handler";

const OrderScreen = (props) => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({});

  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };
  const GOOGLE_MAPS_APIKEY = "AIzaSyCYRTHqhe6D2lAqguIiHAztZa211S1dTtI";

  const getData = async () => {
    const orders = await getOrders();
    // find orders where user_id === user.id
    const user = await AsyncStorage.getItem("@user");
    const parsedUser = JSON.parse(user);
    setUser(parsedUser);
    // const userOrders = orders.filter((order) => order.user_id === parsedUser.id);
    // get orders where status === pending
    
    setOrders(orders.reverse());
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(orders);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      {/* show list of all orders */}
      <View
        style={{
          width: "100%",
          alignItems: "flex-start",
          paddingLeft: 20,
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 30 }}>
          Your Orders
        </Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <>
            {/* {order.status === "pending" ? (
              <MapView
                style={{ width: "95%", height: 200 }}
                initialRegion={{
                  latitude: 37.3318456,
                  longitude: -122.0296002,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
    strokeColor="red"
                />
              </MapView>
            ) : null} */}
            { order.status === "pending" ? (
            <View style={{ overflow: 'hidden', backgroundColor: "white",width: "100%" }}>
              <TouchableOpacity
                style={styles.order}
                onPress={() =>
                  props.navigation.navigate("OrderDetail", { order: order })
                }
              >
                <MapView
                style={{ width: "100%", height: 150, borderTopLeftRadius: 50, borderTopRightRadius: 20, overflow: 'hidden' }}
                initialRegion={{
                  latitude: 37.3318456,
                  longitude: -122.0296002,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
    strokeColor="red"
                />
              </MapView>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 15,
                    paddingTop: 15,
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    Order #{order.id}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "medium" }}>
                    ${order.total_price}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {order.seller}
                  </Text>
                  {/* make box around */}
                  <View
                    style={{
                      backgroundColor: "#F5C907",
                      borderRadius: 7,
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingBottom: 3,
                      paddingTop: 3,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      38 min
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              </View>
            ) : 
            <View style={{ overflow: 'hidden', backgroundColor: "white",width: "100%" }}>
              <TouchableOpacity
                style={styles.orderSm}
                onPress={() =>
                  props.navigation.navigate("OrderDetail", { order: order })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 15,
                    paddingTop: 15,
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    Order #{order.id}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "medium" }}>
                    ${order.total_price}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {order.seller}
                  </Text>
                  {/* make box around */}
                  <View
                    style={{
                      backgroundColor: "#009e60",
                      borderRadius: 7,
                      paddingLeft: 10,
                      paddingRight: 10,
                      paddingBottom: 3,
                      paddingTop: 3,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {order.status}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              </View>
            }
            </>
          ))
        ) : (
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            No orders yet
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  order: {
    width: "95%",
    height: "auto",
    paddingBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    // add shadow to bottom
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
          shadowRadius: 3.84,
          shadowOpacity: 0.25,
    elevation: 5,
    },
    orderSm: {
        width: "95%",
        height: "auto",
        paddingBottom: 15,
        backgroundColor: "white",
        borderRadius: 10,
        margin: 10,
        // add shadow to bottom
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
              shadowRadius: 3.84,
              shadowOpacity: 0.25,
        elevation: 5,
        },
});

export default OrderScreen;
