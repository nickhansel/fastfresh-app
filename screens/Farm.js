import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

import FarmItem from "../components/FarmItem";

const Farm = (props) => {
    const navigation = useNavigation();

    const { name, url, items, fee, dist, itemIds} = props.route.params;

    // map through items and find the item that is in the itemIds array
    const item = items.filter((item) => itemIds.includes(item.id));

    return (
        <>
        <ScrollView style={styles.container}>
            {/* image */}
            <Image source={{uri: url}} style={styles.image}></Image>
            <View style={styles.header}>
                <Text style={styles.headerText}>{name}</Text>
                <Text style={styles.body}>{dist} mi ∙ ${fee} delivery fee</Text>
            </View>
            <View style={styles.items}>
                <Text style={styles.headerText}>Items</Text>
            </View>
            {item.map((item) => (
                <FarmItem
                    key={item.id}
                    url={item.url}
                    name={item.name}
                    price={item.price}
                    id={item.id}
                />
            ))}
        {/* place order button */}
        </ScrollView>
        <View style={styles.button}>
        <TouchableOpacity 
        onPress={() => navigation.navigate("HomeScreen", { screen: "Order", params:{
            name: name,
            url: url,
            items: items,
            fee: fee,
            dist: dist,
            itemIds: itemIds
        }})}
        style={{height: "70%", backgroundColor: "#009E60", width: "90%", borderRadius: 20, alignItems: "center", justifyContent: "center"}}>
            <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
    </View>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
        marginBottom: 70
    },
    image: {
        width: "100%",
        height: 150,
    },
    header: {
        width: "100%",
        height: 65,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 15,
        backgroundColor: "white",
        paddingTop: 15,
    },
    headerText: {
        fontSize: 26,
        fontWeight: "bold",
    },
    body: {
        fontSize: 16,
        fontWeight: "normal",
        color: "#808080"
    },
    items: {
        width: "100%",
        height: 85,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 15,
        backgroundColor: "white",
        paddingTop: 15,
        borderBottomColor: "#a9a9a9",
        borderBottomWidth: 0.35,
    },
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
    
});

export default Farm;