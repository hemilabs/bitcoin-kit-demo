import { BrowserProvider } from 'ethers'
import { ReactNode, createContext, useContext, useState } from 'react'

const contractAddress = import.meta.env.VITE_HEMI_BITCOIN_KIT_CONTRACT_ADDRESS

/**
 * Represents the interface for the bitcoin kit demo context state.
 */
interface BitcoinkitContextState {
  walletConnected: boolean
  bitcoinPubKeyHash: string
  contractAddress: string
  provider: BrowserProvider | null
}

// Default state for the context
const defaultValue: BitcoinkitContextState = {
  walletConnected: false,
  bitcoinPubKeyHash: '',
  contractAddress,
  provider: null,
}

// Creating the context with a default value
export const BitcoinkitContext = createContext<{
  state: BitcoinkitContextState
  setState: React.Dispatch<React.SetStateAction<BitcoinkitContextState>>
}>({
  state: defaultValue,
  setState: () => {},
})

interface BitcoinkitProviderProps {
  children: ReactNode
}

// Implementing the Provider
export const BitcoinkitProvider = ({ children }: BitcoinkitProviderProps) => {
  const [state, setState] = useState<BitcoinkitContextState>(defaultValue)

  return (
    <BitcoinkitContext.Provider value={{ state, setState }}>
      {children}
    </BitcoinkitContext.Provider>
  )
}

// Custom hook to use the BitcoinkitContext
export const useBitcoinkitContext = () => {
  return useContext(BitcoinkitContext)
}
