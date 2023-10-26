import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button, Chip, Portal, Snackbar, Text, TextInput, useTheme } from "react-native-paper";
import { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { isBefore, isEqual } from "date-fns";

import { styles } from "../styles/searchStyles";
import { getMoodColor, getMoodsArray } from "../utils/moodHelper";
import { MoodEnum } from "../constants/moods";
import { EntryStorage } from "../constants/EntryStorage";
import { validateDateStr } from "../utils/validateDateStr";
import { SearchType } from "../types/Search";
import CalendarDialog from "../Components/CalendarDialog";

export default function Search() {
  const { colors, dark } = useTheme();
  const { navigate } = useNavigation<any>();
  const { t } = useTranslation("common");

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

  const onSearch = () => {
    const isEmptyDates = !fromInput && !toInput;
    const isDateFieldsValid = validateDateStr(fromInput) && validateDateStr(toInput);

    const parsedFromDate = new Date(fromInput.replaceAll("/", "-"));
    const parsedToDate = new Date(toInput.replaceAll("/", "-"));

    const isIntervalValid = isBefore(parsedFromDate, parsedToDate) || isEqual(parsedFromDate, parsedToDate);

    if (!isEmptyDates && (!isDateFieldsValid || !isIntervalValid)) {
      setIsDateErrorSnackbarVisible(true);
      return;
    }

    const params: SearchType = {
      moods: selectedMoods,
      storages: entryStorages,
      tags,
      content,
      fromDate: fromInput,
      toDate: toInput,
    };
    navigate("SearchResults", params);
  };

  const confirmFromDate = (date: string) => {
    setFromInput(date);
    setFromPickerVisibility(false);
  };

  const confirmToDate = (date: string) => {
    setToInput(date);
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
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  const deleteTag = (index: number) => {
    const tempTags = [...tags];
    tempTags.splice(index, 1);
    setTags(tempTags);
  };

  const isSubmitDisabled = useMemo(() => {
    return (
      !content &&
      !fromInput &&
      !toInput &&
      entryStorages.length === 0 &&
      selectedMoods.length === 0 &&
      tags.length === 0
    );
  }, [content, fromInput, toInput, entryStorages, selectedMoods, tags]);

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <TextInput
            label={t("common:search.inputs.content")}
            onChangeText={(text) => setContent(text)}
            value={content}
            returnKeyType="done"
            onSubmitEditing={onSearch}
          />

          <Text variant="titleMedium">{t("common:search.titles.mood")}:</Text>
          <View style={styles.chips}>
            {getMoodsArray().map((mood) => (
              <Chip
                key={mood.key}
                style={{ backgroundColor: getMoodColor(mood.key, dark) }}
                onPress={() => onSelectMood(mood.key)}
                selected={selectedMoods.includes(mood.key)}
              >
                {mood.name}
              </Chip>
            ))}
          </View>
          <Text variant="titleMedium">{t("common:search.titles.stored-on")}:</Text>
          <View style={styles.chips}>
            <Chip
              onPress={() => onSelectStorage(EntryStorage.LOCAL)}
              selected={entryStorages.includes(EntryStorage.LOCAL)}
            >
              {t("common:search.descriptions.local-device")}
            </Chip>
            <Chip
              onPress={() => onSelectStorage(EntryStorage.BLOCKCHAIN)}
              selected={entryStorages.includes(EntryStorage.BLOCKCHAIN)}
            >
              {t("common:search.descriptions.blockchain")}
            </Chip>
          </View>
          <Text variant="titleMedium">{t("common:search.titles.tags")}:</Text>
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
          <Text variant="titleMedium">{t("common:search.titles.date")}:</Text>
          <View style={styles.dates}>
            <TextInput
              mode="outlined"
              right={<TextInput.Icon icon="calendar" onPress={() => setFromPickerVisibility(true)} />}
              label={t("common:search.inputs.from")}
              placeholder="YYYY/MM/DD"
              value={fromInput}
              style={styles.dateInput}
              onChangeText={(text) => setFromInput(text)}
              onEndEditing={(e) => onDateFieldBlur(e.nativeEvent.text, () => setFromInput(""))}
            />
            <TextInput
              mode="outlined"
              right={<TextInput.Icon icon="calendar" onPress={() => setToPickerVisibility(true)} />}
              label={t("common:search.inputs.to")}
              placeholder="YYYY/MM/DD"
              value={toInput}
              style={styles.dateInput}
              onChangeText={(text) => setToInput(text)}
              onEndEditing={(e) => onDateFieldBlur(e.nativeEvent.text, () => setToInput(""))}
            />
          </View>
          <View style={styles.buttonsRow}>
            <Button onPress={() => clearFilters()}>{t("common:search.buttons.clear-filters").toUpperCase()}</Button>
            <Button disabled={isSubmitDisabled} mode="contained" onPress={() => onSearch()}>
              {t("common:search.buttons.search").toUpperCase()}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Portal>
        <Snackbar
          visible={isDateErrorSnackbarVisible}
          onDismiss={() => setIsDateErrorSnackbarVisible(false)}
          wrapperStyle={{ bottom: 80 }}
        >
          {t("common:search.descriptions.invalid-date")}
        </Snackbar>
        <CalendarDialog isOpen={isFromPickerVisible} setIsOpen={setFromPickerVisibility} onSelect={confirmFromDate} />
        <CalendarDialog isOpen={isToPickerVisible} setIsOpen={setToPickerVisibility} onSelect={confirmToDate} />
      </Portal>
    </SafeAreaView>
  );
}
