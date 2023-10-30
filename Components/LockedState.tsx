import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { authenticateAsync } from "expo-local-authentication";

import LockSvg from "./LockSvg";

const LockedState = (props: { onUnlock: Function, onFail: Function }) => {
  const { t } = useTranslation("common");

  const onPress = async () => {
    const { success } = await authenticateAsync();
    if (success) {
      props.onUnlock();
    } else {
      props.onFail();
    }
  };

  return (
    <Surface elevation={0} style={styles.container}>
      <LockSvg width={135} height={135} />
      <Text variant="titleLarge">{t("common:locked-state.title")}</Text>
      <Text variant="bodyLarge" style={styles.description}>
        {t("common:locked-state.description")}
      </Text>
      <Button mode="contained" onPress={onPress}>
        {t("common:locked-state.button").toUpperCase()}
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
    paddingHorizontal: 25,
    textAlign: "center",
  },
});

export default LockedState;
