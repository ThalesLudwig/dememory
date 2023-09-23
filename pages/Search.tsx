import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "../styles/searchStyles";

export default function Search() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.body}>
        <Text>Search</Text>
      </View>
    </KeyboardAvoidingView>
  );
}
