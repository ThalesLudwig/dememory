import { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, View, FlatList, ScrollView } from "react-native";
import { Button, FAB, IconButton, Portal, Searchbar, Snackbar, Text, useTheme } from "react-native-paper";
import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { ICON_SIZE } from "../constants/icons";
import MonthDayButton from "../Components/MonthDayButton";
import { useMonthDays } from "../hooks/useMonthDays";
import EntryCard from "../Components/EntryCard";
import FavoriteCard from "../Components/FavoriteCard";
import { setDate } from "../config/dateSlice";
import { RootState } from "../config/store";
import { useCurrentDate } from "../hooks/useCurrentDate";
import EmptyState from "../Components/EmptyState";
import { useFavoriteEntries } from "../hooks/useFavoriteEntries";
import { styles } from "../styles/homeStyles";
import { SearchType } from "../types/Search";
import { removeEntry } from "../config/entriesSlice";
import DeleteEntryDialog from "../Components/DeleteEntryDialog";
import { useDateLocale } from "../hooks/useDateLocale";
import CalendarDialog from "../Components/CalendarDialog";
import FavoriteCardLocked from "../Components/FavoriteCardLocked";
import EntryCardLocked from "../Components/EntryCardLocked";
import { useEntryDates } from "../hooks/useEntryDates";

export default function Home() {
  const { t } = useTranslation("common");
  const { navigate } = useNavigation<any>();
  const { value: selectedDay } = useSelector((state: RootState) => state.date);
  const { value: entries } = useSelector((state: RootState) => state.entries);
  const { showFavorites, isAppLocked } = useSelector((state: RootState) => state.settings);
  const daysInMonth = useMonthDays(new Date(selectedDay));
  const dispatch = useDispatch();
  const locale = useDateLocale();
  const currentDate = useCurrentDate();
  const favoriteEntries = useFavoriteEntries();
  const { colors } = useTheme();
  const entryDates = useEntryDates();
  const calendarRef = useRef<FlatList>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [swipedId, setSwipedId] = useState("");
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");

  const scrollIndex = useMemo(() => {
    const index = parseInt(currentDate("d")) - 4;
    return index < 0 ? 0 : index;
  }, [selectedDay]);

  useEffect(() => {
    calendarRef.current?.scrollToIndex({ index: scrollIndex });
  }, [scrollIndex]);

  const confirmDate = (date: string) => {
    dispatch(setDate(date));
    setCalendarVisibility(false);
  };

  const sortedFavorites = useMemo(
    () => favoriteEntries.splice(0, 4),
    [entries],
  );

  const displayFavorites = useMemo(() => {
    return showFavorites && sortedFavorites.length > 0;
  }, [showFavorites, sortedFavorites]);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => !!entry.date && format(new Date(entry.date), "yyyy-MM-dd") === currentDate("yyyy-MM-dd"));
  }, [selectedDay, entries]);

  const today = useMemo(() => {
    const rawDate = new Date();
    return format(new Date(rawDate.valueOf() + rawDate.getTimezoneOffset() * 60 * 1000), "yyyy-MM-dd", { locale });
  }, [selectedDay, locale]);

  const onSearch = () => {
    const params: SearchType = { moods: [], storages: [], tags: [], content: searchInput };
    setSearchInput("");
    navigate("SearchResults", params);
  };

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
      <ScrollView>
        <View style={styles.body}>
          <Searchbar
            placeholder={t("common:home.inputs.search")}
            onChangeText={(text) => setSearchInput(text)}
            value={searchInput}
            returnKeyType="done"
            onSubmitEditing={onSearch}
            onIconPress={onSearch}
            style={{ marginBottom: displayFavorites ? 0 : 15 }}
          />
          {displayFavorites && (
            <View style={styles.spaceBetween}>
              <Text variant="titleMedium">
                {t("common:home.titles.recent-favorites")}
              </Text>
              <Button mode="text" onPress={() => navigate("FavoritesStack")}>
                {t("common:home.buttons.view-all")}
              </Button>
            </View>
          )}
        </View>
        {displayFavorites && (
          <FlatList
            data={sortedFavorites}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) =>
              isAppLocked ? (
                <FavoriteCardLocked onPress={() => onEntryPress(item.id)} onFail={onEntryPressFail} />
              ) : (
                <FavoriteCard {...item} onPress={() => onEntryPress(item.id)} />
              )
            }
            keyExtractor={(item) => item.id}
            extraData={selectedDay}
            style={{ flexGrow: 0 }}
            contentContainerStyle={styles.slider}
            horizontal
          />
        )}
        <View style={styles.body}>
          <View style={styles.spaceBetween}>
            <Text variant="titleMedium">{currentDate("P")}</Text>
            <View style={styles.spaceBetween}>
              {!(today === currentDate("yyyy-MM-dd")) && (
                <IconButton icon="calendar-refresh" size={ICON_SIZE} mode="contained" onPress={() => dispatch(setDate(today))} />
              )}
              <IconButton icon="calendar" size={ICON_SIZE} mode="contained" onPress={() => setCalendarVisibility(true)} />
            </View>
          </View>
        </View>
        <FlatList
          data={daysInMonth}
          ref={calendarRef}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (<MonthDayButton date={item} isMarked={entryDates.includes(item.key)} isSelected={item.key === currentDate("yyyy-MM-dd")} />)}
          keyExtractor={(item) => item.key}
          extraData={selectedDay}
          style={{ flexGrow: 0 }}
          contentContainerStyle={styles.slider}
          initialScrollIndex={scrollIndex}
          getItemLayout={(_, i) => ({ length: 55, offset: 63 * i, index: i })}
          horizontal
        />
        <View style={styles.entryList}>
          {filteredEntries.map((item) => (
            isAppLocked ? 
            <EntryCardLocked key={item.id} onPress={() => onEntryPress(item.id)} onFail={onEntryPressFail} date={item.date} /> : 
            <EntryCard
              onDelete={() => onSwipeDelete(item.id)}
              onEdit={() => navigate("EditEntry", { id: item.id })}
              key={item.id}
              onPress={() => onEntryPress(item.id)}
              {...item}
            />
          ))}
          {filteredEntries.length === 0 && (
            <EmptyState
              title={t("common:home.titles.no-entries-here")}
              description={t("home.descriptions.no-entries")}
              buttonLabel={t("common:home.buttons.create-new")}
              onClick={() => navigate("NewEntry")}
            />
          )}
        </View>
      </ScrollView>
      <FAB icon="pencil" style={styles.fab} onPress={() => navigate("NewEntry")} />
      <Portal>
        <CalendarDialog isOpen={isCalendarVisible} setIsOpen={setCalendarVisibility} onSelect={confirmDate}/>
        <DeleteEntryDialog isOpen={isDeleteDialogOpen} onDelete={onDelete} setIsOpen={setIsDeleteDialogOpen}/>
        <Snackbar 
          visible={isSnackbarVisible}
          onDismiss={() => setIsSnackbarVisible(false)}
          wrapperStyle={{ bottom: 80 }}
          action={{
            label: t("common:settings.buttons.close"),
            onPress: () => setIsSnackbarVisible(false),
          }}
        >
          {snackbarContent}
        </Snackbar>
      </Portal>
    </SafeAreaView>
  );
}
