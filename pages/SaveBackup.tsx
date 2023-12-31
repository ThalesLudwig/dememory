import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button, Portal, Snackbar, Switch, Text, useTheme, ActivityIndicator } from "react-native-paper";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import { styles } from "../styles/saveBackupStyles";
import BackupSvg from "../Components/BackupSvg";
import { RootState } from "../config/store";
import Alert from "../Components/Alert";
import { useRSAKeys } from "../hooks/useRSAKeys";

const fileUri = FileSystem.documentDirectory + "dememory.json";

export default function SaveBackup() {
  const { colors } = useTheme();
  const { t } = useTranslation("common");
  const { value: entries } = useSelector((state: RootState) => state.entries);
  const { error, isLoading, encryptContent } = useRSAKeys();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [shouldEncrypt, setShouldEncrypt] = useState(true);

  useEffect(() => {
    if (error) {
      setSnackbarContent(t("common:settings.backup.save.error"));
      setIsSnackbarVisible(true);
      console.error(error);
    }
  }, [error]);

  const saveBackup = async () => {
    let content = JSON.stringify(entries)
    if (shouldEncrypt) content = await encryptContent(content);
    FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });
    Sharing.shareAsync(fileUri)
      .then(() => {
        setSnackbarContent(t("common:settings.backup.save.success"));
        setIsSnackbarVisible(true);
      })
      .catch((error) => {
        setSnackbarContent(t("common:settings.backup.save.error"));
        setIsSnackbarVisible(true);
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <View style={styles.body}>
        <View style={styles.imgContainer}>
          <BackupSvg width={100} height={100} />
          <Text style={styles.description} variant="bodyLarge">
            {t("common:settings.backup.save.description")}
          </Text>
        </View>
        <View style={styles.switch}>
          <Text variant="bodyLarge">{t("common:settings.backup.save.encrypt-toogle")}</Text>
          <Switch value={shouldEncrypt} onValueChange={setShouldEncrypt} />
        </View>
        {!shouldEncrypt && (
          <Alert icon="key" text={t("common:settings.backup.save.alert.encrypt")} />
        )}
        {isLoading && <ActivityIndicator />}
        {!isLoading && (
          <Button mode="contained" onPress={saveBackup}>
            {t("common:settings.menus.save-backup").toUpperCase()}
          </Button>
        )}
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
