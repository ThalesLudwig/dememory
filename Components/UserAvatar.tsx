import { useMemo } from "react";
import { SvgXml } from "react-native-svg";
import { toSvg } from "jdenticon";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";

import { RootState } from "../config/store";

type UserAvatarProps = { small?: boolean };

export default function UserAvatar({ small = false }: UserAvatarProps) {
  const { wallet } = useSelector((state: RootState) => state.profile);
  const avatarSize = useMemo(() => (small ? "30" : "60"), [small]);
  const svgString = toSvg(wallet || "0", parseInt(avatarSize));
  const { colors } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.primaryContainer }}>
      <SvgXml xml={svgString} width={avatarSize} height={avatarSize} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    padding: 5,
  },
});
