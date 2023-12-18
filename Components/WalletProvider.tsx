import '@walletconnect/react-native-compat';

import { WagmiConfig } from 'wagmi'
import { mainnet, polygon, arbitrum } from 'viem/chains'
import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native'

const projectId = process.env.EXPO_PUBLIC_WALLET_CONNECT_ID || "";

const metadata = {
  name: "Dememory",
  description: "Your memories on the Blockchain.",
  url: "https://your-project-website.com/",
  icons: ["https://your-project-logo.com/"],
  redirect: { native: "dememory://" },
};

const chains = [mainnet, polygon, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
createWeb3Modal({ projectId, chains, wagmiConfig, defaultChain: polygon })

export default function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      {children}
      <Web3Modal />
    </WagmiConfig>
  );
}
