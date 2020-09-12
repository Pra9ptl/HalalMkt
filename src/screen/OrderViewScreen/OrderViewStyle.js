import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  orLayout: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  label: {
    color: "#966A4A",
    fontSize: 14,
    flex: 2,
    fontWeight: "bold",
    paddingHorizontal: 5
  },
  value: {
    fontSize: 14,
    flexDirection: "row-reverse",
    paddingHorizontal: 5
  },
  itemLabel: {
    color: "#966A4A",
    fontSize: 14,
    flex: 1,
    fontWeight: "bold",
    paddingHorizontal: 5
  },
  itemValue: {
    color: "#966A4A",
    fontSize: 14,
    flexDirection: "row-reverse",
    flex: 4,
    paddingHorizontal: 5
  },
  cardView: {
    borderRadius: 10,
    padding: 10,
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
  }
}));
