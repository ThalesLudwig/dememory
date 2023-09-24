import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, Pressable } from "react-native";
import { Button, Chip, IconButton, SegmentedButtons, Surface, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-navigation";
import "react-native-get-random-values";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import ImageView from "react-native-image-viewing";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import { getMoodColor, getMoodsArray } from "../utils/moodHelper";
import { MoodEnum } from "../constants/moods";
import { Entry } from "../types/Entry";
import { updateEntry } from "../config/entriesSlice";
import { RootStackParamList } from "../Components/Router";
import { RootState } from "../config/store";
import { styles } from "../styles/editEntryStyles";
import { storageButtons } from "../constants/storage";

type Props = NativeStackScreenProps<RootStackParamList, "EditEntry">;

const initialState: Entry = {
  id: "",
  content: "",
  date: new Date(),
  imagesUrl: [],
};

export default function EditEntry({ route }: Props) {
  const dispatch = useDispatch<any>();
  const { navigate } = useNavigation<any>();
  const entries = useSelector((state: RootState) => state.entries.value);
  const entry = entries.find((entry) => entry.id === route.params.id) || initialState;

  const [entryStorage, setEntryStorage] = useState<string>(entry.storage?.toString() || "0");
  const [content, setContent] = useState(entry.content);
  const [selectedMood, setSelectedMood] = useState<MoodEnum>(entry.mood || 1);
  const [images, setImages] = useState<string[]>(entry.imagesUrl || []);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [openedImageIndex, setOpenedImageIndex] = useState(0);
  const [tags, setTags] = useState<string[]>(entry.tags || []);
  const [tagInput, setTagInput] = useState("");

  const submitForm = () => {
    const editedEntry: Entry = {
      ...entry,
      content,
      tags,
      mood: selectedMood,
      imagesUrl: images,
    };
    dispatch(updateEntry(editedEntry));
    navigate("ViewEntry", { id: entry.id });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setImages([...images, result.assets[0].uri]);
  };

  const onPressImage = (index: number) => {
    setOpenedImageIndex(index);
    setIsImageOpen(true);
  };

  const onDeleteImage = (index: number) => {
    const tempImages = [...images];
    tempImages.splice(index, 1);
    setImages(tempImages);
  };

  const submitTag = () => {
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  const deleteTag = (index: number) => {
    const tempTags = [...tags];
    tempTags.splice(index, 1);
    setTags(tempTags);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Text variant="titleMedium">Entry saved on:</Text>
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
          <Text variant="titleMedium">Tags:</Text>
          <TextInput
            mode="outlined"
            right={<TextInput.Icon icon="send" onPress={() => submitTag()} />}
            label="#"
            value={tagInput}
            onChangeText={(text) => setTagInput(text)}
            returnKeyType="done"
            onSubmitEditing={submitTag}
          />
          <View style={styles.tagRow}>
            {tags.map((tag, i) => (
              <Chip key={i} mode="outlined" onClose={() => deleteTag(i)}>
                {tag}
              </Chip>
            ))}
          </View>
          <Text variant="titleMedium">Photos:</Text>
          <View style={styles.images}>
            {images.map((imageUrl, i) => (
              <View key={i}>
                <Pressable onPress={() => onPressImage(i)}>
                  <Image source={{ uri: imageUrl }} style={styles.thumbnail} />
                </Pressable>
                <IconButton
                  style={styles.deleteImage}
                  icon="delete"
                  mode="contained"
                  onPress={() => onDeleteImage(i)}
                />
              </View>
            ))}
            <Pressable onPress={pickImage}>
              <Surface style={styles.addImage} elevation={0}>
                <Text variant="titleLarge" style={{ color: "lightgrey" }}>
                  +
                </Text>
              </Surface>
            </Pressable>
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
          UPDATE ENTRY
        </Button>
      </ScrollView>
      <ImageView
        images={[{ uri: images[openedImageIndex] }]}
        imageIndex={0}
        visible={isImageOpen}
        onRequestClose={() => setIsImageOpen(false)}
      />
    </SafeAreaView>
  );
}
