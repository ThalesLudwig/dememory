import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { ActivityIndicator, Avatar, Button, Chip, Portal, Snackbar, Text, useTheme } from "react-native-paper";
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
import MaticSvg from "../Components/MaticSvg";
import DigitalCurrencySvg from "../Components/DigitalCurrencySvg";

export default function Profile() {
  const { colors } = useTheme();
  const { t } = useTranslation("common");
  const { open: openConnectDialog } = useWeb3Modal();
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect, isLoading: isDisconnecting } = useDisconnect();
  const [isConfirmSnackbarVisible, setIsConfirmSnackbarVisible] = useState(false);
  const [isCopySnackbarVisible, setIsCopySnackbarVisible] = useState(false);
  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);

  const {
    data: balance,
    isLoading: isLoadingBalance,
    isRefetching,
    refetch,
  } = useBalance({
    address: address || undefined,
    chainId: polygon.id,
  });

  const isLoading = useMemo(
    () => isConnecting || isDisconnecting || isLoadingBalance || isRefetching,
    [isConnecting, isDisconnecting, isLoadingBalance, isRefetching],
  );

  const copyToClipboard = async () => {
    if (!address) return;
    await Clipboard.setStringAsync(address);
    setIsCopySnackbarVisible(true);
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
      <View style={styles.body}>
        <View style={{ ...styles.avatar, backgroundColor: colors.inversePrimary }}>
          {!isConnected && <Avatar.Icon icon="account-outline" size={80} />}
          {isConnected && <UserAvatar size={80} />}
        </View>
        {isConnected && (
          <Chip closeIcon="content-copy" onClose={copyToClipboard} style={styles.chip}>
            {walletShortener(address).toUpperCase()}
          </Chip>
        )}
        {!isConnected && <Chip style={styles.chip}>{t("common:settings.titles.local-user").toUpperCase()}</Chip>}
      </View>
      <View style={{ backgroundColor: colors.elevation.level4, ...styles.bottomContainer }}>
        {!isLoading && balance && (
          <View style={styles.balanceContainer}>
            <Text variant="bodyLarge">{t("common:profile.balance.amount")}</Text>
            <View style={styles.balance}>
              <Text variant="displayLarge">{balance?.formatted?.slice(0, 6)}</Text>
              <MaticSvg width={50} height={50} />
            </View>
          </View>
        )}
        {!isLoading && isConnected && (
          <Button mode="contained" onPress={() => refetch()}>
            {t("common:profile.buttons.update").toUpperCase()}
          </Button>
        )}
        {isConnected && !isLoading && (
          <Button mode="contained-tonal" onPress={() => setIsLogoutDialogVisible(true)}>
            {t("common:settings.buttons.logout").toUpperCase()}
          </Button>
        )}
        {!isConnected && !isLoading && (
          <View style={styles.connectContainer}>
            <DigitalCurrencySvg width={135} height={135} />
            <Text style={styles.textCenter} variant="titleLarge">{t("common:profile.balance.body-one")}</Text>
            <Text style={styles.textCenter} variant="bodyLarge">{t("common:profile.balance.body-two")}</Text>
            <Button style={styles.connectButton} mode="contained" onPress={onLogin}>
              {t("common:login.buttons.metamask").toUpperCase()}
            </Button>
          </View>
        )}
        {isLoading && <ActivityIndicator />}
      </View>
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
