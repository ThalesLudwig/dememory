import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button, Chip, Divider, Portal, Snackbar, TextInput, useTheme } from "react-native-paper";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { styles } from "../styles/profileStyles";
import { RootState } from "../config/store";
import { useDispatch } from "react-redux";
import { setEmail, setName } from "../config/profileSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { t } = useTranslation("common");
  const { email, name, wallet } = useSelector((state: RootState) => state.profile);

  const [nameInput, setNameInput] = useState(name);
  const [emailInput, setEmailInput] = useState(email);
  const [isConfirmSnackbarVisible, setIsConfirmSnackbarVisible] = useState(false);

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
            label={t("common:wallet")}
            value={wallet}
            onChangeText={() => {}}
            disabled={!wallet}
            right={<TextInput.Icon icon="content-copy" onPress={() => console.log("foo")} />}
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
      </Portal>
    </SafeAreaView>
  );
}
