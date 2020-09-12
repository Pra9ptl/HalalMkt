import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../store/action/orderHistoryAction";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./OrderHistoryStyle";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { getAllVendors } from "../../store/action/vendorsAction";

const AllRoute = props => {
  const { navigation } = props;
  const AuthReducer = useSelector(state => state.AuthReducer);
  const OrderHistoryReducer = useSelector(state => state.OrderHistoryReducer);
  const dispatch = useDispatch();



  const VendorReducer = useSelector(state => state.VendorReducer);
  useEffect(() => {
    dispatch(getAllVendors());
  }, []);

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(getAllOrders(AuthReducer.email));
    });
  }, []);

  const onItemClick = item => {
    navigation.navigate("OrderView", {
      order: item
    });
  };

  console.log("Order History User", OrderHistoryReducer.ordersList);
  console.log("Vendros OHS", VendorReducer.vendorList);

  return (
    // <SafeAreaView style={{borderWidth:1, flex:1, backgroundColor: "#000"}}>
    <ScrollView style={{ flex: 1 }} alwaysBounceVertical={false}>
      {OrderHistoryReducer.loading
        ? <View style={styles.loadingLayout}>
          <ActivityIndicator size="large" color="#364F2A" />
        </View>
        : OrderHistoryReducer.ordersList !== undefined
          ? OrderHistoryReducer.ordersList.map((order, pos) => {
            return order !== undefined
              ? <TouchableOpacity
                onPress={() => onItemClick(order)}
                key={pos}
              >
                <View style={styles.orLayout}>
                  <View style={styles.orItemBack}>
                    <Text style={styles.orItem}>
                      {VendorReducer.vendorList &&
                        VendorReducer.vendorList.find(
                          Vendor => Vendor.Email === order.VendorId
                        ).Name[0]}
                    </Text>
                  </View>
                  <View style={styles.orHorizontalLine}>
                    <View style={styles.upperLayout}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#364F2A",
                          flex: 6.5
                        }}
                      >
                        {VendorReducer.vendorList &&
                          VendorReducer.vendorList.find(
                            Vendor => Vendor.Email === order.VendorId
                          ).Name}
                      </Text>
                      <View
                        style={{
                          flex: 4,
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 2,
                          borderRadius: 4.5,
                          borderColor:
                            order.Status === "pending"
                              ? "red"
                              : order.Status === "process"
                                ? "blue"
                                : "green"
                        }}
                      >
                        {order.Status === "pending"
                          ? <Text
                            style={{
                              fontWeight: "bold",
                              color: "red",
                              fontSize: 10
                            }}
                          >
                            PENDING
                                    </Text>
                          : order.Status === "process"
                            ? <Text
                              style={{
                                fontWeight: "bold",
                                color: "blue",
                                fontSize: 10
                              }}
                            >
                              PROCESSING
                                      </Text>
                            : <Text
                              style={{
                                fontWeight: "bold",
                                color: "green",
                                fontSize: 10
                              }}
                            >
                              COMPLETE
                                      </Text>}
                      </View>
                    </View>
                    <View style={styles.lowerLayout}>
                      <Ionicons
                        name="location"
                        size={20}
                        color="#966a4a"
                      />
                      <Text style={{ color: "#966a4a" }}>Abc zyx</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              : null;
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
    // </SafeAreaView>
  );
};

