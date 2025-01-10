import { hemiMainnet } from 'networks/hemiMainnet';
import { hemiTestnet } from 'networks/hemiTestnet';
import { useMemo } from 'react';

import { useNetworkType } from './useNetworkType';
import { EvmChain } from 'types/chain';

export const useHemi = function () {
  const [type] = useNetworkType();
  return useMemo(
    (): EvmChain => (type === 'testnet' ? hemiTestnet : hemiMainnet),
    [type],
  );
};
