import { StyleSheet } from "react-native";
import { IconButton, Surface, Text, useTheme } from "react-native-paper";

type AlertProps = { icon?: string; text: string };

export default function Alert({ icon = "alert", text }: AlertProps) {
  const { colors } = useTheme();

  return (
    <Surface mode="flat" elevation={2} style={styles.container}>
      <IconButton icon={icon} iconColor={colors.primary} />
      <Text variant="bodyLarge" style={styles.text}>
        {text}
      </Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    width: "85%",
  },
});
