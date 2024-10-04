import { useBitcoinkitContext } from 'context/bitcoinkitContext'
import { useWallet } from 'hooks/useWallet'
import { handleError } from 'utils/handleError'

const shortenAddress = (address: string, chars = 6): string => {
  if (!address) return ''
  return `${address.substring(0, chars)}...${address.substring(
    address.length - chars,
  )}`
}

export const WalletStatus = function () {
  const { state } = useBitcoinkitContext()
  const { connectWallet } = useWallet()

  const handleConnectWallet = () => {
    if (state.walletConnected) return
    connectWallet().catch(error => handleError('', error))
  }

  return (
    <div
      className={`flex items-center gap-x-4 rounded-lg bg-slate-50 px-3 py-1 text-base font-medium leading-normal shadow-sm shadow-neutral-300 ${
        state.walletConnected ? 'cursor-default' : 'cursor-pointer'
      }`}
      onClick={handleConnectWallet}
    >
      {state.walletConnected ? (
        <span className="text-orange-950">
          {shortenAddress(state.bitcoinPubKeyHash)}
        </span>
      ) : (
        <span className="text-slate-950">Not connected</span>
      )}
    </div>
  )
}
