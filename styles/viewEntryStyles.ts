import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginHorizontal: 15,
    gap: 15,
  },
  chip: {
    alignSelf: "flex-start",
    height: 32,
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  content: {
    padding: 15,
    borderRadius: 10,
  },
  buttons: {
    padding: 15,
    gap: 10,
    marginTop: 15,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tnxHash: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
});
