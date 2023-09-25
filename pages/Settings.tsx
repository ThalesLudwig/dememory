import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Avatar, Button, Dialog, Divider, List, Modal, Portal, Snackbar, Text, useTheme } from "react-native-paper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "../styles/settingsStyles";
import { setTheme } from "../config/themeSlice";
import { RootState } from "../config/store";
import { resetState } from "../config/entriesSlice";

export default function Settings() {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { value: selectedTheme } = useSelector((state: RootState) => state.theme);

  const [isThemeVisible, setIsThemeVisible] = useState(false);

  const [isResetDialogVisible, setIsResetDialogVisible] = useState(false);
  const [isResetSnackbarVisible, setIsResetSnackbarVisible] = useState(false);

  const resetEntries = () => {
    dispatch(resetState());
    setIsResetSnackbarVisible(true);
    setIsResetDialogVisible(false);
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.avatar}>
            <Avatar.Icon icon="account-outline" size={70} />
            <Text style={styles.wallet} variant="titleMedium">
              0x449...F52B
            </Text>
            <Button mode="text">Logout</Button>
          </View>
          <Divider />
          <List.Section>
            <List.Subheader>Preferences</List.Subheader>
            <List.Item title="Theme" onPress={() => setIsThemeVisible(true)} />
            <List.Item title="Languages" />
          </List.Section>
          <Divider />
          <List.Section>
            <List.Subheader>Security</List.Subheader>
            <List.Item title="App Lock" />
            <List.Item title="Therapy Share" />
          </List.Section>
          <Divider />
          <List.Section>
            <List.Subheader>Entries</List.Subheader>
            <List.Item title="Save Local Backup" />
            <List.Item title="Reset Entries" onPress={() => setIsResetDialogVisible(true)} />
          </List.Section>
          <Button mode="contained">BUY JOURNALY</Button>
        </View>
      </ScrollView>
      <Portal>
        <Modal
          contentContainerStyle={{ ...styles.modal, backgroundColor: colors.background }}
          visible={isThemeVisible}
          onDismiss={() => setIsThemeVisible(false)}
        >
          <List.Item
            title="Light"
            onPress={() => dispatch(setTheme("light"))}
            titleStyle={{ fontWeight: selectedTheme === "light" ? "800" : "400" }}
          />
          <List.Item
            title="Dark"
            onPress={() => dispatch(setTheme("dark"))}
            titleStyle={{ fontWeight: selectedTheme === "dark" ? "800" : "400" }}
          />
          <List.Item
            title="Automatic (system)"
            onPress={() => dispatch(setTheme("device"))}
            titleStyle={{ fontWeight: selectedTheme === "device" ? "800" : "400" }}
          />
        </Modal>

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
      </Portal>
    </SafeAreaView>
  );
}
