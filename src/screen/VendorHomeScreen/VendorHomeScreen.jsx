import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { Switch } from "react-native-paper";
import styles from "./VendorHomeStyle";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CardView from "../../component/CardView";
import Profile from "../../assets/profile.png";
import Stock from "../../assets/storage.png";
import History from "../../assets/orderHistory.png";
import Contact from "../../assets/contactUs.png";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import {
  signOutAction,
  switchIsActiveStatus
} from "../../store/action/authAction";
import { StackActions } from "@react-navigation/native";
import { getVendorStock } from "../../store/action/vendorsAction";

const VendorHomeScreen = props => {
  const { navigation } = props;

  const AuthReducer = useSelector(state => state.AuthReducer);

  const dispatch = useDispatch();

  const [isSwitchOn, setIsSwitchOn] = useState(
    AuthReducer.IsActive === 1 ? true : false
  );
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const onSignOut = () => {
    dispatch(signOutAction());
  };

  useEffect(
    () => {
      dispatch(switchIsActiveStatus(AuthReducer.email, isSwitchOn));
      //   dispatch(signOutAction());
    },
    [isSwitchOn]
  );

  useEffect(
    () => {
      if ((AuthReducer.email === "", AuthReducer.isSignedIn === false)) {
        navigation.dispatch(StackActions.replace("SignIn"));
      }
    },
    [AuthReducer.email]
  );

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(getVendorStock(AuthReducer.email));
      dispatch(switchIsActiveStatus(AuthReducer.email, isSwitchOn));
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        <TouchableOpacity style={{ padding: 15 }} onPress={() => onSignOut()}>
          <Icon name="logout" color="#fff" size={25} />
        </TouchableOpacity>
    });
  }, []);

  const navigateToOrderHistory = () =>
    navigation.navigate("VendorOrderHistory");
  const navigateToStocks = () => navigation.navigate("Stocks");
  const navigateToProfile = () => navigation.navigate("VendorProfile");
  const navigateToContact = () => navigation.navigate("ContactUs");

  return (
    <View style={styles.container}>
      <View style={styles.buttonSignInLayout}>
        <Image
          style={styles.logo}
          source={require("../../assets/splashScreenLogo.png")}
        />
      </View>
      <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>
        <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 8 }}>
          <Text
            style={{ textAlign: "right", fontWeight: "bold", color: "#ABB2B9" }}
          >
            Inactive Business
          </Text>
        </View>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          color="#966A4A"
        />
        <View style={{ flex: 1, justifyContent: "center" , paddingHorizontal: 8 }}>
          <Text
            style={{ textAlign: "left", fontWeight: "bold", color: "#966A4A" }}
          >
            Active Business
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.cardLayout}>
          <CardView
            title="Profile"
            imageUri={Profile}
            clicked={navigateToProfile}
          />
          <CardView
            title="Stocks"
            imageUri={Stock}
            clicked={navigateToStocks}
          />
          <CardView
            title="Order History"
            imageUri={History}
            clicked={navigateToOrderHistory}
          />
          <CardView
            title="Contact Us"
            imageUri={Contact}
            clicked={navigateToContact}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default VendorHomeScreen;
