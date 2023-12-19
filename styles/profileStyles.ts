import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginHorizontal: 15,
    gap: 15,
    paddingBottom: 15,
  },
  avatar: {
    alignSelf: "center",
    borderRadius: 100,
    padding: 5,
  },
  chip: {
    alignSelf: "center",
    height: 35,
    marginBottom: 10,
  },
  bottomContainer: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 40,
    gap: 15,
  },
  balanceContainer: {
    gap: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  balance: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  connectContainer: {
    gap: 15,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  connectButton: {
    marginTop: 10,
  },
  textCenter: {
    textAlign: "center",
  },
});
