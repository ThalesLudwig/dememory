import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button, Portal, Snackbar, Switch, Text, useTheme } from "react-native-paper";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useDispatch } from "react-redux";

import { styles } from "../styles/retrieveBackupStyles";
import RetrieveSvg from "../Components/RetrieveSvg";
import { resetState, mergeState } from "../config/entriesSlice";
import Alert from "../Components/Alert";

export default function RetrieveBackup() {
  const { colors } = useTheme();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [shouldMerge, setShouldMerge] = useState(true);

  const retrieveBackup = async () => {
    try {
      const fileResponse = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: "application/json",
      });
      if (fileResponse.canceled) return;
      const fileUri = fileResponse.assets?.[0].uri;
      if (!fileUri) throw new Error();
      const resultStr = await FileSystem.readAsStringAsync(fileUri);
      const entries = JSON.parse(resultStr);
      dispatch(shouldMerge ? mergeState(entries) : resetState(entries));
      setSnackbarContent(t("common:settings.backup.retrieve.success"));
      setIsSnackbarVisible(true);
    } catch (error) {
      setSnackbarContent(t("common:settings.backup.retrieve.error"));
      setIsSnackbarVisible(true);
    }
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <View style={styles.body}>
        <View style={styles.imgContainer}>
          <RetrieveSvg width={150} height={150} />
          <Text style={styles.description} variant="bodyLarge">
            {t("common:settings.backup.retrieve.description")}
          </Text>
        </View>
        <Alert text={t("common:settings.backup.retrieve.alert.ipfs")} />
        <View style={styles.switch}>
          <Text variant="bodyLarge">{t("common:settings.backup.retrieve.merge-toogle")}</Text>
          <Switch value={shouldMerge} onValueChange={setShouldMerge} />
        </View>
        {!shouldMerge && <Alert text={t("common:settings.backup.retrieve.alert.merge")} isDanger />}
        <Button mode="contained" onPress={retrieveBackup}>
          {t("common:settings.backup.retrieve.title").toUpperCase()}
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
