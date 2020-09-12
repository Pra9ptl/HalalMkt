import React, { useEffect, useCallback } from "react";
import { Text, View, Alert } from "react-native";
import styles from "./ConfirmOrderStyle";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { placeOrder } from "../../store/action/vendorsAction";
import RNPaypal from 'react-native-paypal-lib';

const ConfirmOrderScreen = props => {
  const { navigation, route } = props;
  const pos = route.params.position;
  const lambQty = route.params.lamb;
  const goatQty = route.params.goat;
  const cowQty = route.params.cow;
  const cowShareQty = route.params.cowShares;
  const VendorReducer = useSelector(state => state.VendorReducer);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: "Confirm Order",
      headerStyle: {
        backgroundColor: "#364F2A"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    });
  }, []);

  const lCost =
    parseFloat(lambQty) * parseFloat(VendorReducer.stock[0].LambCost);
  const gCost =
    parseFloat(goatQty) * parseFloat(VendorReducer.stock[0].GoatCost);
  const cCost = parseFloat(cowQty) * parseFloat(VendorReducer.stock[0].CowCost);
  const csCost =
    parseFloat(cowShareQty) * parseFloat(VendorReducer.stock[0].CowShareCost);
  const totCost = lCost + gCost + cCost + csCost;

  const paypal = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure, you want to place the order?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {

            RNPaypal.paymentRequest({
              clientId: VendorReducer.vendorList[pos].PaypalClientId,
              environment: RNPaypal.ENVIRONMENT.SANDBOX,
              intent: RNPaypal.INTENT.SALE,
              price: parseFloat(totCost.toString()),
              currency: 'USD',
              description: `Android testing`,
              acceptCreditCards: true
            }).then(confirm => {
              if (confirm.response.state) {
                const pOrder = {
                  Cow: cowQty,
                  CowShare: cowShareQty,
                  Goat: goatQty,
                  Lamb: lambQty,
                  OrderDate: new Date(),
                  Status: "pending",
                  Total: totCost,
                  UserID: AuthReducer.email,
                  VendorId: VendorReducer.vendorList[pos].Email
                };
                dispatch(
                  placeOrder(pOrder, response => {
                    Alert.alert(
                      "Success",
                      "Your order was placed successfully!",
                      [
                        {
                          text: "OK",
                          onPress: () => {
                            navigation.dispatch(
                              StackActions.replace("UserHome")
                            );
                          }
                        }
                      ],
                      { cancelable: false }
                    );
                  })
                );
              }
            }).catch(err => {
              Alert.alert("Error!", err.message)
            })
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#F2F5F9",
          padding: 15,
          fontWeight: "bold",
          color: "#364F2A",
          alignItems: "center",
          zIndex: 5,
          flexDirection: "column",
          width: "100%"
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "#364F2A",
            margin: 5,
            width: "100%"
          }}
        >
          Store - {VendorReducer.vendorList[pos].StoreName}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#364F2A",
            margin: 5,
            width: "100%"
          }}
        >
          Address - {VendorReducer.vendorList[pos].Address}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#364F2A",
            margin: 5,
            width: "100%"
          }}
        >
          Phone - {VendorReducer.vendorList[pos].PhoneNumber}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#364F2A",
            margin: 5,
            width: "100%"
          }}
        >
          Email - {VendorReducer.vendorList[pos].Email}
        </Text>
      </View>

      <View style={styles.profileCard}>
        <View style={[styles.orTitle, { fontWeight: "bold" }]}>
          <Text style={[styles.title, { flex: 4, textAlign: "left" }]}>
            Product
          </Text>
          <Text style={[styles.title, { flex: 3 }]}>Qty</Text>
          <Text style={[styles.title, { flex: 3 }]}>Price</Text>
          <Text style={[styles.title, { flex: 3 }]}>Cost</Text>
        </View>
        <View style={styles.orLayout}>
          <Text style={styles.label}>Lamb</Text>
          <Text style={styles.value}>
            {lambQty}
          </Text>
          <Text style={styles.value}>
            {VendorReducer.stock[0].LambCost}
          </Text>
          <Text style={styles.value}>
            {lCost}
          </Text>
        </View>

        <View style={styles.orLayout}>
          <Text style={styles.label}>Goat</Text>
          <Text style={styles.value}>
            {goatQty}
          </Text>
          <Text style={styles.value}>
            {VendorReducer.stock[0].GoatCost}
          </Text>
          <Text style={styles.value}>
            {gCost}
          </Text>
        </View>

        <View style={styles.orLayout}>
          <Text style={styles.label}>Cow</Text>
          <Text style={styles.value}>
            {cowQty}
          </Text>
          <Text style={styles.value}>
            {VendorReducer.stock[0].CowCost}
          </Text>
          <Text style={styles.value}>
            {cCost}
          </Text>
        </View>

        <View style={styles.orLayout}>
          <Text style={styles.label}>Cow Shares</Text>
          <Text style={styles.value}>
            {cowShareQty}
          </Text>
          <Text style={styles.value}>
            {VendorReducer.stock[0].CowShareCost}
          </Text>
          <Text style={styles.value}>
            {csCost}
          </Text>
        </View>

        <View style={[styles.orTitle, { fontWeight: "bold" }]}>
          <Text style={[styles.title, { flex: 7, textAlign: "right" }]}>
            Total Cost
          </Text>
          <Text style={[styles.title, { flex: 3 }]}>
            {totCost}
          </Text>
        </View>
      </View>

      {VendorReducer.loading
        ? <Text>Loading</Text>
        : <TouchableOpacity
          onPress={paypal}
          style={{
            flexDirection: "row",
            width: "100%",
            padding: 20
          }}
        >
          <View style={styles.btnPaypal}>
            <Text
              style={{ marginTop: 5, color: "#003087", fontWeight: "bold" }}
            >
              <Icon name="paypal" color="#003087" size={15} /> Pay with PayPal
              </Text>
          </View>
        </TouchableOpacity>}
    </View>
  );
};

export default ConfirmOrderScreen;
