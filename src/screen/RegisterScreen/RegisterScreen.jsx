import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./RegisterStyle";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction, clearState } from "../../store/action/authAction";
import { StackActions } from "@react-navigation/native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import FIcon from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = props => {
  const { navigation } = props;

  const AuthReducer = useSelector(state => state.AuthReducer);

  const [email, setEmail] = useState("");
  const [validateEmail, setValidateEmail] = useState(true);
  const [name, setName] = useState("");
  const [validateName, setValidateName] = useState(true);
  const [phone, setPhone] = useState("");
  const [validatePhone, setValidatePhone] = useState(true);
  const [address, setAddress] = useState("");
  const [validateAddress, setValidateAddress] = useState(true);
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState(true);
  const [btnDisable, setBtnDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();
  //   const [validate, setValidate] = useState("");

  useEffect(
    () => {
      if (AuthReducer.error) {
        setServerError(AuthReducer.error);
      }
      if (AuthReducer.loading) {
        setLoading(AuthReducer.loading);
      }
      if (AuthReducer.email) {
        navigation.dispatch(StackActions.replace("UserHome"));
      }
    },
    [AuthReducer.error, AuthReducer.loading, AuthReducer.email]
  );

  const navigateToSignIn = () => {
    dispatch(clearState());
    navigation.navigate("SignIn");
  };

  const checkEmail = e => {
    //Email Vlidation
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    if (expression.test(e.toLowerCase()) && e !== "") {
      setValidateEmail(true);
    } else {
      setValidateEmail(false);
    }
    setEmail(e);
  };
  const checkName = n => {
    //Name Validation
    const expression = /^[a-zA-Z_ ]*$/;
    if (n !== "" && expression.exec(n.toLowerCase())) {
      setValidateName(true);
    } else {
      setValidateName(false);
    }
    setName(n);
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

  const checkPhone = ph => {
    //Phone Validation
    const expression = /^[0-9_ ]*$/;
    if (ph !== "" && expression.exec(ph.toLowerCase())) {
      setValidatePhone(true);
    } else {
      setValidatePhone(false);
    }
    setPhone(ph);
  };
  const checkAddress = a => {
    //Address Validation
    if (a !== "") {
      setValidateAddress(true);
    } else {
      setValidateAddress(false);
    }

    setAddress(a);
  };

  useEffect(
    () => {
      if (email && name && password && phone && address) {
        setBtnDisable(false);
      }
    },
    [email, name, password, phone, address]
  );

  const onSignUp = () => {
    dispatch(signUpAction(email, password, name, phone, address));
  };
  return (
    <View style={{ backgroundColor: "#fff", borderWidth: 1, height: "100%" }}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.lLogoLayout}>
              <Image
                style={styles.lLogo}
                source={require("../../assets/lettermarkLogo.png")}
              />
            </View>

            <View style={styles.txtLayout}>
              <TextInput
                style={styles.inputBox}
                placeholder="NAME"
                placeholderTextColor="#364f2a"
                onChangeText={nm => checkName(nm)}
                value={name}
              />
              <Text style={styles.txtIcon}>
                <Icon name="smile-o" size={25} color="#364f2a" />
              </Text>
            </View>
            {Boolean(!validateName) &&
              <Text style={styles.error}>
                *Name cannot be empty or numbers!
              </Text>}

            <View style={styles.txtLayout}>
              <TextInput
                style={styles.inputBox}
                placeholder="EMAIL ID"
                placeholderTextColor="#364f2a"
                onChangeText={e => checkEmail(e)}
                keyboardType="email-address"
                value={email}
                autoCapitalize="none"
              />
              <Text style={styles.txtIcon}>
                <FIcon name="mail" size={25} color="#364f2a" />
              </Text>
            </View>
            {Boolean(!validateEmail) &&
              <Text style={styles.error}>*Invalid email address!</Text>}

            <View style={styles.txtLayout}>
              <TextInput
                label="Password"
                placeholder="PASSWORD"
                placeholderTextColor="#364f2a"
                style={styles.inputBox}
                value={password}
                onChangeText={password => checkPassword(password)}
                secureTextEntry={true}
                autoCapitalize="none"
              />
              <Text style={styles.txtIcon}>
                <Icon name="lock" size={25} color="#364f2a" />
              </Text>
            </View>
            {Boolean(!validatePassword) &&
              <Text style={styles.error}>
                *Invalid password! - minimun size 6.
              </Text>}

            <View style={styles.txtLayout}>
              <TextInput
                style={styles.inputBox}
                placeholder="PHONE"
                keyboardType="phone-pad"
                placeholderTextColor="#364f2a"
                onChangeText={p => checkPhone(p)}
                maxLength={10}
                value={phone}
              />
              <Text style={styles.txtIcon}>
                <Icon name="phone" size={25} color="#364f2a" />
              </Text>
            </View>
            {Boolean(!validatePhone) &&
              <Text style={styles.error}>
                *Phone cannot be empty or less then 10 digit!
              </Text>}

            <View style={[styles.txtLayout, { height: 100 }]}>
              <TextInput
                style={styles.inputBox}
                placeholder="Address"
                placeholderTextColor="#364f2a"
                onChangeText={ad => checkAddress(ad)}
                multiline
                numberOfLines={4}
                value={address}
              />
              <Text style={styles.txtIcon}>
                <Ionicons name="location" size={25} color="#364f2a" />
              </Text>
            </View>
            {Boolean(!validateAddress) &&
              <Text style={styles.error}>*Address cannot be empty!</Text>}

            {serverError !== "" &&
              <View>
                <Text style={styles.error}>
                  {serverError}
                </Text>
              </View>}

            {loading &&
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ActivityIndicator color="#364F2A" />
              </View>}

            {!btnDisable &&
              !loading &&
              <View style={styles.buttonSignUpLayout}>
                <TouchableOpacity onPress={onSignUp} style={styles.buttonSignUp}>
                  <Text style={{
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}>SIGN UP</Text>
                </TouchableOpacity>
              </View>}

            <View style={styles.orLayout}>
              <View style={styles.orHorizontalLine} />
              <Text style={styles.orItem}>OR</Text>
              <View style={styles.orHorizontalLine} />
            </View>

            <View style={styles.buttonSignInLayout}>
              <Text style={{ flex: 1, textAlign: "right" }}>
                Don't have account?
              </Text>
              <Text onPress={navigateToSignIn} style={styles.buttonSignIn}>
                SignIn
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default RegisterScreen;
