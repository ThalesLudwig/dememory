import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginTop: 60,
    marginHorizontal: 15,
    gap: 15,
    paddingBottom: 15,
  },
  wallet: {
    marginTop: 15,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
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
    marginLeft: 15,
    marginTop: 10,
    alignItems: 'center'
  },
});
