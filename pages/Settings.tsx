import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Dialog,
  Divider,
  List,
  Portal,
  Snackbar,
  Text,
  useTheme,
} from "react-native-paper";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";

import { styles } from "../styles/settingsStyles";
import ThemeSettings from "../Components/Settings/ThemeSettings";
import ResetSettings from "../Components/Settings/ResetSettings";
import LanguageSettings from "../Components/Settings/LanguageSettings";
import { RootState } from "../config/store";
import { walletShortener } from "../utils/walletShortener";
import { setWallet } from "../config/profileSlice";
import ColorsSettings from "../Components/Settings/ColorsSettings";

export default function Settings() {
  const { colors } = useTheme();
  const { t } = useTranslation("common");
  const { navigate } = useNavigation<any>();
  const dispatch = useDispatch();
  const { name: username, wallet } = useSelector((state: RootState) => state.profile);
  const { provider } = useWalletConnectModal();

  const [isLoading, setIsLoading] = useState(false);
  const [isThemeVisible, setIsThemeVisible] = useState(false);
  const [isColorsVisible, setIsColorsVisible] = useState(false);
  const [isLanguagesVisible, setIsLanguagesVisible] = useState(false);
  const [isResetDialogVisible, setIsResetDialogVisible] = useState(false);
  const [isResetSnackbarVisible, setIsResetSnackbarVisible] = useState(false);
  const [isUnavailableSnackbarVisible, setIsUnavailableSnackbarVisible] = useState(false);
  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    setIsLogoutDialogVisible(false);
    await provider?.disconnect();
    dispatch(setWallet(""));
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.avatar}>
            <Pressable style={styles.avatar} onPress={() => navigate("Profile")}>
              <Avatar.Icon icon="account-outline" size={70} />
              <Text style={styles.wallet} variant="titleMedium">
                {username ||
                  walletShortener(wallet).toUpperCase() ||
                  t("common:settings.titles.local-user").toUpperCase()}
              </Text>
            </Pressable>
            {!!wallet && !isLoading && (
              <Button mode="text" onPress={() => setIsLogoutDialogVisible(true)}>
                {t("common:settings.buttons.logout")}
              </Button>
            )}
            {!wallet && !isLoading && (
              <Button mode="text" onPress={() => navigate("Login")}>
                {t("common:settings.buttons.login")}
              </Button>
            )}
            {!!isLoading && <ActivityIndicator />}
          </View>
          <Divider />
          <List.Section>
            <List.Subheader>{t("common:settings.titles.preferences")}</List.Subheader>
            <List.Item title={t("common:settings.menus.theme")} onPress={() => setIsThemeVisible(true)} />
            <List.Item title={t("common:settings.menus.colors")} onPress={() => setIsColorsVisible(true)} />
            <List.Item title={t("common:settings.menus.languages")} onPress={() => setIsLanguagesVisible(true)} />
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
        <ColorsSettings isVisible={isColorsVisible} setIsVisible={setIsColorsVisible} />
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
          wrapperStyle={{ bottom: 80 }}
          action={{ label: t("common:settings.buttons.close"), onPress: () => setIsUnavailableSnackbarVisible(false) }}
        >
          {t("common:settings.descriptions.option-unavailable")}
        </Snackbar>
        <Dialog visible={isLogoutDialogVisible} onDismiss={() => setIsLogoutDialogVisible(false)}>
          <Dialog.Title>{t("common:modals.logout.title")}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{t("common:modals.logout.descriptions")}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsLogoutDialogVisible(false)}>{t("common:modals.logout.buttons.no")}</Button>
            <Button onPress={logout}>{t("common:modals.logout.buttons.yes")}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}
