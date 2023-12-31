import { useMemo, useState } from "react";
import { SafeAreaView, View, SectionList } from "react-native";
import { Chip, Portal, Searchbar, Snackbar, useTheme } from "react-native-paper";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { useFavoriteEntries } from "../hooks/useFavoriteEntries";
import { Entry } from "../types/Entry";
import EntryCard from "../Components/EntryCard";
import EmptyState from "../Components/EmptyState";
import { styles } from "../styles/favoritesStyles";
import { useDateLocale } from "../hooks/useDateLocale";
import { removeEntry } from "../config/entriesSlice";
import DeleteEntryDialog from "../Components/DeleteEntryDialog";
import { RootState } from "../config/store";
import EntryCardLocked from "../Components/EntryCardLocked";

export default function Favorites() {
  const { t } = useTranslation("common");
  const { colors } = useTheme();
  const favoriteEntries = useFavoriteEntries();
  const { navigate } = useNavigation<any>();
  const { isAppLocked } = useSelector((state: RootState) => state.settings);
  const locale = useDateLocale();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [swipedId, setSwipedId] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");

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
    setSnackbarContent(t("common:modals.delete-entry.success"));
    setIsSnackbarVisible(true);
    setIsDeleteDialogOpen(false);
  };

  const onSwipeDelete = (id: string) => {
    setSwipedId(id);
    setIsDeleteDialogOpen(true);
  };

  const onEntryPress = (id: string) => {
    navigate("ViewEntry", { id });
  }

  const onEntryPressFail = () => {
    setSnackbarContent(t("common:locked-state.snackbar.auth-fail"));
    setIsSnackbarVisible(true);
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
            isAppLocked ? 
            <EntryCardLocked key={item.id} onPress={() => onEntryPress(item.id)} onFail={onEntryPressFail} date={item.date} /> : 
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
        <DeleteEntryDialog isOpen={isDeleteDialogOpen} onDelete={onDelete} setIsOpen={setIsDeleteDialogOpen} />
        <Snackbar
          visible={isSnackbarVisible}
          onDismiss={() => setIsSnackbarVisible(false)}
          wrapperStyle={{ bottom: 80 }}
          action={{ label: t("common:settings.buttons.close"), onPress: () => setIsSnackbarVisible(false) }}
        >
          {snackbarContent}
        </Snackbar>
      </Portal>
    </SafeAreaView>
  );
}
