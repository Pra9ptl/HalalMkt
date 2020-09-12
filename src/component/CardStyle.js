import { StyleSheet, Dimensions } from "react-native";

export default (styles = StyleSheet.create({
  cardView: {
    width: Dimensions.get("window").width / 2 - 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    paddingVertical: 30,
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  cardTitle: {
    padding: 10,
    fontWeight: "bold"
  }
}));
