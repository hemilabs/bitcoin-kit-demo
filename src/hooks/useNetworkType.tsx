import { useQueryState, parseAsStringLiteral } from 'nuqs';

export const isMainnetEnabled =
  import.meta.env.VITE_HEMI_BITCOIN_KIT_ENABLE_MAINNET === 'true';

export const networkTypes = ['mainnet', 'testnet'] as const;
export type NetworkType = (typeof networkTypes)[number];

export const useNetworkType = () =>
  useQueryState(
    'networkType',
    parseAsStringLiteral(
      isMainnetEnabled ? networkTypes : (['testnet'] as const),
    ).withDefault(isMainnetEnabled ? 'mainnet' : 'testnet'),
  );
