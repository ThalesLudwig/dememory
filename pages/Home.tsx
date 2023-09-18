import { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, View, FlatList, ScrollView } from "react-native";
import { Button, IconButton, Searchbar, Text } from "react-native-paper";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { RootState } from "../types/RootState";
import { ICON_SIZE } from "../constants/icons";
import MonthDayButton from "../Components/MonthDayButton";
import { useMonthDays } from "../hooks/useMonthDays";
import EntryCard from "../Components/EntryCard";
import { entryMock, favoriteMock } from "../utils/entryMocks";
import FavoriteCard from "../Components/FavoriteCard";
import { setDate } from "../config/dateSlice";

export default function Home() {
  const { navigate } = useNavigation<any>();
  const { value: selectedDay } = useSelector((state: RootState) => state.date);
  const daysInMonth = useMonthDays(new Date(selectedDay));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useDispatch();

  const confirmDate = (date: Date) => {
    const newDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate()}`;
    dispatch(setDate(format(new Date(), newDate)));
    setDatePickerVisibility(false);
  };

  const currentDate = useCallback(
    (stringFormat: string) => {
      const rawDate = new Date(selectedDay);
      return format(new Date(rawDate.valueOf() + rawDate.getTimezoneOffset() * 60 * 1000), stringFormat);
    },
    [selectedDay],
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
          <Searchbar placeholder="Search" onChangeText={() => {}} value={""} />
          <View style={styles.spaceBetween}>
            <Text variant="titleMedium">Pinned</Text>
            <Button mode="text" onPress={() => navigate("FavoritesStack")}>
              View all
            </Button>
          </View>
        </View>
        <FlatList
          data={favoriteMock}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <FavoriteCard {...item} />}
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
                New entry
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
          initialScrollIndex={11}
          getItemLayout={(_, i) => ({ length: 49, offset: 49 * i, index: i })}
          horizontal
        />
        <View style={styles.entryList}>
          {entryMock.map((item) => (
            <EntryCard key={item.id} {...item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbfe",
  },
  body: {
    marginHorizontal: 15,
    gap: 20,
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slider: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  entryList: {
    marginHorizontal: 15,
    gap: 20,
    marginVertical: 20,
  },
});
