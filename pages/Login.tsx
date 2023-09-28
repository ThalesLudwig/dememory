import { ImageBackground, View } from "react-native";
import { Button, Divider, Portal, Snackbar, Text, useTheme } from "react-native-paper";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { styles } from "../styles/loginStyles";
import { setShowLoginPage } from "../config/profileSlice";
import { RootState } from "../config/store";

export default function Login() {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const { goBack } = useNavigation<any>();
  const { showLoginPage } = useSelector((state: RootState) => state.profile);

  const [isUnavailableSnackbarVisible, setIsUnavailableSnackbarVisible] = useState(false);

  const onUseOnLocalDevice = () => {
    if (!showLoginPage) {
      goBack();
    } else {
      dispatch(setShowLoginPage(false));
    }
  };

  const onLogin = async () => {
    // const MMSDK = await new MetaMaskSDK({
    //   openDeeplink: (link) => {
    //     Linking.openURL(link);
    //   },
    //   timer: BackgroundTimer, // Keep the dapp alive once it goes to background.
    //   dappMetadata: { name: "Dememory" },
    // });
    // await MMSDK.init();
    // const ethereum = MMSDK.getProvider();
    // const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    // console.log(accounts);
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
      <Portal>
        <Snackbar
          visible={isUnavailableSnackbarVisible}
          onDismiss={() => setIsUnavailableSnackbarVisible(false)}
          wrapperStyle={{ bottom: showLoginPage ? 0 : 80 }}
          action={{ label: t("common:settings.buttons.close"), onPress: () => setIsUnavailableSnackbarVisible(false) }}
        >
          {t("common:login.snackbar.not-available")}
        </Snackbar>
      </Portal>
    </View>
  );
}
