import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import SplashScreen from "./screen/SplashScreen/SplashScreen";
import AuthStack from "./navigation";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";
import { signInAction } from "./store/action/authAction";
LogBox.ignoreAllLogs(true);

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("splash");
  const dispatch = useDispatch();

  const [initial, setInitial] = useState("SignIn");

  useEffect(() => {
    const getData = async () => {
      await AsyncStorage.getItem("userData").then(res => {
        if (res) {
          const r = JSON.parse(res);
          console.log("Data", r);
          dispatch(signInAction(r.email, r.password));
          if (r.userType === "user") {
            setInitial("UserHome");
          } else if (r.userType === "vendor") {
            setInitial("VendorHome");
          }
        }
      });
    };
    getData();
    setTimeout(() => setCurrentScreen("Navigation"), 3000);
  }, []);

  return currentScreen === "splash"
    ? <SplashScreen />
    : <AuthStack initial={initial} />;
};

export default App;
