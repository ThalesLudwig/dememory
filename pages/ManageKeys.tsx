import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { ActivityIndicator, Button, Portal, Snackbar, Text, useTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useDispatch } from "react-redux";
import { authenticateAsync } from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";

import { styles } from "../styles/retrieveBackupStyles";
import ManageKeysSvg from "../Components/ManageKeysSvg";
import Alert from "../Components/Alert";
import { useRSAKeys } from "../hooks/useRSAKeys";
import { setKeys } from "../config/keysSlice";
import ImportKeysDialog from "../Components/ImportKeysDialog";

const fileUri = FileSystem.documentDirectory + "dememory.keys";

export default function ManageKeys() {
  const { colors } = useTheme();
  const { goBack } = useNavigation<any>();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { error, isLoading, generateKeys, hasKeys, publicKey, privateKey } = useRSAKeys();
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [displayImportKeysDialog, setDisplayImportKeysDialog] = useState(false);

  useEffect(() => {
    authenticateAsync().then(({ success }) => !success && goBack());
  }, []);

  useEffect(() => {
    if (error) {
      setSnackbarContent(t("common:settings.backup.retrieve.error"));
      setIsSnackbarVisible(true);
      console.error(error);
    }
  }, [error]);

  const generateNewKeys = async () => {
    try {
      await generateKeys();
      setSnackbarContent(t("common:settings.manage-keys.generate.success"));
      setIsSnackbarVisible(true);
    } catch (error: any) {
      setSnackbarContent(error.message);
      setIsSnackbarVisible(true);
      console.error(error);
    }
  };

  const exportKeys = async () => {
    let content = JSON.stringify({ publicKey, privateKey });
    FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });
    Sharing.shareAsync(fileUri)
      .then(() => {
        setSnackbarContent(t("common:settings.manage-keys.export.success"));
        setIsSnackbarVisible(true);
      })
      .catch((error) => {
        setSnackbarContent(t("common:settings.manage-keys.export.error"));
        setIsSnackbarVisible(true);
        console.error(error);
      });
  };

  const importKeys = async () => {
    setDisplayImportKeysDialog(false);
    try {
      const fileResponse = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });
      if (fileResponse.canceled) return;
      const fileUri = fileResponse.assets?.[0].uri;
      if (!fileUri) throw new Error();
      const resultStr = await FileSystem.readAsStringAsync(fileUri);
      const keys = JSON.parse(resultStr);
      dispatch(setKeys({ public: keys.publicKey, private: keys.privateKey }));
      setSnackbarContent(t("common:settings.manage-keys.import.success"));
      setIsSnackbarVisible(true);
    } catch (error: any) {
      setSnackbarContent(error.message ?? t("common:settings.manage-keys.import.error"));
      setIsSnackbarVisible(true);
    }
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <View style={styles.body}>
        <View style={styles.imgContainer}>
          <ManageKeysSvg width={130} height={130} />
          <Text style={styles.description} variant="bodyLarge">
            {t("common:settings.manage-keys.description")}
          </Text>
        </View>
        <Alert text={t("common:settings.manage-keys.alert")} />
        {isLoading && <ActivityIndicator />}
        {!hasKeys && !isLoading && (
          <Button mode="contained" onPress={generateNewKeys}>
            {t("common:settings.manage-keys.buttons.generate").toUpperCase()}
          </Button>
        )}
        {hasKeys && !isLoading && (
          <Button mode="contained" onPress={exportKeys}>
            {t("common:settings.manage-keys.buttons.export").toUpperCase()}
          </Button>
        )}
        {!isLoading && (
          <Button mode="outlined" onPress={() => (hasKeys ? setDisplayImportKeysDialog(true) : importKeys())}>
            {t("common:settings.manage-keys.buttons.import").toUpperCase()}
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
        <ImportKeysDialog
          isOpen={displayImportKeysDialog}
          setIsOpen={setDisplayImportKeysDialog}
          onConfirm={importKeys}
        />
      </Portal>
    </SafeAreaView>
  );
}
