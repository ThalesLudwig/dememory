import * as React from "react";
import { Button, Dialog, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

type DialogProps = {
  onDelete: Function;
  setIsOpen: Function;
  isOpen: boolean;
};

const DeleteEntryDialog = ({ isOpen, onDelete, setIsOpen }: DialogProps) => {
  const { t } = useTranslation("common");

  return (
    <Dialog visible={isOpen} onDismiss={() => setIsOpen(false)}>
      <Dialog.Icon icon="alert" />
      <Dialog.Title style={{ textAlign: "center" }}>{t("common:modals.delete-entry.title")}</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">{t("common:modals.delete-entry.description")}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => setIsOpen(false)}>{t("common:modals.delete-entry.buttons.no")}</Button>
        <Button onPress={() => onDelete()}>{t("common:modals.delete-entry.buttons.yes")}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DeleteEntryDialog;
