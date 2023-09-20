import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View, ScrollView } from "react-native";
import { Button, Chip, SegmentedButtons, Surface, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import "react-native-get-random-values";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { EntryStorage } from "../constants/EntryStorage";
import { getMoodColor, getMoodsArray } from "../utils/moodHelper";
import { MoodEnum } from "../constants/moods";
import { Entry } from "../types/Entry";
import { addEntry } from "../config/entriesSlice";

export default function NewEntry() {
  const dispatch = useDispatch<any>();
  const [entryStorage, setEntryStorage] = useState(EntryStorage.LOCAL.toString());
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState(MoodEnum.NEUTRAL);
  const { navigate } = useNavigation<any>();

  const storageButtons = [
    {
      value: EntryStorage.LOCAL.toString(),
      label: "Local Device",
      icon: "cellphone",
    },
    {
      value: EntryStorage.BLOCKCHAIN.toString(),
      label: "Blockchain",
      icon: "ethereum",
    },
  ];

  const submitForm = () => {
    const entry: Entry = { id: uuidv4(), mood: selectedMood, content, date: new Date() };
    dispatch(addEntry(entry));
    resetForm();
    navigate("ViewEntry", { id: entry.id });
  };

  const resetForm = () => {
    setEntryStorage(EntryStorage.LOCAL.toString());
    setContent("");
    setSelectedMood(1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Text variant="titleMedium">Save entry on:</Text>
          <SegmentedButtons value={entryStorage} onValueChange={setEntryStorage} buttons={storageButtons} />
          <Text variant="titleMedium">What are you thinking?</Text>
          <TextInput multiline numberOfLines={5} value={content} onChangeText={setContent} />
          <Text variant="titleMedium">How are you feeling?</Text>
          <View style={styles.moods}>
            {getMoodsArray().map((mood) => (
              <Chip
                key={mood.key}
                style={{ backgroundColor: getMoodColor(mood.key) }}
                onPress={() => setSelectedMood(mood.key)}
                selected={selectedMood === mood.key}
              >
                {mood.name}
              </Chip>
            ))}
          </View>
          <Text variant="titleMedium">Photos:</Text>
          <View style={styles.images}>
            <Image
              source={{
                uri: "https://picsum.photos/700",
              }}
              style={styles.thumbnail}
            />
            <Surface style={styles.addImage} elevation={0}>
              <Text variant="titleLarge" style={{ color: "lightgrey" }}>
                +
              </Text>
            </Surface>
          </View>
        </KeyboardAvoidingView>
        <Button
          icon="send"
          contentStyle={{ flexDirection: "row-reverse" }}
          style={styles.submit}
          mode="contained"
          onPress={submitForm}
          disabled={!content.trim()}
        >
          SUBMIT
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbfe",
  },
  body: {
    marginHorizontal: 15,
    gap: 15,
  },
  moods: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  submit: {
    marginHorizontal: 15,
    marginVertical: 25,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  addImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderStyle: "dashed",
  },
});
