import { useAccount } from 'wagmi'

interface Props {
  contractAddress: string
}

export const LatestContract = ({ contractAddress }: Props) => {
  const { chain } = useAccount()

  return (
    <>
      <span className="text-sm font-normal text-neutral-500">
        Latest hBK on Hemi {chain?.testnet && 'testnet'}:
      </span>
      <a
        className="cursor-pointer"
        href={`${chain?.blockExplorers?.default.url}/address/${contractAddress}?tab=read_contract`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="ml-2 text-base font-normal text-orange-500 hover:text-orange-600">
          {contractAddress}
        </span>
      </a>
    </>
  )
}
