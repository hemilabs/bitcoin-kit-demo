import btcBalAddr from './btcBalAddr'
import btcHeaderN from './btcHeaderN'
import btcLastHeader from './btcLastHeader'
import btcTxByTxid from './btcTxByTxid'
import btcTxConfirmations from './btcTxConfirmations'
import btcUtxosAddrList from './btcUtxosAddrList'

const defaultCode = {
  btcBalAddr,
  btcLastHeader,
  btcHeaderN,
  btcTxByTxid,
  btcTxConfirmations,
  btcUtxosAddrList,
} as const

export default defaultCode
