import React, { useState, useEffect } from "react";
import { View, Image, Text, TextInput } from "react-native";
import styles from "./StockStyle";
import { useSelector, useDispatch } from "react-redux";
import { vendorProfileUpdate } from "../../store/action/authAction";
import TextInputMask from "react-native-text-input-mask";
import {
  getVendorStock,
  updateVendorStock
} from "../../store/action/vendorsAction";
import { TouchableOpacity } from "react-native-gesture-handler";

const StockScreen = props => {
  const { navigation } = props;

  const [editProfile, setEditProfile] = useState(true);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const VendorReducer = useSelector(state => state.VendorReducer);
  const [lamb, setLamb] = useState(
    VendorReducer.stock[0].Lamb && VendorReducer.stock[0].Lamb
  );
  const [lambCost, setLambCost] = useState(
    VendorReducer.stock[0].LambCost && VendorReducer.stock[0].LambCost
  );
  const [goat, setGoat] = useState(
    VendorReducer.stock[0].Goat && VendorReducer.stock[0].Goat
  );
  const [goatCost, setGoatCost] = useState(
    VendorReducer.stock[0].GoatCost && VendorReducer.stock[0].GoatCost
  );
  const [cow, setCow] = useState(
    VendorReducer.stock[0].Cow && VendorReducer.stock[0].Cow
  );
  const [cowCost, setCowCost] = useState(
    VendorReducer.stock[0].CowCost && VendorReducer.stock[0].CowCost
  );
  const [cowShares, setCowShares] = useState(
    VendorReducer.stock[0].CowShare && VendorReducer.stock[0].CowShare
  );
  const [cowSharesCost, setCowSharesCost] = useState(
    VendorReducer.stock[0].CowShareCost && VendorReducer.stock[0].CowShareCost
  );

  const [editStock, setEditStock] = useState(false);
  const dispatch = useDispatch();

  const onEditClick = () => {
    setEditStock(true);
  };

  const onSaveClick = () => {
    const data = {
      lamb: lamb,
      lCost: lambCost,
      goat: goat,
      gCost: goatCost,
      cow: cow,
      cCost: cowCost,
      cowShare: cowShares,
      csCost: cowSharesCost
    };
    dispatch(updateVendorStock(AuthReducer.email, data));
    setEditStock(false);
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Stocks",
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

      <View style={[styles.orLayout, { margin: 5}]}>
        <Text
          style={[styles.txtLabel, { textAlign: "center", color: "#966A4A", flex: 1 }]}
        >
          Stock Type: {AuthReducer.StockType}
        </Text>
      </View>

      {AuthReducer.StockType === "Count"
        ? <View style={{ width: "100%" }}>
          <View style={{ marginVertical: 5 }}>
            <View style={styles.orLayout}>
              <Text style={styles.txtLabel}>Lamb</Text>
              <Text style={styles.txtLabel}>Lamb's Cost</Text>
            </View>
            <View style={styles.orLayout}>
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="000"
                value={lamb}
                onChangeText={l => setLamb(l)}
                editable={editStock}
                mask={"[999]"}
              />
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="000.00"
                value={lambCost}
                editable={editStock}
                onChangeText={lc => setLambCost(lc)}
                mask={"[999]"}
              />
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <View style={styles.orLayout}>
              <Text style={styles.txtLabel}>Goat</Text>
              <Text style={styles.txtLabel}>Goat's Cost</Text>
            </View>
            <View style={styles.orLayout}>
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="000"
                value={goat}
                editable={editStock}
                onChangeText={g => setGoat(g)}
                mask={"[999]"}
              />
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="000"
                value={goatCost}
                editable={editStock}
                onChangeText={gc => setGoatCost(gc)}
                mask={"[999]"}
              />
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <View style={styles.orLayout}>
              <Text style={styles.txtLabel}>Cow</Text>
              <Text style={styles.txtLabel}>Cow's Cost</Text>
            </View>
            <View style={styles.orLayout}>
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="000"
                value={cow}
                editable={editStock}
                onChangeText={c => setCow(c)}
                mask={"[999]"}
              />
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="000"
                value={cowCost}
                editable={editStock}
                onChangeText={cc => setCowCost(cc)}
                mask={"[999]"}
              />
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <View style={styles.orLayout}>
              <Text style={styles.txtLabel}>Cow Shares</Text>
              <Text style={styles.txtLabel}>Cow Shares's Cost</Text>
            </View>
            <View style={styles.orLayout}>
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="000"
                value={cowShares}
                editable={editStock}
                onChangeText={cs => setCowShares(cs)}
                mask={"[999]"}
              />
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="000"
                value={cowSharesCost}
                editable={editStock}
                onChangeText={csc => setCowSharesCost(csc)}
                mask={"[999]"}
              />
            </View>
          </View>
        </View>
        : <View style={{ width: "100%" }}>
          <View style={{ marginVertical: 5 }}>
            <View style={styles.orLayout}>
              <Text style={styles.txtLabel}>Lamb</Text>
              <Text style={styles.txtLabel}>Lamb's Cost</Text>
            </View>
            <View style={styles.orLayout}>
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="000.00"
                value={lamb}
                editable={editStock}
                onChangeText={l => setLamb(l)}
                mask={"[999].[99]"}
              />
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="000.00"
                value={lambCost}
                editable={editStock}
                onChangeText={lc => setLambCost(lc)}
                mask={"[999].[99]"}
              />
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <View style={styles.orLayout}>
              <Text style={styles.txtLabel}>Goat</Text>
              <Text style={styles.txtLabel}>Goat's Cost</Text>
            </View>
            <View style={styles.orLayout}>
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="000.00"
                value={goat}
                editable={editStock}
                onChangeText={g => setGoat(g)}
                mask={"[999].[99]"}
              />
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="000.00"
                value={goatCost}
                editable={editStock}
                onChangeText={gc => setGoatCost(gc)}
                mask={"[999].[99]"}
              />
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <View style={styles.orLayout}>
              <Text style={styles.txtLabel}>Cow</Text>
              <Text style={styles.txtLabel}>Cow's Cost</Text>
            </View>
            <View style={styles.orLayout}>
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="000.00"
                value={cow}
                editable={editStock}
                onChangeText={c => setCow(c)}
                mask={"[999].[99]"}
              />
              <TextInputMask
                style={styles.inputBox}
                keyboardType="number-pad"
                placeholder="000.00"
                value={cowCost}
                editable={editStock}
                onChangeText={cc => setCowCost(cc)}
                mask={"[999].[99]"}
              />
            </View>
          </View>
        </View>}

      <View style={styles.btnLayout}>
        {editStock === false
          ? <View style={styles.btnHorizontalLine}>
            <TouchableOpacity onPress={onEditClick} style={styles.buttonSignIn}>
              <Text style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 15, fontWeight: "bold"
              }}>EDIT</Text>
            </TouchableOpacity>
          </View>
          : <View style={styles.btnHorizontalLine}>
            <TouchableOpacity onPress={onSaveClick} style={styles.buttonSignIn}>
              <Text style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 15, fontWeight: "bold"
              }}>SAVE</Text>
            </TouchableOpacity>
          </View>}
      </View>
    </View>
  );
};

export default StockScreen;
