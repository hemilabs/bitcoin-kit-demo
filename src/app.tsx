import { RouterProvider } from 'react-router-dom';

import './styles/index.css';
import { router } from './router';
import { WagmiProvider } from 'wagmi';
import { WalletContext } from 'context/walletContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react';

const Content = ({ queryClient }: { queryClient: QueryClient }) => {
  return (
    <WagmiProvider config={WalletContext}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className="bg-neutral-50">
      <NuqsAdapter>
        <Content queryClient={queryClient} />
      </NuqsAdapter>
    </div>
  );
};
