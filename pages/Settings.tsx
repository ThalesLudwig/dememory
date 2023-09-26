import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Avatar, Button, Divider, List, Portal, Text, useTheme } from "react-native-paper";
import { useState } from "react";

import { styles } from "../styles/settingsStyles";
import ThemeSettings from "../Components/Settings/ThemeSettings";
import ResetSettings from "../Components/Settings/ResetSettings";
import LanguageSettings from "../Components/Settings/LanguageSettings";

export default function Settings() {
  const { colors } = useTheme();

  const [isThemeVisible, setIsThemeVisible] = useState(false);
  const [isLanguagesVisible, setIsLanguagesVisible] = useState(false);
  const [isResetDialogVisible, setIsResetDialogVisible] = useState(false);
  const [isResetSnackbarVisible, setIsResetSnackbarVisible] = useState(false);

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
            <List.Item title="Languages" onPress={() => setIsLanguagesVisible(true)} />
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
        <ThemeSettings isThemeVisible={isThemeVisible} setIsThemeVisible={setIsThemeVisible} />
        <LanguageSettings isModalVisible={isLanguagesVisible} setIsModalVisible={setIsLanguagesVisible} />
        <ResetSettings
          isResetDialogVisible={isResetDialogVisible}
          isResetSnackbarVisible={isResetSnackbarVisible}
          setIsResetDialogVisible={setIsResetDialogVisible}
          setIsResetSnackbarVisible={setIsResetSnackbarVisible}
        />
      </Portal>
    </SafeAreaView>
  );
}
