import { StyleSheet } from "react-native";
import { Divider, List, Modal, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { setLocale } from "../../config/localeSlice";

type LanguageSettingsProps = {
  isModalVisible: boolean;
  setIsModalVisible: Function;
};

const LanguageSettings = ({ isModalVisible, setIsModalVisible }: LanguageSettingsProps) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const updateLanguage = (language: string) => {
    changeLanguage(language);
    dispatch(setLocale(language));
    setIsModalVisible(false);
  };

  return (
    <Modal
      contentContainerStyle={{ ...styles.modal, backgroundColor: colors.background }}
      visible={isModalVisible}
      onDismiss={() => setIsModalVisible(false)}
    >
      <List.Item
        title="English"
        onPress={() => updateLanguage("en_US")}
        titleStyle={{ fontWeight: language === "en_US" ? "800" : "400" }}
      />
      <Divider />
      <List.Item
        title="Portuguese"
        onPress={() => updateLanguage("pt_BR")}
        titleStyle={{ fontWeight: language === "pt_BR" ? "800" : "400" }}
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

export default LanguageSettings;
