// Ignored because the crypto-shortener package is not typed yet
// It shold be fixed soon
//@ts-ignore
import { shorten } from 'crypto-shortener'
import { hemiTestnet } from 'networks/hemiTestnet'

export const Footer = () => {
  const contractAddress = import.meta.env.VITE_HEMI_BITCOIN_KIT_CONTRACT_ADDRESS

  return (
    <footer className="flex w-full flex-col items-center justify-between pt-4 text-sm font-medium text-neutral-400">
      <div className="h-0.5 w-full bg-neutral-200" />
      <div className="mt-2 flex w-full items-center justify-between">
        <span>© {new Date().getFullYear()} Hemi Labs, Inc.</span>
        <p className="space-x-1 text-right">
          <span className="italic text-neutral-500">
            Latest hBK on Hemi testnet
          </span>
          <a
            className="cursor-pointer"
            href={`${hemiTestnet.blockExplorers?.default.url}/address/${contractAddress}?tab=read_contract`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mr-1 text-orange-500">
              {shorten(contractAddress)}
            </span>
          </a>
          v{APP_VERSION}
        </p>
      </div>
    </footer>
  )
}
