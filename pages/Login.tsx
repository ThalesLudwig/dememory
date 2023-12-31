import { ImageBackground, View } from "react-native";
import { ActivityIndicator, Button, Divider, Portal, Snackbar, Text, useTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount } from "wagmi";

import { styles } from "../styles/loginStyles";
import { setShowLoginPage } from "../config/profileSlice";
import { RootState } from "../config/store";

export default function Login() {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const { goBack } = useNavigation<any>();
  const { showLoginPage } = useSelector((state: RootState) => state.profile);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { open: openConnectDialog } = useWeb3Modal()
  const { isConnected } = useAccount()

  const onUseOnLocalDevice = () => {
    if (!showLoginPage) {
      goBack();
    } else {
      dispatch(setShowLoginPage(false));
    }
  };

  useEffect(() => {
    if (isConnected) dispatch(setShowLoginPage(false));
  }, [isConnected]);

  const onLogin = () => {
    setIsLoading(true);
    openConnectDialog()
      .catch(error => {
        setSnackbarContent(error);
        setIsSnackbarVisible(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <ImageBackground source={require("../assets/login.jpeg")} style={styles.image}>
        <Text variant="headlineMedium" style={styles.title}>
          {t("common:login.title")}
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          {t("common:login.subtitle")}
        </Text>
      </ImageBackground>
      {!!isLoading && (
        <View style={styles.body}>
          <ActivityIndicator />
        </View>
      )}
      {!isLoading && (
        <View style={styles.body}>
          <Button mode="contained" onPress={onLogin}>
            {t("common:login.buttons.metamask").toUpperCase()}
          </Button>
          <View style={styles.dividerRow}>
            <Divider style={styles.divider} />
            <Text variant="bodyLarge">{t("common:login.descriptions.or").toUpperCase()}</Text>
            <Divider style={styles.divider} />
          </View>
          <Button mode="outlined" onPress={onUseOnLocalDevice}>
            {t("common:login.buttons.local").toUpperCase()}
          </Button>
        </View>
      )}
      <Portal>
        <Snackbar
          visible={isSnackbarVisible}
          onDismiss={() => setIsSnackbarVisible(false)}
          wrapperStyle={{ bottom: showLoginPage ? 0 : 80 }}
          action={{ label: t("common:settings.buttons.close"), onPress: () => setIsSnackbarVisible(false) }}
        >
          {snackbarContent}
        </Snackbar>
      </Portal>
    </View>
  );
}
