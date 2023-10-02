import { Platform, Pressable, StyleSheet, View, useColorScheme } from "react-native";
import { Modal, Text, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useCallback, useMemo } from "react";
import green from "../../themes/green";
import blue from "../../themes/blue";
import pink from "../../themes/pink";
import yellow from "../../themes/yellow";
import red from "../../themes/red";
import purple from "../../themes/purple";
import { RootState } from "../../config/store";
import { useSelector } from "react-redux";
import { setColor } from "../../config/themeSlice";

type ColorsSettingsProps = {
  isVisible: boolean;
  setIsVisible: Function;
};

const ColorsSettings = ({ isVisible, setIsVisible }: ColorsSettingsProps) => {
  const { t } = useTranslation("common");
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();
  const { color: selectedColor } = useSelector((state: RootState) => state.theme);

  const fallbackScheme = "light";

  const deviceColor = useMemo(() => {
    return colorScheme ? theme[colorScheme].primary : colors.primary;
  }, [colorScheme, theme]);

  const buttonStyle = useCallback(
    (selected: string) => ({
      borderWidth: 3,
      borderColor: selected === selectedColor ? colors.onSurface : "transparent",
    }),
    [selectedColor, colors],
  );

  return (
    <Modal
      contentContainerStyle={{ ...styles.modal, backgroundColor: colors.background }}
      visible={isVisible}
      onDismiss={() => setIsVisible(false)}
    >
      <Text variant="titleLarge">{t("common:settings.menus.colors.basic")}</Text>
      <View style={styles.container}>
        <Pressable
          style={{
            ...styles.color,
            ...buttonStyle(purple.name),
            backgroundColor: purple[colorScheme || fallbackScheme].primary,
          }}
          onPress={() => dispatch(setColor(purple.name))}
        />
        <Pressable
          style={{
            ...styles.color,
            ...buttonStyle(green.name),
            ...buttonStyle,
            backgroundColor: green[colorScheme || fallbackScheme].primary,
          }}
          onPress={() => dispatch(setColor(green.name))}
        />
        <Pressable
          style={{
            ...styles.color,
            ...buttonStyle(blue.name),
            ...buttonStyle,
            backgroundColor: blue[colorScheme || fallbackScheme].primary,
          }}
          onPress={() => dispatch(setColor(blue.name))}
        />
        <Pressable
          style={{
            ...styles.color,
            ...buttonStyle(pink.name),
            ...buttonStyle,
            backgroundColor: pink[colorScheme || fallbackScheme].primary,
          }}
          onPress={() => dispatch(setColor(pink.name))}
        />
        <Pressable
          style={{
            ...styles.color,
            ...buttonStyle(yellow.name),
            ...buttonStyle,
            backgroundColor: yellow[colorScheme || fallbackScheme].primary,
          }}
          onPress={() => dispatch(setColor(yellow.name))}
        />
        <Pressable
          style={{
            ...styles.color,
            ...buttonStyle(red.name),
            ...buttonStyle,
            backgroundColor: red[colorScheme || fallbackScheme].primary,
          }}
          onPress={() => dispatch(setColor(red.name))}
        />
      </View>
      {Platform.OS !== "ios" && (
        <View style={{ gap: 20 }}>
          <Text variant="titleLarge">{t("common:settings.menus.colors.system")}</Text>
          <View style={styles.container}>
            <Pressable
              style={{ ...styles.color, ...buttonStyle("device"), backgroundColor: deviceColor }}
              onPress={() => dispatch(setColor("device"))}
            />
          </View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 20,
    width: "80%",
    alignSelf: "center",
    borderRadius: 10,
    gap: 20,
  },
  container: {
    flexDirection: "row",
    gap: 30,
    flexWrap: "wrap",
  },
  color: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "red",
  },
});

export default ColorsSettings;
