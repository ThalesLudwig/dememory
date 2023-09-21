import { useMemo } from "react";
import { SafeAreaView, StyleSheet, View, SectionList } from "react-native";
import { Chip, Text } from "react-native-paper";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

import { useFavoriteEntries } from "../hooks/useFavoriteEntries";
import { Entry } from "../types/Entry";
import EntryCard from "../Components/EntryCard";

export default function Favorites() {
  const favoriteEntries = useFavoriteEntries();
  const { navigate } = useNavigation<any>();

  const parsedEntries = useMemo(() => {
    const list: { title: string; data: Entry[] }[] = [];

    favoriteEntries.forEach((entry) => {
      const date = format(new Date(entry.date), "MMMM, yyyy");
      const index = list.findIndex((e) => e.title === date);

      if (index >= 0) {
        list[index] = { title: list[index].title, data: [...list[index].data, entry] };
      } else {
        list.splice(index, 0, { title: date, data: [entry] });
      }
    });

    return list;
  }, [favoriteEntries]);

  const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"],
    },
    {
      title: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"],
    },
    {
      title: "Drinks",
      data: ["Water", "Coke", "Beer"],
    },
    {
      title: "Desserts",
      data: ["Cheese Cake", "Ice Cream"],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <SectionList
          sections={parsedEntries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EntryCard key={item.id} {...item} onPress={() => navigate("ViewEntry", { id: item.id })} />
          )}
          renderSectionHeader={({ section: { title } }) => <Chip style={styles.header}>{title}</Chip>}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbfe",
  },
  body: {
    flex: 1,
    marginHorizontal: 15,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    marginVertical: 20,
  },
  title: {
    fontSize: 16,
  },
  list: {
    padding: 1,
  },
});
