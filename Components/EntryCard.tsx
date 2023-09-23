import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, Card, Chip, Avatar, IconButton } from "react-native-paper";
import { format } from "date-fns";

import { ICON_SIZE } from "../constants/icons";
import { Entry } from "../types/Entry";
import { getMoodColor, getMoodName } from "../utils/moodHelper";
import { EntryStorage } from "../constants/EntryStorage";

const EntryCard = (props: Entry & { onPress: Function }) => {
  const moodColor = !!props.mood ? getMoodColor(props.mood) : "";

  return (
    <Card onPress={() => props.onPress()}>
      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={4}>
          {props.content}
        </Text>
      </Card.Content>
      {!!props.imagesUrl && props.imagesUrl.length === 1 && (
        <Card.Cover style={styles.image} source={{ uri: props.imagesUrl[0] }} />
      )}
      {!!props.imagesUrl && props.imagesUrl.length > 1 && (
        <View style={styles.images}>
          {props.imagesUrl.map((imageUrl, i) => (
            <Image key={i} source={{ uri: imageUrl }} style={styles.thumbnail} />
          ))}
        </View>
      )}
      <Card.Actions style={styles.actions}>
        {/* <Chip icon="clock">{format(new Date(props.date), "MMM do, kk:mm")}</Chip> */}
        {!!props.mood && (
          <Chip icon="heart" style={{ backgroundColor: moodColor }}>
            {getMoodName(props.mood)}
          </Chip>
        )}
        {props.storage === EntryStorage.BLOCKCHAIN && <Avatar.Icon size={ICON_SIZE} icon="ethereum" />}
        {props.isPinned && <IconButton icon="pin" size={12} />}
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  actions: {
    marginTop: 10,
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
