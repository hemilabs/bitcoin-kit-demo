interface Props {
  contractAddress: string
  blockExplorerUrl: string
  network: string
}

export const LatestContract = ({
  contractAddress,
  blockExplorerUrl,
  network,
}: Props) => (
  <>
    <span className="text-sm font-normal text-neutral-500">
      Latest hBK on Hemi {network === 'testnet' && 'testnet'}:
    </span>
    <a
      className="cursor-pointer"
      href={`${blockExplorerUrl}/address/${contractAddress}?tab=read_contract`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="ml-2 text-base font-normal text-orange-500 hover:text-orange-600">
        {contractAddress}
      </span>
    </a>
  </>
)
