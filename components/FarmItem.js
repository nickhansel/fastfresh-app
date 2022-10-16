import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const FarmItem = (props) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (item) => {
    try {
        let existingCart = await AsyncStorage.getItem("@cart") ? JSON.parse(await AsyncStorage.getItem("@cart")) : [];
        const newCart = [...existingCart, item]; // notice the newData here
        await AsyncStorage.setItem("@cart", JSON.stringify(newCart));
        setCart(newCart);
      } catch (e) {
      console.log(e);
    }
  };

  const removeFromCart = async (item) => {
    try {
    //   remove one item from cart that matches item.id
        let existingCart = await AsyncStorage.getItem("@cart") ? JSON.parse(await AsyncStorage.getItem("@cart")) : [];
        existingCart.map((cartItem, index) => {
            if (cartItem.id === item.id) {
                // remove index from array
                existingCart.splice(index, 1);
                // break out of loop
                return;
            }
        });
        await AsyncStorage.setItem("@cart", JSON.stringify(existingCart));
        setCart(existingCart);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getCart = async () => {
      const storage = await AsyncStorage.getItem("@cart");
      const parsedCart = JSON.parse(storage);
      setCart(parsedCart);
      console.log(cart, "cart");
    // //   delete cart
    // await AsyncStorage.removeItem("@cart");
    };
    getCart();
  }, []);

  // function to check if props.id is in cart
  const inCart = (id) => {
    if (cart) {
        // get amount of items with id
        const amount = cart.filter((item) => item.id === id).length;
        // if amount is greater than 0, return true
        if (amount > 0) {
            return amount;
        }
        return 0
    };
    };

  return (
    <View
      style={{
        width: "100%",
        paddingLeft: 15,
        paddingRight: 15,
        height: 85,
        borderBottomColor: "#a9a9a9",
        borderBottomWidth: "0.35",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: "70%",
          height: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {/* circular image */}
        <Image
          style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }}
          source={{ uri: props.url }}
        />
        <View
          style={{
            width: "80%",
            height: "57%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>{props.name}</Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "medium",
              color: "#808080",
              marginTop: 5,
            }}
          >
            ${props.price.toFixed(2)}
          </Text>
        </View>
        {/* circle with + sign */}
      </View>
      <View
        style={{
          width: "30%",
          height: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: inCart(props.id) > 0 ? "space-between" : "flex-end",
          alignItems: "center",
        }}
      >
        {inCart(props.id) > 0 ? (
          <View
            style={{
              width: "100%",
              height: "50%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                removeFromCart({
                  url: props.url,
                  name: props.name,
                  price: props.price,
                  id: props.id,
                })
              }
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                backgroundColor: "#009E60",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="minuscircleo" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              {inCart(props.id)}
            </Text>
            <TouchableOpacity
              onPress={() =>
                addToCart({
                  url: props.url,
                  name: props.name,
                  price: props.price,
                  id: props.id,
                })
              }
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                backgroundColor: "#009E60",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="pluscircleo" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() =>
              addToCart({
                url: props.url,
                name: props.name,
                price: props.price,
                id: props.id,
              })
            }
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
              backgroundColor: "#009E60",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="pluscircleo" size={24} color="white" />
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity onPress={() => addToCart({
                    url: props.url,
                    name: props.name,
                    price: props.price,
                    id: props.id
                })}>
                    <AntDesign name="pluscircle" size={24} color="#009E60" />
                </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default FarmItem;
