import { useMemo } from "react";
import { SvgXml } from "react-native-svg";
import { toSvg } from "jdenticon";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useAccount } from "wagmi";

type UserAvatarProps = { small?: boolean, size?: number };

export default function UserAvatar({ small = false, size }: UserAvatarProps) {
  const { address } = useAccount();
  const avatarSize = useMemo(() => (small ? "30" : "60"), [small]);
  const svgString = toSvg(address || "0", parseInt(avatarSize));
  const { colors } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: colors.primaryContainer }}>
      <SvgXml xml={svgString} width={size ?? avatarSize} height={size ?? avatarSize} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    padding: 5,
  },
});
