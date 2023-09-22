import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Image, ScrollView, Pressable } from "react-native";
import { Button, Chip, Dialog, Portal, Surface, Text } from "react-native-paper";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import ImageView from "react-native-image-viewing";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../Components/Router";
import { useSelector } from "react-redux";
import { RootState } from "../config/store";
import { Entry } from "../types/Entry";
import { getMoodColor, getMoodName } from "../utils/moodHelper";
import { removeEntry, updateEntry } from "../config/entriesSlice";

type Props = NativeStackScreenProps<RootStackParamList, "ViewEntry">;

const initialState: Entry = {
  id: "",
  content: "",
  date: new Date(),
  imagesUrl: [],
};

export const ViewEntry = ({ route }: Props) => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation<any>();
  const entries = useSelector((state: RootState) => state.entries.value);
  const [entry, setEntry] = useState<Entry>(entries.find((entry) => entry.id === route.params.id) || initialState);
  const moodColor = getMoodColor(entry.mood || 1);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [openedImageIndex, setOpenedImageIndex] = useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
          <Text variant="titleLarge">Entry date</Text>
          <Chip icon="clock">{format(new Date(entry.date), "PPPP - kk:mm")}</Chip>
          <Text variant="titleMedium">What happened today?</Text>
          <Surface style={styles.content}>
            <Text variant="bodyLarge">{entry.content}</Text>
          </Surface>
          <Button icon="pin" mode="contained-tonal" style={{ alignSelf: "flex-start" }} onPress={toogleFavorites}>
            {entry.isPinned ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
          <Text variant="titleMedium">How were you feeling?</Text>
          <Chip icon="heart" style={{ backgroundColor: moodColor, ...styles.chip }}>
            {getMoodName(entry.mood || 1)}
          </Chip>
          {!!entry.imagesUrl && entry.imagesUrl.length > 0 && (
            <>
              <Text variant="titleMedium">Photos:</Text>
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
        <View style={styles.buttons}>
          <Button icon="pencil" mode="contained" onPress={() => {}}>
            EDIT ENTRY
          </Button>
          <Button icon="delete" mode="elevated" onPress={() => setIsDeleteDialogOpen(true)}>
            DELETE
          </Button>
        </View>
      </ScrollView>
      <ImageView
        images={[{ uri: entry.imagesUrl?.[openedImageIndex] }]}
        imageIndex={0}
        visible={isImageOpen}
        onRequestClose={() => setIsImageOpen(false)}
      />
      <Portal>
        <Dialog visible={isDeleteDialogOpen} onDismiss={() => setIsDeleteDialogOpen(false)}>
          <Dialog.Icon icon="alert" />
          <Dialog.Title style={{ textAlign: "center" }}>Delete this entry?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to permanently delete this entry? This action cannot be undone.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="outlined" onPress={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button mode="contained" onPress={deleteEntry}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    gap: 15,
  },
  chip: {
    alignSelf: "flex-start",
    height: 32,
  },
  images: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  content: {
    padding: 15,
    borderRadius: 10,
  },
  buttons: {
    padding: 15,
    gap: 10,
    marginTop: 15,
  },
});

export default ViewEntry;
