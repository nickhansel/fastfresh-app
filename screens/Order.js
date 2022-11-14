import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createOrder } from "../routes/routes"

const Order = (props) => {
    const navigation = useNavigation();

    const { name, url, items, fee, dist, itemIds} = props.route.params;

    const [cart, setCart] = useState([]);
    
    const [cartUnique, setCartUnique] = useState([]);

    const getCart = async () => {
        const storage = await AsyncStorage.getItem("@cart");
        const parsedCart = JSON.parse(storage);
        setCart(parsedCart);
        // get unique items
        let arr = []
        parsedCart.map((item) => {
            if (!arr.includes(item.id)) {
                arr.push(item.id);
            }
        });
        // get unique items
        let uniqueItems = [];
        arr.map((id) => {
            let item = parsedCart.filter((item) => item.id === id)[0];
            uniqueItems.push(item.id);
        }
        );
        setCartUnique(uniqueItems);
    };

    const getItemById = (id) => {
        return cart.filter((item) => item.id === id)[0];
    };

    const getAmount = (id) => {
        if (cart) {
            const amount = cart.filter((item) => item.id === id).length;
            if (amount > 0) {
                return amount;
            }
        }
        return 0;
    };

    const sendOrder = async () => {
        const order = {
            created_at: new Date(),
            items: cart,
            delivered_at: "123",
            status: "pending",
            id: Math.floor(Math.random() * 1000000),
            total_price: cart.reduce((acc, item) => acc + item.price, 0),
            seller: name,
            driver: "Dawson",
            user_id: 1,
            address: ["41.675390", "-91.513330"]
        };
        const response = await createOrder(order);
        if (response) {
            await AsyncStorage.removeItem("@cart");
            navigation.navigate("HomeScreen", { screen: "Confirm", params: { name: name, url: url, items: items, fee: fee, dist: dist, itemIds: itemIds } });
        }
    };

    const setUser = async () => {
        const user = {
            name: "John",
            "id": 1,
            address: ["41.654010", "-91.532140"]
        }
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        console.log(await AsyncStorage.getItem("@user"));
    };




    useEffect(() => {
        // set user in local storage
        setUser();
        getCart();
    }, []);


    return (
        <>
        <ScrollView style={{backgroundColor: "white", marginBottom: 70}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20 ,backgroundColor: "white"}}>
                <Text style={{fontSize: 30, fontWeight: "bold"}}>Order</Text>
                <View style={{flexDirection: "column", alignItems: "center", alignItems: "flex-end"}}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>Subtotal: ${cart ? (cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)) : 0.00}</Text>
                {/* show fee */}
                <Text style={{fontSize: 15, fontWeight: "medium", marginLeft: 10, color: "#808080"}}> Delivery fee ${fee}</Text>
                </View>
            </View>
            <View style={{}}>
            { 
                cartUnique.map((item) => (
                    // only show each item once
                    <View key={item.id} style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 80, borderBottomColor: "#a9a9a9", borderBottomWidth: 0.35, width: "100%"}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        {/* badge on top right of image */}
                        <View style={{position: "relative", paddingLeft: 15}}>
                        <Image style={{width: 45, height: 45, borderRadius: 50,}} source={{uri: getItemById(item).url}} />
                            <View style={{position: "absolute", top: 0, right: -9, backgroundColor: "#009E60", borderRadius: 50, width: 20, height: 20, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{color: "white", fontWeight: "bold"}}>{getAmount(item)}</Text>
                            </View>
                        </View>
                    <Text style={{fontSize: 18, fontWeight: "bold", paddingLeft: 20}}>{getItemById(item).name}</Text>
                    </View>
                    {/* quantity of item in cart */}
                    <Text style={{fontSize: 18, fontWeight: "medium", paddingRight: 15}}>${(getAmount(item) * getItemById(item).price).toFixed(2)}</Text>
                    {/* item url as a circle image */}
                    </View>
                ))

            }
            </View>
            {/* place order button */}

        </ScrollView>
        <View style={styles.button}>
        <TouchableOpacity 
        onPress={() => sendOrder()}
        style={{height: "70%", backgroundColor: "#009E60", width: "90%", borderRadius: 20, alignItems: "center", justifyContent: "space-evenly", flexDirection: "row"}}>
            <Text style={styles.buttonText}>Place Order</Text>
            {/* subtotal + fee */}
            <Text style={{color: "white", fontSize: 18, fontWeight: "bold"}}>${cart ? ((cart.reduce((acc, item) => acc + item.price, 0)) + fee).toFixed(2) : 0.00}</Text>
        </TouchableOpacity>
    </View>
    </>
    )

}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 70,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    }
})

export default Order;
