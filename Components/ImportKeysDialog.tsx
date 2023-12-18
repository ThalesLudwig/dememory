import * as React from "react";
import { Button, Dialog, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

type DialogProps = {
  onConfirm: Function;
  setIsOpen: Function;
  isOpen: boolean;
};

const ImportKeysDialog = ({ isOpen, onConfirm, setIsOpen }: DialogProps) => {
  const { t } = useTranslation("common");

  return (
    <Dialog visible={isOpen} onDismiss={() => setIsOpen(false)}>
      <Dialog.Title>{t("common:modals.import-keys.title")}</Dialog.Title>
      <Dialog.Content style={{ gap: 15 }}>
        <Text variant="bodyMedium">{t("common:modals.import-keys.body-one")}</Text>
        <Text variant="bodyMedium">{t("common:modals.import-keys.body-two")}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => setIsOpen(false)}>{t("common:modals.import-keys.buttons.no")}</Button>
        <Button onPress={() => onConfirm()}>{t("common:modals.import-keys.buttons.yes")}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ImportKeysDialog;
