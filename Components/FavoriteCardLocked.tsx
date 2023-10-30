import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, useTheme } from "react-native-paper";
import { authenticateAsync } from "expo-local-authentication";

const FavoriteCardLocked = ({ onPress, onFail } : { onPress: Function, onFail: Function }) => {
  const theme = useTheme();

  const onLockedPress = () => {
    authenticateAsync().then(({ success }) => {
      if (success) {
        onPress();
      } else {
        onFail();
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <Card style={styles.container} onPress={onLockedPress}>
      <Card.Content>
        <View style={{  height: 20, flex: 1, backgroundColor: theme.colors.elevation.level5 }} />
        <View style={{  height: 20, width: '50%', backgroundColor: theme.colors.elevation.level5 }} />
      </Card.Content>
      <View style={styles.actions}>
        <IconButton icon="lock" iconColor={theme.colors.primary} />
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
    minHeight: 115,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
});

export default FavoriteCardLocked;
