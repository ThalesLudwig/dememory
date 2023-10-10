import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginHorizontal: 15,
    gap: 20,
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slider: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  entryList: {
    gap: 20,
    marginVertical: 20,
    paddingBottom: 70,
  },
  pinnedChip: {
    marginHorizontal: 15,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
