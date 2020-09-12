import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, ActivityIndicator } from "react-native";
import styles from "./LoginStyle";
import { useDispatch, useSelector } from "react-redux";
import { signInAction, clearState } from "../../store/action/authAction";
import { StackActions } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import FIcon from "react-native-vector-icons/Foundation";

const LoginScreen = props => {
  const { navigation } = props;

  const AuthReducer = useSelector(state => state.AuthReducer);

  const [email, setEmail] = useState("");
  const [validateEmail, setValidateEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState(true);
  const [btnDisable, setBtnDisable] = useState(true);

  const dispatch = useDispatch();
  const [signInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateToSignUp = () => {
    dispatch(clearState());
    navigation.navigate("SignUp");
  };

  useEffect(
    () => {
      if (AuthReducer.error) {
        console.log("Errorrrrrrr", AuthReducer.error);
        setSignInError(AuthReducer.error);
      }
      if (AuthReducer.loading) {
        setLoading(AuthReducer.loading);
      }
      if (AuthReducer.email) {
        if (AuthReducer.userType === "user") {
          navigation.dispatch(StackActions.replace("UserHome"));
        } else if (AuthReducer.userType === "vendor") {
          navigation.dispatch(StackActions.replace("VendorHome"));
        } else {
          setSignInError("No user found!");
        }
      }
    },
    [
      AuthReducer.error,
      AuthReducer.loading,
      AuthReducer.email,
      AuthReducer.userType
    ]
  );

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

  const checkPassword = p => {
    //Password Validation
    if (p.length >= 6 && p !== "") {
      setValidatePassword(true);
    } else {
      setValidatePassword(false);
    }
    setPassword(p);
  };

  useEffect(
    () => {
      if (email !== "" && password !== "") {
        setBtnDisable(false);
      }
    },
    [email, password]
  );

  useEffect(
    () => {
      if (loading === true) {
        setBtnDisable(true);
      }
    },
    [loading]
  );

  const onSignIn = () => {
    dispatch(signInAction(email, password));
  };

  return (
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
          placeholder="EMAIL ID"
          placeholderTextColor="#364f2a"
          onChangeText={user => checkEmail(user)}
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
          value={password}
          style={styles.inputBox}
          onChangeText={password => checkPassword(password)}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Text style={styles.txtIcon}>
          <Icon name="lock" size={25} color="#364f2a" />
        </Text>
      </View>
      {Boolean(!validatePassword) &&
        <Text style={styles.error}>*Invalid password! - minimun size 6.</Text>}

      {signInError !== "" &&
        <Text style={styles.error}>
          {signInError}
        </Text>}

      {loading === true &&
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator color="#364F2A" />
        </View>}

      {!btnDisable &&
        <View style={styles.buttonSignInLayout}>
          <TouchableOpacity onPress={onSignIn} style={styles.buttonSignIn}>
            <Text style={{
              color: "#fff",
              fontSize: 15,
              fontWeight: "bold",
            }}>SIGN IN</Text>
          </TouchableOpacity>
        </View>}

      <View style={styles.orLayout}>
        <View style={styles.orHorizontalLine} />
        <Text style={styles.orItem}>OR</Text>
        <View style={styles.orHorizontalLine} />
      </View>

      <View style={styles.buttonSignUpLayout}>
        <Text style={{ flex: 1, textAlign: "right" }}>Don't have account?</Text>
        <Text onPress={navigateToSignUp} style={styles.buttonSignUp}>
          SignUp
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
