import * as React from "react";
import { Button, Dialog, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

type DialogProps = {
  onLogout: Function;
  setIsOpen: Function;
  isOpen: boolean;
};

const LogoutDialog = ({ isOpen, onLogout, setIsOpen }: DialogProps) => {
  const { t } = useTranslation("common");

  return (
    <Dialog visible={isOpen} onDismiss={() => setIsOpen(false)}>
      <Dialog.Title>{t("common:modals.logout.title")}</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">{t("common:modals.logout.descriptions")}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => setIsOpen(false)}>{t("common:modals.logout.buttons.no")}</Button>
        <Button onPress={() => onLogout()}>{t("common:modals.logout.buttons.yes")}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default LogoutDialog;
