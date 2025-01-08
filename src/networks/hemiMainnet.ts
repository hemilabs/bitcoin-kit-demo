import { hemi } from 'hemi-viem';
import { overrideRpcUrl } from './utils';

export const hemiMainnet = overrideRpcUrl(hemi);
