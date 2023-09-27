import { Appbar, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { StackHeaderProps } from "@react-navigation/stack";
import { getHeaderTitle } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

export default function Header(props: StackHeaderProps) {
  const { colors } = useTheme();
  const { navigate } = useNavigation<any>();
  const title = getHeaderTitle(props.options, props.route.name);

  const hasWallet = false; // TODO: switch to state variable

  const onProfileClick = () => {
    if (hasWallet) {
      // TODO: navigate to profile
    } else {
      navigate("Settings");
    }
  };

  return (
    <Appbar.Header>
      {props.back ? <Appbar.BackAction onPress={props.navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      <Appbar.Action
        style={{ ...styles.action, backgroundColor: colors.primaryContainer }}
        color={colors.onPrimaryContainer}
        icon="account-outline"
        onPress={onProfileClick}
      />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  action: {
    borderRadius: 50,
  },
});
