import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';


const FarmItem = (props) => {
    return (
        <View style={{width: "100%", paddingLeft: 15, paddingRight: 15 ,height: 85, borderBottomColor: "#a9a9a9", borderBottomWidth: '0.35', display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between"}}>
            <View style={{width: "90%", height: "50%", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                {/* circular image */}
                <Image style={{width: 40, height: 40, borderRadius: 50, marginRight: 10}} source={{uri: props.url}}/>
                <View style={{width: "50%", height: "57%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20}}>
                <Text style={{fontSize: 17, fontWeight: "bold"}}>{props.name}</Text>
                <Text style={{fontSize: 14, fontWeight: "medium", color: "#808080", marginTop: 5}}>${props.price.toFixed(2)}</Text>
            </View>
                {/* circle with + sign */}
            </View>
            <View style={{width: "10%", height: "50%", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                <TouchableOpacity>
                    <AntDesign name="pluscircle" size={24} color="#009E60" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FarmItem;
