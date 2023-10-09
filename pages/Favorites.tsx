import { useMemo, useState } from "react";
import { SafeAreaView, View, SectionList } from "react-native";
import { Button, Chip, Dialog, Portal, Searchbar, Text, useTheme } from "react-native-paper";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useFavoriteEntries } from "../hooks/useFavoriteEntries";
import { Entry } from "../types/Entry";
import EntryCard from "../Components/EntryCard";
import EmptyState from "../Components/EmptyState";
import { styles } from "../styles/favoritesStyles";
import { useDateLocale } from "../hooks/useDateLocale";
import { removeEntry } from "../config/entriesSlice";

export default function Favorites() {
  const { t } = useTranslation("common");
  const { colors } = useTheme();
  const favoriteEntries = useFavoriteEntries();
  const { navigate } = useNavigation<any>();
  const locale = useDateLocale();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [swipedId, setSwipedId] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredEntries = useMemo(() => {
    if (!searchInput) return favoriteEntries;
    return favoriteEntries.filter(
      (entry) => entry.content.toLowerCase().includes(searchInput.toLowerCase()) || entry.tags?.includes(searchInput),
    );
  }, [favoriteEntries, searchInput]);

  const parsedEntries = useMemo(() => {
    const list: { title: string; data: Entry[] }[] = [];
    filteredEntries.forEach((entry) => {
      const date = format(new Date(entry.date), "MMMM, yyyy", { locale });
      const index = list.findIndex((e) => e.title === date);
      if (index >= 0) {
        list[index] = { title: list[index].title, data: [...list[index].data, entry] };
      } else {
        list.splice(index, 0, { title: date, data: [entry] });
      }
    });
    return list;
  }, [filteredEntries]);

  const onDelete = () => {
    dispatch(removeEntry(swipedId));
    setIsDeleteDialogOpen(false);
  };

  const onSwipeDelete = (id: string) => {
    setSwipedId(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <View style={styles.body}>
        <Searchbar
          placeholder={t("common:favorites.inputs.search")}
          onChangeText={(text) => setSearchInput(text)}
          value={searchInput}
          returnKeyType="done"
          style={styles.marginHorizontal}
        />
        <SectionList
          sections={parsedEntries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EntryCard
              onDelete={() => onSwipeDelete(item.id)}
              onEdit={() => navigate("EditEntry", { id: item.id })}
              key={item.id}
              {...item}
              onPress={() => navigate("ViewEntry", { id: item.id })}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Chip style={styles.marginHorizontal} icon="clock">
              {title}
            </Chip>
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <EmptyState
                description={t("common:favorites.descriptions.no-entries")}
                title={t("common:favorites.titles.no-entries")}
              />
            </View>
          }
          stickySectionHeadersEnabled={false}
        />
      </View>
      <Portal>
        <Dialog visible={isDeleteDialogOpen} onDismiss={() => setIsDeleteDialogOpen(false)}>
          <Dialog.Icon icon="alert" />
          <Dialog.Title style={{ textAlign: "center" }}>{t("common:modals.delete-entry.title")}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{t("common:modals.delete-entry.description")}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDeleteDialogOpen(false)}>{t("common:modals.delete-entry.buttons.no")}</Button>
            <Button onPress={onDelete}>{t("common:modals.delete-entry.buttons.yes")}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}
