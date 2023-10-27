import * as React from "react";
import { StyleSheet } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { authenticateAsync } from "expo-local-authentication";

import LockSvg from "./LockSvg";
import { setIsAppLocked } from "../config/settingsSlice";

const LockedState = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const onUnlock = async () => {
    const { success } = await authenticateAsync();
    if (success) dispatch(setIsAppLocked(false));
  };

  return (
    <Surface elevation={0} style={styles.container}>
      <LockSvg width={135} height={135} />
      <Text variant="titleLarge">{t("Os registros estão protegidos.")}</Text>
      <Text variant="bodyLarge" style={styles.description}>
        {t(
          "O sistema de proteção de registros está ativado. Clique no botão abaixo para desbloquear, ou acesse o menu de segurança em configurações.",
        )}
      </Text>
      <Button mode="contained" onPress={onUnlock}>
        {t("Desbloquear").toUpperCase()}
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
