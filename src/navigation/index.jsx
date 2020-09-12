import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screen/LoginScreen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen/RegisterScreen";
import OrderHistory from "../screen/OrderHistory/OrderHistoryScreen";
import HomeScreen from "../screen/HomeScreen/HomeScreen";
import { enableScreens } from "react-native-screens";
import ProfileScreen from "../screen/ProfileScreen/ProfileScreen";
import LocationListScreen from "../screen/LocationListScreen/LocationListScreen";
import NewOrderScreen from "../screen/NewOrderScreen/NewOrderScreen";
import ConfirmOrderScreen from "../screen/ConfirmOrderScreen/ConfirmOrderScreen";
import ContactScreen from "../screen/ContactScreen/ContactScreen";
import VendorHomeScreen from "../screen/VendorHomeScreen/VendorHomeScreen";
import VendorProfileScreen from "../screen/VendorProfileScreen/VendorProfileScreen";
import VendorOrderHistoryScreen from "../screen/vendorOrderHistory/VendorOrderHistoryScreen";
import StockScreen from "../screen/StockScreen/StockScreen";
import VendorOrderViewScreen from "../screen/VendorOrderViewScreen/VendorOrderViewScreen";
import OrderViewScreen from "../screen/OrderViewScreen/OrderViewScreen";
import { Platform } from 'react-native';

const Stack = createStackNavigator();
enableScreens();



const AuthStack = props => {

  // const header = () => {
  //   const sty = [backgroundColor, "#364F2A" ]
  //   if (Platform.OS === 'ios') {
  //     sty.push(
  //       "height", 100
  //     )
  //   }
  //   return sty;
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={props.initial}>
        <Stack.Screen
          name="SignIn"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserHome"
          component={HomeScreen}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#364F2A",
              height: Platform.OS === "ios" ? 100 : 56
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          }}
        />

        <Stack.Screen
          name="VendorHome"
          component={VendorHomeScreen}
          options={{
            title: "Vednor",
            headerStyle: {
              backgroundColor: "#364F2A",
              height: Platform.OS === "ios" ? 100 : 56
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          }}
        />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen
          name="VendorOrderHistory"
          component={VendorOrderHistoryScreen}
        />
        <Stack.Screen
          name="VendorOrderView"
          component={VendorOrderViewScreen}
        />
        <Stack.Screen name="OrderView" component={OrderViewScreen} />
        <Stack.Screen name="Location" component={LocationListScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="VendorProfile" component={VendorProfileScreen} />
        <Stack.Screen name="NewOrder" component={NewOrderScreen} />
        <Stack.Screen name="Stocks" component={StockScreen} />
        <Stack.Screen name="ContactUs" component={ContactScreen} />
        <Stack.Screen name="ConfirmOrder" component={ConfirmOrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
