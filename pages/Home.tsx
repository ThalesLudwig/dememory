import { useMemo, useState } from "react";
import { SafeAreaView, View, FlatList, ScrollView } from "react-native";
import { Button, Chip, IconButton, Searchbar, Text, useTheme } from "react-native-paper";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

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

export default function Home() {
  const { navigate } = useNavigation<any>();
  const { value: selectedDay } = useSelector((state: RootState) => state.date);
  const { value: entries } = useSelector((state: RootState) => state.entries);
  const daysInMonth = useMonthDays(new Date(selectedDay));
  const dispatch = useDispatch();
  const currentDate = useCurrentDate();
  const favoriteEntries = useFavoriteEntries();
  const { colors } = useTheme();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const confirmDate = (date: Date) => {
    dispatch(setDate(format(new Date(date), "yyyy-MM-dd")));
    setDatePickerVisibility(false);
  };

  const sortedFavorites = useMemo(() => favoriteEntries.splice(0, 4), [entries]);

  const todaysEntries = useMemo(() => {
    return entries.filter(
      (entry) => !!entry.date && format(new Date(entry.date), "yyyy-MM-dd") === currentDate("yyyy-MM-dd"),
    );
  }, [selectedDay, entries]);

  const onSearch = () => {
    const params: SearchType = { moods: [], storages: [], tags: [], content: searchInput };
    setSearchInput("");
    navigate("SearchResults", params);
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={styles.body}>
          <Searchbar
            placeholder="Search by content"
            onChangeText={(text) => setSearchInput(text)}
            value={searchInput}
            returnKeyType="done"
            onSubmitEditing={onSearch}
            onIconPress={onSearch}
          />
          <View style={styles.spaceBetween}>
            <Text variant="titleMedium">Pinned</Text>
            <Button mode="text" onPress={() => navigate("FavoritesStack")}>
              View all
            </Button>
          </View>
        </View>
        {sortedFavorites.length === 0 && (
          <Chip icon="pin" style={styles.pinnedChip}>
            You haven't pinned any entries yet.
          </Chip>
        )}
        <FlatList
          data={sortedFavorites}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <FavoriteCard {...item} onPress={() => navigate("ViewEntry", { id: item.id })} />}
          keyExtractor={(item) => item.id}
          extraData={selectedDay}
          style={{ flexGrow: 0 }}
          contentContainerStyle={styles.slider}
          horizontal
        />
        <View style={styles.body}>
          <View style={styles.spaceBetween}>
            <Text variant="titleMedium">{currentDate("dd/MM/yyyy")}</Text>
            <View style={styles.spaceBetween}>
              <Button mode="contained" onPress={() => navigate("NewEntry")}>
                NEW ENTRY
              </Button>
              <IconButton
                icon="calendar"
                size={ICON_SIZE}
                mode="contained"
                onPress={() => setDatePickerVisibility(true)}
              />
            </View>
          </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={confirmDate}
          onCancel={() => setDatePickerVisibility(false)}
        />
        <FlatList
          data={daysInMonth}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <MonthDayButton date={item} isSelected={item.key === currentDate("yyyy-MM-dd")} />}
          keyExtractor={(item) => item.key}
          extraData={selectedDay}
          style={{ flexGrow: 0 }}
          contentContainerStyle={styles.slider}
          initialScrollIndex={parseInt(currentDate("d"))}
          getItemLayout={(_, i) => ({ length: 49, offset: 53 * i, index: i })}
          horizontal
        />
        <View style={styles.entryList}>
          {todaysEntries.map((item) => (
            <EntryCard key={item.id} {...item} onPress={() => navigate("ViewEntry", { id: item.id })} />
          ))}
          {todaysEntries.length === 0 && (
            <EmptyState
              title="No entries here."
              description="There are no entries registered for this day. Your journal awaits, start by creating a new entry."
              buttonLabel="Create New"
              onClick={() => navigate("NewEntry")}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
