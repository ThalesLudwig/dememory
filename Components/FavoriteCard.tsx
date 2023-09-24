import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Card, Avatar, IconButton, useTheme } from "react-native-paper";

import { Entry } from "../types/Entry";
import { getMoodColor } from "../utils/moodHelper";
import { ICON_SIZE } from "../constants/icons";
import { EntryStorage } from "../constants/EntryStorage";

const FavoriteCard = (props: Entry & { onPress: Function }) => {
  const theme = useTheme();
  const moodColor = !!props.mood ? getMoodColor(props.mood, theme.dark) : "";

  return (
    <Card style={styles.container} onPress={() => props.onPress()}>
      <Card.Content>
        <Text variant="bodyMedium" numberOfLines={2} style={{ height: 40 }}>
          {props.content}
        </Text>
      </Card.Content>
      <View style={styles.actions}>
        <View style={styles.row}>
          {props.storage === EntryStorage.BLOCKCHAIN && <Avatar.Icon size={ICON_SIZE} icon="ethereum" />}
          {props.mood && <IconButton icon="emoticon-happy-outline" containerColor={moodColor} size={12} />}
        </View>
        <IconButton icon="heart" iconColor={theme.colors.primary} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 155,
    marginVertical: 5,
    marginRight: 10,
    marginLeft: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
});

export default FavoriteCard;
