import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Avatar, Button, Chip, Divider, Portal, Snackbar, TextInput, useTheme } from "react-native-paper";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import * as Clipboard from "expo-clipboard";

import { styles } from "../styles/profileStyles";
import { RootState } from "../config/store";
import { setEmail, setName } from "../config/profileSlice";
import { walletShortener } from "../utils/walletShortener";

export default function Profile() {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { t } = useTranslation("common");
  const { email, name, wallet } = useSelector((state: RootState) => state.profile);

  const [nameInput, setNameInput] = useState(name);
  const [emailInput, setEmailInput] = useState(email);
  const [isConfirmSnackbarVisible, setIsConfirmSnackbarVisible] = useState(false);
  const [isCopySnackbarVisible, setIsCopySnackbarVisible] = useState(false);

  const copyToClipboard = async () => {
    if (!wallet) return;
    await Clipboard.setStringAsync(wallet);
    setIsCopySnackbarVisible(true);
  };

  const onSubmit = () => {
    dispatch(setName(nameInput));
    dispatch(setEmail(emailInput));
    setIsConfirmSnackbarVisible(true);
  };

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
      <ScrollView>
        <View style={styles.body}>
          {/* <Avatar.Icon icon="account-outline" size={70} /> */}
          <TextInput label={t("common:profile.inputs.name")} value={nameInput} onChangeText={setNameInput} />
          <TextInput label={t("common:profile.inputs.email")} value={emailInput} onChangeText={setEmailInput} />
          <Chip icon="alert">{t("common:profile.descriptions.therapy-share")}</Chip>
          <Divider />
          <TextInput
            disabled
            label={t("common:wallet")}
            value={walletShortener(wallet).toUpperCase()}
            right={<TextInput.Icon icon="content-copy" onPress={copyToClipboard} />}
          />
          <Button mode="contained" onPress={onSubmit}>
            {t("common:profile.buttons.update").toUpperCase()}
          </Button>
        </View>
      </ScrollView>
      <Portal>
        <Snackbar
          visible={isConfirmSnackbarVisible}
          onDismiss={() => setIsConfirmSnackbarVisible(false)}
          wrapperStyle={{ bottom: 80 }}
          action={{ label: t("common:settings.buttons.close"), onPress: () => setIsConfirmSnackbarVisible(false) }}
        >
          {t("common:profile.snackbar.updated")}
        </Snackbar>
        <Snackbar
          visible={isCopySnackbarVisible}
          onDismiss={() => setIsCopySnackbarVisible(false)}
          wrapperStyle={{ bottom: 80 }}
          action={{ label: t("common:settings.buttons.close"), onPress: () => setIsCopySnackbarVisible(false) }}
        >
          {t("common:profile.snackbar.copy")}
        </Snackbar>
      </Portal>
    </SafeAreaView>
  );
}
