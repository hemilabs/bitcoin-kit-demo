import { hemiTestnet } from 'networks/hemiTestnet'
import { createConfig, http } from 'wagmi'

export const WalletContext = createConfig({
  chains: [hemiTestnet],
  transports: {
    [hemiTestnet.id]: http(),
  },
})
