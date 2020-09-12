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
    marginVertical: -50,
    zIndex: 5,
    elevation: 10
  },

  profileCard: {
    width: "75%",
    backgroundColor: "#fff",
    borderWidth: 0,
    paddingVertical: 50,
    shadowColor: "#000",
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },

  orLayout: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F5F9",
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 10
  },

  label: {
    color: "#966A4A",
    flex: 3,
    textAlign: "right",
    fontWeight: "bold",
    paddingHorizontal: 10
  },
  valuelayout: {
    flexDirection: "row",
    flex: 7
  },

  value: {
    color: "#966A4A",
    fontSize: 15,
    fontWeight: "bold"
  },
  btnHorizontalLine: {
    flex: 1
  },

  txtLayout: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F5F9",
    borderRadius: 10,
    margin: 10
  },

  txtLabel: {
    fontWeight: "bold",
    color: "#364F2A",
    paddingHorizontal: 10
  },

  inputBox: {
    color: "#364F2A",
    flex: 1,
    paddingHorizontal: 10
  },

  txtIcon: {
    paddingHorizontal: 10
  }
}));
