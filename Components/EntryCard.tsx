import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, Card, Chip, IconButton, useTheme } from "react-native-paper";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { TouchableOpacity } from "react-native-gesture-handler";

import { ICON_SIZE } from "../constants/icons";
import { Entry } from "../types/Entry";
import { getMoodColor, getMoodName } from "../utils/moodHelper";
import { EntryStorage } from "../constants/EntryStorage";
import { updateEntry } from "../config/entriesSlice";
import { useDateLocale } from "../hooks/useDateLocale";

const EntryCard = (props: Entry & { onPress: Function; onEdit: Function; onDelete: Function }) => {
  const dispatch = useDispatch();
  const { dark, colors } = useTheme();
  const locale = useDateLocale();
  const moodColor = !!props.mood ? getMoodColor(props.mood, dark) : "";

  const toogleFavorites = () => {
    dispatch(updateEntry({ ...props, isPinned: !props.isPinned }));
  };

  const SwipeLeft = () => {
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => props.onDelete()} style={styles.swipeAction}>
        <View style={{ ...styles.swipeAction, backgroundColor: colors.errorContainer }}>
          <IconButton icon="delete" size={24} />
        </View>
      </TouchableOpacity>
    );
  };

  const SwipeRight = () => {
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => props.onEdit()} style={styles.swipeAction}>
        <View style={{ ...styles.swipeAction, backgroundColor: colors.primaryContainer }}>
          <IconButton icon="pencil" size={24} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderLeftActions={() => <SwipeLeft />} renderRightActions={() => <SwipeRight />}>
      <Card onPress={() => props.onPress()} style={styles.card}>
        <View style={styles.header}>
          <Chip icon="calendar" mode="outlined" style={{...styles.time, backgroundColor: colors.elevation.level0}} textStyle={styles.timeText}>
            {format(new Date(props.date), "MMM do, kk:mm", { locale })}
          </Chip>
          <View style={styles.actions}>
            {props.storage === EntryStorage.BLOCKCHAIN && <IconButton size={ICON_SIZE} icon="ethereum" />}
            {!!props.mood && (
              <Chip icon="emoticon-happy-outline" style={{ backgroundColor: moodColor, height: 32 }}>
                {getMoodName(props.mood)}
              </Chip>
            )}
            <IconButton icon={props.isPinned ? "heart" : "cards-heart-outline"} onPress={toogleFavorites} iconColor={colors.primary} />
          </View>
        </View>
        <Card.Content>
          <Text variant="bodyMedium" numberOfLines={4}>
            {props.content}
          </Text>
          <View style={styles.tags}>
            {props.tags?.map((tag, i) => (
              <Chip key={i}>{tag}</Chip>
            ))}
          </View>
        </Card.Content>
        {!!props.imagesUrl && (
          <View style={styles.images}>
            {props.imagesUrl.map((imageUrl, i) => (
              <Image key={i} source={{ uri: imageUrl }} style={styles.thumbnail} />
            ))}
          </View>
        )}
      </Card>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    marginLeft: 5,
    borderRadius: 0,
    borderColor: "transparent",
    marginTop: 15,
  },
  timeText: {
    fontWeight: "800",
  },
  image: {
    marginBottom: 15,
  },
  actions: {
    marginTop: 10,
    maxHeight: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  images: {
    marginVertical: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 7,
  },
  swipeAction: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    flexGrow: 1,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 7,
  },
});

export default EntryCard;
