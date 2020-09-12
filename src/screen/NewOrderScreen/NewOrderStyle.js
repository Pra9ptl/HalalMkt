import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1
  },
  txtLabel: {
    fontWeight: "bold",
    color: "#364F2A",
    paddingHorizontal: 10
  },

  txtLabelDesc : {
    color: "#364F2A",
    paddingHorizontal: 10
  },
  txtLayout: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10
  },
  inputBox: {
    color: "#364F2A",
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: "#F2F5F9",
    borderRadius: 10
  },
  txtIcon: {
    paddingHorizontal: 10
  },
  buttonSave: {
    paddingVertical: 10,
    marginHorizontal: 5,
    textAlign: "center",
    borderWidth: 0,
    backgroundColor: "#364F2A",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  btnLayout: {
    width: "75%",
    flexDirection: "row",
    alignItems: "center",
  },

  btnHorizontalLine: {
    flex: 1,
    borderRadius: 10,
  }
}));
