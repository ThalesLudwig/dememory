import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Chip, IconButton, useTheme } from "react-native-paper";
import { format } from "date-fns";
import { authenticateAsync } from "expo-local-authentication";

import { useDateLocale } from "../hooks/useDateLocale";

const EntryCardLocked = (props: { date: Date, onPress: Function; onFail: Function }) => {
  const locale = useDateLocale();
  const theme = useTheme();

  const onLockedPress = () => {
    authenticateAsync().then(({ success }) => {
      if (success) {
        props.onPress();
      } else {
        props.onFail();
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <Card onPress={onLockedPress} style={styles.card}>
      <View style={styles.header}>
        <Chip icon="calendar" mode="outlined" style={{...styles.time, backgroundColor: theme.colors.elevation.level0}} textStyle={styles.timeText}>
          {format(new Date(props.date), "MMM do, kk:mm", { locale })}
        </Chip>
        <View style={styles.actions}>
          <IconButton icon="lock" iconColor={theme.colors.primary} />
        </View>
      </View>
      <Card.Content>
        <View style={{  height: 23, marginBottom: 5, flex: 1, backgroundColor: theme.colors.elevation.level5 }} />
        <View style={{  height: 23, width: '70%', backgroundColor: theme.colors.elevation.level5 }} />
        <View style={styles.tags}>
          <View style={{  height: 20, width: 55, backgroundColor: theme.colors.elevation.level5 }} />
          <View style={{  height: 20, width: 55, backgroundColor: theme.colors.elevation.level5 }} />
        </View>
      </Card.Content>
      <View style={styles.images}>
        <View style={{  height: 40, width: 40, backgroundColor: theme.colors.elevation.level5 }} />
        <View style={{  height: 40, width: 40, backgroundColor: theme.colors.elevation.level5 }} />
        <View style={{  height: 40, width: 40, backgroundColor: theme.colors.elevation.level5 }} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    shadowOpacity: 0,
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
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 7,
  },
});

export default EntryCardLocked;
