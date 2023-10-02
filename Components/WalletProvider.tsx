import { useTheme } from "react-native-paper";
import { IProviderMetadata, WalletConnectModal } from "@walletconnect/modal-react-native";

const projectId = process.env.EXPO_PUBLIC_WALLET_CONNECT_ID || "";

const providerMetadata: IProviderMetadata = {
  name: "Dememory",
  description: "Your memories on the Blockchain.",
  url: "https://your-project-website.com/",
  icons: ["https://your-project-logo.com/"],
  redirect: { native: "dememory://" },
};

export default function WalletProvider() {
  const { colors } = useTheme();

  return <WalletConnectModal accentColor={colors.primary} projectId={projectId} providerMetadata={providerMetadata} />;
}
