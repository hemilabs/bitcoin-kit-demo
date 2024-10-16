import { RouterProvider } from 'react-router-dom'

import './styles/index.css'
import '@rainbow-me/rainbowkit/styles.css'
import { router } from './router'
import { WagmiProvider } from 'wagmi'
import { WalletContext } from 'context/walletContext'
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const App = () => {
  const queryClient = new QueryClient()
  return (
    <div className="bg-neutral-50">
      <WagmiProvider config={WalletContext}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            locale="en-US"
            theme={lightTheme({
              accentColor: 'black',
            })}
          >
            <RouterProvider router={router} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  )
}
