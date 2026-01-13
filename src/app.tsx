import { RouterProvider } from 'react-router-dom';

import './styles/index.css';
import { router } from './router';
import { WagmiProvider } from 'wagmi';
import { WalletContext } from 'context/walletContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { UmamiAnalyticsProvider } from 'analyticsEvents';

const queryClient = new QueryClient();

const Content = () => {
  return (
    <WagmiProvider config={WalletContext}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export const App = () => {
  const websiteId = import.meta.env.VITE_HEMI_BITCOIN_KIT_ANALYTICS_WEBSITE_ID;

  return (
    <div className="bg-neutral-50">
      <NuqsAdapter>
        <UmamiAnalyticsProvider
          autoTrack={false}
          {...(websiteId && {
            src: '/umami.js',
            websiteId,
          })}
        >
          <Content />
        </UmamiAnalyticsProvider>
      </NuqsAdapter>
    </div>
  );
};
