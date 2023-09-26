import { StyleSheet } from "react-native";
import { Divider, List, Modal, useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../config/store";
import { setTheme } from "../../config/themeSlice";

type ThemeSettingsProps = {
  isThemeVisible: boolean;
  setIsThemeVisible: Function;
};

const ThemeSettings = ({ isThemeVisible, setIsThemeVisible }: ThemeSettingsProps) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { value: selectedTheme } = useSelector((state: RootState) => state.theme);

  return (
    <Modal
      contentContainerStyle={{ ...styles.modal, backgroundColor: colors.background }}
      visible={isThemeVisible}
      onDismiss={() => setIsThemeVisible(false)}
    >
      <List.Item
        title="Light"
        onPress={() => dispatch(setTheme("light"))}
        titleStyle={{ fontWeight: selectedTheme === "light" ? "800" : "400" }}
      />
      <Divider />
      <List.Item
        title="Dark"
        onPress={() => dispatch(setTheme("dark"))}
        titleStyle={{ fontWeight: selectedTheme === "dark" ? "800" : "400" }}
      />
      <Divider />
      <List.Item
        title="Automatic (system)"
        onPress={() => dispatch(setTheme("device"))}
        titleStyle={{ fontWeight: selectedTheme === "device" ? "800" : "400" }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 20,
    width: "80%",
    alignSelf: "center",
    borderRadius: 10,
  },
});

export default ThemeSettings;
