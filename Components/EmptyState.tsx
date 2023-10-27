import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import Empty from "./EmptySvg";

type EmptyStateProps = {
  title: string;
  description: string;
  buttonLabel?: string;
  onClick?: Function;
};

const EmptyState = (props: EmptyStateProps) => {
  return (
    <Surface elevation={0} style={styles.container}>
      <Empty width={80} height={80} />
      <Text variant="titleLarge">{props.title}</Text>
      <Text variant="bodyLarge" style={styles.description}>
        {props.description}
      </Text>
      {!!props.buttonLabel && !!props.onClick && (
        <Button mode="contained" onPress={() => !!props.onClick && props.onClick()}>
          {props.buttonLabel.toUpperCase()}
        </Button>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  description: {
    paddingHorizontal: 20,
    textAlign: "center",
  },
});

export default EmptyState;
