import { View, Text, Button, Image } from 'react-native';

const OrderConfirm = (props) => {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            {/* use 1.png image */}
            <Image source={require('../assets/1.png')} style={{width: "100%", height: 300}}></Image>
            <Text style={{fontSize: 30, fontWeight: "bold", marginTop: 30}}>Order Confirmed!</Text>
            <Text style={{fontSize: 16, fontWeight: "normal", marginTop: 0, padding: 20, textAlign: "center"}}>Your order has been placed and will be delivered to you shortly.</Text>
            <Button title="Back to Home" onPress={() => props.navigation.navigate("Home")} style={{marginTop: 20, color: "red"}}></Button>
        </View>
    );
}

export default OrderConfirm;

