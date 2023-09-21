import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View, ScrollView, Pressable } from "react-native";
import { Button, Chip, IconButton, SegmentedButtons, Surface, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import "react-native-get-random-values";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as ImagePicker from "expo-image-picker";
import ImageView from "react-native-image-viewing";

import { EntryStorage } from "../constants/EntryStorage";
import { getMoodColor, getMoodsArray } from "../utils/moodHelper";
import { MoodEnum } from "../constants/moods";
import { Entry } from "../types/Entry";
import { addEntry } from "../config/entriesSlice";

export default function NewEntry() {
  const dispatch = useDispatch<any>();
  const { navigate } = useNavigation<any>();
  const [entryStorage, setEntryStorage] = useState(EntryStorage.LOCAL.toString());
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState(MoodEnum.NEUTRAL);
  const [image, setImage] = useState("");
  const [isImageOpen, setIsImageOpen] = useState(false);

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

  const resetForm = () => {
    setEntryStorage(EntryStorage.LOCAL.toString());
    setContent("");
    setSelectedMood(1);
    setImage("");
  };

  const submitForm = () => {
    const entry: Entry = { id: uuidv4(), mood: selectedMood, content, date: new Date(), imageUrl: image };
    dispatch(addEntry(entry));
    resetForm();
    navigate("ViewEntry", { id: entry.id });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
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
          <Text variant="titleMedium">Photo:</Text>
          <View style={styles.images}>
            {!!image && (
              <View style={styles.imageViewer}>
                <Pressable onPress={() => setIsImageOpen(true)}>
                  <Image source={{ uri: image }} style={styles.thumbnail} />
                </Pressable>
                <IconButton icon="delete" size={18} mode="contained" onPress={() => setImage("")} />
              </View>
            )}
            {!image && (
              <Pressable onPress={pickImage}>
                <Surface style={styles.addImage} elevation={0}>
                  <Text variant="titleLarge" style={{ color: "lightgrey" }}>
                    +
                  </Text>
                </Surface>
              </Pressable>
            )}
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
      <ImageView
        images={[{ uri: image }]}
        imageIndex={0}
        visible={isImageOpen}
        onRequestClose={() => setIsImageOpen(false)}
      />
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
  imageViewer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },
});
