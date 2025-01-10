import { type Chain } from 'viem';

export type EvmChain = Omit<Chain, 'fees' | 'serializers'>;

export type OrderedChains = readonly [EvmChain, ...EvmChain[]];
