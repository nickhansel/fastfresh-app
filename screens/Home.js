import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import TopSellers from "../components/TopSellers";

import React, { Component } from "react";
import HomeItem from "../components/HomeItem";
import CategoryList from "../components/CategoryList";
import { getSeller, getItems } from "../routes/routes";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const DATA = [
    {
      id: "bd7ar4rcbea-c1b1-46c2-aed5-3ad53abb28bsdsda",
      title:
        "https://grfresh.us/wp-content/themes/grFreshUS/assets/images/single-products/jalapeno-peppers.jpg",
    },
    {
      id: "3ac6wqe8afc-c605-48d3-a4f8-fbdloijllwq91aa9sd7f63",
      title:
        "https://images.eatthismuch.com/img/451_erin_m_d7cfcfcd-642a-4d6b-b6e8-0adf3eabbff7.png",
    },
    {
      id: "586erfwe94a0f-3da1-471frducjtymhvg-bd96-14557a1eff29d72",
      title:
        "https://cdn-prod.medicalnewstoday.com/content/images/articles/283/283659/a-basket-of-eggs.jpg",
    },
    {
      id: "bd7acasdasbea-c1asb1-46c2-aed5-rte56uytj3ad53asaabb28ba",
      title:
        "https://www.growjoy.com/store/pc/catalog/mountain_fresh_tomato_plant_1843_detail.jpg",
    },
    {
      id: "3ac68asadsafc-c605-4sa8d3-a4f8-fbd91aa9asa7f63",
      title: "https://www.xzff.com/uploads/glass-milk-bottle-240ml.jpg",
    },
    {
      id: "3ac6dfsa8afc-c605-48d3-a4f8sa-fbtyfuyvuybyukbuikbkud91aa97sf63",
      title:
        "https://cdn.shopify.com/s/files/1/1918/9371/products/flanksteakrawsquare_1_600x.jpg?v=1636211104",
    },
  ];

  const [data, setData] = React.useState([]);
  const [items, setItems] = React.useState([]);

  // get items in useffect
  useEffect(() => {
    const getData = async () => {
      const j = await getSeller();
      const item = await getItems();
      setData(j);
      // reverse item
      setItems(item.reverse());
    };
    getData();
  }, []);

  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <CategoryList />
      <View style={styles.header}>
        <Text style={styles.headerText}>Top Sellers</Text>
      </View>
      <TopSellers urls={items} />
      <View style={styles.header}>
        <Text style={styles.headerText}>All Farms</Text>
      </View>
      {data &&
        data.map((item) => (
          <Pressable
            key={item.id}
            style={{ width: "100%" }}
            onPress={() =>
              navigation.navigate("HomeScreen", { screen: "Farm" ,
            
              params: { id: item.id, name: item.name, itemIds:item.items, url:item.url, dist:item.address, fee:item.fee, items: items }})}
          >
          
            <HomeItem
              key={item.id}
              url={item.url}
              name={item.name}
              fee={item.fee}
              items={item.items}
            />
          </Pressable>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    backgroundColor: "white",
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    width: "100%",
    paddingLeft: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default Home;
