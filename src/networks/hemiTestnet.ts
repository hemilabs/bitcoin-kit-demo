import { hemiSepolia } from 'hemi-viem'
import { overrideRpcUrl } from './utils'

export const hemiTestnet = overrideRpcUrl(
  hemiSepolia,
  'https://devnet2.rpc.hemi.network/rpc',
)
