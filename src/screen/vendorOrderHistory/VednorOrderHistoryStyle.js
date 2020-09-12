import { StyleSheet, Dimensions } from "react-native";

export default (styles = StyleSheet.create({
  orLayout: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    height: 90,
    backgroundColor: "#fff",
    shadowColor: "#000",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingHorizontal: 5,
    elevation: 5
  },

  loadingLayout: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    flex: 1,
    height: Dimensions.get("window").height-75
  },

  orHorizontalLine: {
    borderBottomColor: "#9098A6",
    flex: 11,
    height: "100%",
    flexDirection: "column",
    marginHorizontal: 10,
    marginTop: 0
  },

  upperLayout: {
    flex: 7,
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
    color: "#364F2A"
  },

  lowerLayout: {
    flex: 10,
    flexDirection: "row"
  },

  orItemBack: {
    width: 60,
    height: 60,
    backgroundColor: "#966A4A",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 50
  },

  orItem: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#fff"
  }
}));
