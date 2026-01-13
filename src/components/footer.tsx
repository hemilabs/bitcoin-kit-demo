import { useUmami } from 'analyticsEvents';
import { shorten } from 'crypto-shortener';
import { useHemi } from 'hooks/useHemi';

export const Footer = () => {
  const hemi = useHemi();
  const { track } = useUmami();
  const contractAddress = hemi.testnet
    ? import.meta.env.VITE_HEMI_BITCOIN_KIT_CONTRACT_ADDRESS_TESTNET
    : import.meta.env.VITE_HEMI_BITCOIN_KIT_CONTRACT_ADDRESS_MAINNET;

  return (
    <footer className="flex w-full flex-col items-center justify-between pt-4 text-sm font-medium text-neutral-400">
      <div className="h-0.5 w-full bg-neutral-200" />
      <div className="mt-2 flex w-full items-center justify-between">
        <span>© {new Date().getFullYear()} Hemispheres Foundation</span>
        <p className="space-x-1 text-right">
          <span className="italic text-neutral-500">
            Latest hBK on Hemi {hemi.testnet && 'Sepolia'}
          </span>
          <a
            className="cursor-pointer"
            href={`${hemi.blockExplorers?.default.url}/address/${contractAddress}?tab=read_contract`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              track?.('Click on lastest hBK smart contract link');
            }}
          >
            <span className="mr-1 text-orange-500">
              {shorten(contractAddress)}
            </span>
          </a>
          v{APP_VERSION}
        </p>
      </div>
    </footer>
  );
};
