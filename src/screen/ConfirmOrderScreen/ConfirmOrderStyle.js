import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1
  },

  profileCard: {
    width: "90%",
    borderRadius: 10,
    marginTop: 20,
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
    paddingHorizontal: 10
  },

  orTitle: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F2F5F9"
  },

  title: {
    color: "#966A4A",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  label: {
    color: "#966A4A",
    fontSize: 14,
    flex: 4
  },
  value: {
    color: "#966A4A",
    fontSize: 14,
    flexDirection: "row-reverse",
    flex: 3,
    textAlign: "center"
  },
  btnPaypal: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0,
    width: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  }
}));
