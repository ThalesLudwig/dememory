import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, Card, Chip, Avatar, IconButton, useTheme } from "react-native-paper";

import { ICON_SIZE } from "../constants/icons";
import { Entry } from "../types/Entry";
import { getMoodColor, getMoodName } from "../utils/moodHelper";

const EntryCard = (props: Entry) => {
  const moodColor = !!props.mood ? getMoodColor(props.mood) : "";
  const theme = useTheme();

  return (
    <Card>
      <Card.Content>
        <Text variant="bodyMedium">{props.content}</Text>
      </Card.Content>
      {!!props.imageUrl && <Card.Cover style={styles.image} source={{ uri: props.imageUrl }} />}
      <Card.Actions style={styles.actions}>
        {!!props.tag && <Chip icon="tag">{props.tag}</Chip>}
        {!!props.mood && (
          <Chip icon="heart" style={{ backgroundColor: moodColor }}>
            {getMoodName(props.mood)}
          </Chip>
        )}
        {props.isCrypto && <Avatar.Icon size={ICON_SIZE} icon="ethereum" />}
        {props.isPinned && <IconButton icon="pin" size={12} />}
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  actions: {
    marginTop: 10,
  },
});

export default EntryCard;
