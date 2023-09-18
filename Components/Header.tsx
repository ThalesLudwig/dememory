import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { StackHeaderProps } from "@react-navigation/stack";
import { getHeaderTitle } from "@react-navigation/elements";

export default function Header(props: StackHeaderProps) {
  const title = getHeaderTitle(props.options, props.route.name);

  return (
    <Appbar.Header>
      {props.back ? <Appbar.BackAction onPress={props.navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      <Appbar.Action style={styles.action} icon="account-outline" onPress={() => {}} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  action: {
    backgroundColor: "#eee8f4",
    borderRadius: 50,
  },
});
