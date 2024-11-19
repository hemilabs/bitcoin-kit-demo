import { RouterProvider } from 'react-router-dom'

import './styles/index.css'
import { router } from './router'
import { WagmiProvider } from 'wagmi'
import { WalletContext } from 'context/walletContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const App = () => {
  const queryClient = new QueryClient()
  return (
    <div className="bg-neutral-50">
      <WagmiProvider config={WalletContext}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  )
}
