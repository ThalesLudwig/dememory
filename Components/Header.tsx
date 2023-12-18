import { Appbar, useTheme } from "react-native-paper";
import { Pressable, StyleSheet } from "react-native";
import { StackHeaderProps } from "@react-navigation/stack";
import { getHeaderTitle } from "@react-navigation/elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAccount } from "wagmi";

import UserAvatar from "./UserAvatar";

export default function Header(props: StackHeaderProps) {
  const { colors } = useTheme();
  const { navigate } = useNavigation<any>();
  const { name: routeName } = useRoute();
  const { isConnected } = useAccount();

  const title = getHeaderTitle(props.options, props.route.name);

  return (
    <Appbar.Header>
      {props.back ? <Appbar.BackAction onPress={props.navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {!isConnected && routeName !== "Profile" && (
        <Appbar.Action
          style={{ ...styles.action, backgroundColor: colors.primaryContainer }}
          color={colors.onPrimaryContainer}
          icon="account-outline"
          onPress={() => navigate("Profile")}
        />
      )}
      {isConnected && routeName !== "Profile" && (
        <Pressable style={styles.avatar} onPress={() => navigate("Profile")}>
          <UserAvatar small />
        </Pressable>
      )}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  action: {
    borderRadius: 50,
  },
  avatar: {
    marginRight: 10,
  },
});
