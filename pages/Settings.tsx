import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "../styles/settingsStyles";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <StatusBar style="auto" />
    </View>
  );
}
