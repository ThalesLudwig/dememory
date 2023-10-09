import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, Card, Chip, Avatar, IconButton, useTheme } from "react-native-paper";
import { format } from "date-fns";
import { useDispatch } from "react-redux";

import { ICON_SIZE } from "../constants/icons";
import { Entry } from "../types/Entry";
import { getMoodColor, getMoodName } from "../utils/moodHelper";
import { EntryStorage } from "../constants/EntryStorage";
import { updateEntry } from "../config/entriesSlice";
import { useDateLocale } from "../hooks/useDateLocale";

const EntryCard = (props: Entry & { onPress: Function }) => {
  const dispatch = useDispatch();
  const { dark } = useTheme();
  const locale = useDateLocale();
  const moodColor = !!props.mood ? getMoodColor(props.mood, dark) : "";

  const toogleFavorites = () => {
    dispatch(updateEntry({ ...props, isPinned: !props.isPinned }));
  };

  return (
    <Card onPress={() => props.onPress()} mode="outlined" style={styles.card}>
      <View style={styles.header}>
        <Chip icon="calendar" mode="outlined" style={styles.time} textStyle={styles.timeText}>
          {format(new Date(props.date), "MMM do, kk:mm", { locale })}
        </Chip>
        <View style={styles.actions}>
          {!!props.mood && (
            <Chip icon="emoticon-happy-outline" style={{ backgroundColor: moodColor }}>
              {getMoodName(props.mood)}
            </Chip>
          )}
          {props.storage === EntryStorage.BLOCKCHAIN && <Avatar.Icon size={ICON_SIZE} icon="ethereum" />}
          <IconButton icon={props.isPinned ? "heart" : "cards-heart-outline"} onPress={toogleFavorites} />
        </View>
      </View>
      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={4}>
          {props.content}
        </Text>
      </Card.Content>
      {!!props.imagesUrl && (
        <View style={styles.images}>
          {props.imagesUrl.map((imageUrl, i) => (
            <Image key={i} source={{ uri: imageUrl }} style={styles.thumbnail} />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    borderColor: "transparent",
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
});

export default EntryCard;
