import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },

  dropdownPicker: {
    flexDirection:"row",
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  // dropdownButton: {
  //   backgroundColor: "#fff"
  // },

  orLayout: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    height: 100,
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

  orHorizontalLine: {
    borderBottomColor: "#9098A6",
    flex: 11,
    height: "100%",

    flexDirection: "column",
    marginHorizontal: 10,
    marginTop: 10
  },

  upperLayout: {
    flex: 6,
    flexDirection: "row",
    alignItems: "center"
  },

  typeLabel: {
    flex: 10,
    // flexDirection: "row",
    width: 70,
    justifyContent: "center",
    alignItems: "center",
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
