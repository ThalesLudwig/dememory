import { Button, Dialog, Snackbar, Text } from "react-native-paper";
import { useDispatch } from "react-redux";

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

  const resetEntries = () => {
    dispatch(resetState());
    setIsResetSnackbarVisible(true);
    setIsResetDialogVisible(false);
  };

  return (
    <>
      <Dialog visible={isResetDialogVisible} onDismiss={() => setIsResetDialogVisible(false)}>
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={{ textAlign: "center" }}>Reset all entries?</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            Are you sure you want to permanently delete all local entries from this device? Entries saved on the
            Blockchain cannot be deleted. This action cannot be undone.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="outlined" onPress={() => setIsResetDialogVisible(false)}>
            CANCEL
          </Button>
          <Button mode="contained" onPress={() => resetEntries()}>
            RESET EVERYTHING
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
        Local entries successfully removed.
      </Snackbar>
    </>
  );
};

export default ResetSettings;
