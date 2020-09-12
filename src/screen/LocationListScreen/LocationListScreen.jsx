import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Platform,ActionSheetIOS } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Divider } from "react-native-paper";
import styles from "./LocationListStyle";
import { useDispatch, useSelector } from "react-redux";
import { getAllActiveVendors } from "../../store/action/vendorsAction";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import Geolocation from "@react-native-community/geolocation";
import { getPreciseDistance, convertDistance } from "geolib";

const LocationListScreen = props => {
  const { navigation } = props;
  const VendorReducer = useSelector(state => state.VendorReducer);
  const dispatch = useDispatch();
  const [calcDist, setCalcDist] = useState(0);
  console.log("Vednors", VendorReducer.vendorList);

  const [selectedValue, setSelectedValue] = useState("All");
  useEffect(() => {
    navigation.setOptions({
      title: "Vendors",
      headerStyle: {
        backgroundColor: "#364F2A"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    });
  }, []);

  useEffect(
    () => {
      dispatch(getAllActiveVendors(selectedValue));
    },
    [selectedValue]
  );

  const getDistanceinMiles = (vLat, vLong) => {
    Geolocation.getCurrentPosition(p => {
      const dist = getPreciseDistance(
        { latitude: p.coords.latitude, longitude: p.coords.longitude },
        { latitude: vLat, longitude: vLong }
      );
      setCalcDist(convertDistance(dist, "mi").toFixed(2));
    });
  };

  const onVendorSelect = index => {
    navigation.navigate("NewOrder", {
      position: index
    });
  };


  const onIosDropdownClick = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "All", "Count", "Lbs", "Kgs"],
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setSelectedValue("All")
        } else if (buttonIndex === 2) {
          setSelectedValue("Count")
        } else if (buttonIndex === 3) {
          setSelectedValue("Lbs")
        } else if (buttonIndex === 4) {
          setSelectedValue("Kgs")
        }
      }
    );
  }

  return (

    <View style={styles.container}>
      

        {Platform.OS === "ios" ? 
        <TouchableOpacity style={styles.dropdownPicker} onPress={onIosDropdownClick}>
          <Text style={{
            padding: 15,
            fontSize: 15,
            color: "#364F2A",
            flex: 1,
            fontWeight: "bold"
          }}>{selectedValue}</Text>
          <AntDesign name="caretdown" size={15} color="#364F2A" style={{ paddingVertical: 10, paddingRight: 15, justifyContent: "center", alignSelf: "center" }} />
        </TouchableOpacity> : 
        <View style={styles.dropdownPicker}>
        <Picker
          selectedValue={selectedValue}
          style={{
            width: "100%",
            fontSize: 30,
            color: "#364F2A",
            fontWeight: "bold"
          }}
          mode="dropdown"
          onValueChange={itemValue => setSelectedValue(itemValue)}
        >
            <Picker.Item label="All types of vendors" value="All" />
            <Picker.Item label="Count" value="Count" />
            <Picker.Item label="Lbs" value="Lbs" />
            <Picker.Item label="Kgs" value="Kgs" />
          </Picker>
          </View>}

      

      <Divider />

      <ScrollView>

        {VendorReducer.loading
          ? <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1
            }}
          >
            <ActivityIndicator size="large" color="#364F2A" />
          </View>
          : VendorReducer && VendorReducer.vendorList.length > 0
            ? VendorReducer.vendorList.map((v, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity onPress={() => onVendorSelect(index)}>
                    <View style={styles.orLayout}>
                      <View style={styles.orItemBack}>
                        <Text style={styles.orItem}>
                          {v.StoreName[0]}
                        </Text>
                      </View>
                      <View style={styles.orHorizontalLine}>
                        <View style={styles.upperLayout}>
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: "#364F2A",
                              flex: 9
                            }}
                          >
                            {v.StoreName}
                          </Text>
                          <Text
                            style={{
                              fontWeight: "bold",
                              color: "#966A4A",
                              flex: 3,
                              fontSize: 12
                            }}
                          >
                            <Icon name="crosshairs-gps" />
                            {getDistanceinMiles(v.Lat, v.Long)}
                            {calcDist}
                          </Text>
                        </View>
                        <View style={styles.lowerLayout}>
                          <Ionicons
                            name="location"
                            size={20}
                            color="#966a4a"
                          />
                          <Text style={{ color: "#966a4a" }}>
                            {v.Address}
                          </Text>
                        </View>
                        {selectedValue === "All"
                          ? <View style={styles.typeLabel}>
                            <Text
                              style={{
                                paddingHorizontal: 10,
                                width: 60,
                                borderRadius: 10,
                                fontSize: 10,
                                borderWidth: 2,
                                textAlign: "center",
                                fontWeight: "bold",
                                color:
                                  v.StockType === "Count"
                                    ? "red"
                                    : v.StockType === "Lbs"
                                      ? "blue"
                                      : "green",
                                borderColor:
                                  v.StockType === "Count"
                                    ? "red"
                                    : v.StockType === "Lbs"
                                      ? "blue"
                                      : "green"
                              }}
                            >
                              {v.StockType}
                            </Text>
                          </View>
                          : null}
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
            : <View style={styles.orLayout}>
              <View style={styles.orItemBack}>
                <Text style={styles.orItem}>N</Text>
              </View>
              <View style={styles.orHorizontalLine}>
                <View style={styles.upperLayout}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#364F2A",
                      flex: 9
                    }}
                  >
                    No orders found!
                      </Text>
                </View>
              </View>
            </View>}
      </ScrollView>
    </View>
  );
};

export default LocationListScreen;
