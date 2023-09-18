import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Card, Avatar, IconButton, useTheme } from "react-native-paper";

import { Entry } from "../types/Entry";
import { getMoodColor } from "../utils/moodHelper";
import { ICON_SIZE } from "../constants/icons";

const FavoriteCard = (props: Entry) => {
  const moodColor = !!props.mood ? getMoodColor(props.mood) : "";
  const theme = useTheme();

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text variant="bodyMedium">Lorem ipsum dolor sit amet...</Text>
      </Card.Content>
      <View style={styles.actions}>
        <View style={styles.row}>
          {props.isCrypto && <Avatar.Icon size={ICON_SIZE} icon="ethereum" />}
          {props.mood && <IconButton icon="heart" containerColor={moodColor} size={12} />}
        </View>
        <IconButton icon="pin" size={12} containerColor={theme.colors.primaryContainer} />
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
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});

export default FavoriteCard;
