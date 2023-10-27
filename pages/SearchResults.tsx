import { SafeAreaView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { intersection } from "lodash";
import { isWithinInterval } from "date-fns";
import { Portal, Snackbar, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

import EntryCard from "../Components/EntryCard";
import EmptyState from "../Components/EmptyState";
import { styles } from "../styles/searchResultsStyles";
import { RootState } from "../config/store";
import { RootStackParamList } from "../Components/Router";
import { EntryStorage } from "../constants/EntryStorage";
import { removeEntry } from "../config/entriesSlice";
import DeleteEntryDialog from "../Components/DeleteEntryDialog";

type Props = NativeStackScreenProps<RootStackParamList, "SearchResults">;

export default function SearchResults({ route }: Props) {
  const { t } = useTranslation("common");
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { value: entries } = useSelector((state: RootState) => state.entries);
  const { isAppLocked } = useSelector((state: RootState) => state.settings);
  const { navigate, goBack } = useNavigation<any>();
  const [swipedId, setSwipedId] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const results = useMemo(() => {
    const { params } = route;
    return entries.filter((entry) => {
      const hasContent = entry.content.toLowerCase().includes(params.content.toLowerCase());
      const hasMoods = params.moods.length === 0 || (entry.mood && params.moods.includes(entry.mood));
      const hasStorages = params.storages.length === 0 || params.storages.includes(entry.storage || EntryStorage.LOCAL);
      const hasTags = params.tags.length === 0 || intersection(params.tags, entry.tags).length > 0;
      const hasInterval = isWithinInterval(new Date(entry.date).setHours(0, 0, 0), {
        start: params.fromDate ? new Date(params.fromDate.replaceAll("/", "-")) : new Date(1970, 0, 1),
        end: params.toDate
          ? new Date(params.toDate.replaceAll("/", "-")).setHours(24, 60, 60)
          : new Date().setHours(24, 60, 60),
      });
      return hasContent && hasMoods && hasStorages && hasTags && hasInterval;
    });
  }, [entries, route.params]);

  const onDelete = () => {
    dispatch(removeEntry(swipedId));
    setIsSnackbarVisible(true);
    setIsDeleteDialogOpen(false);
  };

  const onSwipeDelete = (id: string) => {
    setSwipedId(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <EntryCard
            onDelete={() => onSwipeDelete(item.id)}
            onEdit={() => navigate("EditEntry", { id: item.id })}
            onPress={() => navigate("ViewEntry", { id: item.id })}
            {...item}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.body}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <EmptyState
              title={t("common:search-results.titles.no-entries")}
              description={t("common:search-results.descriptions.no-entries")}
              buttonLabel={t("common:search-results.buttons.try-again")}
              onClick={() => goBack()}
            />
          </View>
        }
      />
      <Portal>
        <DeleteEntryDialog isOpen={isDeleteDialogOpen} onDelete={onDelete} setIsOpen={setIsDeleteDialogOpen} />
        <Snackbar
          visible={isSnackbarVisible}
          onDismiss={() => setIsSnackbarVisible(false)}
          wrapperStyle={{ bottom: 80 }}
          action={{ label: t("common:settings.buttons.close"), onPress: () => setIsSnackbarVisible(false) }}
        >
          {t("common:modals.delete-entry.success")}
        </Snackbar>
      </Portal>
    </SafeAreaView>
  );
}
