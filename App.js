import * as React from "react";
import { Text, View, Pressable, TouchableOpacity} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import Home from "./screens/Home";
import Farm from "./screens/Farm";
import Order from "./screens/Order";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from '@expo/vector-icons'; 
import OrderConfirm from "./screens/OrderConfirm";
import OrderScreen from "./screens/OrderScreen";
import Search from "./screens/Search";
import Account from "./screens/Account";

const Stack = createStackNavigator();


function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const CustomHeader = ({ navigation }) => {
  return (
    <View
      style={{
        height: 90,
        // backgroundColor: "#49a078",
        backgroundColor: "#009E60",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingBottom: 17,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >

      <FontAwesome name="map-marker" size={19} color="white" style={{marginBottom: 2}}/>
      <Text style={{color: "white", fontSize: 18, marginLeft: 10, fontWeight: "bold"}}>225 E Prentiss Street</Text>
    </View>
  );
};

const FarmHeader = ({ navigation }) => {
  return (
    <View
      style={{
        height: 90,
        // backgroundColor: "#49a078",
        backgroundColor: "#009E60",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingBottom: 13,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <AntDesign name="arrowleft" size={24} color="white" />
  </TouchableOpacity>
      {/* rounded view circle */}
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 50,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>A</Text>
      </View>

      <AntDesign name="shoppingcart" size={24} color="white" />
    </View>
  );
};


const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
          // use CustomHeader component as a header
          options={{
            header: (props) => <CustomHeader {...props} />,
          }}
          // make tabbar icon
          name="Home"
          component={Home}
        />
        <Stack.Screen
          // use CustomHeader component as a header
          // make tabbar icon
          options={{
            header: (props) => <FarmHeader {...props} />,
          }}

          name="Farm"
          component={Farm}
        />
        <Stack.Screen
          // use CustomHeader component as a header
          // make tabbar icon
          options={{
            header: (props) => <FarmHeader {...props} />,
          }}

          name="Order"
          component={Order}
        />
        <Stack.Screen
          // use CustomHeader component as a header
          // make tabbar icon
          options={{
            header: (props) => <FarmHeader {...props} />,
          }}

          name="Confirm"
          component={OrderConfirm}
        />
    </Stack.Navigator>
  );
};






const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      // change bg color
        tabBarOptions={{
          activeTintColor: "#009E60",
        }}
      >
        <Tab.Screen
          // use CustomHeader component as a header
          options={{
            // header: (props) => <CustomHeader {...props} />,
            header: (props) => <></>,
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
          // make tabbar icon


          name="HomeScreen"
          component={HomeNavigator}
        />
        <Tab.Screen
          options={{
            header: (props) => <CustomHeader {...props} />,
            tabBarIcon: ({ color, size }) => (
              <Feather name="search" size={size} color={color} />
            ),
          }}
          name="Search"
          component={Search}
        />
        <Tab.Screen
          options={{
            header: (props) => <CustomHeader {...props} />,
            tabBarIcon: ({ color, size }) => (
              <Feather name="bookmark" size={size} color={color} />
            ),
          }}
          name="Orders"
          component={OrderScreen}
        />
        <Tab.Screen
          options={{
            header: (props) => <CustomHeader {...props} />,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user-o" size={size} color={color} />
            ),
          }}
          name="Account"
          component={Account}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
