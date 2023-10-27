import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Portal, Snackbar, Switch, Text, useTheme } from "react-native-paper";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { authenticateAsync } from "expo-local-authentication";

import { styles } from "../styles/saveBackupStyles";
import LockSvg from "../Components/LockSvg";
import { RootState } from "../config/store";
import { setIsAppLocked } from "../config/settingsSlice";

export default function DataLock() {
  const { colors } = useTheme();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { isAppLocked } = useSelector((state: RootState) => state.settings);

  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");

  const onChange = () => {
    authenticateAsync()
      .then(({ success }) => {
        if (success) {
          dispatch(setIsAppLocked(!isAppLocked));
        } else {
          setSnackbarContent(t("Autenticação falhou"));
          setIsSnackbarVisible(true);
        }
      })
      .catch((error) => {
        setSnackbarContent(error);
        setIsSnackbarVisible(true);
      });
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <View style={styles.body}>
        <View style={styles.imgContainer}>
          <LockSvg width={150} height={150} />
          <Text style={styles.description} variant="bodyLarge">
            {t("common:settings.lock.description")}
          </Text>
        </View>
        <View style={styles.switch}>
          <Text variant="bodyLarge">{t("common:settings.lock.protect-toogle")}</Text>
          <Switch value={isAppLocked} onValueChange={onChange} />
        </View>
      </View>
      <Portal>
        <Snackbar
          visible={isSnackbarVisible}
          onDismiss={() => setIsSnackbarVisible(false)}
          wrapperStyle={{ bottom: 80 }}
          action={{ label: t("common:settings.buttons.close"), onPress: () => setIsSnackbarVisible(false) }}
        >
          {snackbarContent}
        </Snackbar>
      </Portal>
    </SafeAreaView>
  );
}
