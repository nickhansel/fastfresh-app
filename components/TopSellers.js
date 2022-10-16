import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, SafeAreaView} from 'react-native';

const CategoryList = ( props ) => {

    const image = {
        uri: "https://www.travelwisconsin.com/uploads/blog/e2/e2ccbd6f-1070-4272-889b-cc7720bd664d-farm-scene-with-cows.jpg",
    }

    const chop = {
        uri: "https://cdn.shopify.com/s/files/1/1918/9371/products/flanksteakrawsquare_1_600x.jpg?v=1636211104",
    }

    // const chop = {
    //     uri: props.url
    // }


      const Item = ({ title, name }) => (
        <View style={{maxHeight:"100%", overflowX:"hidden", overflowY:"hidden", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"start", marginLeft: 15, marginRight: 15}}>
            <Image 
                source={{uri: title}}
                style={{
                    height:90,
                    width:90,
                    marginBottom: 10,
                    borderRadius: 10,
                }}
            />
            <Text style={styles.body}>$5.99</Text>
            <Text style={styles.smallBody}>{name}{"\n"}Dutton Ranch</Text>
        </View>
      );

      const renderItem = ({ item }) => (
        <Item title={item.url} name={item.name}/>
      );

    return (
        <SafeAreaView style={styles.container}>
            <Image source={image} style={styles.image}></Image>
            <FlatList
            horizontal
        data={props.urls}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 180,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#d9d9d9",
        borderBottomWidth: 0.35,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
      },
      title: {
        fontSize: 32,
      },
      body: {
        marginLeft: 2,
        fontWeight: "bold",
        fontSize: 14,
      },
      smallBody: {
        marginLeft: 2,
        marginBottom: 6,
        fontWeight: "normal",
        fontSize: 12,
        color: "#292929",
      }
});

export default CategoryList;