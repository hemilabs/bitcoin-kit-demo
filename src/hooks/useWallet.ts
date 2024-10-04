import { BrowserProvider } from 'ethers'
import { useBitcoinkitContext } from 'context/bitcoinkitContext'

const chainData = {
  chainId: import.meta.env.VITE_CHAIN_ID,
  chainName: import.meta.env.VITE_CHAIN_NAME,
  rpcUrls: [import.meta.env.VITE_CHAIN_RPC_URL],
  blockExplorerUrls: [import.meta.env.VITE_CHAIN_BLOCK_EXPLORER_URL],
  nativeCurrency: {
    name: import.meta.env.VITE_CHAIN_CURRENCY_NAME,
    symbol: import.meta.env.VITE_CHAIN_CURRENCY_SYMBOL,
    decimals: parseInt(import.meta.env.VITE_CHAIN_CURRENCY_DECIMALS),
  },
}

enum ErrorCodes {
  PENDING_REQUEST = -32002,
  USER_REJECTED_REQUEST = 4001,
  REQUEST_EXPIRED = 4902,
}

export const useWallet = () => {
  const { setState } = useBitcoinkitContext()

  const handleErrors = async (fn: () => Promise<any>) => {
    try {
      return await fn()
    } catch (error: any) {
      const errorCode =
        error?.error?.code ?? error?.info?.error?.code ?? error?.code

      switch (errorCode) {
        case ErrorCodes.PENDING_REQUEST:
          throw new Error(
            'There is already a pending request. Please check your wallet and approve the request.',
          )
        case ErrorCodes.USER_REJECTED_REQUEST:
        case ErrorCodes.REQUEST_EXPIRED:
          throw new Error(
            'User rejected the request. Please approve the request to proceed.',
          )
        default:
          throw error
      }
    }
  }

  const switchNetwork = async (provider: BrowserProvider) => {
    await provider?.send('wallet_switchEthereumChain', [
      { chainId: chainData.chainId },
    ])
  }

  const addNetwork = async (provider: BrowserProvider) => {
    await provider?.send('wallet_addEthereumChain', [chainData])
  }

  const connectWallet = async () => {
    if (window.ethereum === 'undefined') {
      throw new Error('Wallet not available')
    }

    const providerInstance = new BrowserProvider(window.ethereum)

    await handleErrors(() => providerInstance.send('eth_requestAccounts', []))

    const signer = await providerInstance.getSigner()
    const address = await signer.getAddress()

    try {
      await handleErrors(() => switchNetwork(providerInstance))
    } catch (error) {
      await handleErrors(() => addNetwork(providerInstance))
    }

    setState(prev => ({
      ...prev,
      walletConnected: true,
      bitcoinPubKeyHash: address,
      provider: providerInstance,
    }))
    console.log('Wallet connected with address:', address)
  }

  return {
    connectWallet,
  }
}
