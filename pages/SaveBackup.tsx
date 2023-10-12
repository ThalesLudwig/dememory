import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button, Portal, Snackbar, Switch, Text, useTheme } from "react-native-paper";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import { styles } from "../styles/backupsStyles";
import BackupSvg from "../Components/BackupSvg";
import { RootState } from "../config/store";

const fileUri = FileSystem.documentDirectory + "dememory.json";

export default function Backups() {
  const { colors } = useTheme();
  const { t } = useTranslation("common");
  const { value: entries } = useSelector((state: RootState) => state.entries);

  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [shouldEncrypt, setShouldEncrypt] = useState(false);

  const saveBackup = async () => {
    FileSystem.writeAsStringAsync(fileUri, JSON.stringify(entries), { encoding: FileSystem.EncodingType.UTF8 });
    Sharing.shareAsync(fileUri)
      .then(() => {
        setSnackbarContent(t("Arquivo exportado com sucesso"));
        setIsSnackbarVisible(true);
      })
      .catch((error) => {
        setSnackbarContent(t("Ocorreu um erro ao exportar arquivo"));
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
            {t("Um arquivo de backup com seus registros será exportado. Guarde-o em um lugar seguro.")}
          </Text>
        </View>
        <View style={styles.switch}>
          <Text variant="bodyLarge">{t("Criptografar conteúdo")}</Text>
          <Switch value={shouldEncrypt} onValueChange={setShouldEncrypt} disabled />
        </View>
        <Button mode="contained" onPress={saveBackup}>
          {t("common:settings.menus.save-backup").toUpperCase()}
        </Button>
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
