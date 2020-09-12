import React, { useEffect } from "react";
import { View, Image, Text, Linking, Button } from "react-native";
import styles from "./ContactStyle";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ContactScreen = props => {
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      title: "Contact Us",
      headerStyle: {
        backgroundColor: "#364F2A"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.lLogoLayout}>
        <Image
          style={styles.lLogo}
          source={require("../../assets/lettermarkLogo.png")}
        />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.orLayout}>
          <Text style={styles.label}>
            <FontAwesome name="mobile-phone" size={25} />
          </Text>
          <View style={styles.valuelayout}>
            <TouchableOpacity
              onPress={() => Linking.openURL("tel:+1416-346-0632")}
            >
              <Text style={styles.value}>Phone: 416-346-0632</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.orLayout}>
          <Text style={styles.label}>
            <Feather name="mail" size={25} />
          </Text>
          <View style={styles.valuelayout}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("mailto:info@halalmkt.ca?subject=Enquiry Mail")}
            >
              <Text style={styles.value}>Email: info@halalmkt.ca</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.orLayout}>
          <Text style={styles.label}>
            <FontAwesome name="instagram" size={25} />
          </Text>
          <View style={styles.valuelayout}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.instagram.com/halalmkt/")}
            >
              <Text style={styles.value}>Instagram: halalmkt</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.orLayout}>
          <Text style={styles.label}>
            <Ionicons name="earth" size={25} />
          </Text>
          <View style={styles.valuelayout}>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://halalmkt.ca/")}
            >
              <Text style={styles.value}>Web: halalmkt.ca</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ContactScreen;
