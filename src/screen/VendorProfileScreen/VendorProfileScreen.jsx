import React, { useState, useEffect } from "react";
import { View, Image, Text, TextInput } from "react-native";
import styles from "./VendorProfileStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  profileUpdate,
  updateServerPassword
} from "../../store/action/authAction";
import { ActivityIndicator } from "react-native-paper";

const VendorProfileScreen = props => {
  const { navigation } = props;

  const [editProfile, setEditProfile] = useState(true);
  const [updatePassword, setUpdatePassword] = useState(false);
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [name, setName] = useState(AuthReducer.name);
  const [phone, setPhone] = useState(AuthReducer.phone);
  const [storeNm, setStoreNm] = useState(AuthReducer.storeName);
  const email = AuthReducer.email;
  const [address, setAddress] = useState(AuthReducer.address);

  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState(true);
  const [btnDisable, setBtnDisable] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: "Profile",
      headerStyle: {
        backgroundColor: "#364F2A"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    });
  }, []);

  const onEdit = () => {
    setEditProfile(!editProfile);
  };

  const onPasswordChange = () => {
    // dispatch(updatePassword("newPassword"));
    setEditProfile(true);
    setUpdatePassword(true);
  };

  const onPasswordClick = () => {

    if (validatePassword && password !== "") {
      dispatch(
        updateServerPassword(password, AuthReducer.userType, callback => {
          setPassword("");
          setEditProfile(true);
          setUpdatePassword(false);
        })
      );
    } else {
      setValidatePassword(false);
    }
  };

  const onSave = () => {
    dispatch(profileUpdate(AuthReducer.email, name, phone, address));
    setEditProfile(!editProfile);
  };

  const checkPassword = p => {
    //Password Validation
    if (p.length >= 6 && p !== "") {
      setValidatePassword(true);
    } else {
      setValidatePassword(false);
    }
    setPassword(p);
  };

  return (
    <View style={styles.container}>
      {Boolean(!editProfile) &&
        <Text
          style={{
            backgroundColor: "#F2F5F9",
            textAlign: "center",
            padding: 15,
            fontSize: 15,
            fontWeight: "bold",
            color: "#364F2A",
            alignItems: "baseline",
            width: "100%",
            position: "absolute",
            top: 0,
            zIndex: 5
          }}
        >
          {AuthReducer.email}
        </Text>}
      <View style={styles.lLogoLayout}>
        <Image
          style={styles.lLogo}
          source={require("../../assets/lettermarkLogo.png")}
        />
      </View>

      {updatePassword === false &&
        editProfile === true &&
        <View style={{ width: "75%" }}>
          <View style={styles.profileCard}>
            <Text
              style={{
                backgroundColor: "#F2F5F9",
                textAlign: "center",
                padding: 10,
                fontWeight: "bold",
                color: "#364F2A",
                alignItems: "baseline"
              }}
            >
              {storeNm}
            </Text>
            <View style={styles.orLayout}>
              <Text style={styles.label}>Owner's Name</Text>
              <Text style={styles.value}>
                {name}
              </Text>
            </View>

            <View style={styles.orLayout}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>
                {email}
              </Text>
            </View>

            <View style={styles.orLayout}>
              <Text style={styles.label}>Mobile No.</Text>
              <Text style={styles.value}>
                {phone}
              </Text>
            </View>

            <View style={styles.orLayout}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>
                {address}
              </Text>
            </View>
          </View>

          <View style={styles.btnLayout}>
            <View style={styles.btnHorizontalLine}>
              <TouchableOpacity onPress={onEdit} style={styles.buttonSignIn}>
                <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 15, }}>EDIT</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.btnLayout}>
            <View style={styles.btnHorizontalLine}>
              <TouchableOpacity onPress={onPasswordChange} style={styles.buttonSignIn}>
                <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 15, }}>UPDATE PASSWORD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>}

      {updatePassword === false &&
        editProfile === false &&
        <View style={{ width: "75%" }}>
          <Text style={styles.txtLabel}>Name</Text>
          <View style={styles.txtLayout}>
            <TextInput
              style={styles.inputBox}
              placeholder="Name"
              placeholderTextColor="#364F2A9C"
              onChangeText={nm => setName(nm)}
              value={name}
            />
            <Text style={styles.txtIcon}>
              <Icon name="smile-o" size={25} color="#364F2A" />
            </Text>
          </View>

          <Text style={styles.txtLabel}>Store Name</Text>
          <View style={styles.txtLayout}>
            <TextInput
              style={styles.inputBox}
              placeholder="Store Name"
              placeholderTextColor="#364F2A9C"
              onChangeText={nm => setStoreNm(nm)}
              value={storeNm}
            />
            <Text style={styles.txtIcon}>
              <AntDesign name="home" size={25} color="#364F2A" />
            </Text>
          </View>

          <Text style={styles.txtLabel}>Phone</Text>
          <View style={styles.txtLayout}>
            <TextInput
              style={styles.inputBox}
              placeholder="Phone"
              placeholderTextColor="#364F2A9C"
              onChangeText={p => setPhone(p)}
              value={phone}
            />
            <Text style={styles.txtIcon}>
              <Icon name="phone" size={25} color="#364F2A" />
            </Text>
          </View>

          <Text style={styles.txtLabel}>Address</Text>
          <View style={[styles.txtLayout, { height: 100 }]}>
            <TextInput
              style={styles.inputBox}
              placeholder="Address"
              multiline
              numberOfLines={4}
              placeholderTextColor="#364F2A9C"
              onChangeText={a => setAddress(a)}
              value={address}
            />
            <Text style={styles.txtIcon}>
              <Ionicons name="location" size={25} color="#364F2A" />
            </Text>
          </View>
          {AuthReducer.loading === true && <ActivityIndicator color="364F2A" />}
          <View style={styles.btnLayout}>
            <View style={styles.btnHorizontalLine}>
              <TouchableOpacity onPress={onSave} style={styles.buttonSignIn}>
                <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 15, }}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>}

      {updatePassword === true &&
        <View style={{ width: "75%" }}>
          <Text style={styles.txtLabel}>New Password</Text>
          <View style={styles.txtLayout}>
            <TextInput
              label="Password"
              placeholder="PASSWORD"
              placeholderTextColor="#364f2a"
              value={password}
              style={styles.inputBox}
              onChangeText={password => checkPassword(password)}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            <Text style={styles.txtIcon}>
              <Icon name="lock" size={25} color="#364F2A" />
            </Text>
          </View>

          {Boolean(!validatePassword) &&
            <Text style={styles.error}>
              *Invalid password! - minimun size 6.
            </Text>}

          {AuthReducer.loading === true && <ActivityIndicator color="364F2A" />}

          {AuthReducer.loading === false &&
            <View style={styles.btnLayout}>
              <View style={styles.btnHorizontalLine}>
                <TouchableOpacity onPress={onPasswordClick} style={styles.buttonSignIn}>
                  <Text style={{
                    textAlign: "center",
                    color: "#fff",
                    fontSize: 15, 
                    fontWeight: "bold"
                  }}>Save Password</Text>
                </TouchableOpacity>
              </View>
            </View>}
        </View>}
    </View>
  );
};

export default VendorProfileScreen;
