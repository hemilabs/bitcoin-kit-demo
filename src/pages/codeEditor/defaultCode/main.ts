import { DefaultCode } from 'types/defaultCode';
import btcBalAddr from './btcBalAddr';
import btcHeaderN from './btcHeaderN';
import btcLastHeader from './btcLastHeader';
import btcTxByTxid from './btcTxByTxid';
import btcTxConfirmations from './btcTxConfirmations';
import btcUtxosAddrList from './btcUtxosAddrList';

const defaultCodeList: DefaultCode[] = [
  btcBalAddr,
  btcLastHeader,
  btcHeaderN,
  btcTxByTxid,
  btcTxConfirmations,
  btcUtxosAddrList,
];

export default defaultCodeList;
