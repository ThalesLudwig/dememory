import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbfe",
  },
  body: {
    marginHorizontal: 15,
    gap: 15,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  entryList: {
    gap: 20,
    marginBottom: 20,
  },
  dates: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  dateInput: {
    flex: 1,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
  },
});
