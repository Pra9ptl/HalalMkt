import { StyleSheet, Dimensions } from "react-native";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  buttonSignInLayout: {
    width: "70%",
    flexDirection: "row",
    paddingVertical: 30,
    justifyContent: "center"
  },
  logo: {
    width: 226,
    height: 70
  },
  cardLayout: {
    flex: 1,
    width: "100%",
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    flexDirection: "row"
  }
}));
