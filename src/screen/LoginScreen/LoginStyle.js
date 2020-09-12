import { StyleSheet } from "react-native";
import { block } from "react-native-reanimated";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },

  txtLayout: {
    width: "65%",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F5F9",
    borderRadius: 10,
    marginVertical: 10
  },

  inputBox: {
    fontWeight: "bold",
    color: "#000000",
    flex: 1,
    paddingHorizontal: 10
  },

  txtIcon: {
    paddingHorizontal: 10
  },

  head: {
    fontSize: 30,
    justifyContent: "center"
  },

  buttonSignInLayout: {
    alignItems: "center",
    width: "65%",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  buttonSignIn: {
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#364F2A",
    shadowColor: "#364F2A",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 5
  },

  orLayout: {
    width: "55%",
    flexDirection: "row",
    alignItems: "center"
  },

  orHorizontalLine: {
    borderBottomColor: "#9098A6",
    borderBottomWidth: 1,
    flex: 1
  },
  orItem: {
    paddingHorizontal: 10,
    fontWeight: "bold",
    color: "#9098A6"
  },

  buttonSignUpLayout: {
    alignItems: "center",
    width: "65%",
    marginVertical: 20,
    flexDirection: "row"
  },

  buttonSignUp: {
    color: "#364F2A",
    fontWeight: "bold",
    paddingHorizontal: 5,
    flex: 0.5
  },

  error: {
    color: "#ff0000",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 10
  },

  lLogo: {
    height: 100,
    width: 100
  },

  lLogoLayout: {
    marginVertical: 50
  }
}));
