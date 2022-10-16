import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, SafeAreaView} from 'react-native';

const CategoryList = ({category}) => {

    const image = {
        uri: "https://www.travelwisconsin.com/uploads/blog/e2/e2ccbd6f-1070-4272-889b-cc7720bd664d-farm-scene-with-cows.jpg",
    }

    const chop = {
      // meat
        // uri: "https://icons.veryicon.com/png/o/food--drinks/fresh-1/meat-4.png",
        // veggie
        uri: "https://icons.veryicon.com/png/o/food--drinks/fruits-and-vegetables-3/icon-pepper.png",
        // fruit
        // uri: "https://icons.veryicon.com/png/o/food--drinks/fruits-and-vegetables-3/icon-grape-1.png",
    }

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'https://icons.veryicon.com/png/o/food--drinks/fresh-1/meat-4.png',
          name: "Protien"
        },
        {
          id: '3ac68afcdsdas-c605-48d3-a4f8-fbd91aa97f63',
          title: 'https://icons.veryicon.com/png/o/food--drinks/fruits-and-vegetables-3/icon-pepper.png',
          name: "Veggies"
        },
        {
          id: '58694a0f-yhyh3da1-471f-bd96-145571e29d72',
          title: 'https://icons.veryicon.com/png/o/food--drinks/fruits-and-vegetables-3/icon-grape-1.png',
          name: "Fruit"
        },
        {
          id: '58694a0f-yhyh3da1-471f-bd96-145571e29d72',
          title: 'https://icons.veryicon.com/png/o/commerce-shopping/jie-yu-general-merchandise-department/milk-48.png',
          name: "Dairy"
        },
      ];

      const Item = ({ title, name }) => (
        <View style={{maxHeight:"100%", overflowX:"hidden", overflowY:"hidden", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginLeft: 15, marginRight: 15}}>
            <Image 
                source={{uri: title}}
                style={{
                    height:50,
                    width:50,
                    resizeMode:'contain',
                }}
            />
            <Text style={styles.body}>{name}</Text>
        </View>
      );

      const renderItem = ({ item }) => (
        <Item title={item.title} name={item.name}/>
      );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
            horizontal
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
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
        marginBottom: 6,
      }
});

export default CategoryList;