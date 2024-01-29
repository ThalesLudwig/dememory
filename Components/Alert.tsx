import { StyleSheet } from "react-native";
import { IconButton, Surface, Text, useTheme } from "react-native-paper";

type AlertProps = { icon?: string; text: string; isDanger?: boolean };

export default function Alert({ icon = "alert", text, isDanger = false }: AlertProps) {
  const { colors } = useTheme();

  return (
    <Surface
      mode="flat"
      elevation={2}
      style={isDanger ? { ...styles.container, backgroundColor: colors.errorContainer } : styles.container}
    >
      <IconButton icon={icon} iconColor={isDanger ? colors.onErrorContainer : colors.primary} />
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    width: "90%",
  },
});
