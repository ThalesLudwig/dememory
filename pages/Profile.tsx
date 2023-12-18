import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { ActivityIndicator, Avatar, Button, Portal, Snackbar, TextInput, useTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount, useDisconnect } from "wagmi";
import * as Clipboard from "expo-clipboard";

import { styles } from "../styles/profileStyles";
import { RootState } from "../config/store";
import { setName, setWallet } from "../config/profileSlice";
import { walletShortener } from "../utils/walletShortener";
import LogoutDialog from "../Components/LogoutDialog";
import UserAvatar from "../Components/UserAvatar";

export default function Profile() {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { t } = useTranslation("common");
  const { name, wallet } = useSelector((state: RootState) => state.profile);
  const { open: openConnectDialog } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [isLoading, setIsLoading] = useState(false);
  const [nameInput, setNameInput] = useState(name);
  const [isConfirmSnackbarVisible, setIsConfirmSnackbarVisible] = useState(false);
  const [isCopySnackbarVisible, setIsCopySnackbarVisible] = useState(false);
  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);

  useEffect(() => {
    if (address) dispatch(setWallet(address));
  }, [isConnected, address]);

  const copyToClipboard = async () => {
    if (!wallet) return;
    await Clipboard.setStringAsync(wallet);
    setIsCopySnackbarVisible(true);
  };

  const onUpdate = () => {
    dispatch(setName(nameInput));
    setIsConfirmSnackbarVisible(true);
  };

  const logout = () => {
    setIsLogoutDialogVisible(false);
    disconnect();
    dispatch(setWallet(""));
  };

  const onLogin = async () => {
    setIsLoading(true);
    await openConnectDialog();
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.avatar}>
            {!wallet && <Avatar.Icon icon="account-outline" size={80} />}
            {!!wallet && <UserAvatar size={80} />}
          </View>
          <TextInput label={t("common:profile.inputs.name")} value={nameInput} onChangeText={setNameInput} />
          <TextInput
            disabled
            label={t("common:wallet")}
            value={walletShortener(wallet).toUpperCase()}
            right={<TextInput.Icon icon="content-copy" onPress={copyToClipboard} />}
          />
          <Button mode="contained" onPress={onUpdate}>
            {t("common:profile.buttons.update").toUpperCase()}
          </Button>
          {!!wallet && !isLoading && (
            <Button mode="contained-tonal" onPress={() => setIsLogoutDialogVisible(true)}>
              {t("common:settings.buttons.logout").toUpperCase()}
            </Button>
          )}
          {!wallet && !isLoading && (
            <Button mode="contained-tonal" onPress={onLogin}>
              {t("common:settings.buttons.login").toUpperCase()}
            </Button>
          )}
          {isLoading && <ActivityIndicator />}
        </View>
      </ScrollView>
      <Portal>
        <Snackbar
          visible={isConfirmSnackbarVisible}
          onDismiss={() => setIsConfirmSnackbarVisible(false)}
          wrapperStyle={{ bottom: 80 }}
          action={{ label: t("common:settings.buttons.close"), onPress: () => setIsConfirmSnackbarVisible(false) }}
        >
          {t("common:profile.snackbar.updated")}
        </Snackbar>
        <Snackbar
          visible={isCopySnackbarVisible}
          onDismiss={() => setIsCopySnackbarVisible(false)}
          wrapperStyle={{ bottom: 80 }}
          action={{ label: t("common:settings.buttons.close"), onPress: () => setIsCopySnackbarVisible(false) }}
        >
          {t("common:profile.snackbar.copy")}
        </Snackbar>
        <LogoutDialog isOpen={isLogoutDialogVisible} onLogout={logout} setIsOpen={setIsLogoutDialogVisible} />
      </Portal>
    </SafeAreaView>
  );
}
