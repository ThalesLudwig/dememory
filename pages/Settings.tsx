import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  Portal,
  Snackbar,
  Switch,
  Text,
  useTheme,
} from "react-native-paper";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount, useDisconnect } from "wagmi";
import * as Linking from "expo-linking";

import { styles } from "../styles/settingsStyles";
import ThemeSettings from "../Components/Settings/ThemeSettings";
import ResetSettings from "../Components/Settings/ResetSettings";
import LanguageSettings from "../Components/Settings/LanguageSettings";
import { RootState } from "../config/store";
import { walletShortener } from "../utils/walletShortener";
import ColorsSettings from "../Components/Settings/ColorsSettings";
import UserAvatar from "../Components/UserAvatar";
import { setShowFavorites } from "../config/settingsSlice";
import LogoutDialog from "../Components/LogoutDialog";
import { ICON_SIZE } from "../constants/icons";

const isDeveloper = process.env.EXPO_PUBLIC_IS_DEVELOPER || false;

export default function Settings() {
  const { colors } = useTheme();
  const { t } = useTranslation("common");
  const { navigate } = useNavigation<any>();
  const dispatch = useDispatch();
  const { showFavorites } = useSelector((state: RootState) => state.settings);
  const { open: openConnectDialog } = useWeb3Modal();
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect, isLoading: isDisconnecting } = useDisconnect();
  const [isThemeVisible, setIsThemeVisible] = useState(false);
  const [isColorsVisible, setIsColorsVisible] = useState(false);
  const [isLanguagesVisible, setIsLanguagesVisible] = useState(false);
  const [isResetDialogVisible, setIsResetDialogVisible] = useState(false);
  const [isResetSnackbarVisible, setIsResetSnackbarVisible] = useState(false);
  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);
  const isLoading = useMemo(() => isConnecting || isDisconnecting, [isConnecting, isDisconnecting]);

  const logout = () => {
    setIsLogoutDialogVisible(false);
    disconnect();
  };

  const onLogin = async () => {
    await openConnectDialog();
  };

  const toogleShowFavorites = () => {
    dispatch(setShowFavorites(!showFavorites));
  };

  const supportDeveloper = () => {
    Linking.openURL("https://www.buymeacoffee.com/thalesludwig");
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={styles.body}>
          
          {/* Avatar */}
          <View style={styles.avatar}>
            <Pressable style={styles.avatar} onPress={() => navigate("Profile")}>
              <View style={{ ...styles.avatarIcon, backgroundColor: colors.inversePrimary }}>
                {!isConnected && <Avatar.Icon icon="account-outline" size={70} />}
                {isConnected && <UserAvatar />}
              </View>
              <Text style={styles.wallet} variant="titleMedium">
                {walletShortener(address).toUpperCase() || t("common:settings.titles.local-user").toUpperCase()}
              </Text>
            </Pressable>
            {isConnected && !isLoading && (
              <Button mode="text" onPress={() => setIsLogoutDialogVisible(true)}>
                {t("common:settings.buttons.logout")}
              </Button>
            )}
            {!isConnected && !isLoading && (
              <Button mode="text" onPress={onLogin}>
                {t("common:settings.buttons.login")}
              </Button>
            )}
            {isLoading && <ActivityIndicator />}
          </View>

          {/* Preferences */}
          <List.Section>
            <List.Subheader>{t("common:settings.titles.preferences")}</List.Subheader>
            <View style={{ backgroundColor: colors.elevation.level1, ...styles.listContainer }}>
              <Pressable style={styles.listItem} onPress={() => setIsThemeVisible(true)}>
                <IconButton icon="theme-light-dark" size={ICON_SIZE} iconColor={colors.primary} />
                <Text variant="bodyLarge">{t("common:settings.menus.theme")}</Text>
              </Pressable>
              <Divider />
              <Pressable style={styles.listItem} onPress={() => setIsColorsVisible(true)}>
                <IconButton icon="palette" size={ICON_SIZE} iconColor={colors.primary} />
                <Text variant="bodyLarge" style={styles.listItem}>
                  {t("common:settings.menus.colors")}
                </Text>
              </Pressable>
              <Divider />
              <Pressable style={styles.listItem} onPress={() => setIsLanguagesVisible(true)}>
                <IconButton icon="translate" size={ICON_SIZE} iconColor={colors.primary} />
                <Text variant="bodyLarge" style={styles.listItem}>
                  {t("common:settings.menus.languages")}
                </Text>
              </Pressable>
              <Divider />
              <View style={styles.favoritesToogle}>
                <View style={styles.listItem}>
                  <IconButton icon="heart" size={ICON_SIZE} iconColor={colors.primary} />
                  <Text variant="bodyLarge">{t("common:home.titles.recent-favorites")}</Text>
                </View>
                <Switch value={showFavorites} onValueChange={toogleShowFavorites} />
              </View>
            </View>
          </List.Section>

          {/* Security */}
          <List.Section>
            <List.Subheader>{t("common:settings.titles.security")}</List.Subheader>
            <View style={{ backgroundColor: colors.elevation.level1, ...styles.listContainer }}>
              <Pressable style={styles.listItem} onPress={() => navigate("DataLock")}>
                <IconButton icon="lock" size={ICON_SIZE} iconColor={colors.primary} />
                <Text variant="bodyLarge" style={styles.listItem}>
                  {t("common:settings.menus.app-lock")}
                </Text>
              </Pressable>
              <Divider />
              <Pressable style={styles.listItem} onPress={() => navigate("ManageKeys")}>
                <IconButton icon="key" size={ICON_SIZE} iconColor={colors.primary} />
                <Text variant="bodyLarge" style={styles.listItem}>
                  {t("common:settings.menus.manage-keys")}
                </Text>
              </Pressable>
            </View>
          </List.Section>

          {/* Entries */}
          <List.Section>
            <List.Subheader>{t("common:settings.titles.entries")}</List.Subheader>
            <View style={{ backgroundColor: colors.elevation.level1, ...styles.listContainer }}>
              <Pressable style={styles.listItem} onPress={() => navigate("SaveBackup")}>
                <IconButton icon="download" size={ICON_SIZE} iconColor={colors.primary} />
                <Text variant="bodyLarge" style={styles.listItem}>
                  {t("common:settings.menus.save-backup")}
                </Text>
              </Pressable>
              <Divider />
              <Pressable style={styles.listItem} onPress={() => navigate("RetrieveBackup")}>
                <IconButton icon="upload" size={ICON_SIZE} iconColor={colors.primary} />
                <Text variant="bodyLarge" style={styles.listItem}>
                  {t("common:settings.backup.retrieve.title")}
                </Text>
              </Pressable>
            </View>
          </List.Section>

          {/* Developer */}
          {isDeveloper && (
            <List.Section>
              <List.Subheader>{t("common:settings.titles.developer")}</List.Subheader>
              <View style={{ backgroundColor: colors.elevation.level1, ...styles.listContainer }}>
                <Pressable style={styles.listItem} onPress={() => setIsResetDialogVisible(true)}>
                  <IconButton icon="trash-can-outline" size={ICON_SIZE} iconColor={colors.primary} />
                  <Text variant="bodyLarge" style={styles.listItem}>
                    {t("common:settings.menus.reset-entries")}
                  </Text>
                </Pressable>
              </View>
            </List.Section>
          )}

          {/* Support the developer */}
          <Button mode="contained" onPress={supportDeveloper}>
            {t("common:settings.buttons.buy-app").toUpperCase()}
          </Button>
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
        <LogoutDialog isOpen={isLogoutDialogVisible} onLogout={logout} setIsOpen={setIsLogoutDialogVisible} />
      </Portal>
    </SafeAreaView>
  );
}
