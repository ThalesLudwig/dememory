import { ScrollView, View } from "react-native";
import { styles } from "../styles/settingsStyles";
import { SafeAreaView } from "react-navigation";
import { Avatar, Button, Divider, List, Text, useTheme } from "react-native-paper";

export default function Settings() {
  const { colors } = useTheme();

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
            <List.Item title="Theme" />
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
    </SafeAreaView>
  );
}
