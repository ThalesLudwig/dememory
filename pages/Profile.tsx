import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { ActivityIndicator, Avatar, Button, Portal, Snackbar, Text, TextInput, useTheme } from "react-native-paper";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { polygon } from "viem/chains";
import * as Clipboard from "expo-clipboard";

import { styles } from "../styles/profileStyles";
import { walletShortener } from "../utils/walletShortener";
import LogoutDialog from "../Components/LogoutDialog";
import UserAvatar from "../Components/UserAvatar";

export default function Profile() {
  const { colors } = useTheme();
  const { t } = useTranslation("common");
  const { open: openConnectDialog } = useWeb3Modal();
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect, isLoading: isDisconnecting } = useDisconnect();
  const [isConfirmSnackbarVisible, setIsConfirmSnackbarVisible] = useState(false);
  const [isCopySnackbarVisible, setIsCopySnackbarVisible] = useState(false);
  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);
 
  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    address: address || undefined,
    chainId: polygon.id,
  });

  const isLoading = useMemo(
    () => isConnecting || isDisconnecting || isLoadingBalance,
    [isConnecting, isDisconnecting, isLoadingBalance],
  );

  const copyToClipboard = async () => {
    if (!address) return;
    await Clipboard.setStringAsync(address);
    setIsCopySnackbarVisible(true);
  };

  const onUpdate = () => {
    setIsConfirmSnackbarVisible(true);
  };

  const logout = () => {
    setIsLogoutDialogVisible(false);
    disconnect();
  };

  const onLogin = async () => {
    await openConnectDialog();
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.avatar}>
            {!isConnected && <Avatar.Icon icon="account-outline" size={80} />}
            {isConnected && <UserAvatar size={80} />}
          </View>
          <TextInput
            disabled
            label={t("common:wallet")}
            value={walletShortener(address).toUpperCase()}
            right={<TextInput.Icon icon="content-copy" onPress={copyToClipboard} />}
          />

          {balance && <Text variant="bodyLarge">{`${balance?.formatted?.slice(0, 6)} ${balance?.symbol}`}</Text>}

          {!isLoading && isConnected && (
            <Button mode="contained" onPress={onUpdate}>
              {t("common:profile.buttons.update").toUpperCase()}
            </Button>
          )}
          {!!address && !isLoading && (
            <Button mode="contained-tonal" onPress={() => setIsLogoutDialogVisible(true)}>
              {t("common:settings.buttons.logout").toUpperCase()}
            </Button>
          )}
          {!address && !isLoading && (
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
