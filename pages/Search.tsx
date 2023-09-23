import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button, Chip, Snackbar, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

import { styles } from "../styles/searchStyles";
import { getMoodColor, getMoodsArray } from "../utils/moodHelper";
import { MoodEnum } from "../constants/moods";
import { EntryStorage } from "../constants/EntryStorage";
import { RootState } from "../config/store";
import EntryCard from "../Components/EntryCard";
import { validateDateStr } from "../utils/validateDateStr";

export default function Search() {
  const { navigate } = useNavigation<any>();
  const { value: entries } = useSelector((state: RootState) => state.entries);

  const [isFromPickerVisible, setFromPickerVisibility] = useState(false);
  const [isToPickerVisible, setToPickerVisibility] = useState(false);
  const [isDateErrorSnackbarVisible, setIsDateErrorSnackbarVisible] = useState(false);
  const [content, setContent] = useState("");
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [entryStorages, setEntryStorages] = useState<EntryStorage[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<MoodEnum[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const onSearch = () => {};

  const confirmFromDate = (date: Date) => {
    setFromInput(format(new Date(date), "yyyy/MM/dd"));
    setFromPickerVisibility(false);
  };

  const confirmToDate = (date: Date) => {
    setToInput(format(new Date(date), "yyyy/MM/dd"));
    setToPickerVisibility(false);
  };

  const clearFilters = () => {
    setFromInput("");
    setToInput("");
    setSelectedMoods([]);
    setEntryStorages([]);
    setTagInput("");
    setTags([]);
  };

  const onDateFieldBlur = (text: string, onValidate: Function) => {
    if (!text) return;
    if (!validateDateStr(text)) {
      setIsDateErrorSnackbarVisible(true);
      onValidate();
    }
  };

  const onSelectMood = (key: MoodEnum) => {
    if (selectedMoods.includes(key)) {
      setSelectedMoods(selectedMoods.filter((mood) => mood !== key));
    } else {
      setSelectedMoods([...selectedMoods, key]);
    }
  };

  const onSelectStorage = (key: EntryStorage) => {
    if (entryStorages.includes(key)) {
      setEntryStorages(entryStorages.filter((mood) => mood !== key));
    } else {
      setEntryStorages([...entryStorages, key]);
    }
  };

  const submitTag = () => {
    setTags([...tags, tagInput]);
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
          <TextInput
            label="Content"
            onChangeText={(text) => setContent(text)}
            value={content}
            returnKeyType="done"
            onSubmitEditing={onSearch}
          />

          <Text variant="titleMedium">Mood:</Text>
          <View style={styles.chips}>
            {getMoodsArray().map((mood) => (
              <Chip
                key={mood.key}
                style={{ backgroundColor: getMoodColor(mood.key) }}
                onPress={() => onSelectMood(mood.key)}
                selected={selectedMoods.includes(mood.key)}
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

          <Text variant="titleMedium">Stored on:</Text>
          <View style={styles.chips}>
            <Chip
              onPress={() => onSelectStorage(EntryStorage.LOCAL)}
              selected={entryStorages.includes(EntryStorage.LOCAL)}
            >
              Local Device
            </Chip>
            <Chip
              onPress={() => onSelectStorage(EntryStorage.BLOCKCHAIN)}
              selected={entryStorages.includes(EntryStorage.BLOCKCHAIN)}
            >
              Blockchain
            </Chip>
          </View>
          <Text variant="titleMedium">Date:</Text>
          <View style={styles.dates}>
            <TextInput
              mode="outlined"
              right={<TextInput.Icon icon="calendar" onPress={() => setFromPickerVisibility(true)} />}
              label="From"
              placeholder="YYYY/MM/DD"
              value={fromInput}
              style={styles.dateInput}
              onChangeText={(text) => setFromInput(text)}
              onEndEditing={(e) => onDateFieldBlur(e.nativeEvent.text, () => setFromInput(""))}
            />
            <DateTimePickerModal
              isVisible={isFromPickerVisible}
              mode="date"
              onConfirm={confirmFromDate}
              onCancel={() => setFromPickerVisibility(false)}
            />
            <TextInput
              mode="outlined"
              right={<TextInput.Icon icon="calendar" onPress={() => setToPickerVisibility(true)} />}
              label="To"
              placeholder="YYYY/MM/DD"
              value={toInput}
              style={styles.dateInput}
              onChangeText={(text) => setToInput(text)}
              onEndEditing={(e) => onDateFieldBlur(e.nativeEvent.text, () => setToInput(""))}
            />
            <DateTimePickerModal
              isVisible={isToPickerVisible}
              mode="date"
              onConfirm={confirmToDate}
              onCancel={() => setToPickerVisibility(false)}
            />
          </View>
          <View style={styles.buttonsRow}>
            <Button onPress={() => clearFilters()}>CLEAR FILTERS</Button>
            <Button mode="contained" onPress={() => onSearch()}>
              SEARCH
            </Button>
          </View>
          {entries.length > 0 && <Text variant="titleLarge">Results</Text>}
          <View style={styles.entryList}>
            {entries.map((item) => (
              <EntryCard key={item.id} {...item} onPress={() => navigate("ViewEntry", { id: item.id })} />
            ))}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Snackbar visible={isDateErrorSnackbarVisible} onDismiss={() => setIsDateErrorSnackbarVisible(false)}>
        Invalid date.
      </Snackbar>
    </SafeAreaView>
  );
}
