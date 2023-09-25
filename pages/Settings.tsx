import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Avatar, Button, Divider, List, Modal, Portal, Text, useTheme } from "react-native-paper";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { styles } from "../styles/settingsStyles";
import { setTheme } from "../config/themeSlice";

export default function Settings() {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const [isThemeVisible, setIsThemeVisible] = useState(false);

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
            <List.Item title="Reset Entries" />
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
          <List.Item title="Light" onPress={() => dispatch(setTheme("light"))} />
          <List.Item title="Dark" onPress={() => dispatch(setTheme("dark"))} />
          <List.Item title="Automatic (system)" onPress={() => dispatch(setTheme("device"))} />
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}