const PendingRoute = props => {
  const { navigation } = props;
  const AuthReducer = useSelector(state => state.AuthReducer);
  const OrderHistoryReducer = useSelector(state => state.OrderHistoryReducer);
  const dispatch = useDispatch();
  const VendorReducer = useSelector(state => state.VendorReducer);
  useEffect(() => {
    dispatch(getAllVendors());
  }, []);

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(getAllOrders(AuthReducer.email));
    });
  }, []);

  const onItemClick = item => {
    navigation.navigate("OrderView", {
      order: item
    });
  };

  return (
    <ScrollView style={{ flex: 1 }} alwaysBounceVertical={false}>
      <View>
        {OrderHistoryReducer.loading &&
          <View style={styles.loadingLayout}>
            <ActivityIndicator size="large" color="#364F2A" />
          </View>}

        {OrderHistoryReducer.ordersList !== undefined &&
          OrderHistoryReducer.ordersList
            .filter(orders => orders.Status === "pending")
            .map((order, pos) => {
              return (
                <TouchableOpacity
                  onPress={() => onItemClick(order)}
                  key={pos}
                >
                  <View style={styles.orLayout}>
                    <View style={styles.orItemBack}>
                      <Text style={styles.orItem}>
                        {VendorReducer.vendorList &&
                          VendorReducer.vendorList.find(
                            Vendor => Vendor.Email === order.VendorId
                          ).Name[0]}
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
                          {VendorReducer.vendorList &&
                            VendorReducer.vendorList.find(
                              Vendor => Vendor.Email === order.VendorId
                            ).Name}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: "#966A4A",
                            flex: 3,
                            fontSize: 10
                          }}
                        >
                          <Icon name="crosshairs-gps" />
                            21.55 Kms
                          </Text>
                      </View>
                      <View style={styles.lowerLayout}>
                        <Ionicons name="location" size={20} color="#966a4a" />
                        <Text style={{ color: "#966a4a" }}>Abc zyx</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

        {OrderHistoryReducer.ordersList !== undefined &&
          OrderHistoryReducer.ordersList.filter(
            orders => orders.Status === "pending"
          ).length === 0 &&
          <View style={styles.orLayout}>
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
      </View>
    </ScrollView>
  );
};

const ProcessRoute = props => {
  const { navigation } = props;
  const AuthReducer = useSelector(state => state.AuthReducer);
  const OrderHistoryReducer = useSelector(state => state.OrderHistoryReducer);
  const dispatch = useDispatch();
  const VendorReducer = useSelector(state => state.VendorReducer);
  useEffect(() => {
    dispatch(getAllVendors());
  }, []);

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(getAllOrders(AuthReducer.email));
    });
  }, []);

  const onItemClick = item => {
    navigation.navigate("OrderView", {
      order: item
    });
  };

  return (
    <ScrollView style={{ flex: 1 }} alwaysBounceVertical={false}>
      <View>
        {OrderHistoryReducer.loading &&
          <View style={styles.loadingLayout}>
            <ActivityIndicator size="large" color="#364F2A" />
          </View>}

        {OrderHistoryReducer.ordersList !== undefined &&
          OrderHistoryReducer.ordersList
            .filter(orders => orders.Status === "process")
            .map((order, pos) => {
              return (
                <TouchableOpacity
                  onPress={() => onItemClick(order)}
                  key={pos}
                >
                  <View style={styles.orLayout}>
                    <View style={styles.orItemBack}>
                      <Text style={styles.orItem}>
                        {VendorReducer.vendorList &&
                          VendorReducer.vendorList.find(
                            Vendor => Vendor.Email === order.VendorId
                          ).Name[0]}
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
                          {VendorReducer.vendorList &&
                            VendorReducer.vendorList.find(
                              Vendor => Vendor.Email === order.VendorId
                            ).Name}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: "#966A4A",
                            flex: 3,
                            fontSize: 10
                          }}
                        >
                          <Icon name="crosshairs-gps" />
                            21.55 Kms
                          </Text>
                      </View>
                      <View style={styles.lowerLayout}>
                        <Ionicons name="location" size={20} color="#966a4a" />
                        <Text style={{ color: "#966a4a" }}>Abc zyx</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

        {OrderHistoryReducer.ordersList !== undefined &&
          OrderHistoryReducer.ordersList.filter(
            orders => orders.Status === "process"
          ).length === 0 &&
          <View style={styles.orLayout}>
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
      </View>
    </ScrollView>
  );
};

const CompleteRoute = props => {
  const { navigation } = props;
  const AuthReducer = useSelector(state => state.AuthReducer);
  const OrderHistoryReducer = useSelector(state => state.OrderHistoryReducer);
  const dispatch = useDispatch();
  const VendorReducer = useSelector(state => state.VendorReducer);
  useEffect(() => {
    dispatch(getAllVendors());
  }, []);

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(getAllOrders(AuthReducer.email));
    });
  }, []);

  const onItemClick = item => {
    navigation.navigate("OrderView", {
      order: item
    });
  };

  return (
    <ScrollView style={{ flex: 1, marginTop: 10 }} alwaysBounceVertical={false}>
      <View>
        {OrderHistoryReducer.loading &&
          <View style={styles.loadingLayout}>
            <ActivityIndicator size="large" color="#364F2A" />
          </View>}

        {OrderHistoryReducer.ordersList !== undefined &&
          OrderHistoryReducer.ordersList
            .filter(orders => orders.Status === "complete")
            .map((order, pos) => {
              return (
                <TouchableOpacity
                  onPress={() => onItemClick(order)}
                  key={pos}
                >
                  <View style={styles.orLayout}>
                    <View style={styles.orItemBack}>
                      <Text style={styles.orItem}>
                        {VendorReducer.vendorList &&
                          VendorReducer.vendorList.find(
                            Vendor => Vendor.Email === order.VendorId
                          ).Name[0]}
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
                          {VendorReducer.vendorList &&
                            VendorReducer.vendorList.find(
                              Vendor => Vendor.Email === order.VendorId
                            ).Name}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: "#966A4A",
                            flex: 3,
                            fontSize: 10
                          }}
                        >
                          <Icon name="crosshairs-gps" />
                            21.55 Kms
                          </Text>
                      </View>
                      <View style={styles.lowerLayout}>
                        <Ionicons name="location" size={20} color="#966a4a" />
                        <Text style={{ color: "#966a4a" }}>Abc zyx</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

        {OrderHistoryReducer.ordersList !== undefined &&
          OrderHistoryReducer.ordersList.filter(
            orders => orders.Status === "complete"
          ).length === 0 &&
          <View style={styles.orLayout}>
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
      </View>
    </ScrollView>
  );
};

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === "All") {
            icon = <FIcon name="bars" color={color} size={size} />;
          } else if (route.name === "Pending") {
            icon = (
              <Icon name="clock-time-three-outline" color={color} size={size} />
            );
          } else if (route.name === "Process") {
            icon = (
              <Icon
                name="format-list-bulleted-square"
                color={color}
                size={size}
              />
            );
          } else if (route.name === "Complete") {
            icon = <Icon name="playlist-check" color={color} size={size} />;
          }

          // You can return any component that you like here!
          return icon;
        }
      })}
      tabBarOptions={{
        activeTintColor: "#966A4A",
        inactiveTintColor: "gray"
      }}
    >
      <Tab.Screen name="All" component={AllRoute} />
      <Tab.Screen name="Pending" component={PendingRoute} />
      <Tab.Screen name="Process" component={ProcessRoute} />
      <Tab.Screen name="Complete" component={CompleteRoute} />
    </Tab.Navigator>
  );
};

const OrderHistoryScreen = props => {
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      title: "Order History",
      headerStyle: {
        backgroundColor: "#364F2A"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    });
  }, []);
  return <MyTabs />;
};

export default OrderHistoryScreen;
