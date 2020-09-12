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

  profileCard: {
    borderRadius: 10,
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

  orLayout: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5
  },

  label: {
    color: "#966A4A",
    fontSize: 12,
    flex: 4
  },
  value: {
    color: "#966A4A",
    fontSize: 12,
    flexDirection: "row-reverse",
    flex: 6,
    textAlign: "right"
  },

  buttonSignIn: {
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 15,
    backgroundColor: "#364F2A"
  },
  btnLayout: {
    flexDirection: "row",
    alignItems: "center"
  },

  btnHorizontalLine: {
    flex: 1
  },

  txtLayout: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    backgroundColor: "#F2F5F9",
    borderRadius: 10,
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
  },
  error: {
    color: "#ff0000",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 10
  }
}));
