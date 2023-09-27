import { Button, Dialog, Snackbar, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { resetState } from "../../config/entriesSlice";

type ResetSettingsProps = {
  isResetDialogVisible: boolean;
  isResetSnackbarVisible: boolean;
  setIsResetDialogVisible: Function;
  setIsResetSnackbarVisible: Function;
};

const ResetSettings = ({
  isResetDialogVisible,
  isResetSnackbarVisible,
  setIsResetDialogVisible,
  setIsResetSnackbarVisible,
}: ResetSettingsProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const resetEntries = () => {
    dispatch(resetState());
    setIsResetSnackbarVisible(true);
    setIsResetDialogVisible(false);
  };

  return (
    <>
      <Dialog visible={isResetDialogVisible} onDismiss={() => setIsResetDialogVisible(false)}>
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={{ textAlign: "center" }}>{t("common:modals.reset.title")}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{t("common:modals.reset.descriptions")}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="outlined" onPress={() => setIsResetDialogVisible(false)}>
            {t("common:modals.reset.buttons.no").toUpperCase()}
          </Button>
          <Button mode="contained" onPress={() => resetEntries()}>
            {t("common:modals.reset.buttons.yes").toUpperCase()}
          </Button>
        </Dialog.Actions>
      </Dialog>
      <Snackbar
        visible={isResetSnackbarVisible}
        onDismiss={() => setIsResetSnackbarVisible(false)}
        action={{
          label: "Close",
          onPress: () => setIsResetSnackbarVisible(false),
        }}
      >
        {t("common:modals.reset.confirmation")}
      </Snackbar>
    </>
  );
};

export default ResetSettings;
