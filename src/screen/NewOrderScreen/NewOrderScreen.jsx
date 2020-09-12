import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import TextInputMask from "react-native-text-input-mask";
import styles from "./NewOrderStyle";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getVendorStock } from "../../store/action/vendorsAction";

const NewOrderScreen = props => {
  const { navigation, route } = props;
  const pos = route.params.position;

  useEffect(() => {
    navigation.setOptions({
      title: "New Order",
      headerStyle: {
        backgroundColor: "#364F2A"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    });
  }, []);

  const dispatch = useDispatch();
  const VendorReducer = useSelector(state => state.VendorReducer);

  const vEmail = VendorReducer.vendorList[pos].Email;

  useEffect(
    () => {
      dispatch(getVendorStock(vEmail));
    },
    [vEmail]
  );

  const [lambQty, setLambQty] = useState("0");
  const [goatQty, setGoatQty] = useState("0");
  const [cowQty, setCowQty] = useState("0");
  const [cowSharesQty, setCowSharesQty] = useState("0");

  const onAddLamb = () => {
    if (parseInt(lambQty) < parseInt(VendorReducer.stock[0].Lamb)) {
      setLambQty((parseInt(lambQty) + 1).toString());
    }
  };

  const onMinusLamb = () => {
    if (lambQty !== "0") {
      setLambQty((parseInt(lambQty) - 1).toString());
    }
  };

  const onAddGoat = () => {
    if (parseInt(goatQty) < parseInt(VendorReducer.stock[0].Goat)) {
      setGoatQty((parseInt(goatQty) + 1).toString());
    }
  };

  const onMinusGoat = () => {
    if (goatQty !== "0") {
      setGoatQty((parseInt(goatQty) - 1).toString());
    }
  };

  const onAddCow = () => {
    if (parseInt(cowQty) < parseInt(VendorReducer.stock[0].Cow)) {
      setCowQty((parseInt(cowQty) + 1).toString());
    }
  };

  const onMinusCow = () => {
    if (cowQty !== "0") {
      setCowQty((parseInt(cowQty) - 1).toString());
    }
  };

  const onAddCowShares = () => {
    if (parseInt(cowSharesQty) < parseInt(VendorReducer.stock[0].CowShare)) {
      setCowSharesQty((parseInt(cowSharesQty) + 1).toString());
    }
  };

  const onMinusCowShares = () => {
    if (cowSharesQty !== "0") {
      setCowSharesQty((parseInt(cowSharesQty) - 1).toString());
    }
  };

  const onBtnSaveClicked = () => {
    if (
      parseInt(lambQty) > parseInt(VendorReducer.stock[0].Lamb) ||
      parseInt(goatQty) > parseInt(VendorReducer.stock[0].Goat) ||
      parseInt(cowQty) > parseInt(VendorReducer.stock[0].Cow) ||
      parseInt(cowSharesQty) > parseInt(VendorReducer.stock[0].CowShare)
    ) {
      Alert.alert("Invalid Input", "Stock not available!");
    } else if (
      parseInt(lambQty) === 0 &&
      parseInt(goatQty) === 0 &&
      parseInt(cowQty) === 0 &&
      parseInt(cowSharesQty) === 0
    ) {
      Alert.alert("Invalid Input", "Input cannot be empty!");
    } else {
      navigation.navigate("ConfirmOrder", {
        lamb: lambQty,
        goat: goatQty,
        cow: cowQty,
        cowShares: cowSharesQty,
        position: pos
      });
    }
  };

  const onBtnCancelClicked = () => {
    setLambQty("0");
    setGoatQty("0");
    setCowQty("0");
    setCowSharesQty("0");
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          backgroundColor: "#F2F5F9",
          textAlign: "center",
          padding: 15,
          fontWeight: "bold",
          color: "#364F2A",
          alignItems: "baseline",
          width: "100%",
          zIndex: 5
        }}
      >
        Ordering from - {VendorReducer.vendorList[pos].StoreName}
      </Text>
      {VendorReducer.vendorList[pos].StockType === "Count"
        ? <View style={{ marginVertical: 60 }}>
            <Text style={styles.txtLabel}>Lamb</Text>
            <Text style={styles.txtLabelDesc}>
              Cost: ${VendorReducer.stock[0] !== undefined
                ? VendorReducer.stock[0].LambCost
                : ""}{" "}
              / Available Stock:{" "}
              {VendorReducer.stock[0] !== undefined
                ? VendorReducer.stock[0].Lamb
                : ""}
            </Text>
            <View style={styles.txtLayout}>
              <TextInput
                style={styles.inputBox}
                keyboardType="number-pad"
                value={lambQty}
                editable={false}
              />
              <TouchableOpacity onPress={onAddLamb}>
                <Text style={styles.txtIcon}>
                  <Icon name="pluscircleo" size={25} color="#364F2A" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onMinusLamb}>
                <Text style={styles.txtIcon}>
                  <Icon name="minuscircleo" size={25} color="#364F2A" />
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.txtLabel}>Goat</Text>
            <Text style={styles.txtLabelDesc}>
              Cost: ${VendorReducer.stock[0] !== undefined
                ? VendorReducer.stock[0].GoatCost
                : ""}{" "}
              / Available Stock:{" "}
              {VendorReducer.stock[0] !== undefined
                ? VendorReducer.stock[0].Goat
                : ""}
            </Text>
            <View style={styles.txtLayout}>
              <TextInput
                style={styles.inputBox}
                keyboardType="number-pad"
                value={goatQty}
                editable={false}
              />
              <TouchableOpacity onPress={onAddGoat}>
                <Text style={styles.txtIcon}>
                  <Icon name="pluscircleo" size={25} color="#364F2A" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onMinusGoat}>
                <Text style={styles.txtIcon}>
                  <Icon name="minuscircleo" size={25} color="#364F2A" />
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.txtLabel}>Cow</Text>
            <Text style={styles.txtLabelDesc}>
              Cost: ${VendorReducer.stock[0] !== undefined
                ? VendorReducer.stock[0].CowCost
                : ""}{" "}
              / Available Stock:{" "}
              {VendorReducer.stock[0] !== undefined
                ? VendorReducer.stock[0].Cow
                : ""}
            </Text>
            <View style={styles.txtLayout}>
              <TextInput
                style={styles.inputBox}
                keyboardType="number-pad"
                value={cowQty}
                editable={false}
              />
              <TouchableOpacity onPress={onAddCow}>
                <Text style={styles.txtIcon}>
                  <Icon name="pluscircleo" size={25} color="#364F2A" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onMinusCow}>
                <Text style={styles.txtIcon}>
                  <Icon name="minuscircleo" size={25} color="#364F2A" />
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.txtLabel}>Cow Shares</Text>
            <Text style={styles.txtLabelDesc}>
              Cost: ${VendorReducer.stock[0] !== undefined
                ? VendorReducer.stock[0].CowShareCost
                : ""}{" "}
              / Available Stock:{" "}
              {VendorReducer.stock[0] !== undefined
                ? VendorReducer.stock[0].CowShare
                : ""}
            </Text>
            <View style={styles.txtLayout}>
              <TextInput
                style={styles.inputBox}
                keyboardType="number-pad"
                value={cowSharesQty}
                editable={false}
              />
              <TouchableOpacity onPress={onAddCowShares}>
                <Text style={styles.txtIcon}>
                  <Icon name="pluscircleo" size={25} color="#364F2A" />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onMinusCowShares}>
                <Text style={styles.txtIcon}>
                  <Icon name="minuscircleo" size={25} color="#364F2A" />
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btnLayout}>
              <View style={styles.btnHorizontalLine}>
                <TouchableOpacity onPress={onBtnSaveClicked} style={styles.buttonSave}>
                  <Text
                    style={{ color: "#fff",
                    fontSize: 15,
                    fontWeight: "bold",
                  textAlign:"center"}}
                  >
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.btnHorizontalLine}>
                <TouchableOpacity onPress={onBtnCancelClicked} style={styles.buttonSave}>
                  <Text
                    style={{color: "#fff",
                    fontSize: 15,
                    fontWeight: "bold",
                  textAlign:"center"}}
                  >
                    CANCEL
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        : <View style={{ marginVertical: 60 }}>
            <Text style={styles.txtLabel}>Lamb</Text>
            <Text style={styles.txtLabelDesc}>
              Cost: ${VendorReducer.stock[0] !== undefined
                ? VendorReducer.stock[0].LambCost
                : ""}{" "}
              / Available Stock:{" "}
              {VendorReducer.stock[0] !== undefined
                ? VendorReducer.stock[0].Lamb
                : ""}
            </Text>
            <View style={styles.txtLayout}>
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="0.00"
                value={lambQty > 0 ? lambQty : ""}
                onChangeText={val => setLambQty(val)}
                mask={"[99].[99]"}
              />
              <Text style={[styles.txtIcon, { color: "#364F2A" }]}>
                {VendorReducer.vendorList[pos].StockType}
              </Text>
            </View>

            <Text style={styles.txtLabel}>Goat</Text>
            <Text style={styles.txtLabelDesc}>
              Cost: ${VendorReducer.stock[0] !== undefined
                ? VendorReducer.stock[0].GoatCost
                : ""}{" "}
              / Available Stock:{" "}
              {VendorReducer.stock[0] !== undefined
                ? VendorReducer.stock[0].Goat
                : ""}
            </Text>
            <View style={styles.txtLayout}>
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="0.00"
                value={goatQty > 0 ? goatQty : ""}
                onChangeText={val => setGoatQty(val)}
                mask={"[999].[99]"}
              />
              <Text style={[styles.txtIcon, { color: "#364F2A" }]}>
                {VendorReducer.vendorList[pos].StockType}
              </Text>
            </View>

            <Text style={styles.txtLabel}>Cow</Text>
            <Text style={styles.txtLabelDesc}>
              Cost: ${VendorReducer.stock[0] !== undefined
                ? VendorReducer.stock[0].CowCost
                : ""}{" "}
              / Available Stock:{" "}
              {VendorReducer.stock[0] !== undefined
                ? VendorReducer.stock[0].Cow
                : ""}
            </Text>
            <View style={styles.txtLayout}>
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="0.00"
                value={cowQty > 0 ? cowQty : ""}
                onChangeText={val => setCowQty(val)}
                mask={"[999].[99]"}
              />
              <Text style={[styles.txtIcon, { color: "#364F2A" }]}>
                {VendorReducer.vendorList[pos].StockType}
              </Text>
            </View>

            <View style={styles.btnLayout}>

            <View style={styles.btnHorizontalLine}>
                <TouchableOpacity onPress={onBtnSaveClicked} style={styles.buttonSave}>
                  <Text
                    style={{ color: "#fff",
                    fontSize: 15,
                    fontWeight: "bold",
                  textAlign:"center"}}
                  >
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.btnHorizontalLine}>
                <TouchableOpacity onPress={onBtnCancelClicked} style={styles.buttonSave}>
                  <Text
                    style={{color: "#fff",
                    fontSize: 15,
                    fontWeight: "bold",
                  textAlign:"center"}}
                  >
                    CANCEL
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>}
    </View>
  );
};

export default NewOrderScreen;
