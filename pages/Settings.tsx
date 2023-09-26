import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Avatar, Button, Divider, List, Portal, Snackbar, Text, useTheme } from "react-native-paper";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { styles } from "../styles/settingsStyles";
import ThemeSettings from "../Components/Settings/ThemeSettings";
import ResetSettings from "../Components/Settings/ResetSettings";
import LanguageSettings from "../Components/Settings/LanguageSettings";

export default function Settings() {
  const { colors } = useTheme();
  const { t } = useTranslation("common");

  const [isThemeVisible, setIsThemeVisible] = useState(false);
  const [isLanguagesVisible, setIsLanguagesVisible] = useState(false);
  const [isResetDialogVisible, setIsResetDialogVisible] = useState(false);
  const [isResetSnackbarVisible, setIsResetSnackbarVisible] = useState(false);
  const [isUnavailableSnackbarVisible, setIsUnavailableSnackbarVisible] = useState(false);

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.avatar}>
            <Avatar.Icon icon="account-outline" size={70} />
            <Text style={styles.wallet} variant="titleMedium">
              {t("common:settings.titles.local-user").toUpperCase()}
            </Text>
            <Button mode="text">{t("common:settings.buttons.login")}</Button>
          </View>
          <Divider />
          <List.Section>
            <List.Subheader>{t("common:settings.titles.preferences")}</List.Subheader>
            <List.Item title={t("common:settings.menus.theme")} onPress={() => setIsThemeVisible(true)} />
            <List.Item title={t("common:settings.menus.languages")} onPress={() => setIsLanguagesVisible(true)} />
            <List.Item
              title={t("common:settings.menus.date-format")}
              onPress={() => setIsUnavailableSnackbarVisible(true)}
            />
          </List.Section>
          <Divider />
          <List.Section>
            <List.Subheader>{t("common:settings.titles.security")}</List.Subheader>
            <List.Item
              title={t("common:settings.menus.app-lock")}
              onPress={() => setIsUnavailableSnackbarVisible(true)}
            />
            <List.Item
              title={t("common:settings.menus.therapy-share")}
              onPress={() => setIsUnavailableSnackbarVisible(true)}
            />
          </List.Section>
          <Divider />
          <List.Section>
            <List.Subheader>{t("common:settings.titles.entries")}</List.Subheader>
            <List.Item
              title={t("common:settings.menus.save-backup")}
              onPress={() => setIsUnavailableSnackbarVisible(true)}
            />
            <List.Item title={t("common:settings.menus.reset-entries")} onPress={() => setIsResetDialogVisible(true)} />
          </List.Section>
          <Button mode="contained">{t("common:settings.buttons.buy-app").toUpperCase()}</Button>
        </View>
      </ScrollView>
      <Portal>
        <ThemeSettings isThemeVisible={isThemeVisible} setIsThemeVisible={setIsThemeVisible} />
        <LanguageSettings isModalVisible={isLanguagesVisible} setIsModalVisible={setIsLanguagesVisible} />
        <ResetSettings
          isResetDialogVisible={isResetDialogVisible}
          isResetSnackbarVisible={isResetSnackbarVisible}
          setIsResetDialogVisible={setIsResetDialogVisible}
          setIsResetSnackbarVisible={setIsResetSnackbarVisible}
        />
        <Snackbar
          visible={isUnavailableSnackbarVisible}
          onDismiss={() => setIsUnavailableSnackbarVisible(false)}
          action={{ label: t("common:settings.buttons.close"), onPress: () => setIsUnavailableSnackbarVisible(false) }}
        >
          {t("common:settings.descriptions.option-unavailable")}
        </Snackbar>
      </Portal>
    </SafeAreaView>
  );
}
