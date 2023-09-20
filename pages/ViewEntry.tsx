import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { RootStackParamList } from "../Components/Router";
import { useSelector } from "react-redux";
import { RootState } from "../config/store";
import { Entry } from "../types/Entry";

type Props = NativeStackScreenProps<RootStackParamList, "ViewEntry">;

const initialState: Entry = {
  id: "",
  content: "",
  date: new Date(),
};

export const ViewEntry = ({ route }: Props) => {
  const entries = useSelector((state: RootState) => state.entries.value);
  const [entry, setEntry] = useState<Entry>(entries.find((entry) => entry.id === route.params.id) || initialState);

  useEffect(() => {
    const stateEntry = entries.find((entry) => entry.id === route.params.id);
    if (stateEntry) setEntry(stateEntry);
  }, [entries, route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        {/* <Text variant="headlineSmall">{}</Text> */}
        <Text variant="titleLarge">What happened today?</Text>
        <Text variant="bodyLarge">{entry.content}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbfe",
  },
  body: {
    marginHorizontal: 15,
  },
});

export default ViewEntry;
