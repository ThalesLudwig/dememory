import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { Button, Surface, Text } from "react-native-paper";

type EmptyStateProps = {
  title: string;
  description: string;
  buttonLabel: string;
  onClick: Function;
};

const EmptyState = (props: EmptyStateProps) => {
  return (
    <Surface elevation={0} style={styles.container}>
      <Surface style={styles.imageSurface}>
        <Image source={require("../assets/relax.png")} style={styles.image} />
      </Surface>
      <Text variant="titleLarge">{props.title}</Text>
      <Text variant="bodyLarge" style={styles.description}>
        {props.description}
      </Text>
      <Button mode="contained" onPress={() => props.onClick()}>
        {props.buttonLabel.toUpperCase()}
      </Button>
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
    textAlign: "center",
  },
  imageSurface: {
    width: 130,
    height: 130,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
  },
});

export default EmptyState;
