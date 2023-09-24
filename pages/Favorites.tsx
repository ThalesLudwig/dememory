import { useMemo, useState } from "react";
import { SafeAreaView, View, SectionList } from "react-native";
import { Chip, Searchbar } from "react-native-paper";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

import { useFavoriteEntries } from "../hooks/useFavoriteEntries";
import { Entry } from "../types/Entry";
import EntryCard from "../Components/EntryCard";
import EmptyState from "../Components/EmptyState";
import { styles } from "../styles/favoritesStyles";

export default function Favorites() {
  const favoriteEntries = useFavoriteEntries();
  const { navigate } = useNavigation<any>();
  const [searchInput, setSearchInput] = useState("");

  const filteredEntries = useMemo(() => {
    if (!searchInput) return favoriteEntries;
    return favoriteEntries.filter(
      (entry) => entry.content.toLowerCase().includes(searchInput.toLowerCase()) || entry.tags?.includes(searchInput),
    );
  }, [favoriteEntries, searchInput]);

  const parsedEntries = useMemo(() => {
    const list: { title: string; data: Entry[] }[] = [];
    filteredEntries.forEach((entry) => {
      const date = format(new Date(entry.date), "MMMM, yyyy");
      const index = list.findIndex((e) => e.title === date);
      if (index >= 0) {
        list[index] = { title: list[index].title, data: [...list[index].data, entry] };
      } else {
        list.splice(index, 0, { title: date, data: [entry] });
      }
    });
    return list;
  }, [filteredEntries]);

  const onSearch = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Searchbar
          placeholder="Search by content or tag"
          onChangeText={(text) => setSearchInput(text)}
          value={searchInput}
          returnKeyType="done"
          onSubmitEditing={onSearch}
          onIconPress={onSearch}
        />
        <SectionList
          sections={parsedEntries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EntryCard key={item.id} {...item} onPress={() => navigate("ViewEntry", { id: item.id })} />
          )}
          renderSectionHeader={({ section: { title } }) => <Chip icon="clock">{title}</Chip>}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <EmptyState
              description="You don't have any favorites yet. Start pinning your entries and you'll see them here."
              title="No entries found."
            />
          }
          stickySectionHeadersEnabled={false}
        />
      </View>
    </SafeAreaView>
  );
}
