import React, { useState, useEffect } from "react";
import { View, Image, Text, TextInput } from "react-native";
import styles from "./OrderViewStyle";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { updateOrderStatus } from "../../store/action/orderHistoryAction";

const OrderViewScreen = props => {
  const { navigation, route } = props;
  const orderDetails = route.params.order;
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      title: "Order View",
      headerStyle: {
        backgroundColor: "#364F2A"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    });
  }, []);

  const AuthReducer = useSelector(state => state.AuthReducer);

  return (
    <View style={styles.container}>
      <Text
        style={{
          backgroundColor: "#F2F5F9",
          textAlign: "center",
          padding: 10,
          fontWeight: "bold",
          color: "#364F2A",
          alignItems: "baseline",
          width: "100%",
          zIndex: 5
        }}
      >
        {orderDetails.UserID}
      </Text>

      <View
        style={{
          width: "100%",
          padding: 15
        }}
      >
        <View style={styles.cardView}>
          <Text
            style={{
              textAlign: "center",
              padding: 15,
              fontWeight: "bold",
              color: "#364F2A",
              width: "100%"
            }}
          >
            Order Details
          </Text>

          <View style={styles.orLayout}>
            <Text style={styles.label}>Ordered Date</Text>
            <Text style={styles.value}>
              {orderDetails.OrderDate.toDate().toString().substr(0, 15)}
            </Text>
          </View>

          <View style={styles.orLayout}>
            <Text style={[styles.label, { color: "#364F2A" }]}>
              Ordered Items
            </Text>
          </View>

          {parseFloat(orderDetails.Lamb) !== 0 &&
            <View style={styles.orLayout}>
              <Text style={styles.label}>Lamb</Text>
              <Text style={styles.value}>
                {orderDetails.Lamb} {AuthReducer.StockType}
              </Text>
            </View>}

          {parseFloat(orderDetails.Goat) !== 0 &&
            <View style={styles.orLayout}>
              <Text style={styles.label}>Goat</Text>
              <Text style={styles.value}>
                {orderDetails.Goat} {AuthReducer.StockType}
              </Text>
            </View>}

          {parseFloat(orderDetails.Cow) !== 0 &&
            <View style={styles.orLayout}>
              <Text style={styles.label}>Cow</Text>
              <Text style={styles.value}>
                {orderDetails.Cow} {AuthReducer.StockType}
              </Text>
            </View>}

          {parseFloat(orderDetails.CowShare) !== 0 &&
            <View style={styles.orLayout}>
              <Text style={styles.label}>Cow Shares</Text>
              <Text style={styles.value}>
                {orderDetails.CowShare} {AuthReducer.StockType}
              </Text>
            </View>}

          <View style={styles.orLayout}>
            <Text style={styles.label}>Total Cost</Text>
            <Text style={styles.value}>
              {orderDetails.Total}
            </Text>
          </View>

          <View style={styles.orLayout}>
            <Text style={styles.label}>Order Status</Text>
            <Text style={styles.value}>
              {orderDetails.Status === "complete"
                ? "COMPLETE"
                : orderDetails.Status === "process" ? "IN-PROCESS" : "PENDING"}
            </Text>
          </View>

          {/* {orderDetails.Status === "pending"
            ? <TouchableOpacity onPress={onChangeStatus}>
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: "blue",
                    backgroundColor: "#EBF5FB",
                    padding: 5
                  }}
                >
                  <Text
                    style={[
                      styles.value,
                      { color: "blue", textAlign: "center" }
                    ]}
                  >
                    Change status to PROCESS
                  </Text>
                </View>
              </TouchableOpacity>
            : orderDetails.Status === "process"
              ? <TouchableOpacity onPress={onChangeStatus}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 5,
                      borderColor: "green",
                      backgroundColor: "#EAFAF1",
                      padding: 5
                    }}
                  >
                    <Text
                      style={[
                        styles.value,
                        { color: "green", textAlign: "center" }
                      ]}
                    >
                      Change status to COMPLETE
                    </Text>
                  </View>
                </TouchableOpacity>
              : null} */}
        </View>
      </View>
    </View>
  );
};

export default OrderViewScreen;
