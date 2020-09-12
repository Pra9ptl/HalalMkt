import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./CardStyle";

const CardView = props => {
  return (
    <TouchableOpacity onPress={props.clicked}>
      <View style={styles.cardView}>
        <Text style={styles.cardTitle}>
          {props.title}
        </Text>
        <Image style={{ width: 75, height: 75 }} source={props.imageUri} />
      </View>
    </TouchableOpacity>
  );
};

export default CardView;
