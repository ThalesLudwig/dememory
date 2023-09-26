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
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("common");
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
            placeholder={t("common:home.inputs.search")}
            onChangeText={(text) => setSearchInput(text)}
            value={searchInput}
            returnKeyType="done"
            onSubmitEditing={onSearch}
            onIconPress={onSearch}
          />
          <View style={styles.spaceBetween}>
            <Text variant="titleMedium">{t("common:home.titles.recent-favorites")}</Text>
            <Button mode="text" onPress={() => navigate("FavoritesStack")}>
              {t("common:home.buttons.view-all")}
            </Button>
          </View>
        </View>
        {sortedFavorites.length === 0 && (
          <Chip icon="heart" style={styles.pinnedChip}>
            {t("common:home.titles.no-favorites")}
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
                {t("common:home.buttons.new-entry").toUpperCase()}
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
              title={t("common:home.titles.no-entries-here")}
              description={t("home.descriptions.no-entries")}
              buttonLabel={t("common:home.buttons.create-new")}
              onClick={() => navigate("NewEntry")}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
