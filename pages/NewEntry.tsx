import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View, ScrollView } from "react-native";
import { Button, Chip, SegmentedButtons, Surface, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-navigation";

import { EntryStorage } from "../constants/EntryStorage";
import { getMoodColor, getMoodsArray } from "../utils/moodHelper";
import { MoodEnum } from "../constants/moods";

export default function NewEntry() {
  const [entryStorage, setEntryStorage] = useState(EntryStorage.LOCAL.toString());
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState(MoodEnum.NEUTRAL);

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
          onPress={() => console.log("Pressed")}
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
