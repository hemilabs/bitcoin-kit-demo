import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import { hemiTestnet } from 'networks/hemiTestnet'
import { createConfig, http } from 'wagmi'

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Wallets',
      wallets: [metaMaskWallet],
    },
  ],
  {
    // These values are required but not actually used, unless wallet connect is enabled
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
  },
)

export const WalletContext = createConfig({
  chains: [hemiTestnet],
  connectors,
  transports: {
    [hemiTestnet.id]: http(),
  },
})
