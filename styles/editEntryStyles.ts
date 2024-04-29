import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginHorizontal: 15,
    gap: 15,
  },
  moods: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  submit: {
    marginHorizontal: 15,
    marginVertical: 25,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  addImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  deleteImage: {
    position: "absolute",
    bottom: 2,
    right: 2,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
