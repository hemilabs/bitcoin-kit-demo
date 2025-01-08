export enum DefaultCodeName {
  btcBalAddr = 'btcBalAddr',
  btcHeaderN = 'btcHeaderN',
  btcLastHeader = 'btcLastHeader',
  btcTxByTxid = 'btcTxByTxid',
  btcTxConfirmations = 'btcTxConfirmations',
  btcUtxosAddrList = 'btcUtxosAddrList',
}

export type DefaultCode = {
  name: DefaultCodeName;
  label: string;
  description: string;
  code: string;
};
