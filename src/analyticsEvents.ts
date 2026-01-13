import { umamiAnalyticsContextFactory } from 'umami-analytics-next';

const analyticsEvents = [
  'Click on lastest hBK smart contract link',
  'Execute with error',
  'Execute with success',
  'Switch Theme to Dark',
  'Switch Theme to Light',
  'Switch to mainnet',
  'Switch to testnet',
  'Tabs - btcBalAddr',
  'Tabs - btcHeaderN',
  'Tabs - btcLastHeader',
  'Tabs - btcTxByTxid',
  'Tabs - btcTxConfirmations',
  'Tabs - btcUtxosAddrList',
] as const;

export const { UmamiAnalyticsProvider, useUmami } =
  umamiAnalyticsContextFactory(analyticsEvents);
