import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },

  lLogo: {
    height: 100,
    width: 100
  },

  lLogoLayout: {
    marginVertical: 50
  },

  orLayout: {
    width: "100%",
    height: 45,
    paddingHorizontal: 15,
    flexDirection: "row"
  },

  buttonSignIn: {
    borderRadius: 10,
    paddingVertical: 10,
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    marginVertical: 15,
    backgroundColor: "#364F2A"
  },
  btnLayout: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20
  },

  btnHorizontalLine: {
    flex: 1
  },

  txtLabel: {
    fontWeight: "bold",
    color: "#364F2A",
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 5
  },

  inputBox: {
    backgroundColor: "#F2F5F9",
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 10
  }
}));
