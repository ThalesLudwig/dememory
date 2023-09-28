import { Appbar, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { StackHeaderProps } from "@react-navigation/stack";
import { getHeaderTitle } from "@react-navigation/elements";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Header(props: StackHeaderProps) {
  const { colors } = useTheme();
  const { navigate } = useNavigation<any>();
  const { name: routeName } = useRoute();

  const title = getHeaderTitle(props.options, props.route.name);

  return (
    <Appbar.Header>
      {props.back ? <Appbar.BackAction onPress={props.navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {routeName !== "Profile" && (
        <Appbar.Action
          style={{ ...styles.action, backgroundColor: colors.primaryContainer }}
          color={colors.onPrimaryContainer}
          icon="account-outline"
          onPress={() => navigate("Profile")}
        />
      )}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  action: {
    borderRadius: 50,
  },
});
