import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginTop: 60,
    marginHorizontal: 15,
    gap: 2,
    paddingBottom: 15,
  },
  wallet: {
    marginTop: 15,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarIcon: {
    borderRadius: 100,
    padding: 5,
  },
  modal: {
    padding: 20,
    width: "80%",
    alignSelf: "center",
    borderRadius: 10,
  },
  favoritesToogle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContainer: {
    padding: 10,
    borderRadius: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
});
