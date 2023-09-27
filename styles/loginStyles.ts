import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginTop: 60,
    marginHorizontal: 15,
    gap: 15,
  },
  image: { height: 350, justifyContent: "flex-end", padding: 30, gap: 10 },
  dividerRow: { flexDirection: "row", alignItems: "center", gap: 15 },
  divider: { flex: 1 },
  title: { color: "white", fontWeight: "500" },
  subtitle: { color: "white" },
});
