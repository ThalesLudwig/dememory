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
  },
  pinnedChip: {
    marginHorizontal: 15,
  },
});
