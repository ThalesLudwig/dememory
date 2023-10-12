import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { SafeAreaView, View, Image, ScrollView, Pressable } from "react-native";
import { Button, Chip, Portal, SegmentedButtons, Surface, Text, useTheme } from "react-native-paper";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import ImageView from "react-native-image-viewing";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { RootStackParamList } from "../Components/Router";
import { useSelector } from "react-redux";
import { RootState } from "../config/store";
import { Entry } from "../types/Entry";
import { getMoodColor, getMoodName } from "../utils/moodHelper";
import { removeEntry, updateEntry } from "../config/entriesSlice";
import { styles } from "../styles/viewEntryStyles";
import { storageButtons } from "../constants/storage";
import { useDateLocale } from "../hooks/useDateLocale";
import { EntryStorage } from "../constants/EntryStorage";
import DeleteEntryDialog from "../Components/DeleteEntryDialog";
import Alert from "../Components/Alert";

type Props = NativeStackScreenProps<RootStackParamList, "ViewEntry">;

const initialState: Entry = {
  id: "",
  content: "",
  date: new Date(),
  imagesUrl: [],
};

export const ViewEntry = ({ route }: Props) => {
  const { t } = useTranslation("common");
  const { colors, dark } = useTheme();
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation<any>();
  const entries = useSelector((state: RootState) => state.entries.value);
  const locale = useDateLocale();

  const [entry, setEntry] = useState<Entry>(entries.find((entry) => entry.id === route.params.id) || initialState);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [openedImageIndex, setOpenedImageIndex] = useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const moodColor = getMoodColor(entry.mood || 1, dark);

  useEffect(() => {
    const stateEntry = entries.find((entry) => entry.id === route.params.id);
    if (stateEntry) setEntry(stateEntry);
  }, [entries, route.params]);

  const toogleFavorites = () => {
    dispatch(updateEntry({ ...entry, isPinned: !entry.isPinned }));
  };

  const deleteEntry = () => {
    dispatch(removeEntry(entry.id));
    setIsDeleteDialogOpen(false);
    goBack();
  };

  const onPressImage = (index: number) => {
    setOpenedImageIndex(index);
    setIsImageOpen(true);
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={styles.body}>
          <Text variant="titleLarge">{t("common:view-entry.titles.date")}</Text>
          <Alert icon="clock" text={format(new Date(entry.date), "PPPP - kk:mm", { locale })} />
          <Text variant="titleMedium">{t("common:view-entry.titles.save-on")}:</Text>
          <SegmentedButtons
            value={entry.storage?.toString() || "0"}
            onValueChange={() => {}}
            buttons={storageButtons()}
          />
          {entry.storage === EntryStorage.BLOCKCHAIN && (
            <>
              <Text variant="titleMedium">Tnx Hash</Text>
              <Chip style={styles.tnxHash} closeIcon="content-copy" onClose={() => {}} onPress={() => {}}>
                0x000...1234
              </Chip>
            </>
          )}
          <Text variant="titleMedium">{t("common:view-entry.titles.thinking")}</Text>
          <Surface style={styles.content} mode="flat">
            <Text variant="bodyLarge">{entry.content}</Text>
          </Surface>
          <Button
            icon={entry.isPinned ? "heart" : "cards-heart-outline"}
            mode="contained-tonal"
            style={{ alignSelf: "flex-start" }}
            onPress={toogleFavorites}
          >
            {entry.isPinned ? t("common:buttons.remove-favorites") : t("common:buttons.add-favorites")}
          </Button>
          <Text variant="titleMedium">{t("common:view-entry.titles.feeling")}</Text>
          <Chip icon="emoticon-happy-outline" style={{ backgroundColor: moodColor, ...styles.chip }}>
            {getMoodName(entry.mood || 1)}
          </Chip>
          {!!entry.tags && entry.tags.length > 0 && (
            <Text variant="titleMedium">{t("common:view-entry.titles.tags")}:</Text>
          )}
          <View style={styles.tagRow}>
            {entry.tags?.map((tag, i) => (
              <Chip key={i} mode="outlined">
                {tag}
              </Chip>
            ))}
          </View>
          {!!entry.imagesUrl && entry.imagesUrl.length > 0 && (
            <>
              <Text variant="titleMedium">{t("common:view-entry.titles.photos")}:</Text>
              <View style={styles.images}>
                {entry.imagesUrl.map((imageUrl, i) => (
                  <Pressable onPress={() => onPressImage(i)} key={i}>
                    <Image source={{ uri: imageUrl }} style={styles.thumbnail} />
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </View>
        {entry.storage === EntryStorage.BLOCKCHAIN && (
          <View style={styles.buttons}>
            <Button icon="ethereum" mode="contained" onPress={() => {}}>
              {t("common:view-entry.buttons.view-chain").toUpperCase()}
            </Button>
          </View>
        )}
        {entry.storage === EntryStorage.LOCAL && (
          <View style={styles.buttons}>
            <Button icon="pencil" mode="contained" onPress={() => navigate("EditEntry", { id: entry.id })}>
              {t("common:view-entry.buttons.edit").toUpperCase()}
            </Button>
            <Button icon="delete" mode="contained-tonal" onPress={() => setIsDeleteDialogOpen(true)}>
              {t("common:view-entry.buttons.delete").toUpperCase()}
            </Button>
          </View>
        )}
      </ScrollView>
      <ImageView
        images={[{ uri: entry.imagesUrl?.[openedImageIndex] }]}
        imageIndex={0}
        visible={isImageOpen}
        onRequestClose={() => setIsImageOpen(false)}
      />
      <Portal>
        <DeleteEntryDialog isOpen={isDeleteDialogOpen} onDelete={deleteEntry} setIsOpen={setIsDeleteDialogOpen} />
      </Portal>
    </SafeAreaView>
  );
};

export default ViewEntry;
