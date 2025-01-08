import { hemiMainnet } from 'networks/hemiMainnet';
import { hemiTestnet } from 'networks/hemiTestnet';
import { OrderedChains } from 'types/chain';
import { createConfig, http } from 'wagmi';

export const allNetworks: OrderedChains = [hemiMainnet, hemiTestnet];

export const WalletContext = createConfig({
  chains: allNetworks,
  transports: Object.fromEntries(
    allNetworks.map(n => [
      n.id,
      http(n.rpcUrls.default.http[0], {
        batch: { wait: 1000 },
      }),
    ]),
  ),
});
