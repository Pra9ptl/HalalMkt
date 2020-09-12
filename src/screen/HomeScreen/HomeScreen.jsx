import React, { useEffect } from "react";
import { View, Image } from "react-native";
import styles from "./HomeStyle";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CardView from "../../component/CardView";
import Profile from "../../assets/profile.png";
import New from "../../assets/newOrder.png";
import History from "../../assets/orderHistory.png";
import Contact from "../../assets/contactUs.png";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import { signOutAction } from "../../store/action/authAction";
import { StackActions } from "@react-navigation/native";

const HomeScreen = props => {
  const { navigation } = props;

  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(signOutAction());
  };

  useEffect(
    () => {
      if ((AuthReducer.email === "", AuthReducer.isSignedIn === false)) {
        navigation.dispatch(StackActions.replace("SignIn"));
      }
    },
    [AuthReducer.email]
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        <TouchableOpacity style={{ padding: 15 }} onPress={() => onSignOut()}>
          <Icon name="logout" color="#fff" size={25} />
        </TouchableOpacity>
    });
  }, []);

  const navigateToOrderHistory = () => navigation.navigate("OrderHistory");
  const navigateToLocation = () => navigation.navigate("Location");
  const navigateToProfile = () => navigation.navigate("Profile");
  const navigateToContact = () => navigation.navigate("ContactUs");

  return (
    <View style={styles.container}>
      <View style={styles.buttonSignInLayout}>
        <Image
          style={styles.logo}
          source={require("../../assets/splashScreenLogo.png")}
        />
      </View>
      <ScrollView>
        <View style={styles.cardLayout}>
          <CardView
            title="Profile"
            imageUri={Profile}
            clicked={navigateToProfile}
          />
          <CardView
            title="New Order"
            imageUri={New}
            clicked={navigateToLocation}
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

export default HomeScreen;
