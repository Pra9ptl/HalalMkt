import React from "react";
import { View, Image } from "react-native";
import styles from "./SplashStyle";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/splashScreenLogo.png")}
      />
    </View>
  );
};

export default SplashScreen;
