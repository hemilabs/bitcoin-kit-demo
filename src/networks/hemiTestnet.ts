import { hemiSepolia } from 'hemi-viem'
import { overrideRpcUrl } from './utils'

export const hemiTestnet = overrideRpcUrl(hemiSepolia)
